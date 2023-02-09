import { onNodeRemove } from 'nano-jsx/lib/helpers.js'
import { tick, _render } from './renderer'

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

    // clear
    this._elements = []

    let el = this.render(update)
    el = _render(el)
    this.elements = el as any

    // console.log('old: ', oldElements)
    // console.log('new: ', this.elements)

    // get valid parent node
    const parent = oldElements[0].parentElement as HTMLElement

    // make sure we have a parent
    if (!parent) console.warn('Component needs a parent element to get updated!')

    // add all new node elements
    this.elements.forEach((child: HTMLElement) => {
      if (parent) parent.insertBefore(child, oldElements[0])
    })

    // remove all elements
    oldElements.forEach((child: HTMLElement) => {
      // wee keep the element if it is the same, for example if passed as a child
      if (!this.elements.includes(child)) {
        child.remove()
        // @ts-ignore
        child = null
      }
    })

    // listen for node removal
    this._addNodeRemoveListener()

    // @ts-ignore
    tick(() => {
      this._skipUnmount = false
      if (!this.elements[0].isConnected) this._unmounted()
      else this._updated()
    })
  }

  private _getHash(): any {}
  public beforeMount(): any {}
  public mounted(): any {}
  public beforeUpdate(): any {}
  public updated(): any {}
  public unmounted(): any {}
  public render(_update?: any): HTMLElement | void {}
  // @ts-ignore
  public onAttrChange(name: string, oldv: any, newv: any) {}
}