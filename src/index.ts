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
  
  // @ts-ignore
  private _beforeMount(): any {
    this.beforeMount();
  }
  
  // @ts-ignore
  private _mounted(): any {
    this.mounted();
  }

  private _unmounted(): any {
    queueMicrotask(() => this.unmounted());
  }

  public update(update?: any) {
    this.beforeUpdate();

    const oldElements = Array.from(this.$el.childNodes) as any;
    const rendered = _render(this.render(update)) as any;
    const newElements = Array.isArray(rendered) ? rendered : [ rendered ];
    
    newElements.forEach((child: HTMLElement) => {
      this.$el.insertBefore(child, oldElements[0]);
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

  public reactive(v: object): any {
    const proxy = (data = {}, cb?: Function) => {
      return new Proxy(data, {
        get: (obj: any, prop: any) => {
          if (prop === '_isProxy') {
            return true;
          }
  
          if ((Array.isArray(obj[prop]) || typeof obj[prop] === 'object') && !obj[prop]._isProxy) {
            obj[prop] = proxy(obj[prop], cb);
          }
          
          if (typeof obj[prop] === 'function') {
            return obj[prop]();
          } else {
            return obj[prop];
          }
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

    return proxy(v || {}, () => this.update());
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
