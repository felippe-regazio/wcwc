import { onNodeRemove } from 'nano-jsx/lib/helpers.js'
import { tick, _render } from '.'

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
    // check if didUnmount is unused
    if (/^[^{]+{\s+}$/gm.test(this.didUnmount.toString())) {
      return
    }

    // listen if the root elements gets removed
    onNodeRemove((this.props as any).$el || this.elements[0], () => {
      !this._skipUnmount && this._didUnmount();
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
    this._skipUnmount = true
    this._willUpdate()
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
      if (!this.elements[0].isConnected) this._didUnmount()
      else this._didUpdate()
    })
  }

  private _getHash(): any {}
  // @ts-ignore
  public onAttrChange(name: string, oldv: any, newv: any) {}
}