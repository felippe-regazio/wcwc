(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/expose.tsx":
/*!************************!*\
  !*** ./src/expose.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WC_REGISTERED_STYLES": () => (/* binding */ WC_REGISTERED_STYLES),
/* harmony export */   "defineAsCustomElements": () => (/* binding */ defineAsCustomElements)
/* harmony export */ });
/* harmony import */ var nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-jsx/lib/core */ "./node_modules/nano-jsx/lib/core.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const WC_REGISTERED_STYLES = {};
const defineAsCustomElementsSSR = (component, componentName, _options = {}) => {
    (!/^[a-zA-Z0-9]+-[a-zA-Z0-9]+$/.test(componentName)) ?
        console.log(`Error: WebComponent name "${componentName}" is invalid.`)
        : _nano.customElements.set(componentName, component);
};
const defineAsCustomElements = function (component, componentName, shadow) {
    if ((0,nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_0__.isSSR)()) {
        defineAsCustomElementsSSR(component, componentName);
        return;
    }
    customElements.define(componentName, class extends HTMLElement {
        constructor() {
            super();
            this.addStaticStyles(component.styles).catch(console.error);
            this.$root = this.root();
            const el = this.buildEl((0,nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_0__._render)({
                component,
                props: Object.assign({ ref: (r) => (this.nanoComponentRef = r), children: Array.from(this.childNodes).map(c => (0,nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_0__.render)(c)) }, (this.getInitialProps() || {}))
            }));
            this.appendEl(el);
        }
        static get observedAttributes() {
            return component.attrs;
        }
        root() {
            if (shadow) {
                this.attachShadow(shadow);
                return this.shadowRoot;
            }
            else {
                return this;
            }
        }
        getInitialProps() {
            return (component.attrs || []).reduce((acc, attr) => {
                if (this.hasAttribute(attr)) {
                    acc[attr] = this.getAttribute(attr);
                }
                return acc;
            }, {});
        }
        buildEl(contents) {
            return (0,nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_0__.h)(!!this.shadowRoot ? 'div' : 'template', null, contents);
        }
        appendEl(el) {
            if (!!this.shadowRoot) {
                el.dataset.wcRoot = true;
                this.$root.append(el);
            }
            else {
                this.$root.append(...el.childNodes);
            }
        }
        attributeChangedCallback(name, _, newValue) {
            this.nanoComponentRef.props[name] = newValue;
            this.nanoComponentRef.update();
        }
        addStaticStyles(styles) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (typeof window === 'undefined') {
                        return false;
                    }
                    if ((styles && styles.length) && (this.shadowRoot || !WC_REGISTERED_STYLES[this.tagName])) {
                        const styleRoot = this.shadowRoot ? this.$root : window.document ? (((_a = window.document) === null || _a === void 0 ? void 0 : _a.head) || ((_b = window.document) === null || _b === void 0 ? void 0 : _b.body)) : this;
                        const style = (styles && styles.map((s) => s.toString()).join('') || '').trim();
                        if (style) {
                            const styleElement = Object.assign(document.createElement('style'), {
                                textContent: style
                            });
                            styleElement.dataset.target = this.tagName.toLowerCase();
                            styleRoot === null || styleRoot === void 0 ? void 0 : styleRoot.append(styleElement);
                            if (!this.shadowRoot) {
                                WC_REGISTERED_STYLES[this.tagName] = style;
                            }
                        }
                    }
                    return Promise.resolve(true);
                }
                catch (error) {
                    return Promise.reject(error);
                }
            });
        }
    });
};


/***/ }),

/***/ "./node_modules/nano-jsx/lib/component.js":
/*!************************************************!*\
  !*** ./node_modules/nano-jsx/lib/component.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Component = void 0;
const helpers_js_1 = __webpack_require__(/*! ./helpers.js */ "./node_modules/nano-jsx/lib/helpers.js");
const core_js_1 = __webpack_require__(/*! ./core.js */ "./node_modules/nano-jsx/lib/core.js");
const state_js_1 = __webpack_require__(/*! ./state.js */ "./node_modules/nano-jsx/lib/state.js");
class Component {
    constructor(props) {
        this._elements = [];
        this._skipUnmount = false;
        this._hasUnmounted = false;
        this.props = props || {};
        this.id = this._getHash();
    }
    static get isClass() {
        return true;
    }
    get isClass() {
        return true;
    }
    setState(state, shouldUpdate = false) {
        const isObject = typeof state === 'object' && state !== null;
        // if state is an object, we merge the objects
        if (isObject && this.state !== undefined)
            this.state = Object.assign(Object.assign({}, this.state), state);
        // else, we just overwrite it
        else
            this.state = state;
        if (shouldUpdate)
            this.update();
    }
    set state(state) {
        state_js_1._state.set(this.id, state);
    }
    get state() {
        return state_js_1._state.get(this.id);
    }
    set initState(state) {
        if (this.state === undefined)
            this.state = state;
    }
    /** Returns all currently rendered node elements */
    get elements() {
        return this._elements || [];
    }
    set elements(elements) {
        if (!Array.isArray(elements))
            elements = [elements];
        elements.forEach(element => {
            this._elements.push(element);
        });
    }
    _addNodeRemoveListener() {
        // check if didUnmount is unused
        if (/^[^{]+{\s+}$/gm.test(this.didUnmount.toString()))
            return;
        // listen if the root elements gets removed
        (0, helpers_js_1.onNodeRemove)(this.elements[0], () => {
            if (!this._skipUnmount)
                this._didUnmount();
        });
    }
    // @ts-ignore
    _didMount() {
        this._addNodeRemoveListener();
        this.didMount();
    }
    _willUpdate() {
        this.willUpdate();
    }
    _didUpdate() {
        this.didUpdate();
    }
    _didUnmount() {
        if (this._hasUnmounted)
            return;
        this.didUnmount();
        this._hasUnmounted = true;
    }
    willMount() { }
    didMount() { }
    willUpdate() { }
    didUpdate() { }
    didUnmount() { }
    render(_update) { }
    /** Will forceRender the component */
    update(update) {
        this._skipUnmount = true;
        this._willUpdate();
        // get all current rendered node elements
        const oldElements = [...this.elements];
        // clear
        this._elements = [];
        let el = this.render(update);
        el = (0, core_js_1._render)(el);
        this.elements = el;
        // console.log('old: ', oldElements)
        // console.log('new: ', this.elements)
        // get valid parent node
        const parent = oldElements[0].parentElement;
        // make sure we have a parent
        if (!parent)
            console.warn('Component needs a parent element to get updated!');
        // add all new node elements
        this.elements.forEach((child) => {
            if (parent)
                parent.insertBefore(child, oldElements[0]);
        });
        // remove all elements
        oldElements.forEach((child) => {
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
        (0, core_js_1.tick)(() => {
            this._skipUnmount = false;
            if (!this.elements[0].isConnected)
                this._didUnmount();
            else
                this._didUpdate();
        });
    }
    _getHash() { }
}
exports.Component = Component;
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/components/helmet.js":
/*!********************************************************!*\
  !*** ./node_modules/nano-jsx/lib/components/helmet.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Helmet = void 0;
const component_js_1 = __webpack_require__(/*! ../component.js */ "./node_modules/nano-jsx/lib/component.js");
const core_js_1 = __webpack_require__(/*! ../core.js */ "./node_modules/nano-jsx/lib/core.js");
class Attributes extends Map {
    toString() {
        let string = '';
        for (const [key, value] of this)
            string += ` ${key}="${value}"`;
        return string.trim();
    }
}
class Helmet extends component_js_1.Component {
    static SSR(body) {
        var _a, _b;
        const reg = /(<helmet\b[^>]*>)((.|\r|\n)*?)(<\/helmet>)/gm;
        // collect all elements
        const head = [];
        const footer = [];
        const attributes = {
            html: new Attributes(),
            body: new Attributes()
        };
        // get what's in the head
        if (typeof document !== 'undefined' && document.head) {
            let children = [];
            children = [].slice.call(document.head.children);
            for (let i = 0; i < children.length; i++) {
                // check if the same element already exists
                if (head.indexOf(children[i]) === -1) {
                    head.push(children[i]);
                }
            }
        }
        let result;
        while ((result = reg.exec(body)) !== null) {
            const first = result[1];
            let second = result[2];
            const regHTML = /<html\s([^>]+)><\/html>/gm;
            const regBody = /<body\s([^>]+)><\/body>/gm;
            const regAttr = /(\w+)="([^"]+)"/gm;
            let res = null;
            // extract html attributes
            (_a = body.match(regHTML)) === null || _a === void 0 ? void 0 : _a.forEach(h => {
                second = second.replace(h, '');
                while ((res = regAttr.exec(h)) !== null) {
                    attributes.html.set(res[1], res[2]);
                }
            });
            // extract body attributes
            (_b = body.match(regBody)) === null || _b === void 0 ? void 0 : _b.forEach(b => {
                second = second.replace(b, '');
                while ((res = regAttr.exec(b)) !== null) {
                    attributes.body.set(res[1], res[2]);
                }
            });
            const toHead = first.includes('data-placement="head"');
            // do not add an element if it already exists
            if (toHead && !head.includes(second))
                head.push(second);
            else if (!toHead && !footer.includes(second))
                footer.push(second);
        }
        // clean the body from all matches
        const cleanBody = body.replace(reg, '');
        return {
            body: cleanBody,
            head: head,
            footer: footer,
            attributes
        };
    }
    didMount() {
        this.props.children.forEach((element) => {
            var _a, _b, _c, _d;
            // return if it is not an html element
            if (!(element instanceof HTMLElement))
                return;
            const parent = this.props.footer ? document.body : document.head;
            const tag = element.tagName;
            let attrs = [];
            // get the inner text
            attrs.push(element.innerText);
            // get all attributes
            for (let attr = 0; attr < element.attributes.length; attr++) {
                attrs.push((_a = element.attributes.item(attr)) === null || _a === void 0 ? void 0 : _a.name.toLowerCase());
                attrs.push((_b = element.attributes.item(attr)) === null || _b === void 0 ? void 0 : _b.value.toLowerCase());
            }
            // handle special tags
            if (tag === 'HTML' || tag === 'BODY') {
                const htmlTag = document.getElementsByTagName(tag)[0];
                for (let attr = 1; attr < attrs.length; attr += 2) {
                    htmlTag.setAttribute(attrs[attr], attrs[attr + 1]);
                }
                return;
            }
            else if (tag === 'TITLE') {
                const titleTags = document.getElementsByTagName('TITLE');
                if (titleTags.length > 0) {
                    const e = element;
                    titleTags[0].text = e.text;
                }
                else {
                    const titleTag = (0, core_js_1.h)('title', null, element.innerHTML);
                    (0, core_js_1.appendChildren)(parent, [titleTag], false);
                }
                return;
            }
            // check if the element already exists
            let exists = false;
            attrs = attrs.sort();
            const el = document.getElementsByTagName(tag);
            for (let i = 0; i < el.length; i++) {
                let attrs2 = [];
                // get the inner text
                attrs2.push(el[i].innerText);
                for (let attr = 0; attr < el[i].attributes.length; attr++) {
                    attrs2.push((_c = el[i].attributes.item(attr)) === null || _c === void 0 ? void 0 : _c.name.toLowerCase());
                    attrs2.push((_d = el[i].attributes.item(attr)) === null || _d === void 0 ? void 0 : _d.value.toLowerCase());
                }
                attrs2 = attrs2.sort();
                if (attrs.length > 0 && attrs2.length > 0 && JSON.stringify(attrs) === JSON.stringify(attrs2))
                    exists = true;
            }
            // add to dom
            if (!exists)
                (0, core_js_1.appendChildren)(parent, [element], false);
        });
    }
    render() {
        const placement = this.props.footer ? 'footer' : 'head';
        if ((0, core_js_1.isSSR)())
            return (0, core_js_1.h)('helmet', { 'data-ssr': true, 'data-placement': placement }, this.props.children);
        else
            return [];
    }
}
exports.Helmet = Helmet;
//# sourceMappingURL=helmet.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/components/img.js":
/*!*****************************************************!*\
  !*** ./node_modules/nano-jsx/lib/components/img.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Img = void 0;
const component_js_1 = __webpack_require__(/*! ../component.js */ "./node_modules/nano-jsx/lib/component.js");
const core_js_1 = __webpack_require__(/*! ../core.js */ "./node_modules/nano-jsx/lib/core.js");
/**
 * A useful Image component
 * Add <Img lazy ..., to lazy load the img source
 * Add <Img width="100" height="100" ..., to specify img element's size.
 * Add <Img placeholder="src or element" ...., to prepare placeholder for img.
 */
class Img extends component_js_1.Component {
    constructor(props) {
        super(props);
        const { src, key } = props;
        // id has to be unique
        this.id = `${(0, core_js_1.strToHash)(src)}-${(0, core_js_1.strToHash)(JSON.stringify(props))}`;
        if (key)
            this.id += `key-${key}`;
        // this could also be done in willMount()
        if (!this.state)
            this.setState({ isLoaded: false, image: undefined });
    }
    didMount() {
        const _a = this.props, { lazy = true, placeholder, children, key, ref } = _a, rest = __rest(_a, ["lazy", "placeholder", "children", "key", "ref"]);
        if (typeof lazy === 'boolean' && lazy === false)
            return;
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    this.state.image = (0, core_js_1.h)('img', Object.assign({}, rest));
                    if (this.state.image.complete) {
                        this.state.isLoaded = true;
                        this.update();
                    }
                    else {
                        this.state.image.onload = () => {
                            this.state.isLoaded = true;
                            this.update();
                        };
                    }
                }
            });
        }, { threshold: [0, 1] });
        observer.observe(this.elements[0]);
    }
    render() {
        const _a = this.props, { src, placeholder, children, lazy = true, key, ref } = _a, rest = __rest(_a, ["src", "placeholder", "children", "lazy", "key", "ref"]);
        // return the img tag if not lazy loaded
        if (typeof lazy === 'boolean' && lazy === false) {
            this.state.image = (0, core_js_1.h)('img', Object.assign({ src }, rest));
            return this.state.image;
        }
        // if it is visible and loaded, show the image
        if (this.state.isLoaded) {
            return this.state.image;
            // if the placeholder is an image src
        }
        else if (placeholder && typeof placeholder === 'string') {
            return (0, core_js_1.h)('img', Object.assign({ src: placeholder }, rest));
            // if the placeholder is an JSX element
        }
        else if (placeholder && typeof placeholder === 'function') {
            return placeholder();
        }
        else {
            // render a simple box
            const style = {};
            if (rest.width)
                style.width = `${rest.width}px`;
            if (rest.height)
                style.height = `${rest.height}px`;
            const { width, height } = rest, others = __rest(rest, ["width", "height"]);
            return (0, core_js_1.h)('div', Object.assign({ style }, others));
        }
    }
}
exports.Img = Img;
//# sourceMappingURL=img.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/components/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/nano-jsx/lib/components/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Visible = exports.Suspense = exports.Router = exports.Link = exports.Img = exports.Helmet = void 0;
var helmet_js_1 = __webpack_require__(/*! ./helmet.js */ "./node_modules/nano-jsx/lib/components/helmet.js");
Object.defineProperty(exports, "Helmet", ({ enumerable: true, get: function () { return helmet_js_1.Helmet; } }));
var img_js_1 = __webpack_require__(/*! ./img.js */ "./node_modules/nano-jsx/lib/components/img.js");
Object.defineProperty(exports, "Img", ({ enumerable: true, get: function () { return img_js_1.Img; } }));
var link_js_1 = __webpack_require__(/*! ./link.js */ "./node_modules/nano-jsx/lib/components/link.js");
Object.defineProperty(exports, "Link", ({ enumerable: true, get: function () { return link_js_1.Link; } }));
exports.Router = __importStar(__webpack_require__(/*! ./router.js */ "./node_modules/nano-jsx/lib/components/router.js"));
var suspense_js_1 = __webpack_require__(/*! ./suspense.js */ "./node_modules/nano-jsx/lib/components/suspense.js");
Object.defineProperty(exports, "Suspense", ({ enumerable: true, get: function () { return suspense_js_1.Suspense; } }));
var visible_js_1 = __webpack_require__(/*! ./visible.js */ "./node_modules/nano-jsx/lib/components/visible.js");
Object.defineProperty(exports, "Visible", ({ enumerable: true, get: function () { return visible_js_1.Visible; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/components/link.js":
/*!******************************************************!*\
  !*** ./node_modules/nano-jsx/lib/components/link.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Link = void 0;
const component_js_1 = __webpack_require__(/*! ../component.js */ "./node_modules/nano-jsx/lib/component.js");
const helmet_js_1 = __webpack_require__(/*! ./helmet.js */ "./node_modules/nano-jsx/lib/components/helmet.js");
const core_js_1 = __webpack_require__(/*! ../core.js */ "./node_modules/nano-jsx/lib/core.js");
const fragment_js_1 = __webpack_require__(/*! ../fragment.js */ "./node_modules/nano-jsx/lib/fragment.js");
/**
 * A simple Link component
 * Add <Link prefetch ..., to prefetch the html document
 * Add <Link prefetch="hover" ..., to prefetch the html document on hovering over the link element.
 */
class Link extends component_js_1.Component {
    prefetchOnHover() {
        this.elements[0].addEventListener('mouseover', () => this.addPrefetch(), { once: true });
    }
    prefetchOnVisible() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    this.addPrefetch();
                }
            });
        }, { threshold: [0, 1] });
        observer.observe(this.elements[0]);
    }
    addPrefetch() {
        let doesAlreadyExist = false;
        // check if it is already on the dom
        const links = document.getElementsByTagName('link');
        for (let i = 0; i < links.length; i++) {
            // if it is not already on the dom, add it
            if (links[i].getAttribute('rel') === 'prefetch' && links[i].getAttribute('href') === this.props.href) {
                doesAlreadyExist = true;
            }
        }
        if (!doesAlreadyExist) {
            const prefetch = (0, core_js_1.h)('link', { rel: 'prefetch', href: this.props.href, as: 'document' });
            document.head.appendChild(prefetch);
        }
    }
    didMount() {
        const { href, prefetch, delay = 0, back = false } = this.props;
        if (back)
            this.elements[0].addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target;
                if (target.href === document.referrer)
                    window.history.back();
                else
                    window.location.href = target.href;
            });
        if (delay > 0)
            this.elements[0].addEventListener('click', (e) => {
                e.preventDefault();
                setTimeout(() => (window.location.href = href), delay);
            });
        if (prefetch) {
            if (prefetch === 'hover')
                this.prefetchOnHover();
            else if (prefetch === 'visible')
                this.prefetchOnVisible();
            else
                this.addPrefetch();
        }
    }
    render() {
        // separate children and prefetch from props
        const _a = this.props, { children, prefetch, back, ref } = _a, rest = __rest(_a, ["children", "prefetch", "back", "ref"]);
        // some warning messages
        if (!this.props.href)
            console.warn('Please add "href" to <Link>');
        if (children.length !== 1)
            console.warn('Please add ONE child to <Link> (<Link>child</Link>)');
        const a = (0, core_js_1.h)('a', Object.assign({}, rest), ...children);
        // if ssr
        if (prefetch === true && !(typeof window !== 'undefined' && window.document)) {
            // <link rel="prefetch" href="/index.html" as="document"></link>
            const link = (0, core_js_1.h)('link', { rel: 'prefetch', href: this.props.href, as: 'document' });
            const helmet = (0, core_js_1.h)(helmet_js_1.Helmet, null, link);
            return (0, core_js_1.h)(fragment_js_1.Fragment, null, [helmet, a]);
        }
        // if not ssr
        else {
            return a;
        }
    }
}
exports.Link = Link;
//# sourceMappingURL=link.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/components/router.js":
/*!********************************************************!*\
  !*** ./node_modules/nano-jsx/lib/components/router.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// inspired by https://codesandbox.io/s/build-own-react-router-v4-mpslz
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseParamsFromPath = exports.Listener = exports.Link = exports.to = exports.Route = exports.Routes = exports.Switch = exports.matchPath = void 0;
const component_js_1 = __webpack_require__(/*! ../component.js */ "./node_modules/nano-jsx/lib/component.js");
const core_js_1 = __webpack_require__(/*! ../core.js */ "./node_modules/nano-jsx/lib/core.js");
const instances = [];
const register = (comp) => instances.push(comp);
const unregister = (comp) => instances.splice(instances.indexOf(comp), 1);
const historyPush = (path) => {
    window.history.pushState({}, '', path);
    instances.forEach(instance => instance.handleChanges());
    window.dispatchEvent(new Event('pushstate'));
};
const historyReplace = (path) => {
    window.history.replaceState({}, '', path);
    instances.forEach(instance => instance.handleChanges());
    window.dispatchEvent(new Event('replacestate'));
};
const matchPath = (pathname, options) => {
    const { exact = false, regex } = options;
    let { path } = options;
    if (!path) {
        return {
            path: null,
            url: pathname,
            isExact: true,
            params: {}
        };
    }
    let match;
    let params = {};
    // path with params
    if (path.includes('/:')) {
        const pathArr = path.split('/');
        const pathnameArr = pathname.split('/');
        pathArr.forEach((p, i) => {
            if (/^:/.test(p)) {
                const key = p.slice(1);
                const value = pathnameArr[i];
                // if a regex is provided, check it it matches
                if (regex && regex[key]) {
                    const regexMatch = regex[key].test(value);
                    if (!regexMatch)
                        return null;
                }
                params = Object.assign(Object.assign({}, params), { [key]: value });
                pathArr[i] = pathnameArr[i];
            }
        });
        path = pathArr.join('/');
    }
    // catch all
    if (path === '*')
        match = [pathname];
    // regular path
    if (!match)
        match = new RegExp(`^${path}`).exec(pathname);
    if (!match)
        return null;
    const url = match[0];
    const isExact = pathname === url;
    if (exact && !isExact)
        return null;
    return {
        path,
        url,
        isExact,
        params
    };
};
exports.matchPath = matchPath;
class Switch extends component_js_1.Component {
    constructor() {
        super(...arguments);
        this.index = 0;
        this.path = '';
        this.match = { index: -1, path: '' };
    }
    didMount() {
        window.addEventListener('popstate', this.handleChanges.bind(this));
        register(this);
    }
    didUnmount() {
        window.removeEventListener('popstate', this.handleChanges.bind(this));
        unregister(this);
    }
    handleChanges() {
        this.findChild();
        if (this.shouldUpdate())
            this.update();
    }
    findChild() {
        this.match = { index: -1, path: '' };
        // flatten children
        this.props.children = this.props.children.flat();
        for (let i = 0; i < this.props.children.length; i++) {
            const child = this.props.children[i];
            const { path, exact, regex } = child.props;
            const match = (0, exports.matchPath)((0, core_js_1.isSSR)() ? _nano.location.pathname : window.location.pathname, {
                path,
                exact,
                regex
            });
            if (match) {
                this.match.index = i;
                this.match.path = path;
                return;
            }
        }
    }
    shouldUpdate() {
        return this.path !== this.match.path || this.index !== this.match.index;
    }
    render() {
        this.findChild();
        const child = this.props.children[this.match.index];
        if (this.match.index === -1) {
            this.path = '';
            this.index = 0;
        }
        if (child) {
            const { path } = child.props;
            this.path = path;
            this.index = this.match.index;
            const el = (0, core_js_1._render)(child);
            return (0, core_js_1.h)('div', {}, (0, core_js_1._render)(el));
        }
        else if (this.props.fallback) {
            return (0, core_js_1.h)('div', {}, (0, core_js_1._render)(this.props.fallback));
        }
        else {
            return (0, core_js_1.h)('div', {}, 'not found');
        }
    }
}
exports.Switch = Switch;
// alias for <Switch />
class Routes extends Switch {
}
exports.Routes = Routes;
const Route = ({ path, regex, children }) => {
    // lookup pathname and parameters
    const pathname = (0, core_js_1.isSSR)() ? _nano.location.pathname : window.location.pathname;
    const params = (0, exports.parseParamsFromPath)(path);
    // pass the route as props to the children
    children.forEach((child) => {
        if (child.props)
            child.props = Object.assign(Object.assign({}, child.props), { route: { path, regex, pathname, params } });
    });
    return children;
};
exports.Route = Route;
const to = (to, replace = false) => {
    replace ? historyReplace(to) : historyPush(to);
};
exports.to = to;
const Link = (_a) => {
    var { to, replace, children } = _a, rest = __rest(_a, ["to", "replace", "children"]);
    const handleClick = (event) => {
        event.preventDefault();
        replace ? historyReplace(to) : historyPush(to);
    };
    return (0, core_js_1.h)('a', Object.assign({ href: to, onClick: (e) => handleClick(e) }, rest), children);
};
exports.Link = Link;
class CListener {
    constructor() {
        this._listeners = new Map();
        if ((0, core_js_1.isSSR)())
            return;
        this._route = window.location.pathname;
        const event = () => {
            const newRoute = window.location.pathname;
            this._listeners.forEach(fnc => {
                fnc(newRoute, this._route);
            });
            this._route = newRoute;
        };
        window.addEventListener('pushstate', event);
        window.addEventListener('replacestate', event);
    }
    use() {
        const id = Math.random().toString(36).substring(2);
        return {
            subscribe: (fnc) => {
                this._listeners.set(id, fnc);
            },
            cancel: () => {
                if (this._listeners.has(id))
                    this._listeners.delete(id);
            }
        };
    }
}
let listener;
const Listener = () => {
    if (!listener)
        listener = new CListener();
    return listener;
};
exports.Listener = Listener;
/** Pass "this.props.route.path" to it. */
const parseParamsFromPath = (path) => {
    let params = {};
    const _pathname = (0, core_js_1.isSSR)() ? _nano.location.pathname.split('/') : window.location.pathname.split('/');
    path.split('/').forEach((p, i) => {
        if (p.startsWith(':'))
            params = Object.assign(Object.assign({}, params), { [p.slice(1)]: _pathname[i] });
    });
    return params;
};
exports.parseParamsFromPath = parseParamsFromPath;
//# sourceMappingURL=router.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/components/suspense.js":
/*!**********************************************************!*\
  !*** ./node_modules/nano-jsx/lib/components/suspense.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Suspense = void 0;
const component_js_1 = __webpack_require__(/*! ../component.js */ "./node_modules/nano-jsx/lib/component.js");
const core_js_1 = __webpack_require__(/*! ../core.js */ "./node_modules/nano-jsx/lib/core.js");
class Suspense extends component_js_1.Component {
    constructor(props) {
        super(props);
        this.ready = false;
        // get props promises in ...rest
        const _a = this.props, { children, fallback, cache = false } = _a, rest = __rest(_a, ["children", "fallback", "cache"]);
        // stringify ...rest
        const str = JSON.stringify(rest, function (_key, val) {
            if (typeof val === 'function')
                return `${val}`; // implicitly `toString` it
            return val;
        });
        // create unique id based on ...rest
        this.id = (0, core_js_1.strToHash)(JSON.stringify(str));
    }
    didMount() {
        return __awaiter(this, void 0, void 0, function* () {
            // get props promises in ...rest
            const _a = this.props, { children, fallback, cache = false } = _a, rest = __rest(_a, ["children", "fallback", "cache"]);
            // set initial state to []
            if (cache)
                this.initState = {};
            // check if we already cached the results in this.state
            if (this.loadFromCache(cache))
                return;
            // resolve the promises
            const promises = Object.values(rest).map(p => p());
            const resolved = yield Promise.all(promises);
            // prepare data
            const data = this.prepareData(rest, resolved, cache);
            // add data to children
            this.addDataToChildren(data);
            // update the component
            this.ready = true;
            this.update();
        });
    }
    ssr() {
        // get props promises in ...rest
        const _a = this.props, { children, fallback, cache = false } = _a, rest = __rest(_a, ["children", "fallback", "cache"]);
        // execute the functions
        const functions = Object.values(rest).map(p => p());
        // prepare data
        const data = this.prepareData(rest, functions, false);
        // add data to children
        this.addDataToChildren(data);
    }
    loadFromCache(cache) {
        const hasCachedProps = this.state && cache && Object.keys(this.state).length > 0;
        if (hasCachedProps) {
            this.addDataToChildren(this.state);
            this.ready = true;
        }
        return hasCachedProps;
    }
    prepareData(rest, fnc, cache) {
        const data = Object.keys(rest).reduce((obj, item, index) => {
            if (cache)
                this.state = Object.assign(Object.assign({}, this.state), { [item]: fnc[index] });
            return Object.assign(Object.assign({}, obj), { [item]: fnc[index] });
        }, {});
        return data;
    }
    addDataToChildren(data) {
        // add data as props to children
        this.props.children.forEach((child) => {
            if (child.props)
                child.props = Object.assign(Object.assign({}, child.props), data);
        });
    }
    render() {
        if (!(0, core_js_1.isSSR)()) {
            const { cache = false } = this.props;
            this.loadFromCache(cache);
            return !this.ready ? this.props.fallback : this.props.children;
        }
        else {
            this.ssr();
            return this.props.children;
        }
    }
}
exports.Suspense = Suspense;
//# sourceMappingURL=suspense.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/components/visible.js":
/*!*********************************************************!*\
  !*** ./node_modules/nano-jsx/lib/components/visible.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Visible = void 0;
const core_js_1 = __webpack_require__(/*! ../core.js */ "./node_modules/nano-jsx/lib/core.js");
const component_js_1 = __webpack_require__(/*! ../component.js */ "./node_modules/nano-jsx/lib/component.js");
class Visible extends component_js_1.Component {
    constructor() {
        super(...arguments);
        this.isVisible = false;
    }
    didMount() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    this.isVisible = true;
                    this.update();
                }
            });
        }, { threshold: [0, 1] });
        observer.observe(this.elements[0]);
    }
    render() {
        if (!this.isVisible) {
            return (0, core_js_1.h)('div', { 'data-visible': false, visibility: 'hidden' });
        }
        else {
            if (this.props.onVisible)
                this.props.onVisible();
            return (0, core_js_1.render)(this.props.component || this.props.children[0]);
        }
    }
}
exports.Visible = Visible;
//# sourceMappingURL=visible.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/context.js":
/*!**********************************************!*\
  !*** ./node_modules/nano-jsx/lib/context.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useContext = exports.createContext = void 0;
const createContext = (ctx) => {
    let _ctx = ctx;
    return {
        Provider: (props) => {
            if (props.value)
                _ctx = props.value;
            return props.children;
        },
        Consumer: (props) => {
            return { component: props.children[0](_ctx), props: Object.assign(Object.assign({}, props), { context: _ctx }) };
        },
        get: () => _ctx,
        set: (ctx) => (_ctx = ctx)
    };
};
exports.createContext = createContext;
const useContext = (ctx) => {
    const _ctx = ctx;
    if (_ctx && typeof _ctx.get === 'function') {
        return _ctx.get();
    }
};
exports.useContext = useContext;
//# sourceMappingURL=context.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/core.js":
/*!*******************************************!*\
  !*** ./node_modules/nano-jsx/lib/core.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.h = exports._render = exports.hydrate = exports.render = exports.appendChildren = exports.strToHash = exports.removeAllChildNodes = exports.tick = exports.isSSR = void 0;
__webpack_require__(/*! ./types.js */ "./node_modules/nano-jsx/lib/types.js");
const isSSR = () => typeof _nano !== 'undefined' && _nano.isSSR === true;
exports.isSSR = isSSR;
/** Creates a new Microtask using Promise() */
exports.tick = Promise.prototype.then.bind(Promise.resolve());
const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};
exports.removeAllChildNodes = removeAllChildNodes;
// https://stackoverflow.com/a/7616484/12656855
const strToHash = (s) => {
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        const chr = s.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(32);
};
exports.strToHash = strToHash;
const appendChildren = (element, children, escape = true) => {
    // if the child is an html element
    if (!Array.isArray(children)) {
        (0, exports.appendChildren)(element, [children], escape);
        return;
    }
    // htmlCollection to array
    if (typeof children === 'object')
        children = Array.prototype.slice.call(children);
    children.forEach(child => {
        // if child is an array of children, append them instead
        if (Array.isArray(child))
            (0, exports.appendChildren)(element, child, escape);
        else {
            // render the component
            const c = (0, exports._render)(child);
            if (typeof c !== 'undefined') {
                // if c is an array of children, append them instead
                if (Array.isArray(c))
                    (0, exports.appendChildren)(element, c, escape);
                // apply the component to parent element
                else {
                    if ((0, exports.isSSR)() && !escape)
                        element.appendChild(c.nodeType == null ? c.toString() : c);
                    else
                        element.appendChild(c.nodeType == null ? document.createTextNode(c.toString()) : c);
                }
            }
        }
    });
};
exports.appendChildren = appendChildren;
/**
 * A simple component for rendering SVGs
 */
const SVG = (props) => {
    const child = props.children[0];
    const attrs = child.attributes;
    if ((0, exports.isSSR)())
        return child;
    const svg = hNS('svg');
    for (let i = attrs.length - 1; i >= 0; i--) {
        svg.setAttribute(attrs[i].name, attrs[i].value);
    }
    svg.innerHTML = child.innerHTML;
    return svg;
};
/** Returns the populated parent if available else  one child or an array of children */
const render = (component, parent = null, removeChildNodes = true) => {
    let el = (0, exports._render)(component);
    if (Array.isArray(el)) {
        el = el.map(e => (0, exports._render)(e));
        if (el.length === 1)
            el = el[0];
    }
    if (parent) {
        if (removeChildNodes)
            (0, exports.removeAllChildNodes)(parent);
        // if parent and child are the same, we replace the parent instead of appending to it
        if (el && parent.id && parent.id === el.id && parent.parentElement) {
            parent.parentElement.replaceChild(el, parent);
        }
        else {
            // append element(s) to the parent
            if (Array.isArray(el))
                el.forEach((e) => {
                    (0, exports.appendChildren)(parent, (0, exports._render)(e));
                    //parent.appendChild(_render(e))
                });
            else
                (0, exports.appendChildren)(parent, (0, exports._render)(el));
        }
        return parent;
    }
    // returning one child or an array of children
    else {
        if ((0, exports.isSSR)() && !Array.isArray(el))
            return [el];
        return el;
    }
};
exports.render = render;
exports.hydrate = exports.render;
const _render = (comp) => {
    // null, false, undefined
    if (comp === null || comp === false || typeof comp === 'undefined')
        return [];
    // string, number
    if (typeof comp === 'string' || typeof comp === 'number')
        return comp.toString();
    // SVGElement
    if (comp.tagName && comp.tagName.toLowerCase() === 'svg')
        return SVG({ children: [comp] });
    // HTMLElement
    if (comp.tagName)
        return comp;
    // Class Component
    if (comp && comp.component && comp.component.isClass)
        return renderClassComponent(comp);
    // Class Component (Uninitialized)
    if (comp.isClass)
        return renderClassComponent({ component: comp, props: {} });
    // Functional Component
    if (comp.component && typeof comp.component === 'function')
        return renderFunctionalComponent(comp);
    // Array (render each child and return the array) (is probably a fragment)
    if (Array.isArray(comp))
        return comp.map(c => (0, exports._render)(c)).flat();
    // function
    if (typeof comp === 'function' && !comp.isClass)
        return (0, exports._render)(comp());
    // if component is a HTMLElement (rare case)
    if (comp.component && comp.component.tagName && typeof comp.component.tagName === 'string')
        return (0, exports._render)(comp.component);
    // (rare case)
    if (Array.isArray(comp.component))
        return (0, exports._render)(comp.component);
    // (rare case)
    if (comp.component)
        return (0, exports._render)(comp.component);
    // object
    if (typeof comp === 'object')
        return [];
    console.warn('Something unexpected happened with:', comp);
};
exports._render = _render;
const renderFunctionalComponent = (fncComp) => {
    const { component, props } = fncComp;
    return (0, exports._render)(component(props));
};
const renderClassComponent = (classComp) => {
    const { component, props } = classComp;
    // calc hash
    const hash = (0, exports.strToHash)(component.toString());
    // make hash accessible in constructor, without passing it to it
    component.prototype._getHash = () => hash;
    const Component = new component(props);
    if (!(0, exports.isSSR)())
        Component.willMount();
    let el = Component.render();
    el = (0, exports._render)(el);
    Component.elements = el;
    // pass the component instance as ref
    if (props && props.ref)
        props.ref(Component);
    if (!(0, exports.isSSR)())
        (0, exports.tick)(() => {
            Component._didMount();
        });
    return el;
};
const hNS = (tag) => document.createElementNS('http://www.w3.org/2000/svg', tag);
// https://stackoverflow.com/a/42405694/12656855
const h = (tagNameOrComponent, props = {}, ...children) => {
    // if children is passed as props, merge with ...children
    if (props && props.children) {
        if (Array.isArray(children)) {
            if (Array.isArray(props.children))
                children = [...props.children, ...children];
            else
                children.push(props.children);
        }
        else {
            if (Array.isArray(props.children))
                children = props.children;
            else
                children = [props.children];
        }
    }
    // render WebComponent in SSR
    if ((0, exports.isSSR)() && _nano.ssrTricks.isWebComponent(tagNameOrComponent)) {
        const element = _nano.ssrTricks.renderWebComponent(tagNameOrComponent, props, children, exports._render);
        if (element === null)
            return `ERROR: "<${tagNameOrComponent} />"`;
        else
            return element;
    }
    // if tagNameOrComponent is a component
    if (typeof tagNameOrComponent !== 'string')
        return { component: tagNameOrComponent, props: Object.assign(Object.assign({}, props), { children: children }) };
    // custom message if document is not defined in SSR
    try {
        if ((0, exports.isSSR)() && typeof tagNameOrComponent === 'string' && !document)
            throw new Error('document is not defined');
    }
    catch (err) {
        console.log('ERROR:', err.message, '\n > Please read: https://github.com/nanojsx/nano/issues/106');
    }
    let ref;
    const element = tagNameOrComponent === 'svg'
        ? hNS('svg')
        : document.createElement(tagNameOrComponent);
    // check if the element includes the event (for example 'oninput')
    const isEvent = (el, p) => {
        // check if the event begins with 'on'
        if (0 !== p.indexOf('on'))
            return false;
        // we return true if SSR, since otherwise it will get rendered
        if (el._ssr)
            return true;
        // check if the event is present in the element as object (null) or as function
        return typeof el[p] === 'object' || typeof el[p] === 'function';
    };
    for (const p in props) {
        // https://stackoverflow.com/a/45205645/12656855
        // style object to style string
        if (p === 'style' && typeof props[p] === 'object') {
            const styles = Object.keys(props[p])
                .map(k => `${k}:${props[p][k]}`)
                .join(';')
                .replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
            props[p] = `${styles};`;
        }
        // handel ref
        if (p === 'ref')
            ref = props[p];
        // handle events
        else if (isEvent(element, p.toLowerCase()))
            element.addEventListener(p.toLowerCase().substring(2), (e) => props[p](e));
        // dangerouslySetInnerHTML
        else if (p === 'dangerouslySetInnerHTML' && props[p].__html) {
            if (!(0, exports.isSSR)()) {
                const fragment = document.createElement('fragment');
                fragment.innerHTML = props[p].__html;
                element.appendChild(fragment);
            }
            else {
                element.innerHTML = props[p].__html;
            }
        }
        // modern dangerouslySetInnerHTML
        else if (p === 'innerHTML' && props[p].__dangerousHtml) {
            if (!(0, exports.isSSR)()) {
                const fragment = document.createElement('fragment');
                fragment.innerHTML = props[p].__dangerousHtml;
                element.appendChild(fragment);
            }
            else {
                element.innerHTML = props[p].__dangerousHtml;
            }
        }
        // className
        else if (/className/i.test(p))
            console.warn('You can use "class" instead of "className".');
        // setAttribute
        else if (typeof props[p] !== 'undefined')
            element.setAttribute(p, props[p]);
    }
    // these tags should not be escaped by default (in ssr)
    const escape = !['noscript', 'script', 'style'].includes(tagNameOrComponent);
    (0, exports.appendChildren)(element, children, escape);
    if (ref)
        ref(element);
    return element;
};
exports.h = h;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/customElementsMode.js":
/*!*********************************************************!*\
  !*** ./node_modules/nano-jsx/lib/customElementsMode.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defineAsCustomElements = void 0;
const core_js_1 = __webpack_require__(/*! ./core.js */ "./node_modules/nano-jsx/lib/core.js");
const defineAsCustomElementsSSR = (component, componentName, _publicProps = [], _options = {}) => {
    if (!/^[a-zA-Z0-9]+-[a-zA-Z0-9]+$/.test(componentName))
        console.log(`Error: WebComponent name "${componentName}" is invalid.`);
    else
        _nano.customElements.set(componentName, component);
};
const defineAsCustomElements = function (component, componentName, publicProps, { mode = 'closed', delegatesFocus = false } = {}) {
    if ((0, core_js_1.isSSR)()) {
        defineAsCustomElementsSSR(component, componentName, publicProps);
        return;
    }
    customElements.define(componentName, class extends HTMLElement {
        constructor() {
            super();
            const shadowRoot = this.attachShadow({ mode, delegatesFocus });
            let ref;
            const children = Array.from(this.children).map(c => (0, core_js_1.render)(c));
            // because nano-jsx update need parentElement, so DocumentFragment is not usable...
            const el = (0, core_js_1.h)('div', null, (0, core_js_1._render)({
                component,
                props: {
                    children: children,
                    ref: (r) => (ref = r)
                }
            }));
            this.component = ref;
            this.isFunctionalComponent = !component.isClass;
            this.functionalComponentsProps = {};
            shadowRoot.append(el);
            if (!this.isFunctionalComponent) {
                this.component.updatePropsValue = (name, value) => {
                    // @ts-ignore
                    if (!this.component.props)
                        this.component.props = {};
                    this.component.props[name] = value;
                    this.component[name] = value;
                };
            }
        }
        static get observedAttributes() {
            return publicProps;
        }
        removeChildren() {
            var _a;
            if (this.shadowRoot) {
                const children = Array.from((_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.children) || [];
                for (const el of children) {
                    el.remove();
                }
            }
        }
        attributeChangedCallback(name, _, newValue) {
            if (!this.isFunctionalComponent) {
                this.component.updatePropsValue(name, newValue);
                this.component.update();
            }
            else {
                this.removeChildren();
                this.functionalComponentsProps[name] = newValue;
                const el = (0, core_js_1.h)('div', null, (0, core_js_1._render)({
                    component,
                    props: Object.assign({ children: [], ref: (r) => (this.component = r) }, this.functionalComponentsProps)
                }));
                this.shadowRoot.append(el);
            }
        }
    });
};
exports.defineAsCustomElements = defineAsCustomElements;
//# sourceMappingURL=customElementsMode.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/fragment.js":
/*!***********************************************!*\
  !*** ./node_modules/nano-jsx/lib/fragment.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Fragment = void 0;
const Fragment = (props) => {
    return props.children;
};
exports.Fragment = Fragment;
//# sourceMappingURL=fragment.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/helpers.js":
/*!**********************************************!*\
  !*** ./node_modules/nano-jsx/lib/helpers.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.printVersion = exports.escapeHtml = exports.onNodeRemove = exports.detectSSR = exports.nodeToString = exports.task = void 0;
const version_js_1 = __webpack_require__(/*! ./version.js */ "./node_modules/nano-jsx/lib/version.js");
/** Creates a new Task using setTimeout() */
const task = (task) => setTimeout(task, 0);
exports.task = task;
const nodeToString = (node) => {
    const tmpNode = document.createElement('div');
    tmpNode.appendChild(node.cloneNode(true));
    return tmpNode.innerHTML;
};
exports.nodeToString = nodeToString;
const detectSSR = () => {
    // @ts-ignore
    const isDeno = typeof Deno !== 'undefined';
    const hasWindow = typeof window !== 'undefined' ? true : false;
    return (typeof _nano !== 'undefined' && _nano.isSSR) || isDeno || !hasWindow;
};
exports.detectSSR = detectSSR;
function isDescendant(desc, root) {
    // @ts-ignore
    return !!desc && (desc === root || isDescendant(desc.parentNode, root));
}
// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
const onNodeRemove = (element, callback) => {
    let observer = new MutationObserver(mutationsList => {
        mutationsList.forEach(mutation => {
            mutation.removedNodes.forEach(removed => {
                if (isDescendant(element, removed)) {
                    callback();
                    if (observer) {
                        // allow garbage collection
                        observer.disconnect();
                        // @ts-ignore
                        observer = undefined;
                    }
                }
            });
        });
    });
    observer.observe(document, {
        childList: true,
        subtree: true
    });
    return observer;
};
exports.onNodeRemove = onNodeRemove;
// https://stackoverflow.com/a/6234804
const escapeHtml = (unsafe) => {
    if (unsafe && typeof unsafe === 'string')
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    return unsafe;
};
exports.escapeHtml = escapeHtml;
const printVersion = () => {
    const info = `Powered by nano JSX v${version_js_1.VERSION}`;
    console.log(`%c %c %c %c %c ${info} %c http://nanojsx.io`, 'background: #ff0000', 'background: #ffff00', 'background: #00ff00', 'background: #00ffff', 'color: #fff; background: #000000;', 'background: none');
};
exports.printVersion = printVersion;
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/htm.js":
/*!******************************************!*\
  !*** ./node_modules/nano-jsx/lib/htm.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const index_js_1 = __importDefault(__webpack_require__(/*! ./htm/index.js */ "./node_modules/nano-jsx/lib/htm/index.js"));
exports["default"] = index_js_1.default;
//# sourceMappingURL=htm.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/htm/build.js":
/*!************************************************!*\
  !*** ./node_modules/nano-jsx/lib/htm/build.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.build = exports.evaluate = exports.treeify = void 0;
const constants_js_1 = __webpack_require__(/*! ./constants.js */ "./node_modules/nano-jsx/lib/htm/constants.js");
const MODE_SLASH = 0;
const MODE_TEXT = 1;
const MODE_WHITESPACE = 2;
const MODE_TAGNAME = 3;
const MODE_COMMENT = 4;
const MODE_PROP_SET = 5;
const MODE_PROP_APPEND = 6;
const CHILD_APPEND = 0;
const CHILD_RECURSE = 2;
const TAG_SET = 3;
const PROPS_ASSIGN = 4;
const PROP_SET = MODE_PROP_SET;
const PROP_APPEND = MODE_PROP_APPEND;
// Turn a result of a build(...) call into a tree that is more
// convenient to analyze and transform (e.g. Babel plugins).
// For example:
// 	treeify(
//		build'<div href="1${a}" ...${b}><${x} /></div>`,
//		[X, Y, Z]
//	)
// returns:
// 	{
// 		tag: 'div',
//		props: [ { href: ["1", X] },	Y ],
// 		children: [ { tag: Z, props: [], children: [] } ]
// 	}
const treeify = (built, fields) => {
    const _treeify = (built) => {
        let tag = '';
        let currentProps = null;
        const props = [];
        const children = [];
        for (let i = 1; i < built.length; i++) {
            const type = built[i++];
            const value = built[i] ? fields[built[i++] - 1] : built[++i];
            if (type === TAG_SET) {
                tag = value;
            }
            else if (type === PROPS_ASSIGN) {
                props.push(value);
                currentProps = null;
            }
            else if (type === PROP_SET) {
                if (!currentProps) {
                    currentProps = Object.create(null);
                    props.push(currentProps);
                }
                currentProps[built[++i]] = [value];
            }
            else if (type === PROP_APPEND) {
                currentProps[built[++i]].push(value);
            }
            else if (type === CHILD_RECURSE) {
                children.push(_treeify(value));
            }
            else if (type === CHILD_APPEND) {
                children.push(value);
            }
        }
        return { tag, props, children };
    };
    const { children } = _treeify(built);
    return children.length > 1 ? children : children[0];
};
exports.treeify = treeify;
const evaluate = (h, built, fields, args) => {
    let tmp;
    // `build()` used the first element of the operation list as
    // temporary workspace. Now that `build()` is done we can use
    // that space to track whether the current element is "dynamic"
    // (i.e. it or any of its descendants depend on dynamic values).
    built[0] = 0;
    for (let i = 1; i < built.length; i++) {
        const type = built[i++];
        // Set `built[0]`'s appropriate bits if this element depends on a dynamic value.
        const value = built[i] ? ((built[0] |= type ? 1 : 2), fields[built[i++]]) : built[++i];
        if (type === TAG_SET) {
            args[0] = value;
        }
        else if (type === PROPS_ASSIGN) {
            args[1] = Object.assign(args[1] || {}, value);
        }
        else if (type === PROP_SET) {
            ;
            (args[1] = args[1] || {})[built[++i]] = value;
        }
        else if (type === PROP_APPEND) {
            args[1][built[++i]] += `${value}`;
        }
        else if (type) {
            // type === CHILD_RECURSE
            // Set the operation list (including the staticness bits) as
            // `this` for the `h` call.
            tmp = h.apply(value, (0, exports.evaluate)(h, value, fields, ['', null]));
            args.push(tmp);
            if (value[0]) {
                // Set the 2nd lowest bit it the child element is dynamic.
                built[0] |= 2;
            }
            else {
                // Rewrite the operation list in-place if the child element is static.
                // The currently evaluated piece `CHILD_RECURSE, 0, [...]` becomes
                // `CHILD_APPEND, 0, tmp`.
                // Essentially the operation list gets optimized for potential future
                // re-evaluations.
                built[i - 2] = CHILD_APPEND;
                built[i] = tmp;
            }
        }
        else {
            // type === CHILD_APPEND
            args.push(value);
        }
    }
    return args;
};
exports.evaluate = evaluate;
const build = function (statics, ...rest) {
    const fields = [statics, ...rest];
    // @ts-ignore
    const h = this;
    let mode = MODE_TEXT;
    let buffer = '';
    let quote = '';
    let current = [0];
    let char;
    let propName;
    const commit = (field) => {
        if (mode === MODE_TEXT && (field || (buffer = buffer.replace(/^\s*\n\s*|\s*\n\s*$/g, '')))) {
            if (constants_js_1.MINI) {
                current.push(field ? fields[field] : buffer);
            }
            else {
                current.push(CHILD_APPEND, field, buffer);
            }
        }
        else if (mode === MODE_TAGNAME && (field || buffer)) {
            if (constants_js_1.MINI) {
                current[1] = field ? fields[field] : buffer;
            }
            else {
                current.push(TAG_SET, field, buffer);
            }
            mode = MODE_WHITESPACE;
        }
        else if (mode === MODE_WHITESPACE && buffer === '...' && field) {
            if (constants_js_1.MINI) {
                current[2] = Object.assign(current[2] || {}, fields[field]);
            }
            else {
                current.push(PROPS_ASSIGN, field, 0);
            }
        }
        else if (mode === MODE_WHITESPACE && buffer && !field) {
            if (constants_js_1.MINI) {
                ;
                (current[2] = current[2] || {})[buffer] = true;
            }
            else {
                current.push(PROP_SET, 0, true, buffer);
            }
        }
        else if (mode >= MODE_PROP_SET) {
            if (constants_js_1.MINI) {
                if (mode === MODE_PROP_SET) {
                    ;
                    (current[2] = current[2] || {})[propName] = field
                        ? buffer
                            ? buffer + fields[field]
                            : fields[field]
                        : buffer;
                    mode = MODE_PROP_APPEND;
                }
                else if (field || buffer) {
                    current[2][propName] += field ? buffer + fields[field] : buffer;
                }
            }
            else {
                if (buffer || (!field && mode === MODE_PROP_SET)) {
                    current.push(mode, 0, buffer, propName);
                    mode = MODE_PROP_APPEND;
                }
                if (field) {
                    current.push(mode, field, 0, propName);
                    mode = MODE_PROP_APPEND;
                }
            }
        }
        buffer = '';
    };
    for (let i = 0; i < statics.length; i++) {
        if (i) {
            if (mode === MODE_TEXT) {
                commit();
            }
            commit(i);
        }
        for (let j = 0; j < statics[i].length; j++) {
            char = statics[i][j];
            if (mode === MODE_TEXT) {
                if (char === '<') {
                    // commit buffer
                    commit();
                    if (constants_js_1.MINI) {
                        current = [current, '', null];
                    }
                    else {
                        current = [current];
                    }
                    mode = MODE_TAGNAME;
                }
                else {
                    buffer += char;
                }
            }
            else if (mode === MODE_COMMENT) {
                // Ignore everything until the last three characters are '-', '-' and '>'
                if (buffer === '--' && char === '>') {
                    mode = MODE_TEXT;
                    buffer = '';
                }
                else {
                    buffer = char + buffer[0];
                }
            }
            else if (quote) {
                if (char === quote) {
                    quote = '';
                }
                else {
                    buffer += char;
                }
            }
            else if (char === '"' || char === "'") {
                quote = char;
            }
            else if (char === '>') {
                commit();
                mode = MODE_TEXT;
            }
            else if (!mode) {
                // Ignore everything until the tag ends
            }
            else if (char === '=') {
                mode = MODE_PROP_SET;
                propName = buffer;
                buffer = '';
            }
            else if (char === '/' && (mode < MODE_PROP_SET || statics[i][j + 1] === '>')) {
                commit();
                if (mode === MODE_TAGNAME) {
                    current = current[0];
                }
                mode = current;
                if (constants_js_1.MINI) {
                    ;
                    (current = current[0]).push(h(...mode.slice(1)));
                }
                else {
                    ;
                    (current = current[0]).push(CHILD_RECURSE, 0, mode);
                }
                mode = MODE_SLASH;
            }
            else if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
                // <a disabled>
                commit();
                mode = MODE_WHITESPACE;
            }
            else {
                buffer += char;
            }
            if (mode === MODE_TAGNAME && buffer === '!--') {
                mode = MODE_COMMENT;
                current = current[0];
            }
        }
    }
    commit();
    if (constants_js_1.MINI) {
        return current.length > 2 ? current.slice(1) : current[1];
    }
    return current;
};
exports.build = build;
//# sourceMappingURL=build.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/htm/constants.js":
/*!****************************************************!*\
  !*** ./node_modules/nano-jsx/lib/htm/constants.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MINI = void 0;
exports.MINI = false;
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/htm/index.js":
/*!************************************************!*\
  !*** ./node_modules/nano-jsx/lib/htm/index.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_js_1 = __webpack_require__(/*! ./constants.js */ "./node_modules/nano-jsx/lib/htm/constants.js");
const build_js_1 = __webpack_require__(/*! ./build.js */ "./node_modules/nano-jsx/lib/htm/build.js");
const CACHES = new Map();
const regular = function (statics) {
    let tmp = CACHES.get(this);
    if (!tmp) {
        tmp = new Map();
        CACHES.set(this, tmp);
    }
    tmp = (0, build_js_1.evaluate)(this, tmp.get(statics) || (tmp.set(statics, (tmp = (0, build_js_1.build)(statics))), tmp), arguments, []);
    return tmp.length > 1 ? tmp : tmp[0];
};
// export as htm
exports["default"] = constants_js_1.MINI ? build_js_1.build : regular;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/nano-jsx/lib/index.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VERSION = exports.printVersion = exports.defineAsCustomElements = exports.withStyles = exports.useContext = exports.createContext = exports.Store = exports.Fragment = exports.renderSSR = exports.task = exports.nodeToString = exports.hydrateLazy = exports.jsx = exports.isSSR = exports.Component = exports.tick = exports.hydrate = exports.render = exports.h = void 0;
// core
var core_js_1 = __webpack_require__(/*! ./core.js */ "./node_modules/nano-jsx/lib/core.js");
Object.defineProperty(exports, "h", ({ enumerable: true, get: function () { return core_js_1.h; } }));
Object.defineProperty(exports, "render", ({ enumerable: true, get: function () { return core_js_1.render; } }));
Object.defineProperty(exports, "hydrate", ({ enumerable: true, get: function () { return core_js_1.hydrate; } }));
Object.defineProperty(exports, "tick", ({ enumerable: true, get: function () { return core_js_1.tick; } }));
// component
var component_js_1 = __webpack_require__(/*! ./component.js */ "./node_modules/nano-jsx/lib/component.js");
Object.defineProperty(exports, "Component", ({ enumerable: true, get: function () { return component_js_1.Component; } }));
// built-in Components
__exportStar(__webpack_require__(/*! ./components/index.js */ "./node_modules/nano-jsx/lib/components/index.js"), exports);
// export some defaults (Nano)
const core_js_2 = __webpack_require__(/*! ./core.js */ "./node_modules/nano-jsx/lib/core.js");
Object.defineProperty(exports, "isSSR", ({ enumerable: true, get: function () { return core_js_2.isSSR; } }));
const ssr_js_1 = __webpack_require__(/*! ./ssr.js */ "./node_modules/nano-jsx/lib/ssr.js");
exports["default"] = { h: core_js_2.h, render: core_js_2.render, hydrate: core_js_2.hydrate, renderSSR: ssr_js_1.renderSSR, isSSR: core_js_2.isSSR };
var jsx_js_1 = __webpack_require__(/*! ./jsx.js */ "./node_modules/nano-jsx/lib/jsx.js");
Object.defineProperty(exports, "jsx", ({ enumerable: true, get: function () { return jsx_js_1.jsx; } }));
var lazy_js_1 = __webpack_require__(/*! ./lazy.js */ "./node_modules/nano-jsx/lib/lazy.js");
Object.defineProperty(exports, "hydrateLazy", ({ enumerable: true, get: function () { return lazy_js_1.hydrateLazy; } }));
var helpers_js_1 = __webpack_require__(/*! ./helpers.js */ "./node_modules/nano-jsx/lib/helpers.js");
Object.defineProperty(exports, "nodeToString", ({ enumerable: true, get: function () { return helpers_js_1.nodeToString; } }));
Object.defineProperty(exports, "task", ({ enumerable: true, get: function () { return helpers_js_1.task; } }));
var ssr_js_2 = __webpack_require__(/*! ./ssr.js */ "./node_modules/nano-jsx/lib/ssr.js");
Object.defineProperty(exports, "renderSSR", ({ enumerable: true, get: function () { return ssr_js_2.renderSSR; } }));
var fragment_js_1 = __webpack_require__(/*! ./fragment.js */ "./node_modules/nano-jsx/lib/fragment.js");
Object.defineProperty(exports, "Fragment", ({ enumerable: true, get: function () { return fragment_js_1.Fragment; } }));
var store_js_1 = __webpack_require__(/*! ./store.js */ "./node_modules/nano-jsx/lib/store.js");
Object.defineProperty(exports, "Store", ({ enumerable: true, get: function () { return store_js_1.Store; } }));
var context_js_1 = __webpack_require__(/*! ./context.js */ "./node_modules/nano-jsx/lib/context.js");
Object.defineProperty(exports, "createContext", ({ enumerable: true, get: function () { return context_js_1.createContext; } }));
Object.defineProperty(exports, "useContext", ({ enumerable: true, get: function () { return context_js_1.useContext; } }));
var withStyles_js_1 = __webpack_require__(/*! ./withStyles.js */ "./node_modules/nano-jsx/lib/withStyles.js");
Object.defineProperty(exports, "withStyles", ({ enumerable: true, get: function () { return withStyles_js_1.withStyles; } }));
var customElementsMode_js_1 = __webpack_require__(/*! ./customElementsMode.js */ "./node_modules/nano-jsx/lib/customElementsMode.js");
Object.defineProperty(exports, "defineAsCustomElements", ({ enumerable: true, get: function () { return customElementsMode_js_1.defineAsCustomElements; } }));
// version
var helpers_js_2 = __webpack_require__(/*! ./helpers.js */ "./node_modules/nano-jsx/lib/helpers.js");
Object.defineProperty(exports, "printVersion", ({ enumerable: true, get: function () { return helpers_js_2.printVersion; } }));
var version_js_1 = __webpack_require__(/*! ./version.js */ "./node_modules/nano-jsx/lib/version.js");
Object.defineProperty(exports, "VERSION", ({ enumerable: true, get: function () { return version_js_1.VERSION; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/jsx.js":
/*!******************************************!*\
  !*** ./node_modules/nano-jsx/lib/jsx.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.jsx = void 0;
const core_js_1 = __webpack_require__(/*! ./core.js */ "./node_modules/nano-jsx/lib/core.js");
const htm_js_1 = __importDefault(__webpack_require__(/*! ./htm.js */ "./node_modules/nano-jsx/lib/htm.js"));
const jsx = htm_js_1.default.bind(core_js_1.h);
exports.jsx = jsx;
//# sourceMappingURL=jsx.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/lazy.js":
/*!*******************************************!*\
  !*** ./node_modules/nano-jsx/lib/lazy.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hydrateLazy = void 0;
const core_js_1 = __webpack_require__(/*! ./core.js */ "./node_modules/nano-jsx/lib/core.js");
const visible_js_1 = __webpack_require__(/*! ./components/visible.js */ "./node_modules/nano-jsx/lib/components/visible.js");
const hydrateLazy = (component, parent = null, removeChildNodes = true) => {
    const c = (0, core_js_1.h)(visible_js_1.Visible, null, component);
    return (0, core_js_1.hydrate)(c, parent, removeChildNodes);
};
exports.hydrateLazy = hydrateLazy;
//# sourceMappingURL=lazy.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/regexDom.js":
/*!***********************************************!*\
  !*** ./node_modules/nano-jsx/lib/regexDom.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.documentSSR = exports.DocumentSSR = exports.HTMLElementSSR = void 0;
const helpers_js_1 = __webpack_require__(/*! ./helpers.js */ "./node_modules/nano-jsx/lib/helpers.js");
class HTMLElementSSR {
    constructor(tag) {
        this.isSelfClosing = false;
        this.nodeType = null;
        this.tagName = tag;
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
        ];
        this.nodeType = 1;
        if (selfClosing.indexOf(tag) >= 0) {
            this._ssr = `<${tag} />`;
            this.isSelfClosing = true;
        }
        else {
            this._ssr = `<${tag}></${tag}>`;
        }
    }
    get outerHTML() {
        return this.toString();
    }
    get innerHTML() {
        return this.innerText;
    }
    set innerHTML(text) {
        this.innerText = text;
    }
    get innerText() {
        var _a;
        const reg = /(^<[^>]+>)(.+)?(<\/[a-z0-9]+>$|\/>$)/gm;
        return ((_a = reg.exec(this._ssr)) === null || _a === void 0 ? void 0 : _a[2]) || '';
    }
    set innerText(text) {
        const reg = /(^<[^>]+>)(.+)?(<\/[a-z0-9]+>$|\/>$)/gm;
        const replacer = (_match, p1, _p2, p3) => [p1, text, p3].join('');
        this._ssr = this._ssr.replace(reg, replacer);
    }
    getAttribute(_name) {
        return null;
    }
    get classList() {
        const element = this._ssr;
        const classesRegex = /^<\w+.+(\sclass=")([^"]+)"/gm;
        return {
            add: (name) => {
                this.setAttribute('class', name);
            },
            entries: {
                get length() {
                    const classes = classesRegex.exec(element);
                    if (classes && classes[2])
                        return classes[2].split(' ').length;
                    return 0;
                }
            }
        };
    }
    toString() {
        return this._ssr;
    }
    setAttributeNS(_namespace, name, value) {
        this.setAttribute(name, value);
    }
    setAttribute(name, value) {
        const replacer1 = (_match, p1, p2) => `${p1}${(0, helpers_js_1.escapeHtml)(name)}="${(0, helpers_js_1.escapeHtml)(value)}" ${p2}`;
        const replacer2 = (_match, p1, p2) => `${p1} ${(0, helpers_js_1.escapeHtml)(name)}="${(0, helpers_js_1.escapeHtml)(value)}"${p2}`;
        if (this.isSelfClosing)
            this._ssr = this._ssr.replace(/(^<[a-z0-9]+ )(.+)/gm, replacer1);
        else
            this._ssr = this._ssr.replace(/(^<[^>]+)(.+)/gm, replacer2);
    }
    append(child) {
        this.appendChild(child);
    }
    appendChild(child) {
        const index = this._ssr.lastIndexOf('</');
        this._ssr = this._ssr.substring(0, index) + child + this._ssr.substring(index);
    }
    get children() {
        const reg = /<([a-z0-9]+)((?!<\/\1).)*<\/\1>/gms;
        const array = [];
        let match;
        while ((match = reg.exec(this.innerHTML)) !== null) {
            array.push(match[0].replace(/[\s]+/gm, ' '));
        }
        return array;
    }
    addEventListener(_type, _listener, _options) { }
}
exports.HTMLElementSSR = HTMLElementSSR;
class DocumentSSR {
    constructor() {
        this.body = this.createElement('body');
        this.head = this.createElement('head');
    }
    createElement(tag) {
        return new HTMLElementSSR(tag);
    }
    createElementNS(_URI, tag) {
        return this.createElement(tag);
    }
    createTextNode(text) {
        return (0, helpers_js_1.escapeHtml)(text);
    }
    querySelector(_query) {
        return undefined;
    }
}
exports.DocumentSSR = DocumentSSR;
const documentSSR = () => {
    return new DocumentSSR();
};
exports.documentSSR = documentSSR;
//# sourceMappingURL=regexDom.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/ssr.js":
/*!******************************************!*\
  !*** ./node_modules/nano-jsx/lib/ssr.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clearState = exports.renderSSR = exports.initSSR = void 0;
const core_js_1 = __webpack_require__(/*! ./core.js */ "./node_modules/nano-jsx/lib/core.js");
const regexDom_js_1 = __webpack_require__(/*! ./regexDom.js */ "./node_modules/nano-jsx/lib/regexDom.js");
const state_js_1 = __webpack_require__(/*! ./state.js */ "./node_modules/nano-jsx/lib/state.js");
const helpers_js_1 = __webpack_require__(/*! ./helpers.js */ "./node_modules/nano-jsx/lib/helpers.js");
// functions that should only be available on the server-side
const ssrTricks = {
    isWebComponent: (tagNameOrComponent) => {
        return (typeof tagNameOrComponent === 'string' &&
            tagNameOrComponent.includes('-') &&
            _nano.customElements.has(tagNameOrComponent));
    },
    renderWebComponent: (tagNameOrComponent, props, children, _render) => {
        const customElement = _nano.customElements.get(tagNameOrComponent);
        const component = _render({ component: customElement, props: Object.assign(Object.assign({}, props), { children: children }) });
        // get the html tag and the innerText from string
        // match[1]: HTMLTag
        // match[2]: innerText
        const match = component.toString().match(/^<(?<tag>[a-z]+)>(.*)<\/\k<tag>>$/);
        if (match) {
            const element = document.createElement(match[1]);
            element.innerText = match[2];
            // eslint-disable-next-line no-inner-declarations
            function replacer(match, p1, _offset, _string) {
                return match.replace(p1, '');
            }
            // remove events like onClick from DOM
            element.innerText = element.innerText.replace(/<\w+[^>]*(\s(on\w*)="[^"]*")/gm, replacer);
            return element;
        }
        else {
            return null;
        }
    }
};
const initGlobalVar = () => {
    const isSSR = (0, helpers_js_1.detectSSR)() === true ? true : undefined;
    const location = { pathname: '/' };
    const document = isSSR ? (0, regexDom_js_1.documentSSR)() : window.document;
    globalThis._nano = { isSSR, location, document, customElements: new Map(), ssrTricks };
};
initGlobalVar();
const initSSR = (pathname = '/') => {
    _nano.location = { pathname };
    globalThis.document = _nano.document = (0, core_js_1.isSSR)() ? (0, regexDom_js_1.documentSSR)() : window.document;
};
exports.initSSR = initSSR;
const renderSSR = (component, options = {}) => {
    const { pathname, clearState = true } = options;
    (0, exports.initSSR)(pathname);
    if (clearState)
        state_js_1._state.clear();
    return (0, core_js_1.render)(component, null, true).join('');
};
exports.renderSSR = renderSSR;
const clearState = () => {
    state_js_1._state.clear();
};
exports.clearState = clearState;
//# sourceMappingURL=ssr.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/state.js":
/*!********************************************!*\
  !*** ./node_modules/nano-jsx/lib/state.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._clearState = exports._state = void 0;
/** Holds the state of the whole application. */
exports._state = new Map();
/** Clears the state of the whole application. */
const _clearState = () => {
    exports._state.clear();
};
exports._clearState = _clearState;
//# sourceMappingURL=state.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/store.js":
/*!********************************************!*\
  !*** ./node_modules/nano-jsx/lib/store.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Store = void 0;
const core_js_1 = __webpack_require__(/*! ./core.js */ "./node_modules/nano-jsx/lib/core.js");
class Store {
    /**
     * Create your own Store.
     * @param defaultState Pass the initial State.
     * @param name The name of the Store (only required if you persist the state in localStorage or sessionStorage).
     * @param storage Pass 'memory', 'local' or 'session'.
     */
    constructor(defaultState, name = '', storage = 'memory') {
        this._listeners = new Map();
        if ((0, core_js_1.isSSR)())
            storage = 'memory';
        this._id = name;
        this._storage = storage;
        this._state = this._prevState = defaultState;
        if (storage === 'memory' || !storage)
            return;
        const Storage = storage === 'local' ? localStorage : sessionStorage;
        // get/set initial state of Storage
        const item = Storage.getItem(this._id);
        if (item) {
            this._state = this._prevState = JSON.parse(item);
        }
        else
            Storage.setItem(this._id, JSON.stringify(defaultState));
    }
    persist(newState) {
        if (this._storage === 'memory')
            return;
        const Storage = this._storage === 'local' ? localStorage : sessionStorage;
        Storage.setItem(this._id, JSON.stringify(newState));
    }
    /** Clears the state of the whole store. */
    clear() {
        // @ts-ignore
        this._state = this._prevState = undefined;
        if (this._storage === 'local')
            localStorage.removeItem(this._id);
        else if (this._storage === 'session')
            sessionStorage.removeItem(this._id);
    }
    setState(newState) {
        this.state = newState;
    }
    set state(newState) {
        this._prevState = this._state;
        this._state = newState;
        this.persist(newState);
        this._listeners.forEach(fnc => {
            fnc(this._state, this._prevState);
        });
    }
    get state() {
        return this._state;
    }
    use() {
        const id = Math.random().toString(36).substring(2, 9);
        const _this = this;
        return {
            get state() {
                return _this.state;
            },
            setState: (newState) => {
                this.state = newState;
            },
            subscribe: (fnc) => {
                this._listeners.set(id, fnc);
            },
            cancel: () => {
                if (this._listeners.has(id))
                    this._listeners.delete(id);
            }
        };
    }
}
exports.Store = Store;
//# sourceMappingURL=store.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/types.js":
/*!********************************************!*\
  !*** ./node_modules/nano-jsx/lib/types.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


// fixes an issue in std@0.80.0 (deno)
// interface ReadableStream<R> {
//   getIterator(): any
// }
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/version.js":
/*!**********************************************!*\
  !*** ./node_modules/nano-jsx/lib/version.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VERSION = void 0;
// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
exports.VERSION = '0.0.36';
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/nano-jsx/lib/withStyles.js":
/*!*************************************************!*\
  !*** ./node_modules/nano-jsx/lib/withStyles.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.withStyles = void 0;
const core_js_1 = __webpack_require__(/*! ./core.js */ "./node_modules/nano-jsx/lib/core.js");
const component_js_1 = __webpack_require__(/*! ./component.js */ "./node_modules/nano-jsx/lib/component.js");
const fragment_js_1 = __webpack_require__(/*! ./fragment.js */ "./node_modules/nano-jsx/lib/fragment.js");
const helmet_js_1 = __webpack_require__(/*! ./components/helmet.js */ "./node_modules/nano-jsx/lib/components/helmet.js");
const withStyles = (...styles) => (WrappedComponent) => {
    return class extends component_js_1.Component {
        render() {
            const _a = this.props, { children } = _a, rest = __rest(_a, ["children"]);
            const helmets = [];
            styles.forEach(style => {
                var _a;
                if (typeof style === 'string') {
                    helmets.push((0, core_js_1.h)(helmet_js_1.Helmet, null, (0, core_js_1.h)('style', null, style)));
                }
                else if (typeof style === 'function') {
                    const _style = style();
                    if (typeof _style === 'string') {
                        helmets.push((0, core_js_1.h)(helmet_js_1.Helmet, null, (0, core_js_1.h)('style', null, _style)));
                    }
                }
                else if (typeof style === 'object') {
                    const _style = (_a = style.toString) === null || _a === void 0 ? void 0 : _a.call(style);
                    if (typeof _style === 'string') {
                        helmets.push((0, core_js_1.h)(helmet_js_1.Helmet, null, (0, core_js_1.h)('style', null, _style)));
                    }
                }
            });
            const component = children && children.length > 0
                ? (0, core_js_1.h)(WrappedComponent, Object.assign({}, rest), children)
                : (0, core_js_1.h)(WrappedComponent, Object.assign({}, this.props));
            return (0, core_js_1.h)(fragment_js_1.Fragment, null, ...helmets, component);
        }
    };
};
exports.withStyles = withStyles;
//# sourceMappingURL=withStyles.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WC": () => (/* binding */ WC)
/* harmony export */ });
/* harmony import */ var nano_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-jsx */ "./node_modules/nano-jsx/lib/index.js");
/* harmony import */ var nano_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nano_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _expose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expose */ "./src/expose.tsx");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in nano_jsx__WEBPACK_IMPORTED_MODULE_0__) if(["default","WC"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => nano_jsx__WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);


class WC extends nano_jsx__WEBPACK_IMPORTED_MODULE_0__.Component {
    $(v) {
        const state = (data = {}, cb) => {
            return new Proxy(data, {
                get: (obj, prop) => {
                    if (prop === '_isProxy') {
                        return true;
                    }
                    if ((Array.isArray(obj[prop]) || typeof obj[prop] === 'object') && !obj[prop]._isProxy) {
                        obj[prop] = state(obj[prop], cb);
                    }
                    return obj[prop];
                },
                set: (obj, prop, value) => {
                    if (obj[prop] === value) {
                        return true;
                    }
                    ;
                    obj[prop] = value;
                    cb && cb();
                    return true;
                },
                deleteProperty: (obj, prop) => {
                    delete obj[prop];
                    cb && cb();
                    return true;
                }
            });
        };
        return state(v || {}, () => this.update());
    }
    static expose(tagname, shadow) {
        (0,_expose__WEBPACK_IMPORTED_MODULE_1__.defineAsCustomElements)(this, tagname, shadow);
    }
}


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map