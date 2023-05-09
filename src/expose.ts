import { h } from './h';
import { addStyles } from './add-styles';
import { _render, render } from './renderer';

/**
 * This function receives a WCWC Class-Based Component and wrap it into
 * a Vanilla Web Component. All the component lifecycle and data flow will
 * be binded between the two different interfaces shaping a single new
 * powerful Web Component that can be used anywhere.
 * 
 * @param Component 
 * @param componentName 
 * @param definedConfig 
 */
export function defineAsCustomElement(Component: any, componentName: string, definedConfig?: ComponentConfig) {
  const config = Object.assign({} as ComponentConfig, {
    props: {},
    shadow: undefined,
    ...(definedConfig || {}),
  });

  // ------------------ Wraps the WC "Component" on a Native Web Element

  customElements.define(componentName, class extends HTMLElement {
    $rendered: any;
    $component: any;
    $root: ShadowRoot|HTMLElement;    
    private initialized: boolean = false;

    constructor() {
      super();
      this.$root = this.root();
      Component.prototype._beforeMount();
    }

    disconnectedCallback() {
      this.$component && this.$component._unmounted();
    }

    connectedCallback() {
      /*
       * The constructor for a custom element is not supposed to read or write its DOM. 
       * It shouldn't create child elements or modify attributes. That work needs to be 
       * done later, usually in a connectedCallback() method (although note that connectedCallback() 
       * can be called multiple times if the element is removed and re-added to the DOM, 
       * so you may need to check for this, or undo changes in a disconnectedCallback()).
       * SPEC: https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
       */
      !this.initialized && this.init();
    }    

    init() {
      addStyles({
        origin: this.$root,
        styles: Component.styles || [],
        tagname: this.tagName.toLocaleLowerCase(), 
      }).catch(void 0);
      
      this.$rendered = this.renderNC();
      this.appendComponent(this.$rendered);
      this.initialized = true;
      this.$component._mounted();
    }

    private renderNC() {
      /*
       * because nano-jsx update needs a "el.parentElement" we need 
       * to wrap the children in a div when using shadow mode. when
       * not in shadow mode the parent is the element itself, when
       * in shadow mode the parent cant be the shadow, so we wrap the
       * component.
       */
      const contents = _render({
        component: Component,

        props: {
          $el: this,
          ref: (r: any) => (this.$component = r),
          children: render(Array.from(this.childNodes)),
          ...(this.attrsToProps() || {})
        }
      });

      return h(!!this.shadowRoot ? 'div' : 'template', null, contents);
    }

    static get observedAttributes() {
      return Object.keys(config.props);
    }

    private root() {
      return config.shadow ? this.attachShadow(config.shadow) : this;
    }

    private appendComponent(el: any) {
      if (!!this.shadowRoot) {
        el.dataset.wcRoot = true;
        this.$root.append(el);
      } else {
        this.$root.append(...el.childNodes);
      }
    }

    private attrsToProps(): unknown {
      return Object.keys(config.props)
        .reduce((acc: any, attrName: string) => {
          const attr = config.props[attrName];

          if (this.hasAttribute(attrName)) {
            const attrValue = this.getAttribute(attrName) || attr.default || '';
            acc[attrName] = attrValue;
          } else {
            acc[attrName] = attr.default;
          }

          if (attr.css) {
            this.attrToCSSProp(attrName, acc[attrName] as any);
          }
    
          return acc;
        }, {});
    }

    private async attrToCSSProp(name: string, value: string|null): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          const attr = config.props[name];

          if (attr && attr.css) {
            const propName = typeof attr.css === 'string' ? attr.css : name;
            this.style.setProperty(`--wc-attr-${propName}`, String(value || attr.default || ''));
          }

          return resolve(true);
        } catch(error) {
          console.error(error);
          return reject(false);
        }
      })
    }

    attributeChangedCallback(name: string, oldv: any, newv: any) {
      if (this.$component && oldv !== newv) {
        this.$component.props[name] = newv;
        this.$component.update();
        this.attrToCSSProp(name, newv).catch(void 0);
        this.$component.attrChanged(name, oldv, newv || config.props[name]?.default);
      }
    }
  });
}
