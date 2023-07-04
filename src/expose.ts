import { addStyles } from './add-styles';
import { renderClassComponent, render, appendChildren } from './renderer';

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
export async function defineAsCustomElement(Component: any, componentName: string, definedConfig?: ComponentConfig) {
  const config: ComponentConfig = Object.assign({ props: {}, shadow: undefined }, definedConfig);

  // ------------------ Wraps the WC "Component" on a Native Web Element

  customElements.define(componentName, class extends HTMLElement {
    private initialized: boolean = false;
    $component: any;

    constructor() {
      super();

      Component.prototype._beforeMount();
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
      this.$component._mounted();
    }

    private renderWC() {
      const contents = renderClassComponent({
        component: Component,

        props: {
          $el: this,
          ref: (r: any) => (this.$component = r),
          children: render(Array.from(this.childNodes)),
          ...(this.attrsToProps() || {})
        }
      });

      appendChildren(this.shadowRoot || this, contents);
    }

    static get observedAttributes() {
      return Object.keys(config.props);
    }

    private attrsToProps(): unknown {
      return Object.keys(config.props)
        .reduce((data: any, attrName: string) => {
          const attrConfig = config.props[attrName];

          if (!this.getAttribute(attrName) && attrConfig.initial) {
            this.setAttribute(attrName, String(attrConfig.initial));
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
            const propName = typeof attr.css === 'string' ? attr.css : name;
            this.style.setProperty(`--wc-attr-${propName}`, String(value || attr.initial || ''));
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
