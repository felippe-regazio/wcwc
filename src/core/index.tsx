import { render as _render } from 'nano-jsx/lib/core';

export const WC_REGISTERED_STYLES: {
  [tagName: string]: string
} = {};

export class WC extends HTMLElement {
  protected shadow?: ShadowRootInit;
  protected styles?: '*.scss'[];
  
  connectedCallback() {
    this.addStyle().catch(console.error);
    this.render().catch(console.error);
  }
  
  protected root() {
    if (this.shadow && !this.shadowRoot) {
      this.attachShadow(this.shadow);
    }

    return this.shadow ? this.shadowRoot : this;
  }
  
  protected async addStyle() {
    try {
      if (typeof window === 'undefined') {
        Promise.resolve(false);
      }
      
      if ((this.styles && this.styles.length) && (this.shadow || !WC_REGISTERED_STYLES[this.tagName])) {
        const styleRoot = this.shadow ? this.shadowRoot : window.document ? (window.document?.head || window.document?.body) : this;
        const style: string = this.styles && this.styles.map((s: '*.scss') => s.toString()).join('') || '';
        const styleElement = Object.assign(document.createElement('style'), { textContent: style });
        
        styleElement.dataset.target = this.tagName.toLowerCase();
        styleRoot?.append(styleElement);

        if (!this.shadow) {
          WC_REGISTERED_STYLES[this.tagName] = style;          
        }
      }
    } catch(error) {
      Promise.reject(error);
    }
  }
  
  protected async render() {
    try {
      const target = this.root() as HTMLElement;
      const template = this.template();
      _render(template, target);
      Promise.resolve(true);
    } catch(error) {
      Promise.reject(error);
    }
  }
  
  public static expose(tagname: string) {
    if (typeof window !== 'undefined' && 'customElements' in window) {
      window.customElements.define(tagname, this);
    }
  }
  
  protected template() { return '' }
}

export * from 'nano-jsx';