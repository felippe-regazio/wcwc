import { onNodeRemove } from 'nano-jsx/lib/helpers.js'
import { tick, _render } from 'nano-jsx/lib/core.js'
import { _state } from 'nano-jsx/lib/state.js'
import { defineAsCustomElements } from './expose';
import { h } from 'nano-jsx/lib/core';
import { Fragment } from 'nano-jsx/lib/fragment';

export class Component<P extends Object = any, S = any> {
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

  setState(state: S, shouldUpdate: boolean = false) {
    const isObject = typeof state === 'object' && state !== null;
    // if state is an object, we merge the objects
    if (isObject && this.state !== undefined) this.state = { ...this.state, ...state };
    // else, we just overwrite it
    else this.state = state;

    if (shouldUpdate) {
      this.update();
    }
  }

  set state(state: S) {
    _state.set(this.id, state)
  }

  get state() {
    return _state.get(this.id) as S
  }

  set initState(state: S) {
    if (this.state === undefined) {
      this.state = state
    }
  }

  /** Returns all currently rendered node elements */
  public get elements(): HTMLElement[] {
    return this._elements || []
  }

  public set elements(elements: HTMLElement[]) {
    if (!Array.isArray(elements)) {
      elements = [elements];
    }

    elements.forEach(element => {
      this._elements.push(element);
    });
  }

  private _addNodeRemoveListener() {
    // check if didUnmount is unused
    if (/^[^{]+{\s+}$/gm.test(this.didUnmount.toString())) {
      return
    }
    // listen if the root elements gets removed
    onNodeRemove(this.elements[0], () => {
      if (!this._skipUnmount) {
        this._didUnmount();
      }
    });
  }

  // @ts-ignore
  private _didMount(): any {
    this._addNodeRemoveListener();
    this.didMount();
  }

  private _willUpdate(): any {
    this.willUpdate();
  }

  private _didUpdate(): any {
    this.didUpdate();
  }

  private _didUnmount(): any {
    if (this._hasUnmounted) {
      return
    }
    
    this.didUnmount();
    this._hasUnmounted = true;
  }

  public willMount(): any {}
  public didMount(): any {}
  public willUpdate(): any {}
  public didUpdate(): any {}
  public didUnmount(): any {}
  public render(_update?: any): HTMLElement | void {}

  /** Will forceRender the component */
  public update(update?: any) {
    this._skipUnmount = true;
    this._willUpdate();
    // get all current rendered node elements
    const oldElements = [...this.elements];

    this._elements = [];

    let el = this.render(update);
    el = _render(el);
    this.elements = el as any;

    const parent = ((this.props as any).$el || oldElements[0].parentElement) as HTMLElement;

    if (!parent) {
      console.warn('NanoJSX Component needs a parent element to Update!');
    }

    // add all new node elements
    this.elements.forEach((child: HTMLElement) => {
      if (parent) parent.insertBefore(child, oldElements[0])
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
      
      if (!(this.props as any).$el || !(this.props as any).$el.isConnected) {
        this._didUnmount();
      } else {
        this._didUpdate();
      }
    })
  }

  private _getHash(): any {}
  // @ts-ignore
  public onAttrChange(name: string, oldv: any, newv: any) {}
}

export class WC extends Component {
  static h: typeof h = h;
  static f: typeof Fragment = Fragment;  
  static styles?: '*.scss'[];

  reactive(v: object): any {
    const state = (data = {}, cb?: Function) => {
      return new Proxy(data, {
        get: (obj: any, prop: any) => {
          if (prop === '_isProxy') {
            return true;
          }
  
          if ((Array.isArray(obj[prop]) || typeof obj[prop] === 'object') && !obj[prop]._isProxy) {
            obj[prop] = state(obj[prop], cb);
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

    return state(v || {}, () => this.update());
  }

  public static expose(tagname: string, options?: ComponentConfig) {
    defineAsCustomElements(this as typeof WC&Component, tagname, options);
  }
}

export const wcwc = { WC }