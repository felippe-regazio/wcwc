import { h, Fragment } from './h';
import { tick, _render } from './renderer';
import { defineAsCustomElement } from './expose';

/**
 * This class defines a Component. This is not the web component itself,
 * but the entire Component API that is used to build the whole lifecycle
 * and features to build everything that a WC can render. This will be what
 * a Vanilla Web Component will be binded too, and also defines and controls
 * all the render process, data flow and reactivity inside the web component.
 */
class Component<P extends Object = any> {
  public props: P;
  public $el: HTMLElement;
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
    tick(() => this.unmounted());
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

    this.$el.isConnected ? tick(() => this.updated()) : this._unmounted();
  }

  reactive(v: object): any {
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
  
  // @ts-ignore
  public attrChanged(name: string, oldv: any, newv: any) {}
  public beforeMount(): any {}
  public mounted(): any {}
  public unmounted(): any {}
  public beforeUpdate(): any {}
  public updated(): any {}
  public render(_update?: any): HTMLElement | void {}
}

/**
 * This is the Web Component Bridge. It has all the features of the
 * Component Class plus a public API that exposes the h (hyperscript)
 * and f (fragment) functions for JSX compiling (from TS), also holds
 * the styles registered for each component and serve the "expose" method.
 * The method is responsible to call all the funcions that will wrap our
 * classe-based components into a real Vanilla Web component and bind
 * all the data and lifecycle callbacks. We assign the { h, f } functions
 * as static methods of the WCWC because the development environment
 * can be configured to read the hypescript from this methods, so we can
 * import only one class which will automatically support JSX and all
 * the components features. The import of { WC } must be idealy deduplicated
 * using your prefered bundler. Keep in mind that everything starts on the
 * { expose } method. Its the first thing that is executed when registering
 * your component on the runtime, so if you want to understand the entire
 * compiling cycle, you must start by "expose.ts" file. The expose.ts is not
 * the index file because from a development perspective, everything starts
 * by extending this class.
 */
export class WC extends Component {
  static h: typeof h = h;
  static f: typeof Fragment = Fragment;  
  static styles?: StaticStyle[];

  public static expose(tagname: string, options?: ComponentConfig) {
    if (!window.customElements.get(tagname)) {
      defineAsCustomElement(this, tagname, options);
    }
  }
}

/**
 * This export is needed to expose the wcwc library as a public
 * global when in-browser contexts.
 */
export const wcwc = { WC };
