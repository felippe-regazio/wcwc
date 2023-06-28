/**
 * The functions in this files are used by the lifecycle management and the
 * hyperscript compilation (JSX) to render the elements at runtime. There is no
 * Virtual DOM, all the element lifecycle, state, render and children management
 * is meant to be generated directly in the DOM. There is a LOT of optimization
 * on this functions in comparing to original ones because our context is way
 * smaller than what the NanoJSX framework does. If you are willing to understand
 * this file you should starting by the render and _render functions. They are
 * responsible to link the component current state as a DOM output.
 */
export const removeAllChildNodes = (parent: HTMLElement) => {
  let child: ChildNode|null;

  while (child = parent?.lastChild) {
    parent.removeChild(child);
  }
}

export const appendChildren = (parent: HTMLElement|SVGElement, children: HTMLElement|HTMLElement[]) => {
  if (Array.isArray(children)) {
    children.forEach((nestedChild) => appendChildren(parent, nestedChild));

    return;
  }

  const element: HTMLElement = _render(children);

  if (!element) {
    return;
  }

  if (Array.isArray(element)) {
    appendChildren(parent, element);

    return;
  }

  parent.appendChild(element.nodeType ? element : document.createTextNode(element as unknown as string))
}

export const hNS = (tag: string) => {
  return document.createElementNS('http://www.w3.org/2000/svg', tag) as SVGElement;
}

export const SVG = (props: any) => {
  const child = props.children[0] as SVGElement;
  const attrs = child.attributes;
  const svg = hNS('svg') as SVGElement;

  for (let i = attrs.length - 1; i >= 0; i--) {
    svg.setAttribute(attrs[i].name, attrs[i].value);
  }

  svg.innerHTML = child.innerHTML;
  return svg as SVGSVGElement
}

export const render = (component: any, parent: HTMLElement | null = null, removeChildNodes = true) => {
  let el = _render(component);

  if (Array.isArray(el)) {
    el = el.map(e => _render(e));

    if (el.length === 1) {
      el = el[0];
    }
  }

  if (parent) {
    if (removeChildNodes) {
      removeAllChildNodes(parent);
    }

    if (el && parent.id && parent.id === el.id && parent.parentElement) {
      parent.parentElement.replaceChild(el, parent);
    } else {
      appendChildren(parent, el);
    }

    return parent;
  } else {
    return el;
  }
}

export const _render = (comp: any): any => {
  // null, false, undefined
  if (comp === null || comp === false || typeof comp === 'undefined') return []

  // string, number
  if (typeof comp === 'string' || typeof comp === 'number') return document.createTextNode(String(comp))

  // SVGElement
  if (comp.tagName && comp.tagName.toLowerCase() === 'svg') return SVG({ children: [comp] })

  // HTMLElement
  if (comp.tagName) return comp

  // TEXTNode (Node.TEXT_NODE === 3)
  if (comp && comp.splitText) return comp

  // Class Component
  if (comp && comp.component && comp.component.isWCWCClass) return renderClassComponent(comp)

  // Class Component (Uninitialized)
  if (comp.isWCWCClass) return renderClassComponent({ component: comp, props: {} })

  // Array (render each child and return the array) (is probably a fragment)
  if (Array.isArray(comp)) return (comp.map(c => _render(c)) as any).flat()

  // function
  if (typeof comp === 'function' && !comp.isWCWCClass) return _render(comp())

  // if component is a HTMLElement (rare case)
  if (comp.component && comp.component.tagName && typeof comp.component.tagName === 'string')
    return _render(comp.component)

  // (rare case)
  if (Array.isArray(comp.component)) return _render(comp.component)

  // (rare case)
  if (comp.component) return _render(comp.component)

  // object
  if (typeof comp === 'object') return []

  // failed
  console.trace('Something unexpected happened while trying to create Inner Element: ', comp);
}

export const renderClassComponent = (classComp: any): any => {
  const { component: Component, props } = classComp;
  const component = new Component(props);
  const rendered = _render(component.render());

  if (props && props.ref) {
    props.ref(component);
  }

  return rendered;
}
