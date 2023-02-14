import { h, Fragment } from './h';
import { defineAsCustomElement } from './expose';
import { onNodeRemove, tick, _render } from './renderer';

/**
 * This class defines a Component. This is not the web component itselft,
 * but the entire Component API that is used to build the whole lifecycle
 * and features to build everything that a WC can render. This will be what
 * a Vanilla Web Component will be binded too, and also defines and controls
 * all the render process, data flow and reactivity inside the web component.
 * 
 * This class was originally wrote by Yannick (https://github.com/yandeu) for 
 * NanoJSX class-based components (https://nanojsx.io/) and were decoupled from 
 * the original project since it was slightly modified to work direct with Vanilla 
 * Web Components and only. Since NanoJSX is bigger then a couple functions and we 
 * need to make deep modifications on its core, it was better to move the original 
 * class directly to WCWC as a Core and not as a dependency.
 */
export class Component<P extends Object = any> {
  public props: P;
  public id: string;
  public $el: HTMLElement;
  public isClass = true;
  public static isClass = true;

  private _elements: HTMLElement[] = [];
  private _skipUnmount = false;
  private _hasUnmounted = false;

  constructor(props: P) {
    this.props = props || {};
    this.$el = (props as any).$el;
    this.id = this._getHash();
  }

  /** Returns all currently rendered node elements */
  public get elements(): HTMLElement[] {
    return this._elements || []
  }

  public set elements(elements: HTMLElement[]) {
    if (!Array.isArray(elements)) {
      elements = [ elements ];
    }

    this._elements.push(...elements);
  }

  private _addNodeRemoveListener() {
    // check if unmounted is unused
    if (/^[^{]+{\s+}$/gm.test(this.unmounted.toString())) {
      return
    }

    // listen if the root elements gets removed
    onNodeRemove((this.props as any).$el || this.elements[0], () => {
      !this._skipUnmount && this._unmounted();
    });
  }

  // @ts-ignore
  private _mounted(): any {
    this._addNodeRemoveListener();
    this.mounted();
  }

  private _beforeUpdate(): any {
    this.beforeUpdate();
  }

  private _updated(): any {
    this.updated();
  }

  private _unmounted(): any {
    if (this._hasUnmounted) {
      return
    }
    
    this.unmounted();
    this._hasUnmounted = true;
  }

  /** Will forceRender the component */
  public update(update?: any) {
    this._skipUnmount = true
    this._beforeUpdate()
    
    // get all current rendered node elements
    const oldElements = [...this.elements]
    
    this._elements = []
    let el = this.render(update)
    el = _render(el)
    this.elements = el as any
    
    // get valid parent node
    const parent = oldElements[0].parentElement as HTMLElement
    
    // make sure we have a parent
    if (!parent) console.warn('Component needs a parent element to get updated!')
    
    // add all new node elements
    this.elements.forEach((child: HTMLElement) => {
      if (parent) {
        parent.insertBefore(child, oldElements[0]);
      }
    });

    // remove all elements
    oldElements.forEach((child: HTMLElement) => {
      // wee keep the element if it is the same, for example if passed as a child
      if (!this.elements.includes(child)) {
        child.remove();
        // @ts-ignore
        child = null;
      }
    });

    // listen for node removal
    this._addNodeRemoveListener();

    // @ts-ignore
    tick(() => {
      this._skipUnmount = false;
      this.elements[0].isConnected ? this._updated() : this._unmounted();
    });
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
  public onAttrChange(name: string, oldv: any, newv: any) {}
  private _getHash(): any {}
  public beforeMount(): any {}
  public mounted(): any {}
  public beforeUpdate(): any {}
  public updated(): any {}
  public unmounted(): any {}
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
