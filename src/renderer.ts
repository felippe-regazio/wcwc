/** Creates a new Microtask using Promise() */
export const tick = Promise.prototype.then.bind(Promise.resolve()) as (cb: Function) => any;

export interface FC<P = {}> {
  (props: P): Element | void
}

export const Fragment = (props: any) => {
  return props.children;
}

export const removeAllChildNodes = (parent: HTMLElement) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// https://stackoverflow.com/a/7616484/12656855
export const strToHash = (s: string) => {
  let hash = 0;

  for (let i = 0; i < s.length; i++) {
    const chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return Math.abs(hash).toString(32);
}

export const appendChildren = (element: HTMLElement | SVGElement, children: HTMLElement[], escape = true) => {
  // if the child is an html element
  if (!Array.isArray(children)) {
    appendChildren(element, [ children ], escape);
    return;
  }

  // htmlCollection to array
  if (typeof children === 'object') {
    children = Array.prototype.slice.call(children);
  }

  children.forEach(child => {
    if (Array.isArray(child)) {
      // if child is an array of children, append them instead
      appendChildren(element, child, escape);
    } else {
      // render the component
      const c = _render(child) as HTMLElement;

      if (typeof c !== 'undefined') {
        if (Array.isArray(c)) {
          // if c is an array of children, append them instead
          appendChildren(element, c, escape);
        } else {
          // apply the component to parent element
          element.appendChild(c.nodeType == null ? document.createTextNode(c.toString()) : c)
        }
      }
    }
  });
}

export const hNS = (tag: string) => {
  return document.createElementNS('http://www.w3.org/2000/svg', tag) as SVGElement;
}

/**
 * A simple component for rendering SVGs
 */
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

/** Returns the populated parent if available else  one child or an array of children */
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

    // if parent and child are the same, we replace the parent instead of appending to it
    if (el && parent.id && parent.id === el.id && parent.parentElement) {
      parent.parentElement.replaceChild(el, parent)
    } else {
      // append element(s) to the parent
      if (Array.isArray(el)) {
        el.forEach((e: any) => {
          appendChildren(parent, _render(e))
        });
      } else {
        appendChildren(parent, _render(el));
      }
    }

    return parent;
  } else {
    // returning one child or an array of children
    return el;
  }
}

export const _render = (comp: any): any => {
  // null, false, undefined
  if (comp === null || comp === false || typeof comp === 'undefined') return []

  // string, number
  if (typeof comp === 'string' || typeof comp === 'number') return comp.toString()

  // SVGElement
  if (comp.tagName && comp.tagName.toLowerCase() === 'svg') return SVG({ children: [comp] })

  // HTMLElement
  if (comp.tagName) return comp

  // TEXTNode (Node.TEXT_NODE === 3)
  if (comp && comp.nodeType === 3) return comp

  // Class Component
  if (comp && comp.component && comp.component.isClass) return renderClassComponent(comp)

  // Class Component (Uninitialized)
  if (comp.isClass) return renderClassComponent({ component: comp, props: {} })

  // Functional Component
  if (comp.component && typeof comp.component === 'function') return renderFunctionalComponent(comp)

  // Array (render each child and return the array) (is probably a fragment)
  if (Array.isArray(comp)) return (comp.map(c => _render(c)) as any).flat()

  // function
  if (typeof comp === 'function' && !comp.isClass) return _render(comp())

  // if component is a HTMLElement (rare case)
  if (comp.component && comp.component.tagName && typeof comp.component.tagName === 'string')
    return _render(comp.component)

  // (rare case)
  if (Array.isArray(comp.component)) return _render(comp.component)

  // (rare case)
  if (comp.component) return _render(comp.component)

  // object
  if (typeof comp === 'object') return []

  console.trace('Something unexpected happened while trying to create Inner Element: ', comp);
}

export const renderFunctionalComponent = (fncComp: any): any => {
  const { component, props } = fncComp;

  return _render(component(props));
}

export const renderClassComponent = (classComp: any): any => {
  const { component, props } = classComp;

  // calc hash
  const hash = strToHash(component.toString());

  // make hash accessible in constructor, without passing it to it
  component.prototype._getHash = () => hash;

  const Component = new component(props);
  Component.willMount();

  let el = Component.render();
  el = _render(el);
  Component.elements = el;

  // pass the component instance as ref
  if (props && props.ref) {
    props.ref(Component);
  }

  tick(() => {
    Component._didMount();
  });

  return el;
}