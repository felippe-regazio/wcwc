import { loadStyles } from './load-styles';
import { h, isSSR, render, _render } from 'nano-jsx/lib/core';

const defineAsCustomElementsSSR = (
  component: any, 
  componentName: string, 
  _options: any = {}
) => {
  (!/^[a-zA-Z0-9]+-[a-zA-Z0-9]+$/.test(componentName)) ?
    console.log(`Error: WebComponent name "${componentName}" is invalid.`)
    : _nano.customElements.set(componentName, component);
}

export const defineAsCustomElements: (
  component: any,
  componentName: string,
  shadow?: ShadowRootInit
) => void = function (component, componentName, shadow) {
  if (isSSR()) {
    defineAsCustomElementsSSR(component, componentName);
    
    return;
  }

  customElements.define(componentName, class extends HTMLElement {
    nanoComponentRef: any;
    $root: ShadowRoot|HTMLElement;    

    constructor() {
      super();
      this.$root = this.root();

      loadStyles(
        this.tagName.toLocaleLowerCase(), 
        component.styles,
        this.$root
      ).catch(void 0);
      
      const el = this.buildEl(
        _render({
          component,
          props: {
            ref: (r: any) => (this.nanoComponentRef = r),
            children: Array.from(this.childNodes).map(c => render(c)),
            ...(this.getInitialProps() || {})
          }
        })
      );
      
      this.appendEl(el);
    }

    static get observedAttributes() {
      return component.attrs;
    }

    private root() {
      if (shadow) {
        this.attachShadow(shadow);
        return this.shadowRoot as ShadowRoot;
      } else {
        return this;
      }
    }

    private getInitialProps() {
      return (component.attrs || []).reduce((acc: any, attr: string) => {
        if (this.hasAttribute(attr)) {
          acc[attr] = this.getAttribute(attr);
        }

        return acc;
      }, {});
    }

    private async setCSSProp(name: string, value: string|null): Promise<boolean> {
      return new Promise((resolve, reject) => {
        try {
          this.style.setProperty(`wc-props-${name}`, String(value) || '');
          return resolve(true);
        } catch(error) {
          console.error(error);
          return reject(false);
        }
      })
    }

    private buildEl(contents: any) {
      // because nano-jsx update need parentElement, we need 
      // to wrap the element in a div when using shadow mode
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
      this.nanoComponentRef.props[name] = newValue;
      this.nanoComponentRef.update();
      this.setCSSProp(name, newValue).catch(void 0);
    }
  })
}