// https://stackoverflow.com/a/6234804
export const escapeHtml = (unsafe: string) => {
  if (unsafe && typeof unsafe === 'string')
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  return unsafe
}

export class HTMLElementSSR {
  public tagName: string
  public isSelfClosing: boolean = false
  public nodeType: null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 = null
  private _ssr: string

  constructor(tag: string) {
    this.tagName = tag

    const selfClosing = [
      'area',
      'base',
      'br',
      'col',
      'embed',
      'hr',
      'img',
      'input',
      'link',
      'meta',
      'param',
      'source',
      'track',
      'wbr'
    ]

    this.nodeType = 1

    if (selfClosing.indexOf(tag) >= 0) {
      this._ssr = `<${tag} />`
      this.isSelfClosing = true
    } else {
      this._ssr = `<${tag}></${tag}>`
    }
  }

  get outerHTML() {
    return this.toString()
  }

  get innerHTML(): string {
    return this.innerText
  }

  set innerHTML(text) {
    this.innerText = text
  }

  get innerText(): string {
    const reg = /(^<[^>]+>)(.+)?(<\/[a-z0-9]+>$|\/>$)/gm
    return reg.exec(this._ssr)?.[2] || ''
  }

  set innerText(text) {
    const reg = /(^<[^>]+>)(.+)?(<\/[a-z0-9]+>$|\/>$)/gm
    const replacer = (_match: string, p1: string, _p2: string, p3: string) => [p1, text, p3].join('')
    this._ssr = this._ssr.replace(reg, replacer)
  }

  getAttribute(_name: any) {
    return null
  }

  get classList() {
    const element = this._ssr

    const classesRegex = /^<\w+.+(\sclass=")([^"]+)"/gm

    return {
      add: (name: string) => {
        this.setAttribute('class', name)
      },
      entries: {
        get length(): number {
          const classes = classesRegex.exec(element)
          if (classes && classes[2]) return classes[2].split(' ').length
          return 0
        }
      }
    }
  }

  toString() {
    return this._ssr
  }

  setAttributeNS(_namespace: string | null, name: string, value: string) {
    this.setAttribute(name, value)
  }

  setAttribute(name: string, value: string) {
    const replacer1 = (_match: string, p1: string, p2: string) =>
      `${p1}${escapeHtml(name)}="${escapeHtml(value)}" ${p2}`
    const replacer2 = (_match: string, p1: string, p2: string) =>
      `${p1} ${escapeHtml(name)}="${escapeHtml(value)}"${p2}`

    if (this.isSelfClosing) this._ssr = this._ssr.replace(/(^<[a-z0-9]+ )(.+)/gm, replacer1)
    else this._ssr = this._ssr.replace(/(^<[^>]+)(.+)/gm, replacer2)
  }

  append(child: any) {
    this.appendChild(child)
  }

  appendChild(child: any) {
    const index = this._ssr.lastIndexOf('</')
    this._ssr = this._ssr.substring(0, index) + child + this._ssr.substring(index)
  }

  get children() {
    const reg = /<([a-z0-9]+)((?!<\/\1).)*<\/\1>/gms
    const array = []
    let match

    while ((match = reg.exec(this.innerHTML)) !== null) {
      array.push(match[0].replace(/[\s]+/gm, ' '))
    }

    return array
  }

  addEventListener<K extends keyof DocumentEventMap>(
    _type: keyof K,
    _listener: (this: Document, ev: DocumentEventMap[K]) => any,
    _options?: boolean | AddEventListenerOptions | undefined
  ) {}
}

export class DocumentSSR {
  body: HTMLElement
  head: HTMLElement

  constructor() {
    this.body = this.createElement('body')
    this.head = this.createElement('head')
  }

  createElement(tag: string) {
    return new HTMLElementSSR(tag) as unknown as HTMLElement
  }

  createElementNS(_URI: string, tag: string) {
    return this.createElement(tag)
  }

  createTextNode(text: string) {
    return escapeHtml(text)
  }

  querySelector(_query: string) {
    return undefined
  }
}

const documentSSR = () => {
  return new DocumentSSR() as unknown as Document
}

export { documentSSR }