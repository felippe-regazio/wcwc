declare global {
  export namespace Deno {}

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

  export var _nano: {
    document: Document
    isSSR: true | undefined
    location: { pathname: string }
    customElements: Map<string, any>
    ssrTricks: {
      isWebComponent: (tagNameOrComponent: any) => boolean
      renderWebComponent: (tagNameOrComponent: any, props: any, children: any, _render: any) => any
    }
  }
}

// This export keeps the backward compatibility with 
// the module resolution system in deno < 1.23 version.
export {}