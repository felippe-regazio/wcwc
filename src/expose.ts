import { addStyles } from './add-styles';
import { h, isSSR, render, _render } from 'nano-jsx/lib/core';

const defineAsCustomElementsSSR = (component: any, componentName: string, _options: any = {}) => {
  (!/^[a-zA-Z0-9]+-[a-zA-Z0-9]+$/.test(componentName)) ?
    console.log(`Error: WebComponent name "${componentName}" is invalid.`)
    : _nano.customElements.set(componentName, component);
};

export const defineAsCustomElements: (
  component: any,
  componentName: string,
  config?: ComponentConfig
) => void = function (component, componentName, config) {
  if (isSSR()) {
    defineAsCustomElementsSSR(component, componentName);
    return;
  }

  if (window.customElements.get(componentName)) {
    return;
  }

  const _config: ComponentConfig = config || component.config || {};
  const _shadow = _config.shadow;
  const _props = _config.props || {};

  customElements.define(componentName, class extends HTMLElement {
    nanoComponentRef: any;
    $root: ShadowRoot|HTMLElement;    
    private initialized: boolean = false;

    constructor() {
      super();
      this.$root = this.root();
      component.$el = this.$root;
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
      addStyles(
        this.tagName.toLocaleLowerCase(), 
        component.styles,
        this.$root
      ).catch(void 0);
      
      const el = this.buildEl(
        _render({
          component,
          props: {
            $el: this.$root,
            ref: (r: any) => (this.nanoComponentRef = r),
            children: Array.from(this.childNodes).map(c => render(c)),
            ...(this.getInitialProps() || {})
          }
        })
      );
      
      this.appendEl(el);
      this.initialized = true;    
    }

    static get observedAttributes() {
      return Object.keys(_props);
    }

    private root() {
      if (_shadow) {
        this.attachShadow(_shadow);
        return this.shadowRoot as ShadowRoot;
      } else {
        return this;
      }
    }

    private getInitialProps(): unknown {
      return Object.keys(_props)
        .reduce((acc: any, attrName: string) => {
          const attr = _props[attrName];

          if (this.hasAttribute(attrName)) {
            const attrValue = this.getAttribute(attrName) || attr.default || '';
            acc[attrName] = attrValue;
          } else {
            acc[attrName] = attr.default;
          }

          if (attr.css) {
            this.attrToCSSProp(attrName, attr.default as any);
          }
    
          return acc;
        }, {});
    }

    private async attrToCSSProp(name: string, value: string|null): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          const attr = _props[name];

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

    private buildEl(contents: any) {
      /*
       * because nano-jsx update needs a "el.parentElement" we need 
       * to wrap the children in a div when using shadow mode. when
       * not in shadow mode the parent is the element itself, when
       * in shadow mode the parent cant be the shadow, so we wrap the
       * component.
       */
      return h(!!this.shadowRoot ? 'div' : 'template', null, contents);
    }

    private appendEl(el: any) {
      if (!!this.shadowRoot) {
        el.dataset.wcRoot = true;
        this.$root.append(el);
      } else {
        this.$root.append(...el.childNodes);
      }
    }

    attributeChangedCallback(name: string, _: any, newValue: any) {
      if (this.nanoComponentRef) {
        this.nanoComponentRef.props[name] = newValue;
        this.nanoComponentRef.update();
        this.attrToCSSProp(name, newValue).catch(void 0);
      }
    }
  });
}