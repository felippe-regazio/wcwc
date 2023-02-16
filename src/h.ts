/**
 * This file is part of WCWC Component Creator. Most of the functions here were
 * originally wrote by Yannick (https://github.com/yandeu) for NanoJSX 
 * (https://nanojsx.io/). The functions are part of the JSX Engine of NanoJSX
 * and were decoupled from the original project since they were slightly modified
 * to work direct with Vanilla Web Components. Since NanoJSX is bigger then a 
 * couple functions and we need to make deep modifications on its core, it was
 * better to move the original functions directly to WCWC as a Core and not as
 * a dependency. All credits to Yannick and his awesome NanoJSX project.
 * 
 * This is our Hyperscript function, which is responsible to convert JSX calls
 * from the TS compiler to functions that manipulates and generates elements
 * directly to the DOM. This function is exposed directly on the { WC } class
 * on index.ts and its used by the TS (tsconfig) as JSX pragma. This file also
 * exposes the fragment function, which is used to generate a JSX fragment. To 
 * configure your TS to compile JSX using the WCWC pragma you must install this
 * library and add those lines on you "tsconfig.json":
 * 
 *  {
 *    "compilerOptions": {
 *       "jsx": "react",
 *       "jsxFactory": "WC.h",
 *       "jsxFragmentFactory": "WC.f"
 *    }
 *  }
 * 
 * After this, you must import the WC on your file, this will automatically enable
 * the TS to compile JSX on your component:
 * 
 * import { WC } from 'wcwc';
 * 
 * Now just write your component using JSX as you wish. All the JSX will be compiled
 * to functions that manipulates the DOM directly and are optimized to save time,
 * space and complexity. See the WCWC docs for further details.
 */
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

export const Fragment = (props: any) => {
  return props.children;
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
