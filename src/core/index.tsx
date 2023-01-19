import { render as _render } from 'nano-jsx/lib/core';

export const WC_REGISTERED_STYLES: {
  [tagName: string]: string
} = {};

export class WC extends HTMLElement {
  protected $store?: unknown;
  protected $shadow?: ShadowRootInit;
  protected $style?: '*.scss'[];
  protected $children: ChildNode[] = Array.from(this.childNodes);
  
  connectedCallback() {
    this.createStore();
    this.render();
  }

  protected render() {
    try {
      const target = this.root() as HTMLElement;
      const template: any = this.$template();
      _render(template, target);
      this.addStyles();
    } catch(error) {
      console.error(error);
    }
  }

  protected root() {
    if (this.$shadow && !this.shadowRoot) {
      this.attachShadow(this.$shadow);
    }

    return this.$shadow ? this.shadowRoot : this;
  }

  private addStyles() {
    try {
      if (typeof window === 'undefined') {
        return false;
      }
      
      if ((this.$style && this.$style.length) && (this.$shadow || !WC_REGISTERED_STYLES[this.tagName])) {
        const styleRoot = this.$shadow ? this.root() : window.document ? (window.document?.head || window.document?.body) : this;
        const style: string = this.$style && this.$style.map((s: '*.scss') => s.toString()).join('') || '';
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

  private createStore() {
    const proxyStoreData = (data = {}, cb?: Function) => {
      return new Proxy(data, {
        get: (obj: any, prop: any) => {
          if (prop === '_isProxy') {
            return true;
          }
  
          if (Array.isArray(obj[prop]) || typeof obj[prop] === 'object' && !obj[prop]._isProxy) {
            obj[prop] = proxyStoreData(obj[prop], cb);
          }
  
          if (typeof obj[prop] === 'function') {
            return obj[prop]();
          }
          
          return obj[prop];
        },
  
        set: (obj: any, prop: any, value: any) => {
          if (obj[prop] === value) {
            return true
          };
  
          obj[prop] = value;
          cb && cb();
          return true;
        },
  
        deleteProperty: (obj: any, prop: any) => {
          delete obj[prop];
          cb && cb();
          return true;
        }
      });
    };

    this.$store = proxyStoreData(this.$store || {}, () => this.render());
  }

  protected $attrs(defaults?: unknown) {
    const $props: unknown = defaults || {};

    Object.keys(defaults || {}).forEach((prop: string) => {
      if (this.hasAttribute(prop)) {
        ($props as any)[prop] = this.getAttribute(prop) || (defaults as any)[prop];
      }
    });

    new MutationObserver( (mutations: MutationRecord[]) => {
      mutations.forEach((m: MutationRecord) => {
        const attr: string|null = m.attributeName;

        if (attr) {
          ($props as any)[attr] = this.getAttribute(attr);
        }
      });

      this.render();
    }).observe(this, { attributes: true });

    return $props;
  }
  
  public static expose(tagname: string) {
    if (typeof window !== 'undefined' && 'customElements' in window) {
      window.customElements.define(tagname, this);
    }
  }
  
  protected $template() { return '' }
}

export * from 'nano-jsx';