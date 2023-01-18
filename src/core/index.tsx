import { render as _render } from 'nano-jsx/lib/core';

export const WC_REGISTERED_STYLES: {
  [tagName: string]: string
} = {};

export class WC extends HTMLElement {
  private __template: any;

  protected $shadow?: ShadowRootInit;
  protected $styles?: '*.scss'[];
  protected $store: unknown;
  
  connectedCallback() {
    this.$store = this.$store && this.reactiveStore(this.$store);
    this.render();
  }

  protected root() {
    if (this.$shadow && !this.shadowRoot) {
      this.attachShadow(this.$shadow);
    }

    return this.$shadow ? this.shadowRoot : this;
  }
  
  protected async render() {
    try {
      const target = this.root() as HTMLElement;
      const template = this.domDiff(this.__template, this.template());
      /** */
      _render(template, target);
      /** */
      this.addStyles();
      Promise.resolve(true);
    } catch(error) {
      Promise.reject(error);
    }
  }

  private domDiff(a: any, b: any) {
    if (!a) {
      this.__template = b;
      return b;
    }

    // DO DIFF

    return b;
  }

  private addStyles() {
    try {
      if (typeof window === 'undefined') {
        return false;
      }
      
      if ((this.$styles && this.$styles.length) && (this.$shadow || !WC_REGISTERED_STYLES[this.tagName])) {
        const styleRoot = this.$shadow ? this.root() : window.document ? (window.document?.head || window.document?.body) : this;
        const style: string = this.$styles && this.$styles.map((s: '*.scss') => s.toString()).join('') || '';
        const styleElement = Object.assign(document.createElement('style'), { textContent: style });

        styleElement.dataset.target = this.tagName.toLowerCase();
        styleRoot?.append(styleElement);

        if (!this.$shadow) {
          WC_REGISTERED_STYLES[this.tagName] = style;          
        }
      }
    } catch(error) {
      return true;
    }
  }

  protected reactiveStore(data = {}) {
    return new Proxy(data, {
      get: (obj: any, prop: any) => {
        if (prop === '_isProxy') return true;
        if (['object', 'array'].includes(Object.prototype.toString.call(obj[prop]).slice(8, -1).toLowerCase()) && !obj[prop]._isProxy) {
          obj[prop] = new Proxy(obj[prop], this.reactiveStore(data));
        }
        return obj[prop];
      },

      set: (obj: any, prop: any, value: any) => {
        if (obj[prop] === value) return true;
        obj[prop] = value;
        this.render().catch(console.error);
        return true;
      },

      deleteProperty: (obj: any, prop: any) => {
        delete obj[prop];
        this.render().catch(console.error);
        return true;
      }
    });
  }
  
  public static expose(tagname: string) {
    if (typeof window !== 'undefined' && 'customElements' in window) {
      window.customElements.define(tagname, this);
    }
  }
  
  protected template() { return '' }
}

export * from 's-js';
export * from 'nano-jsx';