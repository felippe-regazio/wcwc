import { addStyles } from './add-styles';
import { h, isSSR, render, _render } from 'nano-jsx/lib/core';

function defineAsCustomElementsSSR(component: any, componentName: string, _options: any = {}) {
  (!/^[a-zA-Z0-9]+-[a-zA-Z0-9]+$/.test(componentName)) ?
    console.log(`Error: WebComponent name "${componentName}" is invalid.`)
    : _nano.customElements.set(componentName, component);
};

export function defineAsCustomElements(Component: any, componentName: string, definedConfig?: ComponentConfig) {
  if (isSSR()) {
    defineAsCustomElementsSSR(Component, componentName);
    return;
  }

  if (window.customElements.get(componentName)) {
    return;
  }

  const config = Object.assign({} as ComponentConfig, {
    props: {},
    shadow: undefined,
    ...(definedConfig || {}),
  });
  
  customElements.define(componentName, class ComponentAdapter extends HTMLElement {
    $nc: any;
    $root: ShadowRoot|HTMLElement;    
    private initialized: boolean = false;

    constructor() {
      super();
      this.$root = this.root();
      Component.$el = this.$root;
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
        Component.styles,
        this.$root
      ).catch(void 0);
      
      const el = this.buildEl(
        _render({
          component: Component,
          props: {
            $el: this.$root,
            ref: (r: any) => (this.$nc = r),
            children: Array.from(this.childNodes).map(c => render(c)),
            ...(this.getInitialProps() || {})
          }
        })
      );
      
      this.appendEl(el);
      this.initialized = true;    
    }

    static get observedAttributes() {
      return Object.keys(config.props);
    }

    private root() {
      if (config.shadow) {
        this.attachShadow(config.shadow);
        return this.shadowRoot as ShadowRoot;
      } else {
        return this;
      }
    }

    private getInitialProps(): unknown {
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
            this.attrToCSSProp(attrName, attr.default as any);
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
      if (this.$nc) {
        this.$nc.props[name] = newValue;
        this.$nc.update();
        this.attrToCSSProp(name, newValue).catch(void 0);
      }
    }
  });
}
