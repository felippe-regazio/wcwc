import { render as _render } from 'nano-jsx/lib/core';

export class Component extends HTMLElement {
  protected shadow?: ShadowRootInit;

  connectedCallback() {
    this.render();
  }

  protected root() {
    if (this.shadow && !this.shadowRoot) {
      this.attachShadow(this.shadow);
    }
  
    return this.shadow ? this.shadowRoot : this;
  }
  
  protected render() {
    const target = this.root() as HTMLElement;
    _render(this.template(), target);
  }

  public static expose(tagname: string) {
    if (typeof window !== 'undefined' && 'customElements' in window) {
      window.customElements.define(tagname, this);
    }
  }

  protected template() {};
}


export * from 'nano-jsx';