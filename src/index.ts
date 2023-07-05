import { _render } from './renderer';
import { defineAsCustomElement } from './expose';

/**
 * This class defines a Component. This is not the web component itself,
 * but the entire Component API that is used to build the whole lifecycle
 * and features to build everything that a WC can render. This will be what
 * a Vanilla Web Component will be binded to. this class controls all the 
 * render process, data flow and reactivity inside the web component. This 
 * is the Web Component Bridge. It has all the features of the Component Class 
 * an the Expose method, responsible to wrap our WC classe-based components 
 * into a real Vanilla Web component and bind all the data and lifecycle callbacks. 
 * The import of { WC } must be idealy deduplicated using your prefered bundler.
 */
export class WC<P extends Object = any> {
  public props: P;
  public $el: HTMLElement;
  static styles?: StaticStyle[];
  public static isWCWCClass = true;

  constructor(props: P) {
    this.props = props || {};
    this.$el = (props as any).$el;
  }
  
  private get $host(): HTMLElement|ShadowRoot {
    return this.$el.shadowRoot || this.$el;
  }

  private _unmounted(): any {
    queueMicrotask(() => this.unmounted());
  }

  public update(update?: any) {
    this.beforeUpdate();

    const oldElements = Array.from(this.$host.childNodes) as any;
    const rendered = _render(this.render(update)) as any;
    const newElements = Array.isArray(rendered) ? rendered : [ rendered ];
    
    newElements.forEach((child: HTMLElement) => {
      this.$host.insertBefore(child, oldElements[0]);
    });

    oldElements.forEach((child: HTMLElement) => {
      if (!newElements.includes(child)) {
        if (typeof child !== 'string') {
          child.remove();
        }

        (child as any) = null;
      }
    });

    this.$el.isConnected 
      ? queueMicrotask(() => this.updated()) 
      : this._unmounted();
  }

  public store(data: object, _cb?: Function): any {
    const cb = _cb ? _cb.bind(this) : this.update.bind(this);

    return new Proxy(data, {
      get: (obj: any, prop: any) => {
        const isArrayOrObject = Array.isArray(obj[prop]) || typeof obj[prop] === 'object';
        const isProxyOrCircular = !obj[prop]._isProxy && !Object.is(obj[prop], data);

        if (prop === '_isProxy') {
          return true;
        }

        if (isArrayOrObject && !isProxyOrCircular) {
          obj[prop] = this.store(obj[prop], _cb);
        }
        
        if (typeof obj[prop] === 'function') {
          return obj[prop].bind(this)();
        }

        return obj[prop];
      },

      set: (obj: any, prop: any, value: any) => {
        if (obj[prop] === value) {
          return true
        };

        obj[prop] = value;
        cb();

        return true;
      },

      deleteProperty: (obj: any, prop: any) => {
        delete obj[prop];
        cb();

        return true;
      }
    });
  }

  public static expose(tagname: string, options?: ComponentConfig) {
    if (!window.customElements.get(tagname)) {
      defineAsCustomElement(this, tagname, options);
    }
  }  

  // @ts-ignore
  public attrChanged(name: string, oldv: any, newv: any) {}
  public beforeMount(): any {}
  public mounted(): any {}
  public unmounted(): any {}
  public beforeUpdate(): any {}
  public updated(): any {}
  public render(_update?: any): HTMLElement | void {}
}

export const wcwc = { WC };
