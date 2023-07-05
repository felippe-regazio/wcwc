import { addStyles } from './add-styles';
import { renderClassComponent, render, appendChildren } from './renderer';

export const parseDefinedProps = (props: unknown[]): ComponentConfigDefinedProps => {
  return (props || []).reduce((obj: any, item: any) => {
    if (typeof item === 'string') {
      obj[item] = {};
    }

    if (typeof item === 'object' && item.name) {
      obj[item.name] = item;
    }

    return obj;
  }, {}) as ComponentConfigDefinedProps;
}

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
export async function defineAsCustomElement(Component: any, componentName: string, definedConfig?: ExposeConfig) {
  const config = {
    shadow: definedConfig?.shadow,
    props: parseDefinedProps(definedConfig?.props || []),
  } as ComponentConfig;

  // ------------------ Wraps the WC "Component" on a Native Web Element

  customElements.define(componentName, class extends HTMLElement {
    private initialized: boolean = false;
    $component: any;

    constructor() {
      super();

      Component.prototype.beforeMount();
    }

    disconnectedCallback() {
      this.$component && this.$component._unmounted();
    }

    connectedCallback() {
      if (config.shadow || this.getAttribute('shadow')) {
        this.attachShadow((config.shadow || { mode: this.getAttribute('shadow') }) as ShadowRootInit);
      }

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
        origin: this,
        styles: Component.styles || [],
        dataId: this.tagName.toLocaleLowerCase(), 
      }).catch(void 0);
      
      this.renderWC();
      this.initialized = true;
      this.$component.mounted();
    }

    private renderWC() {
      const root = (this.shadowRoot || this);
      const f = new DocumentFragment();

      while(root.lastChild) {
        f.prepend(root.lastChild);
      }

      const contents = renderClassComponent({
        component: Component,

        props: {
          $el: this,
          ref: (r: any) => (this.$component = r),
          children: render(Array.from(f.childNodes)),
          ...(this.attrsToProps() || {})
        }
      });

      appendChildren(root, contents);
    }

    static get observedAttributes() {
      return Object.keys(config.props);
    }

    private attrsToProps(): unknown {
      return Object.keys(config.props)
        .reduce((data: any, attrName: string) => {
          const attrConfig = config.props[attrName];

          if (!this.getAttribute(attrName) && attrConfig.default) {
            this.setAttribute(attrName, String(attrConfig.default));        
          }

          // mirror current attribute value to incremental props
          data[attrName] = this.getAttribute(attrName);
          
          if (attrConfig.css && data[attrName]) {
            this.attrToCSSProp(attrName, data[attrName] as any);
          }

          return data;
        }, {});
    }

    private async attrToCSSProp(name: string, value: string|null): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          const attr = config.props[name];
          
          if (attr && attr.css) {
            const prefix = this?.tagName.toLowerCase();
            const propName = typeof attr.css === 'string' ? attr.css : name;
            this.style.setProperty(`--${prefix}-${propName}`, String(value || attr.default || ''));
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
        this.attrToCSSProp(name, newv).catch(void 0);

        this.$component.update();
        this.$component.attrChanged(name, oldv, newv);
      }
    }
  });
}
