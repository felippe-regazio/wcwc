import { hNS, appendChildren } from './renderer';

declare global {
  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
    interface ElementClass {
      render: any
    }
    interface ElementChildrenAttribute {
      children: any
    }
  }
}

// https://stackoverflow.com/a/42405694/12656855
export const h = (tagNameOrComponent: any, props: any = {}, ...children: any[]) => {
  let ref: any;

  // if children is passed as props, merge with ...children
  if (props && props.children) {
    if (Array.isArray(children)) {
      if (Array.isArray(props.children)) {
        children = [...props.children, ...children];
      } else {
        children.push(props.children);
      }
    } else {
      if (Array.isArray(props.children)) {
        children = props.children;
      } else {
        children = [props.children];
      }
    }
  }

  // if tagNameOrComponent is a component
  if (typeof tagNameOrComponent !== 'string') {
    return {
      component: tagNameOrComponent, 
      props: { ...props, children: children } 
    }
  }

  const element =
    tagNameOrComponent === 'svg'
      ? hNS('svg') as SVGElement
      : document.createElement(tagNameOrComponent) as HTMLElement;

  props = parseProps(props, element);
  // these tags should not be escaped by default (in ssr)
  const escape = !(['noscript', 'script', 'style'] as any).includes(tagNameOrComponent)
  appendChildren(element, children, escape);

  if (props?.ref) {
    ref = props.ref;
  }

  if (ref) {
    ref(element);
  }

  return element as any
}

export const isEvent = (el: HTMLElement | any, p: string) => {
  // check if the event begins with 'on'
  if (0 !== p.indexOf('on')) {
    return false;
  }

  // check if the event is present in the element as object (null) or as function
  return typeof el[p] === 'object' || typeof el[p] === 'function';
};

export const dangerouslySetInnerHTML = (target: SVGElement|HTMLElement, innerHTML?: string) => {
  const fragment = Object.assign(document.createElement('fragment'), {
    innerHTML: innerHTML || ''
  });

  target.appendChild(fragment);
};

export const parseProps = (props: any, element: SVGElement|HTMLElement) => {
  for (const p in props) {
    // style object to style string
    if (p === 'style' && typeof props[p] === 'object') {
      Object.assign(element.style, props[p]);
      props[p] = element.getAttribute('style');

      continue;
    }

    // handle events
    if (isEvent(element, p.toLowerCase())) {
      element.addEventListener(p.toLowerCase().substring(2), (e: any) => props[p](e));

      continue;
    }
    
    // dangerouslySetInnerHTML
    if (p === 'dangerouslySetInnerHTML' && props[p].__html) {
      dangerouslySetInnerHTML(element, props[p].__html);

      continue;
    }
    
    // modern dangerouslySetInnerHTML
    if (p === 'innerHTML' && props[p].__dangerousHtml) {
      dangerouslySetInnerHTML(element, props[p].__dangerousHtml);

      continue;
    }
    
    // className
    if (/^className$/i.test(p)) {
      element.setAttribute('class', props[p]);

      continue;
    }

    // setAttribute
    if (typeof props[p] !== 'undefined') {
      element.setAttribute(p, props[p])

      continue;
    }
  }

  return props;
}