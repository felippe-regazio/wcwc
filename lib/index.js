(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/expose.ts":
/*!***********************!*\
  !*** ./src/expose.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defineAsCustomElements": () => (/* binding */ defineAsCustomElements)
/* harmony export */ });
/* harmony import */ var _load_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./load-styles */ "./src/load-styles.ts");
/* harmony import */ var nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-jsx/lib/core */ "./node_modules/nano-jsx/lib/core.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const defineAsCustomElementsSSR = (component, componentName, _options = {}) => {
    (!/^[a-zA-Z0-9]+-[a-zA-Z0-9]+$/.test(componentName)) ?
        console.log(`Error: WebComponent name "${componentName}" is invalid.`)
        : _nano.customElements.set(componentName, component);
};
const defineAsCustomElements = function (component, componentName, config) {
    if ((0,nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_1__.isSSR)()) {
        defineAsCustomElementsSSR(component, componentName);
        return;
    }
    const _config = config || component.$config || {};
    const _shadow = _config.shadow;
    const _props = _config.props || {};
    customElements.define(componentName, class extends HTMLElement {
        constructor() {
            super();
            this.$root = this.root();
            (0,_load_styles__WEBPACK_IMPORTED_MODULE_0__.loadStyles)(this.tagName.toLocaleLowerCase(), component.$styles, this.$root).catch(void 0);
            const el = this.buildEl((0,nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_1__._render)({
                component,
                props: Object.assign({ ref: (r) => (this.nanoComponentRef = r), children: Array.from(this.childNodes).map(c => (0,nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_1__.render)(c)) }, (this.getInitialProps() || {}))
            }));
            this.appendEl(el);
        }
        static get observedAttributes() {
            return Object.keys(_props);
        }
        root() {
            if (_shadow) {
                this.attachShadow(_shadow);
                return this.shadowRoot;
            }
            else {
                return this;
            }
        }
        getInitialProps() {
            return Object.keys(_props)
                .reduce((acc, attrName) => {
                const attr = _props[attrName];
                if (this.hasAttribute(attrName)) {
                    const attrValue = this.getAttribute(attrName) || attr.default || '';
                    acc[attrName] = attrValue;
                }
                else {
                    acc[attrName] = attr.default;
                }
                if (attr.css) {
                    this.attrToCSSProp(attrName, attr.default);
                }
                return acc;
            }, {});
        }
        attrToCSSProp(name, value) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    try {
                        const attr = _props[name];
                        if (attr && attr.css) {
                            const propName = typeof attr.css === 'string' ? attr.css : name;
                            this.style.setProperty(`--attr-${propName}`, String(value || attr.default || ''));
                        }
                        return resolve(true);
                    }
                    catch (error) {
                        console.error(error);
                        return reject(false);
                    }
                });
            });
        }
        buildEl(contents) {
            return (0,nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_1__.h)(!!this.shadowRoot ? 'div' : 'template', null, contents);
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
            this.attrToCSSProp(name, newValue).catch(void 0);
        }
    });
};


/***/ }),

/***/ "./src/load-styles.ts":
/*!****************************!*\
  !*** ./src/load-styles.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "REGISTERED_STYLE_URL": () => (/* binding */ REGISTERED_STYLE_URL),
/* harmony export */   "loadStyles": () => (/* binding */ loadStyles)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const REGISTERED_STYLE_URL = {};
function loadStyles(symbolicName, styles, origin) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            var _a;
            try {
                if (typeof window === 'undefined' || !styles || !styles.length) {
                    return resolve(true);
                }
                const root = origin.getRootNode();
                const shadowed = root instanceof ShadowRoot;
                if (!shadowed && ((_a = root === null || root === void 0 ? void 0 : root.head) === null || _a === void 0 ? void 0 : _a.querySelector(`link[data-symbolic-name=${symbolicName}]`))) {
                    return resolve(true);
                }
                let styleObjectURL = REGISTERED_STYLE_URL[symbolicName];
                if (!styleObjectURL) {
                    const styleText = (styles.map((s) => s.toString()).join('')).trim();
                    const blob = new Blob([styleText], { type: 'text/css' });
                    styleObjectURL = window.URL.createObjectURL(blob);
                    REGISTERED_STYLE_URL[symbolicName] = styleObjectURL;
                }
                const link = Object.assign(document.createElement('link'), {
                    rel: 'stylesheet',
                    href: styleObjectURL
                });
                link.dataset.symbolicName = symbolicName;
                const target = shadowed ? root : root === null || root === void 0 ? void 0 : root.head;
                target.append(link);
                return resolve(true);
            }
            catch (error) {
                console.error(error);
                return reject(false);
            }
        });
    });
}


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
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WC": () => (/* binding */ WC),
/* harmony export */   "wcwc": () => (/* binding */ wcwc)
/* harmony export */ });
/* harmony import */ var nano_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-jsx */ "./node_modules/nano-jsx/lib/index.js");
/* harmony import */ var nano_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nano_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _expose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expose */ "./src/expose.ts");
/* harmony import */ var nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-jsx/lib/core */ "./node_modules/nano-jsx/lib/core.js");
/* harmony import */ var nano_jsx_lib_fragment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nano-jsx/lib/fragment */ "./node_modules/nano-jsx/lib/fragment.js");




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
    static expose(tagname, options) {
        (0,_expose__WEBPACK_IMPORTED_MODULE_1__.defineAsCustomElements)(this, tagname, options);
    }
}
WC.h = nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_2__.h;
WC.f = nano_jsx_lib_fragment__WEBPACK_IMPORTED_MODULE_3__.Fragment;
const wcwc = { WC };

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNWMkM7QUFDbUI7QUFFOUQsTUFBTSx5QkFBeUIsR0FBRyxDQUFDLFNBQWMsRUFBRSxhQUFxQixFQUFFLFdBQWdCLEVBQUUsRUFBRSxFQUFFO0lBQzlGLENBQUMsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLGFBQWEsZUFBZSxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDekQsQ0FBQyxDQUFDO0FBRUssTUFBTSxzQkFBc0IsR0FJdkIsVUFBVSxTQUFTLEVBQUUsYUFBYSxFQUFFLE1BQU07SUFDcEQsSUFBSSx3REFBSyxFQUFFLEVBQUU7UUFDWCx5QkFBeUIsQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDcEQsT0FBTztLQUNSO0lBRUQsTUFBTSxPQUFPLEdBQW9CLE1BQU0sSUFBSSxTQUFTLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNuRSxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQy9CLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO0lBRW5DLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEtBQU0sU0FBUSxXQUFXO1FBSTVEO1lBQ0UsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV6Qix3REFBVSxDQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFDaEMsU0FBUyxDQUFDLE9BQU8sRUFDakIsSUFBSSxDQUFDLEtBQUssQ0FDWCxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRWhCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQ3JCLDBEQUFPLENBQUM7Z0JBQ04sU0FBUztnQkFDVCxLQUFLLGtCQUNILEdBQUcsRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLEVBQzVDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyx5REFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQ3RELENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUNsQzthQUNGLENBQUMsQ0FDSCxDQUFDO1lBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQixDQUFDO1FBRUQsTUFBTSxLQUFLLGtCQUFrQjtZQUMzQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUVPLElBQUk7WUFDVixJQUFJLE9BQU8sRUFBRTtnQkFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixPQUFPLElBQUksQ0FBQyxVQUF3QixDQUFDO2FBQ3RDO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFDSCxDQUFDO1FBRU8sZUFBZTtZQUNyQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUN2QixNQUFNLENBQUMsQ0FBQyxHQUFRLEVBQUUsUUFBZ0IsRUFBRSxFQUFFO2dCQUNyQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTlCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztvQkFDcEUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsQ0FBQztpQkFDM0I7cUJBQU07b0JBQ0wsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBQzlCO2dCQUVELElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDWixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBYyxDQUFDLENBQUM7aUJBQ25EO2dCQUVELE9BQU8sR0FBRyxDQUFDO1lBQ2IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUVhLGFBQWEsQ0FBQyxJQUFZLEVBQUUsS0FBa0I7O2dCQUMxRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO29CQUNyQyxJQUFJO3dCQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFFMUIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTs0QkFDcEIsTUFBTSxRQUFRLEdBQUcsT0FBTyxJQUFJLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO3lCQUNuRjt3QkFFRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDdEI7b0JBQUMsT0FBTSxLQUFLLEVBQUU7d0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDckIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3RCO2dCQUNILENBQUMsQ0FBQztZQUNKLENBQUM7U0FBQTtRQUVPLE9BQU8sQ0FBQyxRQUFhO1lBRzNCLE9BQU8sb0RBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFFTyxRQUFRLENBQUMsRUFBTztZQUN0QixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNyQixFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JDO1FBQ0gsQ0FBQztRQUVELHdCQUF3QixDQUFDLElBQVksRUFBRSxDQUFNLEVBQUUsUUFBYTtZQUMxRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztZQUM3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSE0sTUFBTSxvQkFBb0IsR0FBOEIsRUFBRSxDQUFDO0FBRTNELFNBQWUsVUFBVSxDQUFDLFlBQW9CLEVBQUUsTUFBa0IsRUFBRSxNQUE4Qjs7UUFDdkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFDckMsSUFBSTtnQkFDRixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQzlELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN0QjtnQkFFRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsV0FBVyxFQUF5QixDQUFDO2dCQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLFlBQVksVUFBVSxDQUFDO2dCQUU1QyxJQUFJLENBQUMsUUFBUSxLQUFJLFVBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLDBDQUFFLGFBQWEsQ0FBQywyQkFBMkIsWUFBWSxHQUFHLENBQUMsR0FBRTtvQkFDdEYsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3RCO2dCQUVELElBQUksY0FBYyxHQUFHLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUV4RCxJQUFJLENBQUMsY0FBYyxFQUFFO29CQUNuQixNQUFNLFNBQVMsR0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUN0RixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFFLFNBQVMsQ0FBRSxFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7b0JBQ3pELGNBQWMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEQsb0JBQW9CLENBQUMsWUFBWSxDQUFDLEdBQUcsY0FBYyxDQUFDO2lCQUNyRDtnQkFFRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ3pELEdBQUcsRUFBRSxZQUFZO29CQUNqQixJQUFJLEVBQUUsY0FBYztpQkFDckIsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztnQkFDekMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLElBQVksYUFBWixJQUFJLHVCQUFKLElBQUksQ0FBVSxJQUFJLENBQUM7Z0JBQ3JELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXBCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RCO1lBQUMsT0FBTSxLQUFLLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckIsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0NBQUE7Ozs7Ozs7Ozs7O0FDeENZO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQjtBQUNqQixxQkFBcUIsbUJBQU8sQ0FBQyw0REFBYztBQUMzQyxrQkFBa0IsbUJBQU8sQ0FBQyxzREFBVztBQUNyQyxtQkFBbUIsbUJBQU8sQ0FBQyx3REFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLEdBQUcsSUFBSTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7Ozs7Ozs7OztBQ25JYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjO0FBQ2QsdUJBQXVCLG1CQUFPLENBQUMsaUVBQWlCO0FBQ2hELGtCQUFrQixtQkFBTyxDQUFDLHVEQUFZO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLElBQUksSUFBSSxNQUFNO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixxQkFBcUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isa0NBQWtDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxxQkFBcUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixlQUFlO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnQ0FBZ0M7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsK0NBQStDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOzs7Ozs7Ozs7O0FDM0lhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxjQUFjO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsV0FBVztBQUNYLHVCQUF1QixtQkFBTyxDQUFDLGlFQUFpQjtBQUNoRCxrQkFBa0IsbUJBQU8sQ0FBQyx1REFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBLHFCQUFxQiw4QkFBOEIsR0FBRyxnREFBZ0Q7QUFDdEc7QUFDQSw4QkFBOEIsSUFBSTtBQUNsQztBQUNBO0FBQ0EsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBO0FBQ0EsaUNBQWlDLCtDQUErQztBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRUFBK0U7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTLElBQUksbUJBQW1CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxvREFBb0Q7QUFDckY7QUFDQTtBQUNBLHVFQUF1RSxLQUFLO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsa0JBQWtCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxXQUFXO0FBQzVDO0FBQ0Esa0NBQWtDLFlBQVk7QUFDOUMsb0JBQW9CLGdCQUFnQjtBQUNwQywyREFBMkQsT0FBTztBQUNsRTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7Ozs7Ozs7Ozs7QUMxRmE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLDBDQUEwQyw0QkFBNEI7QUFDdEUsQ0FBQztBQUNEO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGVBQWUsR0FBRyxnQkFBZ0IsR0FBRyxjQUFjLEdBQUcsWUFBWSxHQUFHLFdBQVcsR0FBRyxjQUFjO0FBQ2pHLGtCQUFrQixtQkFBTyxDQUFDLHFFQUFhO0FBQ3ZDLDBDQUF5QyxFQUFFLHFDQUFxQyw4QkFBOEIsRUFBQztBQUMvRyxlQUFlLG1CQUFPLENBQUMsK0RBQVU7QUFDakMsdUNBQXNDLEVBQUUscUNBQXFDLHdCQUF3QixFQUFDO0FBQ3RHLGdCQUFnQixtQkFBTyxDQUFDLGlFQUFXO0FBQ25DLHdDQUF1QyxFQUFFLHFDQUFxQywwQkFBMEIsRUFBQztBQUN6RyxjQUFjLGdCQUFnQixtQkFBTyxDQUFDLHFFQUFhO0FBQ25ELG9CQUFvQixtQkFBTyxDQUFDLHlFQUFlO0FBQzNDLDRDQUEyQyxFQUFFLHFDQUFxQyxrQ0FBa0MsRUFBQztBQUNySCxtQkFBbUIsbUJBQU8sQ0FBQyx1RUFBYztBQUN6QywyQ0FBMEMsRUFBRSxxQ0FBcUMsZ0NBQWdDLEVBQUM7QUFDbEg7Ozs7Ozs7Ozs7QUNyQ2E7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGNBQWM7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxZQUFZO0FBQ1osdUJBQXVCLG1CQUFPLENBQUMsaUVBQWlCO0FBQ2hELG9CQUFvQixtQkFBTyxDQUFDLHFFQUFhO0FBQ3pDLGtCQUFrQixtQkFBTyxDQUFDLHVEQUFZO0FBQ3RDLHNCQUFzQixtQkFBTyxDQUFDLCtEQUFnQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRixZQUFZO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUyxJQUFJLG1CQUFtQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCx3REFBd0Q7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMENBQTBDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnQ0FBZ0M7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxvREFBb0Qsd0RBQXdEO0FBQzVHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7Ozs7Ozs7OztBQ3JHYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxjQUFjO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMkJBQTJCLEdBQUcsZ0JBQWdCLEdBQUcsWUFBWSxHQUFHLFVBQVUsR0FBRyxhQUFhLEdBQUcsY0FBYyxHQUFHLGNBQWMsR0FBRyxpQkFBaUI7QUFDaEosdUJBQXVCLG1CQUFPLENBQUMsaUVBQWlCO0FBQ2hELGtCQUFrQixtQkFBTyxDQUFDLHVEQUFZO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx1QkFBdUI7QUFDbkMsVUFBVSxPQUFPO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxhQUFhLGNBQWM7QUFDbEY7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixLQUFLO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSx3QkFBd0IsZ0NBQWdDO0FBQ3hEO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQjtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsaUJBQWlCLHVCQUF1QjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Qsa0JBQWtCLFNBQVMsaUNBQWlDO0FBQ3BILEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVUsd0JBQXdCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDBDQUEwQztBQUMzRjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsYUFBYSw0QkFBNEI7QUFDNUYsS0FBSztBQUNMO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7Ozs7Ozs7Ozs7QUNoT2E7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxjQUFjO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZ0JBQWdCO0FBQ2hCLHVCQUF1QixtQkFBTyxDQUFDLGlFQUFpQjtBQUNoRCxrQkFBa0IsbUJBQU8sQ0FBQyx1REFBWTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG9DQUFvQztBQUNyRTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsSUFBSSxHQUFHO0FBQ2pDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxvQ0FBb0M7QUFDekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG9DQUFvQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsaUJBQWlCLG9CQUFvQjtBQUNoRyxpREFBaUQsVUFBVSxvQkFBb0I7QUFDL0UsU0FBUyxJQUFJO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0JBQWdCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7Ozs7Ozs7OztBQzVHYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2Ysa0JBQWtCLG1CQUFPLENBQUMsdURBQVk7QUFDdEMsdUJBQXVCLG1CQUFPLENBQUMsaUVBQWlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVMsSUFBSSxtQkFBbUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsNkNBQTZDO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7Ozs7Ozs7Ozs7QUNsQ2E7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0JBQWtCLEdBQUcscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCLHlFQUF5RSxZQUFZLGVBQWU7QUFDekgsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjs7Ozs7Ozs7OztBQzFCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxTQUFTLEdBQUcsZUFBZSxHQUFHLGVBQWUsR0FBRyxjQUFjLEdBQUcsc0JBQXNCLEdBQUcsaUJBQWlCLEdBQUcsMkJBQTJCLEdBQUcsWUFBWSxHQUFHLGFBQWE7QUFDeEssbUJBQU8sQ0FBQyx3REFBWTtBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixjQUFjO0FBQ2xDO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFFBQVE7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixrQkFBa0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyw0QkFBNEI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLFlBQVksbUJBQW1CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLFlBQVksbUJBQW1CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLG9CQUFvQjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLG9FQUFvRSxZQUFZLG9CQUFvQjtBQUNySDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixFQUFFLEdBQUcsWUFBWTtBQUM5Qyx3QkFBd0I7QUFDeEIsZ0RBQWdELG9CQUFvQjtBQUNwRSwwQkFBMEIsUUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7Ozs7Ozs7OztBQ3pSYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCw4QkFBOEI7QUFDOUIsa0JBQWtCLG1CQUFPLENBQUMsc0RBQVc7QUFDckMsNkZBQTZGO0FBQzdGO0FBQ0EsaURBQWlELGNBQWM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0Esa0ZBQWtGLDBDQUEwQyxJQUFJO0FBQ2hJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHNCQUFzQjtBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLGdEQUFnRDtBQUMzRixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOEJBQThCO0FBQzlCOzs7Ozs7Ozs7O0FDekVhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7Ozs7Ozs7Ozs7QUNQYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsR0FBRyxrQkFBa0IsR0FBRyxvQkFBb0IsR0FBRyxpQkFBaUIsR0FBRyxvQkFBb0IsR0FBRyxZQUFZO0FBQzFILHFCQUFxQixtQkFBTyxDQUFDLDREQUFjO0FBQzNDO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsZ0NBQWdDO0FBQ2hDLGdDQUFnQztBQUNoQyxrQ0FBa0M7QUFDbEMsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSx5Q0FBeUMscUJBQXFCO0FBQzlELGtDQUFrQyxNQUFNLGlJQUFpSSxvQkFBb0I7QUFDN0w7QUFDQSxvQkFBb0I7QUFDcEI7Ozs7Ozs7Ozs7QUNqRWE7QUFDYjtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQ0FBbUMsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDM0Qsa0JBQWU7QUFDZjs7Ozs7Ozs7OztBQ1BhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGFBQWEsR0FBRyxnQkFBZ0IsR0FBRyxlQUFlO0FBQ2xELHVCQUF1QixtQkFBTyxDQUFDLG9FQUFnQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLEVBQUUsT0FBTyxFQUFFLElBQUksR0FBRztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxnQkFBZ0I7QUFDL0IsbUJBQW1CLGtDQUFrQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrQkFBa0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFlBQVksV0FBVztBQUN2QjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBLHNDQUFzQyxNQUFNO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsdUJBQXVCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7Ozs7Ozs7Ozs7QUNqU2E7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsWUFBWTtBQUNaLFlBQVk7QUFDWjs7Ozs7Ozs7OztBQ0phO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHVCQUF1QixtQkFBTyxDQUFDLG9FQUFnQjtBQUMvQyxtQkFBbUIsbUJBQU8sQ0FBQyw0REFBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7QUFDZjs7Ozs7Ozs7OztBQzVCYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxvQ0FBb0M7QUFDbkQ7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlLEdBQUcsb0JBQW9CLEdBQUcsOEJBQThCLEdBQUcsa0JBQWtCLEdBQUcsa0JBQWtCLEdBQUcscUJBQXFCLEdBQUcsYUFBYSxHQUFHLGdCQUFnQixHQUFHLGlCQUFpQixHQUFHLFlBQVksR0FBRyxvQkFBb0IsR0FBRyxtQkFBbUIsR0FBRyxXQUFXLEdBQUcsYUFBYSxHQUFHLGlCQUFpQixHQUFHLFlBQVksR0FBRyxlQUFlLEdBQUcsY0FBYyxHQUFHLFNBQVM7QUFDNVc7QUFDQSxnQkFBZ0IsbUJBQU8sQ0FBQyxzREFBVztBQUNuQyxxQ0FBb0MsRUFBRSxxQ0FBcUMsdUJBQXVCLEVBQUM7QUFDbkcsMENBQXlDLEVBQUUscUNBQXFDLDRCQUE0QixFQUFDO0FBQzdHLDJDQUEwQyxFQUFFLHFDQUFxQyw2QkFBNkIsRUFBQztBQUMvRyx3Q0FBdUMsRUFBRSxxQ0FBcUMsMEJBQTBCLEVBQUM7QUFDekc7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDN0MsNkNBQTRDLEVBQUUscUNBQXFDLG9DQUFvQyxFQUFDO0FBQ3hIO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLDhFQUF1QjtBQUM1QztBQUNBLGtCQUFrQixtQkFBTyxDQUFDLHNEQUFXO0FBQ3JDLHlDQUF3QyxFQUFFLHFDQUFxQywyQkFBMkIsRUFBQztBQUMzRyxpQkFBaUIsbUJBQU8sQ0FBQyxvREFBVTtBQUNuQyxrQkFBZSxLQUFLO0FBQ3BCLGVBQWUsbUJBQU8sQ0FBQyxvREFBVTtBQUNqQyx1Q0FBc0MsRUFBRSxxQ0FBcUMsd0JBQXdCLEVBQUM7QUFDdEcsZ0JBQWdCLG1CQUFPLENBQUMsc0RBQVc7QUFDbkMsK0NBQThDLEVBQUUscUNBQXFDLGlDQUFpQyxFQUFDO0FBQ3ZILG1CQUFtQixtQkFBTyxDQUFDLDREQUFjO0FBQ3pDLGdEQUErQyxFQUFFLHFDQUFxQyxxQ0FBcUMsRUFBQztBQUM1SCx3Q0FBdUMsRUFBRSxxQ0FBcUMsNkJBQTZCLEVBQUM7QUFDNUcsZUFBZSxtQkFBTyxDQUFDLG9EQUFVO0FBQ2pDLDZDQUE0QyxFQUFFLHFDQUFxQyw4QkFBOEIsRUFBQztBQUNsSCxvQkFBb0IsbUJBQU8sQ0FBQyw4REFBZTtBQUMzQyw0Q0FBMkMsRUFBRSxxQ0FBcUMsa0NBQWtDLEVBQUM7QUFDckgsaUJBQWlCLG1CQUFPLENBQUMsd0RBQVk7QUFDckMseUNBQXdDLEVBQUUscUNBQXFDLDRCQUE0QixFQUFDO0FBQzVHLG1CQUFtQixtQkFBTyxDQUFDLDREQUFjO0FBQ3pDLGlEQUFnRCxFQUFFLHFDQUFxQyxzQ0FBc0MsRUFBQztBQUM5SCw4Q0FBNkMsRUFBRSxxQ0FBcUMsbUNBQW1DLEVBQUM7QUFDeEgsc0JBQXNCLG1CQUFPLENBQUMsa0VBQWlCO0FBQy9DLDhDQUE2QyxFQUFFLHFDQUFxQyxzQ0FBc0MsRUFBQztBQUMzSCw4QkFBOEIsbUJBQU8sQ0FBQyxrRkFBeUI7QUFDL0QsMERBQXlELEVBQUUscUNBQXFDLDBEQUEwRCxFQUFDO0FBQzNKO0FBQ0EsbUJBQW1CLG1CQUFPLENBQUMsNERBQWM7QUFDekMsZ0RBQStDLEVBQUUscUNBQXFDLHFDQUFxQyxFQUFDO0FBQzVILG1CQUFtQixtQkFBTyxDQUFDLDREQUFjO0FBQ3pDLDJDQUEwQyxFQUFFLHFDQUFxQyxnQ0FBZ0MsRUFBQztBQUNsSDs7Ozs7Ozs7OztBQzFEYTtBQUNiO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELFdBQVc7QUFDWCxrQkFBa0IsbUJBQU8sQ0FBQyxzREFBVztBQUNyQyxpQ0FBaUMsbUJBQU8sQ0FBQyxvREFBVTtBQUNuRDtBQUNBLFdBQVc7QUFDWDs7Ozs7Ozs7OztBQ1ZhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQixrQkFBa0IsbUJBQU8sQ0FBQyxzREFBVztBQUNyQyxxQkFBcUIsbUJBQU8sQ0FBQyxrRkFBeUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7Ozs7Ozs7Ozs7QUNWYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUIsR0FBRyxtQkFBbUIsR0FBRyxzQkFBc0I7QUFDbEUscUJBQXFCLG1CQUFPLENBQUMsNERBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixLQUFLO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixJQUFJLEtBQUssSUFBSTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxHQUFHLEVBQUUsbUNBQW1DLElBQUksb0NBQW9DLElBQUksR0FBRztBQUN4SSxpREFBaUQsSUFBSSxFQUFFLG1DQUFtQyxJQUFJLG9DQUFvQyxHQUFHLEdBQUc7QUFDeEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25COzs7Ozs7Ozs7O0FDaklhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQixHQUFHLGlCQUFpQixHQUFHLGVBQWU7QUFDeEQsa0JBQWtCLG1CQUFPLENBQUMsc0RBQVc7QUFDckMsc0JBQXNCLG1CQUFPLENBQUMsOERBQWU7QUFDN0MsbUJBQW1CLG1CQUFPLENBQUMsd0RBQVk7QUFDdkMscUJBQXFCLG1CQUFPLENBQUMsNERBQWM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxvQ0FBb0MsK0RBQStELFlBQVksb0JBQW9CLEdBQUc7QUFDdEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsMENBQTBDO0FBQzFDLFlBQVksOEJBQThCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCOzs7Ozs7Ozs7O0FDN0RhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQixHQUFHLGNBQWM7QUFDcEM7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7Ozs7Ozs7Ozs7QUNWYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhO0FBQ2Isa0JBQWtCLG1CQUFPLENBQUMsc0RBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOzs7Ozs7Ozs7O0FDL0VhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7Ozs7Ozs7Ozs7QUNOYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlO0FBQ2Y7QUFDQSxlQUFlO0FBQ2Y7Ozs7Ozs7Ozs7QUNMYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsY0FBYztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQixrQkFBa0IsbUJBQU8sQ0FBQyxzREFBVztBQUNyQyx1QkFBdUIsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDL0Msc0JBQXNCLG1CQUFPLENBQUMsOERBQWU7QUFDN0Msb0JBQW9CLG1CQUFPLENBQUMsZ0ZBQXdCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxXQUFXO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHFFQUFxRTtBQUNyRSxxRUFBcUU7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7Ozs7OztVQ2pEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUM7QUFDYTtBQUNaO0FBQ1c7QUFFMUMsTUFBTSxFQUFHLFNBQVEsK0NBQVM7SUFPL0IsQ0FBQyxDQUFDLENBQVM7UUFDVCxNQUFNLEtBQUssR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLEVBQUUsRUFBYSxFQUFFLEVBQUU7WUFDekMsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQ3JCLEdBQUcsRUFBRSxDQUFDLEdBQVEsRUFBRSxJQUFTLEVBQUUsRUFBRTtvQkFDM0IsSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO3dCQUN2QixPQUFPLElBQUksQ0FBQztxQkFDYjtvQkFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7d0JBQ3RGLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3FCQUNsQztvQkFFRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkIsQ0FBQztnQkFFRCxHQUFHLEVBQUUsQ0FBQyxHQUFRLEVBQUUsSUFBUyxFQUFFLEtBQVUsRUFBRSxFQUFFO29CQUN2QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7d0JBQ3ZCLE9BQU8sSUFBSTtxQkFDWjtvQkFBQSxDQUFDO29CQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7b0JBQ2xCLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztvQkFDWCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUVELGNBQWMsRUFBRSxDQUFDLEdBQVEsRUFBRSxJQUFTLEVBQUUsRUFBRTtvQkFDdEMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2pCLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztvQkFDWCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDO1FBRUYsT0FBTyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFlLEVBQUUsT0FBeUI7UUFDN0QsK0RBQXNCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDOztBQTVDTSxJQUFDLEdBQWEsZ0RBQUMsQ0FBQztBQUNoQixJQUFDLEdBQW9CLDJEQUFRLENBQUM7QUE4Q2hDLE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFBRSxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2N3Yy93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vd2N3Yy8uL3NyYy9leHBvc2UudHMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL3NyYy9sb2FkLXN0eWxlcy50cyIsIndlYnBhY2s6Ly93Y3djLy4vbm9kZV9tb2R1bGVzL25hbm8tanN4L2xpYi9jb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvY29tcG9uZW50cy9oZWxtZXQuanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvY29tcG9uZW50cy9pbWcuanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly93Y3djLy4vbm9kZV9tb2R1bGVzL25hbm8tanN4L2xpYi9jb21wb25lbnRzL2xpbmsuanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvY29tcG9uZW50cy9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvY29tcG9uZW50cy9zdXNwZW5zZS5qcyIsIndlYnBhY2s6Ly93Y3djLy4vbm9kZV9tb2R1bGVzL25hbm8tanN4L2xpYi9jb21wb25lbnRzL3Zpc2libGUuanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvY29udGV4dC5qcyIsIndlYnBhY2s6Ly93Y3djLy4vbm9kZV9tb2R1bGVzL25hbm8tanN4L2xpYi9jb3JlLmpzIiwid2VicGFjazovL3djd2MvLi9ub2RlX21vZHVsZXMvbmFuby1qc3gvbGliL2N1c3RvbUVsZW1lbnRzTW9kZS5qcyIsIndlYnBhY2s6Ly93Y3djLy4vbm9kZV9tb2R1bGVzL25hbm8tanN4L2xpYi9mcmFnbWVudC5qcyIsIndlYnBhY2s6Ly93Y3djLy4vbm9kZV9tb2R1bGVzL25hbm8tanN4L2xpYi9oZWxwZXJzLmpzIiwid2VicGFjazovL3djd2MvLi9ub2RlX21vZHVsZXMvbmFuby1qc3gvbGliL2h0bS5qcyIsIndlYnBhY2s6Ly93Y3djLy4vbm9kZV9tb2R1bGVzL25hbm8tanN4L2xpYi9odG0vYnVpbGQuanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvaHRtL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly93Y3djLy4vbm9kZV9tb2R1bGVzL25hbm8tanN4L2xpYi9odG0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvanN4LmpzIiwid2VicGFjazovL3djd2MvLi9ub2RlX21vZHVsZXMvbmFuby1qc3gvbGliL2xhenkuanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvcmVnZXhEb20uanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvc3NyLmpzIiwid2VicGFjazovL3djd2MvLi9ub2RlX21vZHVsZXMvbmFuby1qc3gvbGliL3N0YXRlLmpzIiwid2VicGFjazovL3djd2MvLi9ub2RlX21vZHVsZXMvbmFuby1qc3gvbGliL3N0b3JlLmpzIiwid2VicGFjazovL3djd2MvLi9ub2RlX21vZHVsZXMvbmFuby1qc3gvbGliL3R5cGVzLmpzIiwid2VicGFjazovL3djd2MvLi9ub2RlX21vZHVsZXMvbmFuby1qc3gvbGliL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vd2N3Yy8uL25vZGVfbW9kdWxlcy9uYW5vLWpzeC9saWIvd2l0aFN0eWxlcy5qcyIsIndlYnBhY2s6Ly93Y3djL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3djd2Mvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vd2N3Yy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2N3Yy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3djd2Mvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93Y3djLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiaW1wb3J0IHsgbG9hZFN0eWxlcyB9IGZyb20gJy4vbG9hZC1zdHlsZXMnO1xuaW1wb3J0IHsgaCwgaXNTU1IsIHJlbmRlciwgX3JlbmRlciB9IGZyb20gJ25hbm8tanN4L2xpYi9jb3JlJztcblxuY29uc3QgZGVmaW5lQXNDdXN0b21FbGVtZW50c1NTUiA9IChjb21wb25lbnQ6IGFueSwgY29tcG9uZW50TmFtZTogc3RyaW5nLCBfb3B0aW9uczogYW55ID0ge30pID0+IHtcbiAgKCEvXlthLXpBLVowLTldKy1bYS16QS1aMC05XSskLy50ZXN0KGNvbXBvbmVudE5hbWUpKSA/XG4gICAgY29uc29sZS5sb2coYEVycm9yOiBXZWJDb21wb25lbnQgbmFtZSBcIiR7Y29tcG9uZW50TmFtZX1cIiBpcyBpbnZhbGlkLmApXG4gICAgOiBfbmFuby5jdXN0b21FbGVtZW50cy5zZXQoY29tcG9uZW50TmFtZSwgY29tcG9uZW50KTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWZpbmVBc0N1c3RvbUVsZW1lbnRzOiAoXG4gIGNvbXBvbmVudDogYW55LFxuICBjb21wb25lbnROYW1lOiBzdHJpbmcsXG4gIGNvbmZpZz86IENvbXBvbmVudENvbmZpZ1xuKSA9PiB2b2lkID0gZnVuY3Rpb24gKGNvbXBvbmVudCwgY29tcG9uZW50TmFtZSwgY29uZmlnKSB7XG4gIGlmIChpc1NTUigpKSB7XG4gICAgZGVmaW5lQXNDdXN0b21FbGVtZW50c1NTUihjb21wb25lbnQsIGNvbXBvbmVudE5hbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IF9jb25maWc6IENvbXBvbmVudENvbmZpZyA9IGNvbmZpZyB8fCBjb21wb25lbnQuJGNvbmZpZyB8fCB7fTtcbiAgY29uc3QgX3NoYWRvdyA9IF9jb25maWcuc2hhZG93O1xuICBjb25zdCBfcHJvcHMgPSBfY29uZmlnLnByb3BzIHx8IHt9O1xuXG4gIGN1c3RvbUVsZW1lbnRzLmRlZmluZShjb21wb25lbnROYW1lLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBuYW5vQ29tcG9uZW50UmVmOiBhbnk7XG4gICAgJHJvb3Q6IFNoYWRvd1Jvb3R8SFRNTEVsZW1lbnQ7ICAgIFxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy4kcm9vdCA9IHRoaXMucm9vdCgpO1xuXG4gICAgICBsb2FkU3R5bGVzKFxuICAgICAgICB0aGlzLnRhZ05hbWUudG9Mb2NhbGVMb3dlckNhc2UoKSwgXG4gICAgICAgIGNvbXBvbmVudC4kc3R5bGVzLFxuICAgICAgICB0aGlzLiRyb290XG4gICAgICApLmNhdGNoKHZvaWQgMCk7XG4gICAgICBcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5idWlsZEVsKFxuICAgICAgICBfcmVuZGVyKHtcbiAgICAgICAgICBjb21wb25lbnQsXG4gICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIHJlZjogKHI6IGFueSkgPT4gKHRoaXMubmFub0NvbXBvbmVudFJlZiA9IHIpLFxuICAgICAgICAgICAgY2hpbGRyZW46IEFycmF5LmZyb20odGhpcy5jaGlsZE5vZGVzKS5tYXAoYyA9PiByZW5kZXIoYykpLFxuICAgICAgICAgICAgLi4uKHRoaXMuZ2V0SW5pdGlhbFByb3BzKCkgfHwge30pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIFxuICAgICAgdGhpcy5hcHBlbmRFbChlbCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoX3Byb3BzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJvb3QoKSB7XG4gICAgICBpZiAoX3NoYWRvdykge1xuICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyhfc2hhZG93KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hhZG93Um9vdCBhcyBTaGFkb3dSb290O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRJbml0aWFsUHJvcHMoKTogdW5rbm93biB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoX3Byb3BzKVxuICAgICAgICAucmVkdWNlKChhY2M6IGFueSwgYXR0ck5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IGF0dHIgPSBfcHJvcHNbYXR0ck5hbWVdO1xuXG4gICAgICAgICAgaWYgKHRoaXMuaGFzQXR0cmlidXRlKGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgYXR0clZhbHVlID0gdGhpcy5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpIHx8IGF0dHIuZGVmYXVsdCB8fCAnJztcbiAgICAgICAgICAgIGFjY1thdHRyTmFtZV0gPSBhdHRyVmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1thdHRyTmFtZV0gPSBhdHRyLmRlZmF1bHQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGF0dHIuY3NzKSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJUb0NTU1Byb3AoYXR0ck5hbWUsIGF0dHIuZGVmYXVsdCBhcyBhbnkpO1xuICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBhdHRyVG9DU1NQcm9wKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZ3xudWxsKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGF0dHIgPSBfcHJvcHNbbmFtZV07XG5cbiAgICAgICAgICBpZiAoYXR0ciAmJiBhdHRyLmNzcykge1xuICAgICAgICAgICAgY29uc3QgcHJvcE5hbWUgPSB0eXBlb2YgYXR0ci5jc3MgPT09ICdzdHJpbmcnID8gYXR0ci5jc3MgOiBuYW1lO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShgLS1hdHRyLSR7cHJvcE5hbWV9YCwgU3RyaW5nKHZhbHVlIHx8IGF0dHIuZGVmYXVsdCB8fCAnJykpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpO1xuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBidWlsZEVsKGNvbnRlbnRzOiBhbnkpIHtcbiAgICAgIC8vIGJlY2F1c2UgbmFuby1qc3ggdXBkYXRlIG5lZWRzIGEgXCJlbC5wYXJlbnRFbGVtZW50XCIgd2UgbmVlZCBcbiAgICAgIC8vIHRvIHdyYXAgdGhlIGNoaWxkcmVuIGluIGEgZGl2IHdoZW4gdXNpbmcgc2hhZG93IG1vZGVcbiAgICAgIHJldHVybiBoKCEhdGhpcy5zaGFkb3dSb290ID8gJ2RpdicgOiAndGVtcGxhdGUnLCBudWxsLCBjb250ZW50cyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmRFbChlbDogYW55KSB7XG4gICAgICBpZiAoISF0aGlzLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgZWwuZGF0YXNldC53Y1Jvb3QgPSB0cnVlO1xuICAgICAgICB0aGlzLiRyb290LmFwcGVuZChlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRyb290LmFwcGVuZCguLi5lbC5jaGlsZE5vZGVzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZTogc3RyaW5nLCBfOiBhbnksIG5ld1ZhbHVlOiBhbnkpIHtcbiAgICAgIHRoaXMubmFub0NvbXBvbmVudFJlZi5wcm9wc1tuYW1lXSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5uYW5vQ29tcG9uZW50UmVmLnVwZGF0ZSgpO1xuICAgICAgdGhpcy5hdHRyVG9DU1NQcm9wKG5hbWUsIG5ld1ZhbHVlKS5jYXRjaCh2b2lkIDApO1xuICAgIH1cbiAgfSk7XG59IiwiZXhwb3J0IGNvbnN0IFJFR0lTVEVSRURfU1RZTEVfVVJMOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkU3R5bGVzKHN5bWJvbGljTmFtZTogc3RyaW5nLCBzdHlsZXM6ICcqLnNjc3MnW10sIG9yaWdpbjogSFRNTEVsZW1lbnR8U2hhZG93Um9vdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIXN0eWxlcyB8fCAhc3R5bGVzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH1cbiAgXG4gICAgICBjb25zdCByb290ID0gb3JpZ2luLmdldFJvb3ROb2RlKCkgYXMgRG9jdW1lbnR8U2hhZG93Um9vdDtcbiAgICAgIGNvbnN0IHNoYWRvd2VkID0gcm9vdCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG4gIFxuICAgICAgaWYgKCFzaGFkb3dlZCAmJiByb290Py5oZWFkPy5xdWVyeVNlbGVjdG9yKGBsaW5rW2RhdGEtc3ltYm9saWMtbmFtZT0ke3N5bWJvbGljTmFtZX1dYCkpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9XG4gIFxuICAgICAgbGV0IHN0eWxlT2JqZWN0VVJMID0gUkVHSVNURVJFRF9TVFlMRV9VUkxbc3ltYm9saWNOYW1lXTtcbiAgXG4gICAgICBpZiAoIXN0eWxlT2JqZWN0VVJMKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlVGV4dDogc3RyaW5nID0gKHN0eWxlcy5tYXAoKHM6ICcqLnNjc3MnKSA9PiBzLnRvU3RyaW5nKCkpLmpvaW4oJycpKS50cmltKCk7XG4gICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbIHN0eWxlVGV4dCBdLCB7dHlwZTogJ3RleHQvY3NzJ30pO1xuICAgICAgICBzdHlsZU9iamVjdFVSTCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgICBSRUdJU1RFUkVEX1NUWUxFX1VSTFtzeW1ib2xpY05hbWVdID0gc3R5bGVPYmplY3RVUkw7XG4gICAgICB9XG4gIFxuICAgICAgY29uc3QgbGluayA9IE9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpLCB7XG4gICAgICAgIHJlbDogJ3N0eWxlc2hlZXQnLFxuICAgICAgICBocmVmOiBzdHlsZU9iamVjdFVSTFxuICAgICAgfSk7XG4gIFxuICAgICAgbGluay5kYXRhc2V0LnN5bWJvbGljTmFtZSA9IHN5bWJvbGljTmFtZTtcbiAgICAgIGNvbnN0IHRhcmdldCA9IHNoYWRvd2VkID8gcm9vdCA6IChyb290IGFzIGFueSk/LmhlYWQ7XG4gICAgICB0YXJnZXQuYXBwZW5kKGxpbmspO1xuICAgICAgXG4gICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcbiAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIHJldHVybiByZWplY3QoZmFsc2UpO1xuICAgIH1cbiAgfSlcbn0iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNvbXBvbmVudCA9IHZvaWQgMDtcclxuY29uc3QgaGVscGVyc19qc18xID0gcmVxdWlyZShcIi4vaGVscGVycy5qc1wiKTtcclxuY29uc3QgY29yZV9qc18xID0gcmVxdWlyZShcIi4vY29yZS5qc1wiKTtcclxuY29uc3Qgc3RhdGVfanNfMSA9IHJlcXVpcmUoXCIuL3N0YXRlLmpzXCIpO1xyXG5jbGFzcyBDb21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICB0aGlzLl9lbGVtZW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NraXBVbm1vdW50ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5faGFzVW5tb3VudGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHt9O1xyXG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLl9nZXRIYXNoKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGlzQ2xhc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBnZXQgaXNDbGFzcygpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHNldFN0YXRlKHN0YXRlLCBzaG91bGRVcGRhdGUgPSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IGlzT2JqZWN0ID0gdHlwZW9mIHN0YXRlID09PSAnb2JqZWN0JyAmJiBzdGF0ZSAhPT0gbnVsbDtcclxuICAgICAgICAvLyBpZiBzdGF0ZSBpcyBhbiBvYmplY3QsIHdlIG1lcmdlIHRoZSBvYmplY3RzXHJcbiAgICAgICAgaWYgKGlzT2JqZWN0ICYmIHRoaXMuc3RhdGUgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSksIHN0YXRlKTtcclxuICAgICAgICAvLyBlbHNlLCB3ZSBqdXN0IG92ZXJ3cml0ZSBpdFxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIGlmIChzaG91bGRVcGRhdGUpXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBzZXQgc3RhdGUoc3RhdGUpIHtcclxuICAgICAgICBzdGF0ZV9qc18xLl9zdGF0ZS5zZXQodGhpcy5pZCwgc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZV9qc18xLl9zdGF0ZS5nZXQodGhpcy5pZCk7XHJcbiAgICB9XHJcbiAgICBzZXQgaW5pdFN0YXRlKHN0YXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgfVxyXG4gICAgLyoqIFJldHVybnMgYWxsIGN1cnJlbnRseSByZW5kZXJlZCBub2RlIGVsZW1lbnRzICovXHJcbiAgICBnZXQgZWxlbWVudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRzIHx8IFtdO1xyXG4gICAgfVxyXG4gICAgc2V0IGVsZW1lbnRzKGVsZW1lbnRzKSB7XHJcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGVsZW1lbnRzKSlcclxuICAgICAgICAgICAgZWxlbWVudHMgPSBbZWxlbWVudHNdO1xyXG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnRzLnB1c2goZWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBfYWRkTm9kZVJlbW92ZUxpc3RlbmVyKCkge1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGRpZFVubW91bnQgaXMgdW51c2VkXHJcbiAgICAgICAgaWYgKC9eW157XSt7XFxzK30kL2dtLnRlc3QodGhpcy5kaWRVbm1vdW50LnRvU3RyaW5nKCkpKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gbGlzdGVuIGlmIHRoZSByb290IGVsZW1lbnRzIGdldHMgcmVtb3ZlZFxyXG4gICAgICAgICgwLCBoZWxwZXJzX2pzXzEub25Ob2RlUmVtb3ZlKSh0aGlzLmVsZW1lbnRzWzBdLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fc2tpcFVubW91bnQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaWRVbm1vdW50KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBfZGlkTW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5fYWRkTm9kZVJlbW92ZUxpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy5kaWRNb3VudCgpO1xyXG4gICAgfVxyXG4gICAgX3dpbGxVcGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy53aWxsVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBfZGlkVXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuZGlkVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBfZGlkVW5tb3VudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5faGFzVW5tb3VudGVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5kaWRVbm1vdW50KCk7XHJcbiAgICAgICAgdGhpcy5faGFzVW5tb3VudGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHdpbGxNb3VudCgpIHsgfVxyXG4gICAgZGlkTW91bnQoKSB7IH1cclxuICAgIHdpbGxVcGRhdGUoKSB7IH1cclxuICAgIGRpZFVwZGF0ZSgpIHsgfVxyXG4gICAgZGlkVW5tb3VudCgpIHsgfVxyXG4gICAgcmVuZGVyKF91cGRhdGUpIHsgfVxyXG4gICAgLyoqIFdpbGwgZm9yY2VSZW5kZXIgdGhlIGNvbXBvbmVudCAqL1xyXG4gICAgdXBkYXRlKHVwZGF0ZSkge1xyXG4gICAgICAgIHRoaXMuX3NraXBVbm1vdW50ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl93aWxsVXBkYXRlKCk7XHJcbiAgICAgICAgLy8gZ2V0IGFsbCBjdXJyZW50IHJlbmRlcmVkIG5vZGUgZWxlbWVudHNcclxuICAgICAgICBjb25zdCBvbGRFbGVtZW50cyA9IFsuLi50aGlzLmVsZW1lbnRzXTtcclxuICAgICAgICAvLyBjbGVhclxyXG4gICAgICAgIHRoaXMuX2VsZW1lbnRzID0gW107XHJcbiAgICAgICAgbGV0IGVsID0gdGhpcy5yZW5kZXIodXBkYXRlKTtcclxuICAgICAgICBlbCA9ICgwLCBjb3JlX2pzXzEuX3JlbmRlcikoZWwpO1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBlbDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnb2xkOiAnLCBvbGRFbGVtZW50cylcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnbmV3OiAnLCB0aGlzLmVsZW1lbnRzKVxyXG4gICAgICAgIC8vIGdldCB2YWxpZCBwYXJlbnQgbm9kZVxyXG4gICAgICAgIGNvbnN0IHBhcmVudCA9IG9sZEVsZW1lbnRzWzBdLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGhhdmUgYSBwYXJlbnRcclxuICAgICAgICBpZiAoIXBhcmVudClcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdDb21wb25lbnQgbmVlZHMgYSBwYXJlbnQgZWxlbWVudCB0byBnZXQgdXBkYXRlZCEnKTtcclxuICAgICAgICAvLyBhZGQgYWxsIG5ldyBub2RlIGVsZW1lbnRzXHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocGFyZW50KVxyXG4gICAgICAgICAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgb2xkRWxlbWVudHNbMF0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHJlbW92ZSBhbGwgZWxlbWVudHNcclxuICAgICAgICBvbGRFbGVtZW50cy5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICAvLyB3ZWUga2VlcCB0aGUgZWxlbWVudCBpZiBpdCBpcyB0aGUgc2FtZSwgZm9yIGV4YW1wbGUgaWYgcGFzc2VkIGFzIGEgY2hpbGRcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRzLmluY2x1ZGVzKGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBjaGlsZCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBsaXN0ZW4gZm9yIG5vZGUgcmVtb3ZhbFxyXG4gICAgICAgIHRoaXMuX2FkZE5vZGVSZW1vdmVMaXN0ZW5lcigpO1xyXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcclxuICAgICAgICAoMCwgY29yZV9qc18xLnRpY2spKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2tpcFVubW91bnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRzWzBdLmlzQ29ubmVjdGVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlkVW5tb3VudCgpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaWRVcGRhdGUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIF9nZXRIYXNoKCkgeyB9XHJcbn1cclxuZXhwb3J0cy5Db21wb25lbnQgPSBDb21wb25lbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBvbmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkhlbG1ldCA9IHZvaWQgMDtcclxuY29uc3QgY29tcG9uZW50X2pzXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50LmpzXCIpO1xyXG5jb25zdCBjb3JlX2pzXzEgPSByZXF1aXJlKFwiLi4vY29yZS5qc1wiKTtcclxuY2xhc3MgQXR0cmlidXRlcyBleHRlbmRzIE1hcCB7XHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICBsZXQgc3RyaW5nID0gJyc7XHJcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgdGhpcylcclxuICAgICAgICAgICAgc3RyaW5nICs9IGAgJHtrZXl9PVwiJHt2YWx1ZX1cImA7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZy50cmltKCk7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgSGVsbWV0IGV4dGVuZHMgY29tcG9uZW50X2pzXzEuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBTU1IoYm9keSkge1xyXG4gICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgY29uc3QgcmVnID0gLyg8aGVsbWV0XFxiW14+XSo+KSgoLnxcXHJ8XFxuKSo/KSg8XFwvaGVsbWV0PikvZ207XHJcbiAgICAgICAgLy8gY29sbGVjdCBhbGwgZWxlbWVudHNcclxuICAgICAgICBjb25zdCBoZWFkID0gW107XHJcbiAgICAgICAgY29uc3QgZm9vdGVyID0gW107XHJcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IHtcclxuICAgICAgICAgICAgaHRtbDogbmV3IEF0dHJpYnV0ZXMoKSxcclxuICAgICAgICAgICAgYm9keTogbmV3IEF0dHJpYnV0ZXMoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gZ2V0IHdoYXQncyBpbiB0aGUgaGVhZFxyXG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmhlYWQpIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gW107XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5oZWFkLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIHNhbWUgZWxlbWVudCBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlYWQuaW5kZXhPZihjaGlsZHJlbltpXSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZC5wdXNoKGNoaWxkcmVuW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzdWx0O1xyXG4gICAgICAgIHdoaWxlICgocmVzdWx0ID0gcmVnLmV4ZWMoYm9keSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0ID0gcmVzdWx0WzFdO1xyXG4gICAgICAgICAgICBsZXQgc2Vjb25kID0gcmVzdWx0WzJdO1xyXG4gICAgICAgICAgICBjb25zdCByZWdIVE1MID0gLzxodG1sXFxzKFtePl0rKT48XFwvaHRtbD4vZ207XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZ0JvZHkgPSAvPGJvZHlcXHMoW14+XSspPjxcXC9ib2R5Pi9nbTtcclxuICAgICAgICAgICAgY29uc3QgcmVnQXR0ciA9IC8oXFx3Kyk9XCIoW15cIl0rKVwiL2dtO1xyXG4gICAgICAgICAgICBsZXQgcmVzID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gZXh0cmFjdCBodG1sIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgKF9hID0gYm9keS5tYXRjaChyZWdIVE1MKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBzZWNvbmQucmVwbGFjZShoLCAnJyk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoKHJlcyA9IHJlZ0F0dHIuZXhlYyhoKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmh0bWwuc2V0KHJlc1sxXSwgcmVzWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIGV4dHJhY3QgYm9keSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgIChfYiA9IGJvZHkubWF0Y2gocmVnQm9keSkpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5mb3JFYWNoKGIgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2Vjb25kID0gc2Vjb25kLnJlcGxhY2UoYiwgJycpO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKChyZXMgPSByZWdBdHRyLmV4ZWMoYikpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlcy5ib2R5LnNldChyZXNbMV0sIHJlc1syXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCB0b0hlYWQgPSBmaXJzdC5pbmNsdWRlcygnZGF0YS1wbGFjZW1lbnQ9XCJoZWFkXCInKTtcclxuICAgICAgICAgICAgLy8gZG8gbm90IGFkZCBhbiBlbGVtZW50IGlmIGl0IGFscmVhZHkgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmICh0b0hlYWQgJiYgIWhlYWQuaW5jbHVkZXMoc2Vjb25kKSlcclxuICAgICAgICAgICAgICAgIGhlYWQucHVzaChzZWNvbmQpO1xyXG4gICAgICAgICAgICBlbHNlIGlmICghdG9IZWFkICYmICFmb290ZXIuaW5jbHVkZXMoc2Vjb25kKSlcclxuICAgICAgICAgICAgICAgIGZvb3Rlci5wdXNoKHNlY29uZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNsZWFuIHRoZSBib2R5IGZyb20gYWxsIG1hdGNoZXNcclxuICAgICAgICBjb25zdCBjbGVhbkJvZHkgPSBib2R5LnJlcGxhY2UocmVnLCAnJyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYm9keTogY2xlYW5Cb2R5LFxyXG4gICAgICAgICAgICBoZWFkOiBoZWFkLFxyXG4gICAgICAgICAgICBmb290ZXI6IGZvb3RlcixcclxuICAgICAgICAgICAgYXR0cmlidXRlc1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBkaWRNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gaWYgaXQgaXMgbm90IGFuIGh0bWwgZWxlbWVudFxyXG4gICAgICAgICAgICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgPSB0aGlzLnByb3BzLmZvb3RlciA/IGRvY3VtZW50LmJvZHkgOiBkb2N1bWVudC5oZWFkO1xyXG4gICAgICAgICAgICBjb25zdCB0YWcgPSBlbGVtZW50LnRhZ05hbWU7XHJcbiAgICAgICAgICAgIGxldCBhdHRycyA9IFtdO1xyXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGlubmVyIHRleHRcclxuICAgICAgICAgICAgYXR0cnMucHVzaChlbGVtZW50LmlubmVyVGV4dCk7XHJcbiAgICAgICAgICAgIC8vIGdldCBhbGwgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICBmb3IgKGxldCBhdHRyID0gMDsgYXR0ciA8IGVsZW1lbnQuYXR0cmlidXRlcy5sZW5ndGg7IGF0dHIrKykge1xyXG4gICAgICAgICAgICAgICAgYXR0cnMucHVzaCgoX2EgPSBlbGVtZW50LmF0dHJpYnV0ZXMuaXRlbShhdHRyKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgICAgICBhdHRycy5wdXNoKChfYiA9IGVsZW1lbnQuYXR0cmlidXRlcy5pdGVtKGF0dHIpKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IudmFsdWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gaGFuZGxlIHNwZWNpYWwgdGFnc1xyXG4gICAgICAgICAgICBpZiAodGFnID09PSAnSFRNTCcgfHwgdGFnID09PSAnQk9EWScpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGh0bWxUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpWzBdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgYXR0ciA9IDE7IGF0dHIgPCBhdHRycy5sZW5ndGg7IGF0dHIgKz0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWxUYWcuc2V0QXR0cmlidXRlKGF0dHJzW2F0dHJdLCBhdHRyc1thdHRyICsgMV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHRhZyA9PT0gJ1RJVExFJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1RJVExFJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGl0bGVUYWdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZVRhZ3NbMF0udGV4dCA9IGUudGV4dDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlVGFnID0gKDAsIGNvcmVfanNfMS5oKSgndGl0bGUnLCBudWxsLCBlbGVtZW50LmlubmVySFRNTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgKDAsIGNvcmVfanNfMS5hcHBlbmRDaGlsZHJlbikocGFyZW50LCBbdGl0bGVUYWddLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgdGhlIGVsZW1lbnQgYWxyZWFkeSBleGlzdHNcclxuICAgICAgICAgICAgbGV0IGV4aXN0cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhdHRycyA9IGF0dHJzLnNvcnQoKTtcclxuICAgICAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXR0cnMyID0gW107XHJcbiAgICAgICAgICAgICAgICAvLyBnZXQgdGhlIGlubmVyIHRleHRcclxuICAgICAgICAgICAgICAgIGF0dHJzMi5wdXNoKGVsW2ldLmlubmVyVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBhdHRyID0gMDsgYXR0ciA8IGVsW2ldLmF0dHJpYnV0ZXMubGVuZ3RoOyBhdHRyKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhdHRyczIucHVzaCgoX2MgPSBlbFtpXS5hdHRyaWJ1dGVzLml0ZW0oYXR0cikpID09PSBudWxsIHx8IF9jID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYy5uYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0dHJzMi5wdXNoKChfZCA9IGVsW2ldLmF0dHJpYnV0ZXMuaXRlbShhdHRyKSkgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXR0cnMyID0gYXR0cnMyLnNvcnQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChhdHRycy5sZW5ndGggPiAwICYmIGF0dHJzMi5sZW5ndGggPiAwICYmIEpTT04uc3RyaW5naWZ5KGF0dHJzKSA9PT0gSlNPTi5zdHJpbmdpZnkoYXR0cnMyKSlcclxuICAgICAgICAgICAgICAgICAgICBleGlzdHMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGFkZCB0byBkb21cclxuICAgICAgICAgICAgaWYgKCFleGlzdHMpXHJcbiAgICAgICAgICAgICAgICAoMCwgY29yZV9qc18xLmFwcGVuZENoaWxkcmVuKShwYXJlbnQsIFtlbGVtZW50XSwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IHBsYWNlbWVudCA9IHRoaXMucHJvcHMuZm9vdGVyID8gJ2Zvb3RlcicgOiAnaGVhZCc7XHJcbiAgICAgICAgaWYgKCgwLCBjb3JlX2pzXzEuaXNTU1IpKCkpXHJcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29yZV9qc18xLmgpKCdoZWxtZXQnLCB7ICdkYXRhLXNzcic6IHRydWUsICdkYXRhLXBsYWNlbWVudCc6IHBsYWNlbWVudCB9LCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkhlbG1ldCA9IEhlbG1ldDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVsbWV0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkltZyA9IHZvaWQgMDtcclxuY29uc3QgY29tcG9uZW50X2pzXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50LmpzXCIpO1xyXG5jb25zdCBjb3JlX2pzXzEgPSByZXF1aXJlKFwiLi4vY29yZS5qc1wiKTtcclxuLyoqXHJcbiAqIEEgdXNlZnVsIEltYWdlIGNvbXBvbmVudFxyXG4gKiBBZGQgPEltZyBsYXp5IC4uLiwgdG8gbGF6eSBsb2FkIHRoZSBpbWcgc291cmNlXHJcbiAqIEFkZCA8SW1nIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgLi4uLCB0byBzcGVjaWZ5IGltZyBlbGVtZW50J3Mgc2l6ZS5cclxuICogQWRkIDxJbWcgcGxhY2Vob2xkZXI9XCJzcmMgb3IgZWxlbWVudFwiIC4uLi4sIHRvIHByZXBhcmUgcGxhY2Vob2xkZXIgZm9yIGltZy5cclxuICovXHJcbmNsYXNzIEltZyBleHRlbmRzIGNvbXBvbmVudF9qc18xLkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICBjb25zdCB7IHNyYywga2V5IH0gPSBwcm9wcztcclxuICAgICAgICAvLyBpZCBoYXMgdG8gYmUgdW5pcXVlXHJcbiAgICAgICAgdGhpcy5pZCA9IGAkeygwLCBjb3JlX2pzXzEuc3RyVG9IYXNoKShzcmMpfS0keygwLCBjb3JlX2pzXzEuc3RyVG9IYXNoKShKU09OLnN0cmluZ2lmeShwcm9wcykpfWA7XHJcbiAgICAgICAgaWYgKGtleSlcclxuICAgICAgICAgICAgdGhpcy5pZCArPSBga2V5LSR7a2V5fWA7XHJcbiAgICAgICAgLy8gdGhpcyBjb3VsZCBhbHNvIGJlIGRvbmUgaW4gd2lsbE1vdW50KClcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUpXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvYWRlZDogZmFsc2UsIGltYWdlOiB1bmRlZmluZWQgfSk7XHJcbiAgICB9XHJcbiAgICBkaWRNb3VudCgpIHtcclxuICAgICAgICBjb25zdCBfYSA9IHRoaXMucHJvcHMsIHsgbGF6eSA9IHRydWUsIHBsYWNlaG9sZGVyLCBjaGlsZHJlbiwga2V5LCByZWYgfSA9IF9hLCByZXN0ID0gX19yZXN0KF9hLCBbXCJsYXp5XCIsIFwicGxhY2Vob2xkZXJcIiwgXCJjaGlsZHJlblwiLCBcImtleVwiLCBcInJlZlwiXSk7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBsYXp5ID09PSAnYm9vbGVhbicgJiYgbGF6eSA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcclxuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmltYWdlID0gKDAsIGNvcmVfanNfMS5oKSgnaW1nJywgT2JqZWN0LmFzc2lnbih7fSwgcmVzdCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmltYWdlLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuaXNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5pbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmlzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCB7IHRocmVzaG9sZDogWzAsIDFdIH0pO1xyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50c1swXSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgX2EgPSB0aGlzLnByb3BzLCB7IHNyYywgcGxhY2Vob2xkZXIsIGNoaWxkcmVuLCBsYXp5ID0gdHJ1ZSwga2V5LCByZWYgfSA9IF9hLCByZXN0ID0gX19yZXN0KF9hLCBbXCJzcmNcIiwgXCJwbGFjZWhvbGRlclwiLCBcImNoaWxkcmVuXCIsIFwibGF6eVwiLCBcImtleVwiLCBcInJlZlwiXSk7XHJcbiAgICAgICAgLy8gcmV0dXJuIHRoZSBpbWcgdGFnIGlmIG5vdCBsYXp5IGxvYWRlZFxyXG4gICAgICAgIGlmICh0eXBlb2YgbGF6eSA9PT0gJ2Jvb2xlYW4nICYmIGxhenkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuaW1hZ2UgPSAoMCwgY29yZV9qc18xLmgpKCdpbWcnLCBPYmplY3QuYXNzaWduKHsgc3JjIH0sIHJlc3QpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuaW1hZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIGl0IGlzIHZpc2libGUgYW5kIGxvYWRlZCwgc2hvdyB0aGUgaW1hZ2VcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0xvYWRlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5pbWFnZTtcclxuICAgICAgICAgICAgLy8gaWYgdGhlIHBsYWNlaG9sZGVyIGlzIGFuIGltYWdlIHNyY1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwbGFjZWhvbGRlciAmJiB0eXBlb2YgcGxhY2Vob2xkZXIgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29yZV9qc18xLmgpKCdpbWcnLCBPYmplY3QuYXNzaWduKHsgc3JjOiBwbGFjZWhvbGRlciB9LCByZXN0KSk7XHJcbiAgICAgICAgICAgIC8vIGlmIHRoZSBwbGFjZWhvbGRlciBpcyBhbiBKU1ggZWxlbWVudFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwbGFjZWhvbGRlciAmJiB0eXBlb2YgcGxhY2Vob2xkZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyByZW5kZXIgYSBzaW1wbGUgYm94XHJcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0ge307XHJcbiAgICAgICAgICAgIGlmIChyZXN0LndpZHRoKVxyXG4gICAgICAgICAgICAgICAgc3R5bGUud2lkdGggPSBgJHtyZXN0LndpZHRofXB4YDtcclxuICAgICAgICAgICAgaWYgKHJlc3QuaGVpZ2h0KVxyXG4gICAgICAgICAgICAgICAgc3R5bGUuaGVpZ2h0ID0gYCR7cmVzdC5oZWlnaHR9cHhgO1xyXG4gICAgICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHJlc3QsIG90aGVycyA9IF9fcmVzdChyZXN0LCBbXCJ3aWR0aFwiLCBcImhlaWdodFwiXSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29yZV9qc18xLmgpKCdkaXYnLCBPYmplY3QuYXNzaWduKHsgc3R5bGUgfSwgb3RoZXJzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuSW1nID0gSW1nO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbWcuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XHJcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xyXG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pKTtcclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19zZXRNb2R1bGVEZWZhdWx0KSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59KTtcclxudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WaXNpYmxlID0gZXhwb3J0cy5TdXNwZW5zZSA9IGV4cG9ydHMuUm91dGVyID0gZXhwb3J0cy5MaW5rID0gZXhwb3J0cy5JbWcgPSBleHBvcnRzLkhlbG1ldCA9IHZvaWQgMDtcclxudmFyIGhlbG1ldF9qc18xID0gcmVxdWlyZShcIi4vaGVsbWV0LmpzXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJIZWxtZXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGhlbG1ldF9qc18xLkhlbG1ldDsgfSB9KTtcclxudmFyIGltZ19qc18xID0gcmVxdWlyZShcIi4vaW1nLmpzXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJJbWdcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGltZ19qc18xLkltZzsgfSB9KTtcclxudmFyIGxpbmtfanNfMSA9IHJlcXVpcmUoXCIuL2xpbmsuanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkxpbmtcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGxpbmtfanNfMS5MaW5rOyB9IH0pO1xyXG5leHBvcnRzLlJvdXRlciA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9yb3V0ZXIuanNcIikpO1xyXG52YXIgc3VzcGVuc2VfanNfMSA9IHJlcXVpcmUoXCIuL3N1c3BlbnNlLmpzXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTdXNwZW5zZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3VzcGVuc2VfanNfMS5TdXNwZW5zZTsgfSB9KTtcclxudmFyIHZpc2libGVfanNfMSA9IHJlcXVpcmUoXCIuL3Zpc2libGUuanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZpc2libGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZpc2libGVfanNfMS5WaXNpYmxlOyB9IH0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5MaW5rID0gdm9pZCAwO1xyXG5jb25zdCBjb21wb25lbnRfanNfMSA9IHJlcXVpcmUoXCIuLi9jb21wb25lbnQuanNcIik7XHJcbmNvbnN0IGhlbG1ldF9qc18xID0gcmVxdWlyZShcIi4vaGVsbWV0LmpzXCIpO1xyXG5jb25zdCBjb3JlX2pzXzEgPSByZXF1aXJlKFwiLi4vY29yZS5qc1wiKTtcclxuY29uc3QgZnJhZ21lbnRfanNfMSA9IHJlcXVpcmUoXCIuLi9mcmFnbWVudC5qc1wiKTtcclxuLyoqXHJcbiAqIEEgc2ltcGxlIExpbmsgY29tcG9uZW50XHJcbiAqIEFkZCA8TGluayBwcmVmZXRjaCAuLi4sIHRvIHByZWZldGNoIHRoZSBodG1sIGRvY3VtZW50XHJcbiAqIEFkZCA8TGluayBwcmVmZXRjaD1cImhvdmVyXCIgLi4uLCB0byBwcmVmZXRjaCB0aGUgaHRtbCBkb2N1bWVudCBvbiBob3ZlcmluZyBvdmVyIHRoZSBsaW5rIGVsZW1lbnQuXHJcbiAqL1xyXG5jbGFzcyBMaW5rIGV4dGVuZHMgY29tcG9uZW50X2pzXzEuQ29tcG9uZW50IHtcclxuICAgIHByZWZldGNoT25Ib3ZlcigpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHRoaXMuYWRkUHJlZmV0Y2goKSwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgcHJlZmV0Y2hPblZpc2libGUoKSB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQcmVmZXRjaCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCB7IHRocmVzaG9sZDogWzAsIDFdIH0pO1xyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUodGhpcy5lbGVtZW50c1swXSk7XHJcbiAgICB9XHJcbiAgICBhZGRQcmVmZXRjaCgpIHtcclxuICAgICAgICBsZXQgZG9lc0FscmVhZHlFeGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vIGNoZWNrIGlmIGl0IGlzIGFscmVhZHkgb24gdGhlIGRvbVxyXG4gICAgICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpbmsnKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmtzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIG5vdCBhbHJlYWR5IG9uIHRoZSBkb20sIGFkZCBpdFxyXG4gICAgICAgICAgICBpZiAobGlua3NbaV0uZ2V0QXR0cmlidXRlKCdyZWwnKSA9PT0gJ3ByZWZldGNoJyAmJiBsaW5rc1tpXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSA9PT0gdGhpcy5wcm9wcy5ocmVmKSB7XHJcbiAgICAgICAgICAgICAgICBkb2VzQWxyZWFkeUV4aXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRvZXNBbHJlYWR5RXhpc3QpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJlZmV0Y2ggPSAoMCwgY29yZV9qc18xLmgpKCdsaW5rJywgeyByZWw6ICdwcmVmZXRjaCcsIGhyZWY6IHRoaXMucHJvcHMuaHJlZiwgYXM6ICdkb2N1bWVudCcgfSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocHJlZmV0Y2gpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpZE1vdW50KCkge1xyXG4gICAgICAgIGNvbnN0IHsgaHJlZiwgcHJlZmV0Y2gsIGRlbGF5ID0gMCwgYmFjayA9IGZhbHNlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGlmIChiYWNrKVxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC5ocmVmID09PSBkb2N1bWVudC5yZWZlcnJlcilcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0YXJnZXQuaHJlZjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGRlbGF5ID4gMClcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50c1swXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+ICh3aW5kb3cubG9jYXRpb24uaHJlZiA9IGhyZWYpLCBkZWxheSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChwcmVmZXRjaCkge1xyXG4gICAgICAgICAgICBpZiAocHJlZmV0Y2ggPT09ICdob3ZlcicpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByZWZldGNoT25Ib3ZlcigpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChwcmVmZXRjaCA9PT0gJ3Zpc2libGUnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcmVmZXRjaE9uVmlzaWJsZSgpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFByZWZldGNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vIHNlcGFyYXRlIGNoaWxkcmVuIGFuZCBwcmVmZXRjaCBmcm9tIHByb3BzXHJcbiAgICAgICAgY29uc3QgX2EgPSB0aGlzLnByb3BzLCB7IGNoaWxkcmVuLCBwcmVmZXRjaCwgYmFjaywgcmVmIH0gPSBfYSwgcmVzdCA9IF9fcmVzdChfYSwgW1wiY2hpbGRyZW5cIiwgXCJwcmVmZXRjaFwiLCBcImJhY2tcIiwgXCJyZWZcIl0pO1xyXG4gICAgICAgIC8vIHNvbWUgd2FybmluZyBtZXNzYWdlc1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5ocmVmKVxyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1BsZWFzZSBhZGQgXCJocmVmXCIgdG8gPExpbms+Jyk7XHJcbiAgICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCAhPT0gMSlcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdQbGVhc2UgYWRkIE9ORSBjaGlsZCB0byA8TGluaz4gKDxMaW5rPmNoaWxkPC9MaW5rPiknKTtcclxuICAgICAgICBjb25zdCBhID0gKDAsIGNvcmVfanNfMS5oKSgnYScsIE9iamVjdC5hc3NpZ24oe30sIHJlc3QpLCAuLi5jaGlsZHJlbik7XHJcbiAgICAgICAgLy8gaWYgc3NyXHJcbiAgICAgICAgaWYgKHByZWZldGNoID09PSB0cnVlICYmICEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSkge1xyXG4gICAgICAgICAgICAvLyA8bGluayByZWw9XCJwcmVmZXRjaFwiIGhyZWY9XCIvaW5kZXguaHRtbFwiIGFzPVwiZG9jdW1lbnRcIj48L2xpbms+XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSAoMCwgY29yZV9qc18xLmgpKCdsaW5rJywgeyByZWw6ICdwcmVmZXRjaCcsIGhyZWY6IHRoaXMucHJvcHMuaHJlZiwgYXM6ICdkb2N1bWVudCcgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlbG1ldCA9ICgwLCBjb3JlX2pzXzEuaCkoaGVsbWV0X2pzXzEuSGVsbWV0LCBudWxsLCBsaW5rKTtcclxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb3JlX2pzXzEuaCkoZnJhZ21lbnRfanNfMS5GcmFnbWVudCwgbnVsbCwgW2hlbG1ldCwgYV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiBub3Qgc3NyXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLkxpbmsgPSBMaW5rO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1saW5rLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG4vLyBpbnNwaXJlZCBieSBodHRwczovL2NvZGVzYW5kYm94LmlvL3MvYnVpbGQtb3duLXJlYWN0LXJvdXRlci12NC1tcHNselxyXG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnBhcnNlUGFyYW1zRnJvbVBhdGggPSBleHBvcnRzLkxpc3RlbmVyID0gZXhwb3J0cy5MaW5rID0gZXhwb3J0cy50byA9IGV4cG9ydHMuUm91dGUgPSBleHBvcnRzLlJvdXRlcyA9IGV4cG9ydHMuU3dpdGNoID0gZXhwb3J0cy5tYXRjaFBhdGggPSB2b2lkIDA7XHJcbmNvbnN0IGNvbXBvbmVudF9qc18xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudC5qc1wiKTtcclxuY29uc3QgY29yZV9qc18xID0gcmVxdWlyZShcIi4uL2NvcmUuanNcIik7XHJcbmNvbnN0IGluc3RhbmNlcyA9IFtdO1xyXG5jb25zdCByZWdpc3RlciA9IChjb21wKSA9PiBpbnN0YW5jZXMucHVzaChjb21wKTtcclxuY29uc3QgdW5yZWdpc3RlciA9IChjb21wKSA9PiBpbnN0YW5jZXMuc3BsaWNlKGluc3RhbmNlcy5pbmRleE9mKGNvbXApLCAxKTtcclxuY29uc3QgaGlzdG9yeVB1c2ggPSAocGF0aCkgPT4ge1xyXG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgcGF0aCk7XHJcbiAgICBpbnN0YW5jZXMuZm9yRWFjaChpbnN0YW5jZSA9PiBpbnN0YW5jZS5oYW5kbGVDaGFuZ2VzKCkpO1xyXG4gICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdwdXNoc3RhdGUnKSk7XHJcbn07XHJcbmNvbnN0IGhpc3RvcnlSZXBsYWNlID0gKHBhdGgpID0+IHtcclxuICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIHBhdGgpO1xyXG4gICAgaW5zdGFuY2VzLmZvckVhY2goaW5zdGFuY2UgPT4gaW5zdGFuY2UuaGFuZGxlQ2hhbmdlcygpKTtcclxuICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVwbGFjZXN0YXRlJykpO1xyXG59O1xyXG5jb25zdCBtYXRjaFBhdGggPSAocGF0aG5hbWUsIG9wdGlvbnMpID0+IHtcclxuICAgIGNvbnN0IHsgZXhhY3QgPSBmYWxzZSwgcmVnZXggfSA9IG9wdGlvbnM7XHJcbiAgICBsZXQgeyBwYXRoIH0gPSBvcHRpb25zO1xyXG4gICAgaWYgKCFwYXRoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGF0aDogbnVsbCxcclxuICAgICAgICAgICAgdXJsOiBwYXRobmFtZSxcclxuICAgICAgICAgICAgaXNFeGFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgcGFyYW1zOiB7fVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBsZXQgbWF0Y2g7XHJcbiAgICBsZXQgcGFyYW1zID0ge307XHJcbiAgICAvLyBwYXRoIHdpdGggcGFyYW1zXHJcbiAgICBpZiAocGF0aC5pbmNsdWRlcygnLzonKSkge1xyXG4gICAgICAgIGNvbnN0IHBhdGhBcnIgPSBwYXRoLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgY29uc3QgcGF0aG5hbWVBcnIgPSBwYXRobmFtZS5zcGxpdCgnLycpO1xyXG4gICAgICAgIHBhdGhBcnIuZm9yRWFjaCgocCwgaSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoL146Ly50ZXN0KHApKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBwLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwYXRobmFtZUFycltpXTtcclxuICAgICAgICAgICAgICAgIC8vIGlmIGEgcmVnZXggaXMgcHJvdmlkZWQsIGNoZWNrIGl0IGl0IG1hdGNoZXNcclxuICAgICAgICAgICAgICAgIGlmIChyZWdleCAmJiByZWdleFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnZXhNYXRjaCA9IHJlZ2V4W2tleV0udGVzdCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWdleE1hdGNoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgcGFyYW1zKSwgeyBba2V5XTogdmFsdWUgfSk7XHJcbiAgICAgICAgICAgICAgICBwYXRoQXJyW2ldID0gcGF0aG5hbWVBcnJbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXRoID0gcGF0aEFyci5qb2luKCcvJyk7XHJcbiAgICB9XHJcbiAgICAvLyBjYXRjaCBhbGxcclxuICAgIGlmIChwYXRoID09PSAnKicpXHJcbiAgICAgICAgbWF0Y2ggPSBbcGF0aG5hbWVdO1xyXG4gICAgLy8gcmVndWxhciBwYXRoXHJcbiAgICBpZiAoIW1hdGNoKVxyXG4gICAgICAgIG1hdGNoID0gbmV3IFJlZ0V4cChgXiR7cGF0aH1gKS5leGVjKHBhdGhuYW1lKTtcclxuICAgIGlmICghbWF0Y2gpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCB1cmwgPSBtYXRjaFswXTtcclxuICAgIGNvbnN0IGlzRXhhY3QgPSBwYXRobmFtZSA9PT0gdXJsO1xyXG4gICAgaWYgKGV4YWN0ICYmICFpc0V4YWN0KVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBwYXRoLFxyXG4gICAgICAgIHVybCxcclxuICAgICAgICBpc0V4YWN0LFxyXG4gICAgICAgIHBhcmFtc1xyXG4gICAgfTtcclxufTtcclxuZXhwb3J0cy5tYXRjaFBhdGggPSBtYXRjaFBhdGg7XHJcbmNsYXNzIFN3aXRjaCBleHRlbmRzIGNvbXBvbmVudF9qc18xLkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xyXG4gICAgICAgIHRoaXMuaW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMucGF0aCA9ICcnO1xyXG4gICAgICAgIHRoaXMubWF0Y2ggPSB7IGluZGV4OiAtMSwgcGF0aDogJycgfTtcclxuICAgIH1cclxuICAgIGRpZE1vdW50KCkge1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuaGFuZGxlQ2hhbmdlcy5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZWdpc3Rlcih0aGlzKTtcclxuICAgIH1cclxuICAgIGRpZFVubW91bnQoKSB7XHJcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5oYW5kbGVDaGFuZ2VzLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHVucmVnaXN0ZXIodGhpcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVDaGFuZ2VzKCkge1xyXG4gICAgICAgIHRoaXMuZmluZENoaWxkKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkVXBkYXRlKCkpXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBmaW5kQ2hpbGQoKSB7XHJcbiAgICAgICAgdGhpcy5tYXRjaCA9IHsgaW5kZXg6IC0xLCBwYXRoOiAnJyB9O1xyXG4gICAgICAgIC8vIGZsYXR0ZW4gY2hpbGRyZW5cclxuICAgICAgICB0aGlzLnByb3BzLmNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbi5mbGF0KCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gdGhpcy5wcm9wcy5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgY29uc3QgeyBwYXRoLCBleGFjdCwgcmVnZXggfSA9IGNoaWxkLnByb3BzO1xyXG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9ICgwLCBleHBvcnRzLm1hdGNoUGF0aCkoKDAsIGNvcmVfanNfMS5pc1NTUikoKSA/IF9uYW5vLmxvY2F0aW9uLnBhdGhuYW1lIDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCB7XHJcbiAgICAgICAgICAgICAgICBwYXRoLFxyXG4gICAgICAgICAgICAgICAgZXhhY3QsXHJcbiAgICAgICAgICAgICAgICByZWdleFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hdGNoLmluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWF0Y2gucGF0aCA9IHBhdGg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzaG91bGRVcGRhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aCAhPT0gdGhpcy5tYXRjaC5wYXRoIHx8IHRoaXMuaW5kZXggIT09IHRoaXMubWF0Y2guaW5kZXg7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgdGhpcy5maW5kQ2hpbGQoKTtcclxuICAgICAgICBjb25zdCBjaGlsZCA9IHRoaXMucHJvcHMuY2hpbGRyZW5bdGhpcy5tYXRjaC5pbmRleF07XHJcbiAgICAgICAgaWYgKHRoaXMubWF0Y2guaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aCA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNoaWxkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgcGF0aCB9ID0gY2hpbGQucHJvcHM7XHJcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLm1hdGNoLmluZGV4O1xyXG4gICAgICAgICAgICBjb25zdCBlbCA9ICgwLCBjb3JlX2pzXzEuX3JlbmRlcikoY2hpbGQpO1xyXG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvcmVfanNfMS5oKSgnZGl2Jywge30sICgwLCBjb3JlX2pzXzEuX3JlbmRlcikoZWwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9wcy5mYWxsYmFjaykge1xyXG4gICAgICAgICAgICByZXR1cm4gKDAsIGNvcmVfanNfMS5oKSgnZGl2Jywge30sICgwLCBjb3JlX2pzXzEuX3JlbmRlcikodGhpcy5wcm9wcy5mYWxsYmFjaykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb3JlX2pzXzEuaCkoJ2RpdicsIHt9LCAnbm90IGZvdW5kJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuU3dpdGNoID0gU3dpdGNoO1xyXG4vLyBhbGlhcyBmb3IgPFN3aXRjaCAvPlxyXG5jbGFzcyBSb3V0ZXMgZXh0ZW5kcyBTd2l0Y2gge1xyXG59XHJcbmV4cG9ydHMuUm91dGVzID0gUm91dGVzO1xyXG5jb25zdCBSb3V0ZSA9ICh7IHBhdGgsIHJlZ2V4LCBjaGlsZHJlbiB9KSA9PiB7XHJcbiAgICAvLyBsb29rdXAgcGF0aG5hbWUgYW5kIHBhcmFtZXRlcnNcclxuICAgIGNvbnN0IHBhdGhuYW1lID0gKDAsIGNvcmVfanNfMS5pc1NTUikoKSA/IF9uYW5vLmxvY2F0aW9uLnBhdGhuYW1lIDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgY29uc3QgcGFyYW1zID0gKDAsIGV4cG9ydHMucGFyc2VQYXJhbXNGcm9tUGF0aCkocGF0aCk7XHJcbiAgICAvLyBwYXNzIHRoZSByb3V0ZSBhcyBwcm9wcyB0byB0aGUgY2hpbGRyZW5cclxuICAgIGNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgaWYgKGNoaWxkLnByb3BzKVxyXG4gICAgICAgICAgICBjaGlsZC5wcm9wcyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY2hpbGQucHJvcHMpLCB7IHJvdXRlOiB7IHBhdGgsIHJlZ2V4LCBwYXRobmFtZSwgcGFyYW1zIH0gfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBjaGlsZHJlbjtcclxufTtcclxuZXhwb3J0cy5Sb3V0ZSA9IFJvdXRlO1xyXG5jb25zdCB0byA9ICh0bywgcmVwbGFjZSA9IGZhbHNlKSA9PiB7XHJcbiAgICByZXBsYWNlID8gaGlzdG9yeVJlcGxhY2UodG8pIDogaGlzdG9yeVB1c2godG8pO1xyXG59O1xyXG5leHBvcnRzLnRvID0gdG87XHJcbmNvbnN0IExpbmsgPSAoX2EpID0+IHtcclxuICAgIHZhciB7IHRvLCByZXBsYWNlLCBjaGlsZHJlbiB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcInRvXCIsIFwicmVwbGFjZVwiLCBcImNoaWxkcmVuXCJdKTtcclxuICAgIGNvbnN0IGhhbmRsZUNsaWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXBsYWNlID8gaGlzdG9yeVJlcGxhY2UodG8pIDogaGlzdG9yeVB1c2godG8pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiAoMCwgY29yZV9qc18xLmgpKCdhJywgT2JqZWN0LmFzc2lnbih7IGhyZWY6IHRvLCBvbkNsaWNrOiAoZSkgPT4gaGFuZGxlQ2xpY2soZSkgfSwgcmVzdCksIGNoaWxkcmVuKTtcclxufTtcclxuZXhwb3J0cy5MaW5rID0gTGluaztcclxuY2xhc3MgQ0xpc3RlbmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICAgICAgICBpZiAoKDAsIGNvcmVfanNfMS5pc1NTUikoKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX3JvdXRlID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdSb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmZvckVhY2goZm5jID0+IHtcclxuICAgICAgICAgICAgICAgIGZuYyhuZXdSb3V0ZSwgdGhpcy5fcm91dGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5fcm91dGUgPSBuZXdSb3V0ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwdXNoc3RhdGUnLCBldmVudCk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3JlcGxhY2VzdGF0ZScsIGV2ZW50KTtcclxuICAgIH1cclxuICAgIHVzZSgpIHtcclxuICAgICAgICBjb25zdCBpZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzdWJzY3JpYmU6IChmbmMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5zZXQoaWQsIGZuYyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhbmNlbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVycy5oYXMoaWQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5sZXQgbGlzdGVuZXI7XHJcbmNvbnN0IExpc3RlbmVyID0gKCkgPT4ge1xyXG4gICAgaWYgKCFsaXN0ZW5lcilcclxuICAgICAgICBsaXN0ZW5lciA9IG5ldyBDTGlzdGVuZXIoKTtcclxuICAgIHJldHVybiBsaXN0ZW5lcjtcclxufTtcclxuZXhwb3J0cy5MaXN0ZW5lciA9IExpc3RlbmVyO1xyXG4vKiogUGFzcyBcInRoaXMucHJvcHMucm91dGUucGF0aFwiIHRvIGl0LiAqL1xyXG5jb25zdCBwYXJzZVBhcmFtc0Zyb21QYXRoID0gKHBhdGgpID0+IHtcclxuICAgIGxldCBwYXJhbXMgPSB7fTtcclxuICAgIGNvbnN0IF9wYXRobmFtZSA9ICgwLCBjb3JlX2pzXzEuaXNTU1IpKCkgPyBfbmFuby5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpIDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJyk7XHJcbiAgICBwYXRoLnNwbGl0KCcvJykuZm9yRWFjaCgocCwgaSkgPT4ge1xyXG4gICAgICAgIGlmIChwLnN0YXJ0c1dpdGgoJzonKSlcclxuICAgICAgICAgICAgcGFyYW1zID0gT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBwYXJhbXMpLCB7IFtwLnNsaWNlKDEpXTogX3BhdGhuYW1lW2ldIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcGFyYW1zO1xyXG59O1xyXG5leHBvcnRzLnBhcnNlUGFyYW1zRnJvbVBhdGggPSBwYXJzZVBhcmFtc0Zyb21QYXRoO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb3V0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fcmVzdCA9ICh0aGlzICYmIHRoaXMuX19yZXN0KSB8fCBmdW5jdGlvbiAocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TdXNwZW5zZSA9IHZvaWQgMDtcclxuY29uc3QgY29tcG9uZW50X2pzXzEgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50LmpzXCIpO1xyXG5jb25zdCBjb3JlX2pzXzEgPSByZXF1aXJlKFwiLi4vY29yZS5qc1wiKTtcclxuY2xhc3MgU3VzcGVuc2UgZXh0ZW5kcyBjb21wb25lbnRfanNfMS5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIGdldCBwcm9wcyBwcm9taXNlcyBpbiAuLi5yZXN0XHJcbiAgICAgICAgY29uc3QgX2EgPSB0aGlzLnByb3BzLCB7IGNoaWxkcmVuLCBmYWxsYmFjaywgY2FjaGUgPSBmYWxzZSB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcImNoaWxkcmVuXCIsIFwiZmFsbGJhY2tcIiwgXCJjYWNoZVwiXSk7XHJcbiAgICAgICAgLy8gc3RyaW5naWZ5IC4uLnJlc3RcclxuICAgICAgICBjb25zdCBzdHIgPSBKU09OLnN0cmluZ2lmeShyZXN0LCBmdW5jdGlvbiAoX2tleSwgdmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3ZhbH1gOyAvLyBpbXBsaWNpdGx5IGB0b1N0cmluZ2AgaXRcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjcmVhdGUgdW5pcXVlIGlkIGJhc2VkIG9uIC4uLnJlc3RcclxuICAgICAgICB0aGlzLmlkID0gKDAsIGNvcmVfanNfMS5zdHJUb0hhc2gpKEpTT04uc3RyaW5naWZ5KHN0cikpO1xyXG4gICAgfVxyXG4gICAgZGlkTW91bnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgLy8gZ2V0IHByb3BzIHByb21pc2VzIGluIC4uLnJlc3RcclxuICAgICAgICAgICAgY29uc3QgX2EgPSB0aGlzLnByb3BzLCB7IGNoaWxkcmVuLCBmYWxsYmFjaywgY2FjaGUgPSBmYWxzZSB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcImNoaWxkcmVuXCIsIFwiZmFsbGJhY2tcIiwgXCJjYWNoZVwiXSk7XHJcbiAgICAgICAgICAgIC8vIHNldCBpbml0aWFsIHN0YXRlIHRvIFtdXHJcbiAgICAgICAgICAgIGlmIChjYWNoZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdFN0YXRlID0ge307XHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIGFscmVhZHkgY2FjaGVkIHRoZSByZXN1bHRzIGluIHRoaXMuc3RhdGVcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9hZEZyb21DYWNoZShjYWNoZSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIHJlc29sdmUgdGhlIHByb21pc2VzXHJcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2VzID0gT2JqZWN0LnZhbHVlcyhyZXN0KS5tYXAocCA9PiBwKCkpO1xyXG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZCA9IHlpZWxkIFByb21pc2UuYWxsKHByb21pc2VzKTtcclxuICAgICAgICAgICAgLy8gcHJlcGFyZSBkYXRhXHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnByZXBhcmVEYXRhKHJlc3QsIHJlc29sdmVkLCBjYWNoZSk7XHJcbiAgICAgICAgICAgIC8vIGFkZCBkYXRhIHRvIGNoaWxkcmVuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkRGF0YVRvQ2hpbGRyZW4oZGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgY29tcG9uZW50XHJcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3NyKCkge1xyXG4gICAgICAgIC8vIGdldCBwcm9wcyBwcm9taXNlcyBpbiAuLi5yZXN0XHJcbiAgICAgICAgY29uc3QgX2EgPSB0aGlzLnByb3BzLCB7IGNoaWxkcmVuLCBmYWxsYmFjaywgY2FjaGUgPSBmYWxzZSB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcImNoaWxkcmVuXCIsIFwiZmFsbGJhY2tcIiwgXCJjYWNoZVwiXSk7XHJcbiAgICAgICAgLy8gZXhlY3V0ZSB0aGUgZnVuY3Rpb25zXHJcbiAgICAgICAgY29uc3QgZnVuY3Rpb25zID0gT2JqZWN0LnZhbHVlcyhyZXN0KS5tYXAocCA9PiBwKCkpO1xyXG4gICAgICAgIC8vIHByZXBhcmUgZGF0YVxyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLnByZXBhcmVEYXRhKHJlc3QsIGZ1bmN0aW9ucywgZmFsc2UpO1xyXG4gICAgICAgIC8vIGFkZCBkYXRhIHRvIGNoaWxkcmVuXHJcbiAgICAgICAgdGhpcy5hZGREYXRhVG9DaGlsZHJlbihkYXRhKTtcclxuICAgIH1cclxuICAgIGxvYWRGcm9tQ2FjaGUoY2FjaGUpIHtcclxuICAgICAgICBjb25zdCBoYXNDYWNoZWRQcm9wcyA9IHRoaXMuc3RhdGUgJiYgY2FjaGUgJiYgT2JqZWN0LmtleXModGhpcy5zdGF0ZSkubGVuZ3RoID4gMDtcclxuICAgICAgICBpZiAoaGFzQ2FjaGVkUHJvcHMpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGREYXRhVG9DaGlsZHJlbih0aGlzLnN0YXRlKTtcclxuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoYXNDYWNoZWRQcm9wcztcclxuICAgIH1cclxuICAgIHByZXBhcmVEYXRhKHJlc3QsIGZuYywgY2FjaGUpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gT2JqZWN0LmtleXMocmVzdCkucmVkdWNlKChvYmosIGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjYWNoZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUpLCB7IFtpdGVtXTogZm5jW2luZGV4XSB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgb2JqKSwgeyBbaXRlbV06IGZuY1tpbmRleF0gfSk7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG4gICAgYWRkRGF0YVRvQ2hpbGRyZW4oZGF0YSkge1xyXG4gICAgICAgIC8vIGFkZCBkYXRhIGFzIHByb3BzIHRvIGNoaWxkcmVuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQucHJvcHMpXHJcbiAgICAgICAgICAgICAgICBjaGlsZC5wcm9wcyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgY2hpbGQucHJvcHMpLCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoISgwLCBjb3JlX2pzXzEuaXNTU1IpKCkpIHtcclxuICAgICAgICAgICAgY29uc3QgeyBjYWNoZSA9IGZhbHNlIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRGcm9tQ2FjaGUoY2FjaGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gIXRoaXMucmVhZHkgPyB0aGlzLnByb3BzLmZhbGxiYWNrIDogdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3NyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLlN1c3BlbnNlID0gU3VzcGVuc2U7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1c3BlbnNlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVmlzaWJsZSA9IHZvaWQgMDtcclxuY29uc3QgY29yZV9qc18xID0gcmVxdWlyZShcIi4uL2NvcmUuanNcIik7XHJcbmNvbnN0IGNvbXBvbmVudF9qc18xID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudC5qc1wiKTtcclxuY2xhc3MgVmlzaWJsZSBleHRlbmRzIGNvbXBvbmVudF9qc18xLkNvbXBvbmVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xyXG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBkaWRNb3VudCgpIHtcclxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcywgb2JzZXJ2ZXIpID0+IHtcclxuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgeyB0aHJlc2hvbGQ6IFswLCAxXSB9KTtcclxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudHNbMF0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICgwLCBjb3JlX2pzXzEuaCkoJ2RpdicsIHsgJ2RhdGEtdmlzaWJsZSc6IGZhbHNlLCB2aXNpYmlsaXR5OiAnaGlkZGVuJyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLm9uVmlzaWJsZSlcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMub25WaXNpYmxlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29yZV9qc18xLnJlbmRlcikodGhpcy5wcm9wcy5jb21wb25lbnQgfHwgdGhpcy5wcm9wcy5jaGlsZHJlblswXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVmlzaWJsZSA9IFZpc2libGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZpc2libGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy51c2VDb250ZXh0ID0gZXhwb3J0cy5jcmVhdGVDb250ZXh0ID0gdm9pZCAwO1xyXG5jb25zdCBjcmVhdGVDb250ZXh0ID0gKGN0eCkgPT4ge1xyXG4gICAgbGV0IF9jdHggPSBjdHg7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFByb3ZpZGVyOiAocHJvcHMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHByb3BzLnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgX2N0eCA9IHByb3BzLnZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJvcHMuY2hpbGRyZW47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBDb25zdW1lcjogKHByb3BzKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGNvbXBvbmVudDogcHJvcHMuY2hpbGRyZW5bMF0oX2N0eCksIHByb3BzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgeyBjb250ZXh0OiBfY3R4IH0pIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQ6ICgpID0+IF9jdHgsXHJcbiAgICAgICAgc2V0OiAoY3R4KSA9PiAoX2N0eCA9IGN0eClcclxuICAgIH07XHJcbn07XHJcbmV4cG9ydHMuY3JlYXRlQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ7XHJcbmNvbnN0IHVzZUNvbnRleHQgPSAoY3R4KSA9PiB7XHJcbiAgICBjb25zdCBfY3R4ID0gY3R4O1xyXG4gICAgaWYgKF9jdHggJiYgdHlwZW9mIF9jdHguZ2V0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jdHguZ2V0KCk7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMudXNlQ29udGV4dCA9IHVzZUNvbnRleHQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRleHQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5oID0gZXhwb3J0cy5fcmVuZGVyID0gZXhwb3J0cy5oeWRyYXRlID0gZXhwb3J0cy5yZW5kZXIgPSBleHBvcnRzLmFwcGVuZENoaWxkcmVuID0gZXhwb3J0cy5zdHJUb0hhc2ggPSBleHBvcnRzLnJlbW92ZUFsbENoaWxkTm9kZXMgPSBleHBvcnRzLnRpY2sgPSBleHBvcnRzLmlzU1NSID0gdm9pZCAwO1xyXG5yZXF1aXJlKFwiLi90eXBlcy5qc1wiKTtcclxuY29uc3QgaXNTU1IgPSAoKSA9PiB0eXBlb2YgX25hbm8gIT09ICd1bmRlZmluZWQnICYmIF9uYW5vLmlzU1NSID09PSB0cnVlO1xyXG5leHBvcnRzLmlzU1NSID0gaXNTU1I7XHJcbi8qKiBDcmVhdGVzIGEgbmV3IE1pY3JvdGFzayB1c2luZyBQcm9taXNlKCkgKi9cclxuZXhwb3J0cy50aWNrID0gUHJvbWlzZS5wcm90b3R5cGUudGhlbi5iaW5kKFByb21pc2UucmVzb2x2ZSgpKTtcclxuY29uc3QgcmVtb3ZlQWxsQ2hpbGROb2RlcyA9IChwYXJlbnQpID0+IHtcclxuICAgIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydHMucmVtb3ZlQWxsQ2hpbGROb2RlcyA9IHJlbW92ZUFsbENoaWxkTm9kZXM7XHJcbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS83NjE2NDg0LzEyNjU2ODU1XHJcbmNvbnN0IHN0clRvSGFzaCA9IChzKSA9PiB7XHJcbiAgICBsZXQgaGFzaCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBjaHIgPSBzLmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgaGFzaCA9IChoYXNoIDw8IDUpIC0gaGFzaCArIGNocjtcclxuICAgICAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxyXG4gICAgfVxyXG4gICAgcmV0dXJuIE1hdGguYWJzKGhhc2gpLnRvU3RyaW5nKDMyKTtcclxufTtcclxuZXhwb3J0cy5zdHJUb0hhc2ggPSBzdHJUb0hhc2g7XHJcbmNvbnN0IGFwcGVuZENoaWxkcmVuID0gKGVsZW1lbnQsIGNoaWxkcmVuLCBlc2NhcGUgPSB0cnVlKSA9PiB7XHJcbiAgICAvLyBpZiB0aGUgY2hpbGQgaXMgYW4gaHRtbCBlbGVtZW50XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XHJcbiAgICAgICAgKDAsIGV4cG9ydHMuYXBwZW5kQ2hpbGRyZW4pKGVsZW1lbnQsIFtjaGlsZHJlbl0sIGVzY2FwZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgLy8gaHRtbENvbGxlY3Rpb24gdG8gYXJyYXlcclxuICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09ICdvYmplY3QnKVxyXG4gICAgICAgIGNoaWxkcmVuID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoY2hpbGRyZW4pO1xyXG4gICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgLy8gaWYgY2hpbGQgaXMgYW4gYXJyYXkgb2YgY2hpbGRyZW4sIGFwcGVuZCB0aGVtIGluc3RlYWRcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZCkpXHJcbiAgICAgICAgICAgICgwLCBleHBvcnRzLmFwcGVuZENoaWxkcmVuKShlbGVtZW50LCBjaGlsZCwgZXNjYXBlKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gcmVuZGVyIHRoZSBjb21wb25lbnRcclxuICAgICAgICAgICAgY29uc3QgYyA9ICgwLCBleHBvcnRzLl9yZW5kZXIpKGNoaWxkKTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgYyBpcyBhbiBhcnJheSBvZiBjaGlsZHJlbiwgYXBwZW5kIHRoZW0gaW5zdGVhZFxyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYykpXHJcbiAgICAgICAgICAgICAgICAgICAgKDAsIGV4cG9ydHMuYXBwZW5kQ2hpbGRyZW4pKGVsZW1lbnQsIGMsIGVzY2FwZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBhcHBseSB0aGUgY29tcG9uZW50IHRvIHBhcmVudCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKDAsIGV4cG9ydHMuaXNTU1IpKCkgJiYgIWVzY2FwZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjLm5vZGVUeXBlID09IG51bGwgPyBjLnRvU3RyaW5nKCkgOiBjKTtcclxuICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoYy5ub2RlVHlwZSA9PSBudWxsID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYy50b1N0cmluZygpKSA6IGMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydHMuYXBwZW5kQ2hpbGRyZW4gPSBhcHBlbmRDaGlsZHJlbjtcclxuLyoqXHJcbiAqIEEgc2ltcGxlIGNvbXBvbmVudCBmb3IgcmVuZGVyaW5nIFNWR3NcclxuICovXHJcbmNvbnN0IFNWRyA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgY2hpbGQgPSBwcm9wcy5jaGlsZHJlblswXTtcclxuICAgIGNvbnN0IGF0dHJzID0gY2hpbGQuYXR0cmlidXRlcztcclxuICAgIGlmICgoMCwgZXhwb3J0cy5pc1NTUikoKSlcclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICBjb25zdCBzdmcgPSBoTlMoJ3N2ZycpO1xyXG4gICAgZm9yIChsZXQgaSA9IGF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZShhdHRyc1tpXS5uYW1lLCBhdHRyc1tpXS52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzdmcuaW5uZXJIVE1MID0gY2hpbGQuaW5uZXJIVE1MO1xyXG4gICAgcmV0dXJuIHN2ZztcclxufTtcclxuLyoqIFJldHVybnMgdGhlIHBvcHVsYXRlZCBwYXJlbnQgaWYgYXZhaWxhYmxlIGVsc2UgIG9uZSBjaGlsZCBvciBhbiBhcnJheSBvZiBjaGlsZHJlbiAqL1xyXG5jb25zdCByZW5kZXIgPSAoY29tcG9uZW50LCBwYXJlbnQgPSBudWxsLCByZW1vdmVDaGlsZE5vZGVzID0gdHJ1ZSkgPT4ge1xyXG4gICAgbGV0IGVsID0gKDAsIGV4cG9ydHMuX3JlbmRlcikoY29tcG9uZW50KTtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSkge1xyXG4gICAgICAgIGVsID0gZWwubWFwKGUgPT4gKDAsIGV4cG9ydHMuX3JlbmRlcikoZSkpO1xyXG4gICAgICAgIGlmIChlbC5sZW5ndGggPT09IDEpXHJcbiAgICAgICAgICAgIGVsID0gZWxbMF07XHJcbiAgICB9XHJcbiAgICBpZiAocGFyZW50KSB7XHJcbiAgICAgICAgaWYgKHJlbW92ZUNoaWxkTm9kZXMpXHJcbiAgICAgICAgICAgICgwLCBleHBvcnRzLnJlbW92ZUFsbENoaWxkTm9kZXMpKHBhcmVudCk7XHJcbiAgICAgICAgLy8gaWYgcGFyZW50IGFuZCBjaGlsZCBhcmUgdGhlIHNhbWUsIHdlIHJlcGxhY2UgdGhlIHBhcmVudCBpbnN0ZWFkIG9mIGFwcGVuZGluZyB0byBpdFxyXG4gICAgICAgIGlmIChlbCAmJiBwYXJlbnQuaWQgJiYgcGFyZW50LmlkID09PSBlbC5pZCAmJiBwYXJlbnQucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgICBwYXJlbnQucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoZWwsIHBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBhcHBlbmQgZWxlbWVudChzKSB0byB0aGUgcGFyZW50XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSlcclxuICAgICAgICAgICAgICAgIGVsLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAoMCwgZXhwb3J0cy5hcHBlbmRDaGlsZHJlbikocGFyZW50LCAoMCwgZXhwb3J0cy5fcmVuZGVyKShlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXJlbnQuYXBwZW5kQ2hpbGQoX3JlbmRlcihlKSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAoMCwgZXhwb3J0cy5hcHBlbmRDaGlsZHJlbikocGFyZW50LCAoMCwgZXhwb3J0cy5fcmVuZGVyKShlbCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyZW50O1xyXG4gICAgfVxyXG4gICAgLy8gcmV0dXJuaW5nIG9uZSBjaGlsZCBvciBhbiBhcnJheSBvZiBjaGlsZHJlblxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKCgwLCBleHBvcnRzLmlzU1NSKSgpICYmICFBcnJheS5pc0FycmF5KGVsKSlcclxuICAgICAgICAgICAgcmV0dXJuIFtlbF07XHJcbiAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnRzLnJlbmRlciA9IHJlbmRlcjtcclxuZXhwb3J0cy5oeWRyYXRlID0gZXhwb3J0cy5yZW5kZXI7XHJcbmNvbnN0IF9yZW5kZXIgPSAoY29tcCkgPT4ge1xyXG4gICAgLy8gbnVsbCwgZmFsc2UsIHVuZGVmaW5lZFxyXG4gICAgaWYgKGNvbXAgPT09IG51bGwgfHwgY29tcCA9PT0gZmFsc2UgfHwgdHlwZW9mIGNvbXAgPT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIC8vIHN0cmluZywgbnVtYmVyXHJcbiAgICBpZiAodHlwZW9mIGNvbXAgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjb21wID09PSAnbnVtYmVyJylcclxuICAgICAgICByZXR1cm4gY29tcC50b1N0cmluZygpO1xyXG4gICAgLy8gU1ZHRWxlbWVudFxyXG4gICAgaWYgKGNvbXAudGFnTmFtZSAmJiBjb21wLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N2ZycpXHJcbiAgICAgICAgcmV0dXJuIFNWRyh7IGNoaWxkcmVuOiBbY29tcF0gfSk7XHJcbiAgICAvLyBIVE1MRWxlbWVudFxyXG4gICAgaWYgKGNvbXAudGFnTmFtZSlcclxuICAgICAgICByZXR1cm4gY29tcDtcclxuICAgIC8vIENsYXNzIENvbXBvbmVudFxyXG4gICAgaWYgKGNvbXAgJiYgY29tcC5jb21wb25lbnQgJiYgY29tcC5jb21wb25lbnQuaXNDbGFzcylcclxuICAgICAgICByZXR1cm4gcmVuZGVyQ2xhc3NDb21wb25lbnQoY29tcCk7XHJcbiAgICAvLyBDbGFzcyBDb21wb25lbnQgKFVuaW5pdGlhbGl6ZWQpXHJcbiAgICBpZiAoY29tcC5pc0NsYXNzKVxyXG4gICAgICAgIHJldHVybiByZW5kZXJDbGFzc0NvbXBvbmVudCh7IGNvbXBvbmVudDogY29tcCwgcHJvcHM6IHt9IH0pO1xyXG4gICAgLy8gRnVuY3Rpb25hbCBDb21wb25lbnRcclxuICAgIGlmIChjb21wLmNvbXBvbmVudCAmJiB0eXBlb2YgY29tcC5jb21wb25lbnQgPT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgcmV0dXJuIHJlbmRlckZ1bmN0aW9uYWxDb21wb25lbnQoY29tcCk7XHJcbiAgICAvLyBBcnJheSAocmVuZGVyIGVhY2ggY2hpbGQgYW5kIHJldHVybiB0aGUgYXJyYXkpIChpcyBwcm9iYWJseSBhIGZyYWdtZW50KVxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoY29tcCkpXHJcbiAgICAgICAgcmV0dXJuIGNvbXAubWFwKGMgPT4gKDAsIGV4cG9ydHMuX3JlbmRlcikoYykpLmZsYXQoKTtcclxuICAgIC8vIGZ1bmN0aW9uXHJcbiAgICBpZiAodHlwZW9mIGNvbXAgPT09ICdmdW5jdGlvbicgJiYgIWNvbXAuaXNDbGFzcylcclxuICAgICAgICByZXR1cm4gKDAsIGV4cG9ydHMuX3JlbmRlcikoY29tcCgpKTtcclxuICAgIC8vIGlmIGNvbXBvbmVudCBpcyBhIEhUTUxFbGVtZW50IChyYXJlIGNhc2UpXHJcbiAgICBpZiAoY29tcC5jb21wb25lbnQgJiYgY29tcC5jb21wb25lbnQudGFnTmFtZSAmJiB0eXBlb2YgY29tcC5jb21wb25lbnQudGFnTmFtZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgcmV0dXJuICgwLCBleHBvcnRzLl9yZW5kZXIpKGNvbXAuY29tcG9uZW50KTtcclxuICAgIC8vIChyYXJlIGNhc2UpXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjb21wLmNvbXBvbmVudCkpXHJcbiAgICAgICAgcmV0dXJuICgwLCBleHBvcnRzLl9yZW5kZXIpKGNvbXAuY29tcG9uZW50KTtcclxuICAgIC8vIChyYXJlIGNhc2UpXHJcbiAgICBpZiAoY29tcC5jb21wb25lbnQpXHJcbiAgICAgICAgcmV0dXJuICgwLCBleHBvcnRzLl9yZW5kZXIpKGNvbXAuY29tcG9uZW50KTtcclxuICAgIC8vIG9iamVjdFxyXG4gICAgaWYgKHR5cGVvZiBjb21wID09PSAnb2JqZWN0JylcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICBjb25zb2xlLndhcm4oJ1NvbWV0aGluZyB1bmV4cGVjdGVkIGhhcHBlbmVkIHdpdGg6JywgY29tcCk7XHJcbn07XHJcbmV4cG9ydHMuX3JlbmRlciA9IF9yZW5kZXI7XHJcbmNvbnN0IHJlbmRlckZ1bmN0aW9uYWxDb21wb25lbnQgPSAoZm5jQ29tcCkgPT4ge1xyXG4gICAgY29uc3QgeyBjb21wb25lbnQsIHByb3BzIH0gPSBmbmNDb21wO1xyXG4gICAgcmV0dXJuICgwLCBleHBvcnRzLl9yZW5kZXIpKGNvbXBvbmVudChwcm9wcykpO1xyXG59O1xyXG5jb25zdCByZW5kZXJDbGFzc0NvbXBvbmVudCA9IChjbGFzc0NvbXApID0+IHtcclxuICAgIGNvbnN0IHsgY29tcG9uZW50LCBwcm9wcyB9ID0gY2xhc3NDb21wO1xyXG4gICAgLy8gY2FsYyBoYXNoXHJcbiAgICBjb25zdCBoYXNoID0gKDAsIGV4cG9ydHMuc3RyVG9IYXNoKShjb21wb25lbnQudG9TdHJpbmcoKSk7XHJcbiAgICAvLyBtYWtlIGhhc2ggYWNjZXNzaWJsZSBpbiBjb25zdHJ1Y3Rvciwgd2l0aG91dCBwYXNzaW5nIGl0IHRvIGl0XHJcbiAgICBjb21wb25lbnQucHJvdG90eXBlLl9nZXRIYXNoID0gKCkgPT4gaGFzaDtcclxuICAgIGNvbnN0IENvbXBvbmVudCA9IG5ldyBjb21wb25lbnQocHJvcHMpO1xyXG4gICAgaWYgKCEoMCwgZXhwb3J0cy5pc1NTUikoKSlcclxuICAgICAgICBDb21wb25lbnQud2lsbE1vdW50KCk7XHJcbiAgICBsZXQgZWwgPSBDb21wb25lbnQucmVuZGVyKCk7XHJcbiAgICBlbCA9ICgwLCBleHBvcnRzLl9yZW5kZXIpKGVsKTtcclxuICAgIENvbXBvbmVudC5lbGVtZW50cyA9IGVsO1xyXG4gICAgLy8gcGFzcyB0aGUgY29tcG9uZW50IGluc3RhbmNlIGFzIHJlZlxyXG4gICAgaWYgKHByb3BzICYmIHByb3BzLnJlZilcclxuICAgICAgICBwcm9wcy5yZWYoQ29tcG9uZW50KTtcclxuICAgIGlmICghKDAsIGV4cG9ydHMuaXNTU1IpKCkpXHJcbiAgICAgICAgKDAsIGV4cG9ydHMudGljaykoKCkgPT4ge1xyXG4gICAgICAgICAgICBDb21wb25lbnQuX2RpZE1vdW50KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICByZXR1cm4gZWw7XHJcbn07XHJcbmNvbnN0IGhOUyA9ICh0YWcpID0+IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCB0YWcpO1xyXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDI0MDU2OTQvMTI2NTY4NTVcclxuY29uc3QgaCA9ICh0YWdOYW1lT3JDb21wb25lbnQsIHByb3BzID0ge30sIC4uLmNoaWxkcmVuKSA9PiB7XHJcbiAgICAvLyBpZiBjaGlsZHJlbiBpcyBwYXNzZWQgYXMgcHJvcHMsIG1lcmdlIHdpdGggLi4uY2hpbGRyZW5cclxuICAgIGlmIChwcm9wcyAmJiBwcm9wcy5jaGlsZHJlbikge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wcy5jaGlsZHJlbikpXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IFsuLi5wcm9wcy5jaGlsZHJlbiwgLi4uY2hpbGRyZW5dO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHByb3BzLmNoaWxkcmVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BzLmNoaWxkcmVuKSlcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gcHJvcHMuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gW3Byb3BzLmNoaWxkcmVuXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyByZW5kZXIgV2ViQ29tcG9uZW50IGluIFNTUlxyXG4gICAgaWYgKCgwLCBleHBvcnRzLmlzU1NSKSgpICYmIF9uYW5vLnNzclRyaWNrcy5pc1dlYkNvbXBvbmVudCh0YWdOYW1lT3JDb21wb25lbnQpKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IF9uYW5vLnNzclRyaWNrcy5yZW5kZXJXZWJDb21wb25lbnQodGFnTmFtZU9yQ29tcG9uZW50LCBwcm9wcywgY2hpbGRyZW4sIGV4cG9ydHMuX3JlbmRlcik7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBgRVJST1I6IFwiPCR7dGFnTmFtZU9yQ29tcG9uZW50fSAvPlwiYDtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG4gICAgLy8gaWYgdGFnTmFtZU9yQ29tcG9uZW50IGlzIGEgY29tcG9uZW50XHJcbiAgICBpZiAodHlwZW9mIHRhZ05hbWVPckNvbXBvbmVudCAhPT0gJ3N0cmluZycpXHJcbiAgICAgICAgcmV0dXJuIHsgY29tcG9uZW50OiB0YWdOYW1lT3JDb21wb25lbnQsIHByb3BzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgeyBjaGlsZHJlbjogY2hpbGRyZW4gfSkgfTtcclxuICAgIC8vIGN1c3RvbSBtZXNzYWdlIGlmIGRvY3VtZW50IGlzIG5vdCBkZWZpbmVkIGluIFNTUlxyXG4gICAgdHJ5IHtcclxuICAgICAgICBpZiAoKDAsIGV4cG9ydHMuaXNTU1IpKCkgJiYgdHlwZW9mIHRhZ05hbWVPckNvbXBvbmVudCA9PT0gJ3N0cmluZycgJiYgIWRvY3VtZW50KVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RvY3VtZW50IGlzIG5vdCBkZWZpbmVkJyk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SOicsIGVyci5tZXNzYWdlLCAnXFxuID4gUGxlYXNlIHJlYWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9uYW5vanN4L25hbm8vaXNzdWVzLzEwNicpO1xyXG4gICAgfVxyXG4gICAgbGV0IHJlZjtcclxuICAgIGNvbnN0IGVsZW1lbnQgPSB0YWdOYW1lT3JDb21wb25lbnQgPT09ICdzdmcnXHJcbiAgICAgICAgPyBoTlMoJ3N2ZycpXHJcbiAgICAgICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWVPckNvbXBvbmVudCk7XHJcbiAgICAvLyBjaGVjayBpZiB0aGUgZWxlbWVudCBpbmNsdWRlcyB0aGUgZXZlbnQgKGZvciBleGFtcGxlICdvbmlucHV0JylcclxuICAgIGNvbnN0IGlzRXZlbnQgPSAoZWwsIHApID0+IHtcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZXZlbnQgYmVnaW5zIHdpdGggJ29uJ1xyXG4gICAgICAgIGlmICgwICE9PSBwLmluZGV4T2YoJ29uJykpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyB3ZSByZXR1cm4gdHJ1ZSBpZiBTU1IsIHNpbmNlIG90aGVyd2lzZSBpdCB3aWxsIGdldCByZW5kZXJlZFxyXG4gICAgICAgIGlmIChlbC5fc3NyKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAvLyBjaGVjayBpZiB0aGUgZXZlbnQgaXMgcHJlc2VudCBpbiB0aGUgZWxlbWVudCBhcyBvYmplY3QgKG51bGwpIG9yIGFzIGZ1bmN0aW9uXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBlbFtwXSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGVsW3BdID09PSAnZnVuY3Rpb24nO1xyXG4gICAgfTtcclxuICAgIGZvciAoY29uc3QgcCBpbiBwcm9wcykge1xyXG4gICAgICAgIC8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NTIwNTY0NS8xMjY1Njg1NVxyXG4gICAgICAgIC8vIHN0eWxlIG9iamVjdCB0byBzdHlsZSBzdHJpbmdcclxuICAgICAgICBpZiAocCA9PT0gJ3N0eWxlJyAmJiB0eXBlb2YgcHJvcHNbcF0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlcyA9IE9iamVjdC5rZXlzKHByb3BzW3BdKVxyXG4gICAgICAgICAgICAgICAgLm1hcChrID0+IGAke2t9OiR7cHJvcHNbcF1ba119YClcclxuICAgICAgICAgICAgICAgIC5qb2luKCc7JylcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bQS1aXS9nLCBtYXRjaCA9PiBgLSR7bWF0Y2gudG9Mb3dlckNhc2UoKX1gKTtcclxuICAgICAgICAgICAgcHJvcHNbcF0gPSBgJHtzdHlsZXN9O2A7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGhhbmRlbCByZWZcclxuICAgICAgICBpZiAocCA9PT0gJ3JlZicpXHJcbiAgICAgICAgICAgIHJlZiA9IHByb3BzW3BdO1xyXG4gICAgICAgIC8vIGhhbmRsZSBldmVudHNcclxuICAgICAgICBlbHNlIGlmIChpc0V2ZW50KGVsZW1lbnQsIHAudG9Mb3dlckNhc2UoKSkpXHJcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihwLnRvTG93ZXJDYXNlKCkuc3Vic3RyaW5nKDIpLCAoZSkgPT4gcHJvcHNbcF0oZSkpO1xyXG4gICAgICAgIC8vIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MXHJcbiAgICAgICAgZWxzZSBpZiAocCA9PT0gJ2Rhbmdlcm91c2x5U2V0SW5uZXJIVE1MJyAmJiBwcm9wc1twXS5fX2h0bWwpIHtcclxuICAgICAgICAgICAgaWYgKCEoMCwgZXhwb3J0cy5pc1NTUikoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmcmFnbWVudCcpO1xyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuaW5uZXJIVE1MID0gcHJvcHNbcF0uX19odG1sO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IHByb3BzW3BdLl9faHRtbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBtb2Rlcm4gZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUxcclxuICAgICAgICBlbHNlIGlmIChwID09PSAnaW5uZXJIVE1MJyAmJiBwcm9wc1twXS5fX2Rhbmdlcm91c0h0bWwpIHtcclxuICAgICAgICAgICAgaWYgKCEoMCwgZXhwb3J0cy5pc1NTUikoKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmcmFnbWVudCcpO1xyXG4gICAgICAgICAgICAgICAgZnJhZ21lbnQuaW5uZXJIVE1MID0gcHJvcHNbcF0uX19kYW5nZXJvdXNIdG1sO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IHByb3BzW3BdLl9fZGFuZ2Vyb3VzSHRtbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjbGFzc05hbWVcclxuICAgICAgICBlbHNlIGlmICgvY2xhc3NOYW1lL2kudGVzdChwKSlcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdZb3UgY2FuIHVzZSBcImNsYXNzXCIgaW5zdGVhZCBvZiBcImNsYXNzTmFtZVwiLicpO1xyXG4gICAgICAgIC8vIHNldEF0dHJpYnV0ZVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwcm9wc1twXSAhPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHAsIHByb3BzW3BdKTtcclxuICAgIH1cclxuICAgIC8vIHRoZXNlIHRhZ3Mgc2hvdWxkIG5vdCBiZSBlc2NhcGVkIGJ5IGRlZmF1bHQgKGluIHNzcilcclxuICAgIGNvbnN0IGVzY2FwZSA9ICFbJ25vc2NyaXB0JywgJ3NjcmlwdCcsICdzdHlsZSddLmluY2x1ZGVzKHRhZ05hbWVPckNvbXBvbmVudCk7XHJcbiAgICAoMCwgZXhwb3J0cy5hcHBlbmRDaGlsZHJlbikoZWxlbWVudCwgY2hpbGRyZW4sIGVzY2FwZSk7XHJcbiAgICBpZiAocmVmKVxyXG4gICAgICAgIHJlZihlbGVtZW50KTtcclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59O1xyXG5leHBvcnRzLmggPSBoO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGVmaW5lQXNDdXN0b21FbGVtZW50cyA9IHZvaWQgMDtcclxuY29uc3QgY29yZV9qc18xID0gcmVxdWlyZShcIi4vY29yZS5qc1wiKTtcclxuY29uc3QgZGVmaW5lQXNDdXN0b21FbGVtZW50c1NTUiA9IChjb21wb25lbnQsIGNvbXBvbmVudE5hbWUsIF9wdWJsaWNQcm9wcyA9IFtdLCBfb3B0aW9ucyA9IHt9KSA9PiB7XHJcbiAgICBpZiAoIS9eW2EtekEtWjAtOV0rLVthLXpBLVowLTldKyQvLnRlc3QoY29tcG9uZW50TmFtZSkpXHJcbiAgICAgICAgY29uc29sZS5sb2coYEVycm9yOiBXZWJDb21wb25lbnQgbmFtZSBcIiR7Y29tcG9uZW50TmFtZX1cIiBpcyBpbnZhbGlkLmApO1xyXG4gICAgZWxzZVxyXG4gICAgICAgIF9uYW5vLmN1c3RvbUVsZW1lbnRzLnNldChjb21wb25lbnROYW1lLCBjb21wb25lbnQpO1xyXG59O1xyXG5jb25zdCBkZWZpbmVBc0N1c3RvbUVsZW1lbnRzID0gZnVuY3Rpb24gKGNvbXBvbmVudCwgY29tcG9uZW50TmFtZSwgcHVibGljUHJvcHMsIHsgbW9kZSA9ICdjbG9zZWQnLCBkZWxlZ2F0ZXNGb2N1cyA9IGZhbHNlIH0gPSB7fSkge1xyXG4gICAgaWYgKCgwLCBjb3JlX2pzXzEuaXNTU1IpKCkpIHtcclxuICAgICAgICBkZWZpbmVBc0N1c3RvbUVsZW1lbnRzU1NSKGNvbXBvbmVudCwgY29tcG9uZW50TmFtZSwgcHVibGljUHJvcHMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZShjb21wb25lbnROYW1lLCBjbGFzcyBleHRlbmRzIEhUTUxFbGVtZW50IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2hhZG93Um9vdCA9IHRoaXMuYXR0YWNoU2hhZG93KHsgbW9kZSwgZGVsZWdhdGVzRm9jdXMgfSk7XHJcbiAgICAgICAgICAgIGxldCByZWY7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbSh0aGlzLmNoaWxkcmVuKS5tYXAoYyA9PiAoMCwgY29yZV9qc18xLnJlbmRlcikoYykpO1xyXG4gICAgICAgICAgICAvLyBiZWNhdXNlIG5hbm8tanN4IHVwZGF0ZSBuZWVkIHBhcmVudEVsZW1lbnQsIHNvIERvY3VtZW50RnJhZ21lbnQgaXMgbm90IHVzYWJsZS4uLlxyXG4gICAgICAgICAgICBjb25zdCBlbCA9ICgwLCBjb3JlX2pzXzEuaCkoJ2RpdicsIG51bGwsICgwLCBjb3JlX2pzXzEuX3JlbmRlcikoe1xyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50LFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogY2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICAgICAgcmVmOiAocikgPT4gKHJlZiA9IHIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5jb21wb25lbnQgPSByZWY7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGdW5jdGlvbmFsQ29tcG9uZW50ID0gIWNvbXBvbmVudC5pc0NsYXNzO1xyXG4gICAgICAgICAgICB0aGlzLmZ1bmN0aW9uYWxDb21wb25lbnRzUHJvcHMgPSB7fTtcclxuICAgICAgICAgICAgc2hhZG93Um9vdC5hcHBlbmQoZWwpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNGdW5jdGlvbmFsQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC51cGRhdGVQcm9wc1ZhbHVlID0gKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb21wb25lbnQucHJvcHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnByb3BzID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wb25lbnQucHJvcHNbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudFtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHB1YmxpY1Byb3BzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZW1vdmVDaGlsZHJlbigpIHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGFkb3dSb290KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IEFycmF5LmZyb20oKF9hID0gdGhpcy5zaGFkb3dSb290KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2hpbGRyZW4pIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBlbCBvZiBjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lLCBfLCBuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNGdW5jdGlvbmFsQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudC51cGRhdGVQcm9wc1ZhbHVlKG5hbWUsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50LnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mdW5jdGlvbmFsQ29tcG9uZW50c1Byb3BzW25hbWVdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9ICgwLCBjb3JlX2pzXzEuaCkoJ2RpdicsIG51bGwsICgwLCBjb3JlX2pzXzEuX3JlbmRlcikoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwcm9wczogT2JqZWN0LmFzc2lnbih7IGNoaWxkcmVuOiBbXSwgcmVmOiAocikgPT4gKHRoaXMuY29tcG9uZW50ID0gcikgfSwgdGhpcy5mdW5jdGlvbmFsQ29tcG9uZW50c1Byb3BzKVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGFkb3dSb290LmFwcGVuZChlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0cy5kZWZpbmVBc0N1c3RvbUVsZW1lbnRzID0gZGVmaW5lQXNDdXN0b21FbGVtZW50cztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y3VzdG9tRWxlbWVudHNNb2RlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuRnJhZ21lbnQgPSB2b2lkIDA7XHJcbmNvbnN0IEZyYWdtZW50ID0gKHByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gcHJvcHMuY2hpbGRyZW47XHJcbn07XHJcbmV4cG9ydHMuRnJhZ21lbnQgPSBGcmFnbWVudDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZnJhZ21lbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5wcmludFZlcnNpb24gPSBleHBvcnRzLmVzY2FwZUh0bWwgPSBleHBvcnRzLm9uTm9kZVJlbW92ZSA9IGV4cG9ydHMuZGV0ZWN0U1NSID0gZXhwb3J0cy5ub2RlVG9TdHJpbmcgPSBleHBvcnRzLnRhc2sgPSB2b2lkIDA7XHJcbmNvbnN0IHZlcnNpb25fanNfMSA9IHJlcXVpcmUoXCIuL3ZlcnNpb24uanNcIik7XHJcbi8qKiBDcmVhdGVzIGEgbmV3IFRhc2sgdXNpbmcgc2V0VGltZW91dCgpICovXHJcbmNvbnN0IHRhc2sgPSAodGFzaykgPT4gc2V0VGltZW91dCh0YXNrLCAwKTtcclxuZXhwb3J0cy50YXNrID0gdGFzaztcclxuY29uc3Qgbm9kZVRvU3RyaW5nID0gKG5vZGUpID0+IHtcclxuICAgIGNvbnN0IHRtcE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRtcE5vZGUuYXBwZW5kQ2hpbGQobm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xyXG4gICAgcmV0dXJuIHRtcE5vZGUuaW5uZXJIVE1MO1xyXG59O1xyXG5leHBvcnRzLm5vZGVUb1N0cmluZyA9IG5vZGVUb1N0cmluZztcclxuY29uc3QgZGV0ZWN0U1NSID0gKCkgPT4ge1xyXG4gICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgY29uc3QgaXNEZW5vID0gdHlwZW9mIERlbm8gIT09ICd1bmRlZmluZWQnO1xyXG4gICAgY29uc3QgaGFzV2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogZmFsc2U7XHJcbiAgICByZXR1cm4gKHR5cGVvZiBfbmFubyAhPT0gJ3VuZGVmaW5lZCcgJiYgX25hbm8uaXNTU1IpIHx8IGlzRGVubyB8fCAhaGFzV2luZG93O1xyXG59O1xyXG5leHBvcnRzLmRldGVjdFNTUiA9IGRldGVjdFNTUjtcclxuZnVuY3Rpb24gaXNEZXNjZW5kYW50KGRlc2MsIHJvb3QpIHtcclxuICAgIC8vIEB0cy1pZ25vcmVcclxuICAgIHJldHVybiAhIWRlc2MgJiYgKGRlc2MgPT09IHJvb3QgfHwgaXNEZXNjZW5kYW50KGRlc2MucGFyZW50Tm9kZSwgcm9vdCkpO1xyXG59XHJcbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9NdXRhdGlvbk9ic2VydmVyXHJcbmNvbnN0IG9uTm9kZVJlbW92ZSA9IChlbGVtZW50LCBjYWxsYmFjaykgPT4ge1xyXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25zTGlzdCA9PiB7XHJcbiAgICAgICAgbXV0YXRpb25zTGlzdC5mb3JFYWNoKG11dGF0aW9uID0+IHtcclxuICAgICAgICAgICAgbXV0YXRpb24ucmVtb3ZlZE5vZGVzLmZvckVhY2gocmVtb3ZlZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEZXNjZW5kYW50KGVsZW1lbnQsIHJlbW92ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3cgZ2FyYmFnZSBjb2xsZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYnNlcnZlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LCB7XHJcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG9ic2VydmVyO1xyXG59O1xyXG5leHBvcnRzLm9uTm9kZVJlbW92ZSA9IG9uTm9kZVJlbW92ZTtcclxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzYyMzQ4MDRcclxuY29uc3QgZXNjYXBlSHRtbCA9ICh1bnNhZmUpID0+IHtcclxuICAgIGlmICh1bnNhZmUgJiYgdHlwZW9mIHVuc2FmZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAgcmV0dXJuIHVuc2FmZVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXHJcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcclxuICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxyXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCAnJmFwb3M7Jyk7XHJcbiAgICByZXR1cm4gdW5zYWZlO1xyXG59O1xyXG5leHBvcnRzLmVzY2FwZUh0bWwgPSBlc2NhcGVIdG1sO1xyXG5jb25zdCBwcmludFZlcnNpb24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBpbmZvID0gYFBvd2VyZWQgYnkgbmFubyBKU1ggdiR7dmVyc2lvbl9qc18xLlZFUlNJT059YDtcclxuICAgIGNvbnNvbGUubG9nKGAlYyAlYyAlYyAlYyAlYyAke2luZm99ICVjIGh0dHA6Ly9uYW5vanN4LmlvYCwgJ2JhY2tncm91bmQ6ICNmZjAwMDAnLCAnYmFja2dyb3VuZDogI2ZmZmYwMCcsICdiYWNrZ3JvdW5kOiAjMDBmZjAwJywgJ2JhY2tncm91bmQ6ICMwMGZmZmYnLCAnY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6ICMwMDAwMDA7JywgJ2JhY2tncm91bmQ6IG5vbmUnKTtcclxufTtcclxuZXhwb3J0cy5wcmludFZlcnNpb24gPSBwcmludFZlcnNpb247XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgaW5kZXhfanNfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi9odG0vaW5kZXguanNcIikpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSBpbmRleF9qc18xLmRlZmF1bHQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWh0bS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmJ1aWxkID0gZXhwb3J0cy5ldmFsdWF0ZSA9IGV4cG9ydHMudHJlZWlmeSA9IHZvaWQgMDtcclxuY29uc3QgY29uc3RhbnRzX2pzXzEgPSByZXF1aXJlKFwiLi9jb25zdGFudHMuanNcIik7XHJcbmNvbnN0IE1PREVfU0xBU0ggPSAwO1xyXG5jb25zdCBNT0RFX1RFWFQgPSAxO1xyXG5jb25zdCBNT0RFX1dISVRFU1BBQ0UgPSAyO1xyXG5jb25zdCBNT0RFX1RBR05BTUUgPSAzO1xyXG5jb25zdCBNT0RFX0NPTU1FTlQgPSA0O1xyXG5jb25zdCBNT0RFX1BST1BfU0VUID0gNTtcclxuY29uc3QgTU9ERV9QUk9QX0FQUEVORCA9IDY7XHJcbmNvbnN0IENISUxEX0FQUEVORCA9IDA7XHJcbmNvbnN0IENISUxEX1JFQ1VSU0UgPSAyO1xyXG5jb25zdCBUQUdfU0VUID0gMztcclxuY29uc3QgUFJPUFNfQVNTSUdOID0gNDtcclxuY29uc3QgUFJPUF9TRVQgPSBNT0RFX1BST1BfU0VUO1xyXG5jb25zdCBQUk9QX0FQUEVORCA9IE1PREVfUFJPUF9BUFBFTkQ7XHJcbi8vIFR1cm4gYSByZXN1bHQgb2YgYSBidWlsZCguLi4pIGNhbGwgaW50byBhIHRyZWUgdGhhdCBpcyBtb3JlXHJcbi8vIGNvbnZlbmllbnQgdG8gYW5hbHl6ZSBhbmQgdHJhbnNmb3JtIChlLmcuIEJhYmVsIHBsdWdpbnMpLlxyXG4vLyBGb3IgZXhhbXBsZTpcclxuLy8gXHR0cmVlaWZ5KFxyXG4vL1x0XHRidWlsZCc8ZGl2IGhyZWY9XCIxJHthfVwiIC4uLiR7Yn0+PCR7eH0gLz48L2Rpdj5gLFxyXG4vL1x0XHRbWCwgWSwgWl1cclxuLy9cdClcclxuLy8gcmV0dXJuczpcclxuLy8gXHR7XHJcbi8vIFx0XHR0YWc6ICdkaXYnLFxyXG4vL1x0XHRwcm9wczogWyB7IGhyZWY6IFtcIjFcIiwgWF0gfSxcdFkgXSxcclxuLy8gXHRcdGNoaWxkcmVuOiBbIHsgdGFnOiBaLCBwcm9wczogW10sIGNoaWxkcmVuOiBbXSB9IF1cclxuLy8gXHR9XHJcbmNvbnN0IHRyZWVpZnkgPSAoYnVpbHQsIGZpZWxkcykgPT4ge1xyXG4gICAgY29uc3QgX3RyZWVpZnkgPSAoYnVpbHQpID0+IHtcclxuICAgICAgICBsZXQgdGFnID0gJyc7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9wcyA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgcHJvcHMgPSBbXTtcclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYnVpbHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IGJ1aWx0W2krK107XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gYnVpbHRbaV0gPyBmaWVsZHNbYnVpbHRbaSsrXSAtIDFdIDogYnVpbHRbKytpXTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFRBR19TRVQpIHtcclxuICAgICAgICAgICAgICAgIHRhZyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFBST1BTX0FTU0lHTikge1xyXG4gICAgICAgICAgICAgICAgcHJvcHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvcHMgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IFBST1BfU0VUKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRQcm9wcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQcm9wcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMucHVzaChjdXJyZW50UHJvcHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3BzW2J1aWx0WysraV1dID0gW3ZhbHVlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBQUk9QX0FQUEVORCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3BzW2J1aWx0WysraV1dLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT09IENISUxEX1JFQ1VSU0UpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goX3RyZWVpZnkodmFsdWUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlID09PSBDSElMRF9BUFBFTkQpIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IHRhZywgcHJvcHMsIGNoaWxkcmVuIH07XHJcbiAgICB9O1xyXG4gICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gX3RyZWVpZnkoYnVpbHQpO1xyXG4gICAgcmV0dXJuIGNoaWxkcmVuLmxlbmd0aCA+IDEgPyBjaGlsZHJlbiA6IGNoaWxkcmVuWzBdO1xyXG59O1xyXG5leHBvcnRzLnRyZWVpZnkgPSB0cmVlaWZ5O1xyXG5jb25zdCBldmFsdWF0ZSA9IChoLCBidWlsdCwgZmllbGRzLCBhcmdzKSA9PiB7XHJcbiAgICBsZXQgdG1wO1xyXG4gICAgLy8gYGJ1aWxkKClgIHVzZWQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIG9wZXJhdGlvbiBsaXN0IGFzXHJcbiAgICAvLyB0ZW1wb3Jhcnkgd29ya3NwYWNlLiBOb3cgdGhhdCBgYnVpbGQoKWAgaXMgZG9uZSB3ZSBjYW4gdXNlXHJcbiAgICAvLyB0aGF0IHNwYWNlIHRvIHRyYWNrIHdoZXRoZXIgdGhlIGN1cnJlbnQgZWxlbWVudCBpcyBcImR5bmFtaWNcIlxyXG4gICAgLy8gKGkuZS4gaXQgb3IgYW55IG9mIGl0cyBkZXNjZW5kYW50cyBkZXBlbmQgb24gZHluYW1pYyB2YWx1ZXMpLlxyXG4gICAgYnVpbHRbMF0gPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBidWlsdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHR5cGUgPSBidWlsdFtpKytdO1xyXG4gICAgICAgIC8vIFNldCBgYnVpbHRbMF1gJ3MgYXBwcm9wcmlhdGUgYml0cyBpZiB0aGlzIGVsZW1lbnQgZGVwZW5kcyBvbiBhIGR5bmFtaWMgdmFsdWUuXHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSBidWlsdFtpXSA/ICgoYnVpbHRbMF0gfD0gdHlwZSA/IDEgOiAyKSwgZmllbGRzW2J1aWx0W2krK11dKSA6IGJ1aWx0WysraV07XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFRBR19TRVQpIHtcclxuICAgICAgICAgICAgYXJnc1swXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBQUk9QU19BU1NJR04pIHtcclxuICAgICAgICAgICAgYXJnc1sxXSA9IE9iamVjdC5hc3NpZ24oYXJnc1sxXSB8fCB7fSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlID09PSBQUk9QX1NFVCkge1xyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgIChhcmdzWzFdID0gYXJnc1sxXSB8fCB7fSlbYnVpbHRbKytpXV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gUFJPUF9BUFBFTkQpIHtcclxuICAgICAgICAgICAgYXJnc1sxXVtidWlsdFsrK2ldXSArPSBgJHt2YWx1ZX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgIC8vIHR5cGUgPT09IENISUxEX1JFQ1VSU0VcclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBvcGVyYXRpb24gbGlzdCAoaW5jbHVkaW5nIHRoZSBzdGF0aWNuZXNzIGJpdHMpIGFzXHJcbiAgICAgICAgICAgIC8vIGB0aGlzYCBmb3IgdGhlIGBoYCBjYWxsLlxyXG4gICAgICAgICAgICB0bXAgPSBoLmFwcGx5KHZhbHVlLCAoMCwgZXhwb3J0cy5ldmFsdWF0ZSkoaCwgdmFsdWUsIGZpZWxkcywgWycnLCBudWxsXSkpO1xyXG4gICAgICAgICAgICBhcmdzLnB1c2godG1wKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIDJuZCBsb3dlc3QgYml0IGl0IHRoZSBjaGlsZCBlbGVtZW50IGlzIGR5bmFtaWMuXHJcbiAgICAgICAgICAgICAgICBidWlsdFswXSB8PSAyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV3cml0ZSB0aGUgb3BlcmF0aW9uIGxpc3QgaW4tcGxhY2UgaWYgdGhlIGNoaWxkIGVsZW1lbnQgaXMgc3RhdGljLlxyXG4gICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnRseSBldmFsdWF0ZWQgcGllY2UgYENISUxEX1JFQ1VSU0UsIDAsIFsuLi5dYCBiZWNvbWVzXHJcbiAgICAgICAgICAgICAgICAvLyBgQ0hJTERfQVBQRU5ELCAwLCB0bXBgLlxyXG4gICAgICAgICAgICAgICAgLy8gRXNzZW50aWFsbHkgdGhlIG9wZXJhdGlvbiBsaXN0IGdldHMgb3B0aW1pemVkIGZvciBwb3RlbnRpYWwgZnV0dXJlXHJcbiAgICAgICAgICAgICAgICAvLyByZS1ldmFsdWF0aW9ucy5cclxuICAgICAgICAgICAgICAgIGJ1aWx0W2kgLSAyXSA9IENISUxEX0FQUEVORDtcclxuICAgICAgICAgICAgICAgIGJ1aWx0W2ldID0gdG1wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB0eXBlID09PSBDSElMRF9BUFBFTkRcclxuICAgICAgICAgICAgYXJncy5wdXNoKHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJncztcclxufTtcclxuZXhwb3J0cy5ldmFsdWF0ZSA9IGV2YWx1YXRlO1xyXG5jb25zdCBidWlsZCA9IGZ1bmN0aW9uIChzdGF0aWNzLCAuLi5yZXN0KSB7XHJcbiAgICBjb25zdCBmaWVsZHMgPSBbc3RhdGljcywgLi4ucmVzdF07XHJcbiAgICAvLyBAdHMtaWdub3JlXHJcbiAgICBjb25zdCBoID0gdGhpcztcclxuICAgIGxldCBtb2RlID0gTU9ERV9URVhUO1xyXG4gICAgbGV0IGJ1ZmZlciA9ICcnO1xyXG4gICAgbGV0IHF1b3RlID0gJyc7XHJcbiAgICBsZXQgY3VycmVudCA9IFswXTtcclxuICAgIGxldCBjaGFyO1xyXG4gICAgbGV0IHByb3BOYW1lO1xyXG4gICAgY29uc3QgY29tbWl0ID0gKGZpZWxkKSA9PiB7XHJcbiAgICAgICAgaWYgKG1vZGUgPT09IE1PREVfVEVYVCAmJiAoZmllbGQgfHwgKGJ1ZmZlciA9IGJ1ZmZlci5yZXBsYWNlKC9eXFxzKlxcblxccyp8XFxzKlxcblxccyokL2csICcnKSkpKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25zdGFudHNfanNfMS5NSU5JKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LnB1c2goZmllbGQgPyBmaWVsZHNbZmllbGRdIDogYnVmZmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQucHVzaChDSElMRF9BUFBFTkQsIGZpZWxkLCBidWZmZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1vZGUgPT09IE1PREVfVEFHTkFNRSAmJiAoZmllbGQgfHwgYnVmZmVyKSkge1xyXG4gICAgICAgICAgICBpZiAoY29uc3RhbnRzX2pzXzEuTUlOSSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFsxXSA9IGZpZWxkID8gZmllbGRzW2ZpZWxkXSA6IGJ1ZmZlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQucHVzaChUQUdfU0VULCBmaWVsZCwgYnVmZmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb2RlID0gTU9ERV9XSElURVNQQUNFO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChtb2RlID09PSBNT0RFX1dISVRFU1BBQ0UgJiYgYnVmZmVyID09PSAnLi4uJyAmJiBmaWVsZCkge1xyXG4gICAgICAgICAgICBpZiAoY29uc3RhbnRzX2pzXzEuTUlOSSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFsyXSA9IE9iamVjdC5hc3NpZ24oY3VycmVudFsyXSB8fCB7fSwgZmllbGRzW2ZpZWxkXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LnB1c2goUFJPUFNfQVNTSUdOLCBmaWVsZCwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobW9kZSA9PT0gTU9ERV9XSElURVNQQUNFICYmIGJ1ZmZlciAmJiAhZmllbGQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnN0YW50c19qc18xLk1JTkkpIHtcclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIChjdXJyZW50WzJdID0gY3VycmVudFsyXSB8fCB7fSlbYnVmZmVyXSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LnB1c2goUFJPUF9TRVQsIDAsIHRydWUsIGJ1ZmZlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobW9kZSA+PSBNT0RFX1BST1BfU0VUKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25zdGFudHNfanNfMS5NSU5JKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZSA9PT0gTU9ERV9QUk9QX1NFVCkge1xyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAoY3VycmVudFsyXSA9IGN1cnJlbnRbMl0gfHwge30pW3Byb3BOYW1lXSA9IGZpZWxkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYnVmZmVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGJ1ZmZlciArIGZpZWxkc1tmaWVsZF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZmllbGRzW2ZpZWxkXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gTU9ERV9QUk9QX0FQUEVORDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZpZWxkIHx8IGJ1ZmZlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRbMl1bcHJvcE5hbWVdICs9IGZpZWxkID8gYnVmZmVyICsgZmllbGRzW2ZpZWxkXSA6IGJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmZXIgfHwgKCFmaWVsZCAmJiBtb2RlID09PSBNT0RFX1BST1BfU0VUKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQucHVzaChtb2RlLCAwLCBidWZmZXIsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gTU9ERV9QUk9QX0FQUEVORDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChmaWVsZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQucHVzaChtb2RlLCBmaWVsZCwgMCwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGUgPSBNT0RFX1BST1BfQVBQRU5EO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1ZmZlciA9ICcnO1xyXG4gICAgfTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhdGljcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpKSB7XHJcbiAgICAgICAgICAgIGlmIChtb2RlID09PSBNT0RFX1RFWFQpIHtcclxuICAgICAgICAgICAgICAgIGNvbW1pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbW1pdChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdGF0aWNzW2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGNoYXIgPSBzdGF0aWNzW2ldW2pdO1xyXG4gICAgICAgICAgICBpZiAobW9kZSA9PT0gTU9ERV9URVhUKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhciA9PT0gJzwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tbWl0IGJ1ZmZlclxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25zdGFudHNfanNfMS5NSU5JKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBbY3VycmVudCwgJycsIG51bGxdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IFtjdXJyZW50XTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA9IE1PREVfVEFHTkFNRTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlciArPSBjaGFyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1vZGUgPT09IE1PREVfQ09NTUVOVCkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIGV2ZXJ5dGhpbmcgdW50aWwgdGhlIGxhc3QgdGhyZWUgY2hhcmFjdGVycyBhcmUgJy0nLCAnLScgYW5kICc+J1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZlciA9PT0gJy0tJyAmJiBjaGFyID09PSAnPicpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2RlID0gTU9ERV9URVhUO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlciA9ICcnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyID0gY2hhciArIGJ1ZmZlclswXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChxdW90ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoYXIgPT09IHF1b3RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVvdGUgPSAnJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlciArPSBjaGFyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoYXIgPT09ICdcIicgfHwgY2hhciA9PT0gXCInXCIpIHtcclxuICAgICAgICAgICAgICAgIHF1b3RlID0gY2hhcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyID09PSAnPicpIHtcclxuICAgICAgICAgICAgICAgIGNvbW1pdCgpO1xyXG4gICAgICAgICAgICAgICAgbW9kZSA9IE1PREVfVEVYVDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICghbW9kZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSWdub3JlIGV2ZXJ5dGhpbmcgdW50aWwgdGhlIHRhZyBlbmRzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhciA9PT0gJz0nKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlID0gTU9ERV9QUk9QX1NFVDtcclxuICAgICAgICAgICAgICAgIHByb3BOYW1lID0gYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2hhciA9PT0gJy8nICYmIChtb2RlIDwgTU9ERV9QUk9QX1NFVCB8fCBzdGF0aWNzW2ldW2ogKyAxXSA9PT0gJz4nKSkge1xyXG4gICAgICAgICAgICAgICAgY29tbWl0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9kZSA9PT0gTU9ERV9UQUdOQU1FKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbMF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb2RlID0gY3VycmVudDtcclxuICAgICAgICAgICAgICAgIGlmIChjb25zdGFudHNfanNfMS5NSU5JKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgIChjdXJyZW50ID0gY3VycmVudFswXSkucHVzaChoKC4uLm1vZGUuc2xpY2UoMSkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICAoY3VycmVudCA9IGN1cnJlbnRbMF0pLnB1c2goQ0hJTERfUkVDVVJTRSwgMCwgbW9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtb2RlID0gTU9ERV9TTEFTSDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaGFyID09PSAnICcgfHwgY2hhciA9PT0gJ1xcdCcgfHwgY2hhciA9PT0gJ1xcbicgfHwgY2hhciA9PT0gJ1xccicpIHtcclxuICAgICAgICAgICAgICAgIC8vIDxhIGRpc2FibGVkPlxyXG4gICAgICAgICAgICAgICAgY29tbWl0KCk7XHJcbiAgICAgICAgICAgICAgICBtb2RlID0gTU9ERV9XSElURVNQQUNFO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnVmZmVyICs9IGNoYXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1vZGUgPT09IE1PREVfVEFHTkFNRSAmJiBidWZmZXIgPT09ICchLS0nKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RlID0gTU9ERV9DT01NRU5UO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnRbMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21taXQoKTtcclxuICAgIGlmIChjb25zdGFudHNfanNfMS5NSU5JKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQubGVuZ3RoID4gMiA/IGN1cnJlbnQuc2xpY2UoMSkgOiBjdXJyZW50WzFdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnQ7XHJcbn07XHJcbmV4cG9ydHMuYnVpbGQgPSBidWlsZDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YnVpbGQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5NSU5JID0gdm9pZCAwO1xyXG5leHBvcnRzLk1JTkkgPSBmYWxzZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uc3RhbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG4vKipcclxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IGNvbnN0YW50c19qc18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzLmpzXCIpO1xyXG5jb25zdCBidWlsZF9qc18xID0gcmVxdWlyZShcIi4vYnVpbGQuanNcIik7XHJcbmNvbnN0IENBQ0hFUyA9IG5ldyBNYXAoKTtcclxuY29uc3QgcmVndWxhciA9IGZ1bmN0aW9uIChzdGF0aWNzKSB7XHJcbiAgICBsZXQgdG1wID0gQ0FDSEVTLmdldCh0aGlzKTtcclxuICAgIGlmICghdG1wKSB7XHJcbiAgICAgICAgdG1wID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIENBQ0hFUy5zZXQodGhpcywgdG1wKTtcclxuICAgIH1cclxuICAgIHRtcCA9ICgwLCBidWlsZF9qc18xLmV2YWx1YXRlKSh0aGlzLCB0bXAuZ2V0KHN0YXRpY3MpIHx8ICh0bXAuc2V0KHN0YXRpY3MsICh0bXAgPSAoMCwgYnVpbGRfanNfMS5idWlsZCkoc3RhdGljcykpKSwgdG1wKSwgYXJndW1lbnRzLCBbXSk7XHJcbiAgICByZXR1cm4gdG1wLmxlbmd0aCA+IDEgPyB0bXAgOiB0bXBbMF07XHJcbn07XHJcbi8vIGV4cG9ydCBhcyBodG1cclxuZXhwb3J0cy5kZWZhdWx0ID0gY29uc3RhbnRzX2pzXzEuTUlOSSA/IGJ1aWxkX2pzXzEuYnVpbGQgOiByZWd1bGFyO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcclxuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XHJcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSkpO1xyXG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZFUlNJT04gPSBleHBvcnRzLnByaW50VmVyc2lvbiA9IGV4cG9ydHMuZGVmaW5lQXNDdXN0b21FbGVtZW50cyA9IGV4cG9ydHMud2l0aFN0eWxlcyA9IGV4cG9ydHMudXNlQ29udGV4dCA9IGV4cG9ydHMuY3JlYXRlQ29udGV4dCA9IGV4cG9ydHMuU3RvcmUgPSBleHBvcnRzLkZyYWdtZW50ID0gZXhwb3J0cy5yZW5kZXJTU1IgPSBleHBvcnRzLnRhc2sgPSBleHBvcnRzLm5vZGVUb1N0cmluZyA9IGV4cG9ydHMuaHlkcmF0ZUxhenkgPSBleHBvcnRzLmpzeCA9IGV4cG9ydHMuaXNTU1IgPSBleHBvcnRzLkNvbXBvbmVudCA9IGV4cG9ydHMudGljayA9IGV4cG9ydHMuaHlkcmF0ZSA9IGV4cG9ydHMucmVuZGVyID0gZXhwb3J0cy5oID0gdm9pZCAwO1xyXG4vLyBjb3JlXHJcbnZhciBjb3JlX2pzXzEgPSByZXF1aXJlKFwiLi9jb3JlLmpzXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJoXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb3JlX2pzXzEuaDsgfSB9KTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmVuZGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb3JlX2pzXzEucmVuZGVyOyB9IH0pO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJoeWRyYXRlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb3JlX2pzXzEuaHlkcmF0ZTsgfSB9KTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidGlja1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29yZV9qc18xLnRpY2s7IH0gfSk7XHJcbi8vIGNvbXBvbmVudFxyXG52YXIgY29tcG9uZW50X2pzXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnQuanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvbXBvbmVudFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY29tcG9uZW50X2pzXzEuQ29tcG9uZW50OyB9IH0pO1xyXG4vLyBidWlsdC1pbiBDb21wb25lbnRzXHJcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9jb21wb25lbnRzL2luZGV4LmpzXCIpLCBleHBvcnRzKTtcclxuLy8gZXhwb3J0IHNvbWUgZGVmYXVsdHMgKE5hbm8pXHJcbmNvbnN0IGNvcmVfanNfMiA9IHJlcXVpcmUoXCIuL2NvcmUuanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImlzU1NSXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb3JlX2pzXzIuaXNTU1I7IH0gfSk7XHJcbmNvbnN0IHNzcl9qc18xID0gcmVxdWlyZShcIi4vc3NyLmpzXCIpO1xyXG5leHBvcnRzLmRlZmF1bHQgPSB7IGg6IGNvcmVfanNfMi5oLCByZW5kZXI6IGNvcmVfanNfMi5yZW5kZXIsIGh5ZHJhdGU6IGNvcmVfanNfMi5oeWRyYXRlLCByZW5kZXJTU1I6IHNzcl9qc18xLnJlbmRlclNTUiwgaXNTU1I6IGNvcmVfanNfMi5pc1NTUiB9O1xyXG52YXIganN4X2pzXzEgPSByZXF1aXJlKFwiLi9qc3guanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImpzeFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4ganN4X2pzXzEuanN4OyB9IH0pO1xyXG52YXIgbGF6eV9qc18xID0gcmVxdWlyZShcIi4vbGF6eS5qc1wiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiaHlkcmF0ZUxhenlcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGxhenlfanNfMS5oeWRyYXRlTGF6eTsgfSB9KTtcclxudmFyIGhlbHBlcnNfanNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMuanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5vZGVUb1N0cmluZ1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaGVscGVyc19qc18xLm5vZGVUb1N0cmluZzsgfSB9KTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidGFza1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaGVscGVyc19qc18xLnRhc2s7IH0gfSk7XHJcbnZhciBzc3JfanNfMiA9IHJlcXVpcmUoXCIuL3Nzci5qc1wiKTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwicmVuZGVyU1NSXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzc3JfanNfMi5yZW5kZXJTU1I7IH0gfSk7XHJcbnZhciBmcmFnbWVudF9qc18xID0gcmVxdWlyZShcIi4vZnJhZ21lbnQuanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkZyYWdtZW50XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBmcmFnbWVudF9qc18xLkZyYWdtZW50OyB9IH0pO1xyXG52YXIgc3RvcmVfanNfMSA9IHJlcXVpcmUoXCIuL3N0b3JlLmpzXCIpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJTdG9yZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmVfanNfMS5TdG9yZTsgfSB9KTtcclxudmFyIGNvbnRleHRfanNfMSA9IHJlcXVpcmUoXCIuL2NvbnRleHQuanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImNyZWF0ZUNvbnRleHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNvbnRleHRfanNfMS5jcmVhdGVDb250ZXh0OyB9IH0pO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ1c2VDb250ZXh0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjb250ZXh0X2pzXzEudXNlQ29udGV4dDsgfSB9KTtcclxudmFyIHdpdGhTdHlsZXNfanNfMSA9IHJlcXVpcmUoXCIuL3dpdGhTdHlsZXMuanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIndpdGhTdHlsZXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHdpdGhTdHlsZXNfanNfMS53aXRoU3R5bGVzOyB9IH0pO1xyXG52YXIgY3VzdG9tRWxlbWVudHNNb2RlX2pzXzEgPSByZXF1aXJlKFwiLi9jdXN0b21FbGVtZW50c01vZGUuanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImRlZmluZUFzQ3VzdG9tRWxlbWVudHNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGN1c3RvbUVsZW1lbnRzTW9kZV9qc18xLmRlZmluZUFzQ3VzdG9tRWxlbWVudHM7IH0gfSk7XHJcbi8vIHZlcnNpb25cclxudmFyIGhlbHBlcnNfanNfMiA9IHJlcXVpcmUoXCIuL2hlbHBlcnMuanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInByaW50VmVyc2lvblwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaGVscGVyc19qc18yLnByaW50VmVyc2lvbjsgfSB9KTtcclxudmFyIHZlcnNpb25fanNfMSA9IHJlcXVpcmUoXCIuL3ZlcnNpb24uanNcIik7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlZFUlNJT05cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZlcnNpb25fanNfMS5WRVJTSU9OOyB9IH0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmpzeCA9IHZvaWQgMDtcclxuY29uc3QgY29yZV9qc18xID0gcmVxdWlyZShcIi4vY29yZS5qc1wiKTtcclxuY29uc3QgaHRtX2pzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vaHRtLmpzXCIpKTtcclxuY29uc3QganN4ID0gaHRtX2pzXzEuZGVmYXVsdC5iaW5kKGNvcmVfanNfMS5oKTtcclxuZXhwb3J0cy5qc3ggPSBqc3g7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpzeC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmh5ZHJhdGVMYXp5ID0gdm9pZCAwO1xyXG5jb25zdCBjb3JlX2pzXzEgPSByZXF1aXJlKFwiLi9jb3JlLmpzXCIpO1xyXG5jb25zdCB2aXNpYmxlX2pzXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL3Zpc2libGUuanNcIik7XHJcbmNvbnN0IGh5ZHJhdGVMYXp5ID0gKGNvbXBvbmVudCwgcGFyZW50ID0gbnVsbCwgcmVtb3ZlQ2hpbGROb2RlcyA9IHRydWUpID0+IHtcclxuICAgIGNvbnN0IGMgPSAoMCwgY29yZV9qc18xLmgpKHZpc2libGVfanNfMS5WaXNpYmxlLCBudWxsLCBjb21wb25lbnQpO1xyXG4gICAgcmV0dXJuICgwLCBjb3JlX2pzXzEuaHlkcmF0ZSkoYywgcGFyZW50LCByZW1vdmVDaGlsZE5vZGVzKTtcclxufTtcclxuZXhwb3J0cy5oeWRyYXRlTGF6eSA9IGh5ZHJhdGVMYXp5O1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1sYXp5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZG9jdW1lbnRTU1IgPSBleHBvcnRzLkRvY3VtZW50U1NSID0gZXhwb3J0cy5IVE1MRWxlbWVudFNTUiA9IHZvaWQgMDtcclxuY29uc3QgaGVscGVyc19qc18xID0gcmVxdWlyZShcIi4vaGVscGVycy5qc1wiKTtcclxuY2xhc3MgSFRNTEVsZW1lbnRTU1Ige1xyXG4gICAgY29uc3RydWN0b3IodGFnKSB7XHJcbiAgICAgICAgdGhpcy5pc1NlbGZDbG9zaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlVHlwZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50YWdOYW1lID0gdGFnO1xyXG4gICAgICAgIGNvbnN0IHNlbGZDbG9zaW5nID0gW1xyXG4gICAgICAgICAgICAnYXJlYScsXHJcbiAgICAgICAgICAgICdiYXNlJyxcclxuICAgICAgICAgICAgJ2JyJyxcclxuICAgICAgICAgICAgJ2NvbCcsXHJcbiAgICAgICAgICAgICdlbWJlZCcsXHJcbiAgICAgICAgICAgICdocicsXHJcbiAgICAgICAgICAgICdpbWcnLFxyXG4gICAgICAgICAgICAnaW5wdXQnLFxyXG4gICAgICAgICAgICAnbGluaycsXHJcbiAgICAgICAgICAgICdtZXRhJyxcclxuICAgICAgICAgICAgJ3BhcmFtJyxcclxuICAgICAgICAgICAgJ3NvdXJjZScsXHJcbiAgICAgICAgICAgICd0cmFjaycsXHJcbiAgICAgICAgICAgICd3YnInXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLm5vZGVUeXBlID0gMTtcclxuICAgICAgICBpZiAoc2VsZkNsb3NpbmcuaW5kZXhPZih0YWcpID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fc3NyID0gYDwke3RhZ30gLz5gO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZkNsb3NpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fc3NyID0gYDwke3RhZ30+PC8ke3RhZ30+YDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgb3V0ZXJIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgaW5uZXJIVE1MKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlubmVyVGV4dDtcclxuICAgIH1cclxuICAgIHNldCBpbm5lckhUTUwodGV4dCkge1xyXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gdGV4dDtcclxuICAgIH1cclxuICAgIGdldCBpbm5lclRleHQoKSB7XHJcbiAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgIGNvbnN0IHJlZyA9IC8oXjxbXj5dKz4pKC4rKT8oPFxcL1thLXowLTldKz4kfFxcLz4kKS9nbTtcclxuICAgICAgICByZXR1cm4gKChfYSA9IHJlZy5leGVjKHRoaXMuX3NzcikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVsyXSkgfHwgJyc7XHJcbiAgICB9XHJcbiAgICBzZXQgaW5uZXJUZXh0KHRleHQpIHtcclxuICAgICAgICBjb25zdCByZWcgPSAvKF48W14+XSs+KSguKyk/KDxcXC9bYS16MC05XSs+JHxcXC8+JCkvZ207XHJcbiAgICAgICAgY29uc3QgcmVwbGFjZXIgPSAoX21hdGNoLCBwMSwgX3AyLCBwMykgPT4gW3AxLCB0ZXh0LCBwM10uam9pbignJyk7XHJcbiAgICAgICAgdGhpcy5fc3NyID0gdGhpcy5fc3NyLnJlcGxhY2UocmVnLCByZXBsYWNlcik7XHJcbiAgICB9XHJcbiAgICBnZXRBdHRyaWJ1dGUoX25hbWUpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldCBjbGFzc0xpc3QoKSB7XHJcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX3NzcjtcclxuICAgICAgICBjb25zdCBjbGFzc2VzUmVnZXggPSAvXjxcXHcrLisoXFxzY2xhc3M9XCIpKFteXCJdKylcIi9nbTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhZGQ6IChuYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBuYW1lKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW50cmllczoge1xyXG4gICAgICAgICAgICAgICAgZ2V0IGxlbmd0aCgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gY2xhc3Nlc1JlZ2V4LmV4ZWMoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzZXMgJiYgY2xhc3Nlc1syXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNbMl0uc3BsaXQoJyAnKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NzcjtcclxuICAgIH1cclxuICAgIHNldEF0dHJpYnV0ZU5TKF9uYW1lc3BhY2UsIG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgcmVwbGFjZXIxID0gKF9tYXRjaCwgcDEsIHAyKSA9PiBgJHtwMX0keygwLCBoZWxwZXJzX2pzXzEuZXNjYXBlSHRtbCkobmFtZSl9PVwiJHsoMCwgaGVscGVyc19qc18xLmVzY2FwZUh0bWwpKHZhbHVlKX1cIiAke3AyfWA7XHJcbiAgICAgICAgY29uc3QgcmVwbGFjZXIyID0gKF9tYXRjaCwgcDEsIHAyKSA9PiBgJHtwMX0gJHsoMCwgaGVscGVyc19qc18xLmVzY2FwZUh0bWwpKG5hbWUpfT1cIiR7KDAsIGhlbHBlcnNfanNfMS5lc2NhcGVIdG1sKSh2YWx1ZSl9XCIke3AyfWA7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZWxmQ2xvc2luZylcclxuICAgICAgICAgICAgdGhpcy5fc3NyID0gdGhpcy5fc3NyLnJlcGxhY2UoLyhePFthLXowLTldKyApKC4rKS9nbSwgcmVwbGFjZXIxKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuX3NzciA9IHRoaXMuX3Nzci5yZXBsYWNlKC8oXjxbXj5dKykoLispL2dtLCByZXBsYWNlcjIpO1xyXG4gICAgfVxyXG4gICAgYXBwZW5kKGNoaWxkKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICB9XHJcbiAgICBhcHBlbmRDaGlsZChjaGlsZCkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fc3NyLmxhc3RJbmRleE9mKCc8LycpO1xyXG4gICAgICAgIHRoaXMuX3NzciA9IHRoaXMuX3Nzci5zdWJzdHJpbmcoMCwgaW5kZXgpICsgY2hpbGQgKyB0aGlzLl9zc3Iuc3Vic3RyaW5nKGluZGV4KTtcclxuICAgIH1cclxuICAgIGdldCBjaGlsZHJlbigpIHtcclxuICAgICAgICBjb25zdCByZWcgPSAvPChbYS16MC05XSspKCg/ITxcXC9cXDEpLikqPFxcL1xcMT4vZ21zO1xyXG4gICAgICAgIGNvbnN0IGFycmF5ID0gW107XHJcbiAgICAgICAgbGV0IG1hdGNoO1xyXG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSByZWcuZXhlYyh0aGlzLmlubmVySFRNTCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2gobWF0Y2hbMF0ucmVwbGFjZSgvW1xcc10rL2dtLCAnICcpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihfdHlwZSwgX2xpc3RlbmVyLCBfb3B0aW9ucykgeyB9XHJcbn1cclxuZXhwb3J0cy5IVE1MRWxlbWVudFNTUiA9IEhUTUxFbGVtZW50U1NSO1xyXG5jbGFzcyBEb2N1bWVudFNTUiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJvZHkgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcclxuICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2hlYWQnKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUVsZW1lbnQodGFnKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBIVE1MRWxlbWVudFNTUih0YWcpO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlRWxlbWVudE5TKF9VUkksIHRhZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuICAgIH1cclxuICAgIGNyZWF0ZVRleHROb2RlKHRleHQpIHtcclxuICAgICAgICByZXR1cm4gKDAsIGhlbHBlcnNfanNfMS5lc2NhcGVIdG1sKSh0ZXh0KTtcclxuICAgIH1cclxuICAgIHF1ZXJ5U2VsZWN0b3IoX3F1ZXJ5KSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkRvY3VtZW50U1NSID0gRG9jdW1lbnRTU1I7XHJcbmNvbnN0IGRvY3VtZW50U1NSID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIG5ldyBEb2N1bWVudFNTUigpO1xyXG59O1xyXG5leHBvcnRzLmRvY3VtZW50U1NSID0gZG9jdW1lbnRTU1I7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlZ2V4RG9tLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuY2xlYXJTdGF0ZSA9IGV4cG9ydHMucmVuZGVyU1NSID0gZXhwb3J0cy5pbml0U1NSID0gdm9pZCAwO1xyXG5jb25zdCBjb3JlX2pzXzEgPSByZXF1aXJlKFwiLi9jb3JlLmpzXCIpO1xyXG5jb25zdCByZWdleERvbV9qc18xID0gcmVxdWlyZShcIi4vcmVnZXhEb20uanNcIik7XHJcbmNvbnN0IHN0YXRlX2pzXzEgPSByZXF1aXJlKFwiLi9zdGF0ZS5qc1wiKTtcclxuY29uc3QgaGVscGVyc19qc18xID0gcmVxdWlyZShcIi4vaGVscGVycy5qc1wiKTtcclxuLy8gZnVuY3Rpb25zIHRoYXQgc2hvdWxkIG9ubHkgYmUgYXZhaWxhYmxlIG9uIHRoZSBzZXJ2ZXItc2lkZVxyXG5jb25zdCBzc3JUcmlja3MgPSB7XHJcbiAgICBpc1dlYkNvbXBvbmVudDogKHRhZ05hbWVPckNvbXBvbmVudCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAodHlwZW9mIHRhZ05hbWVPckNvbXBvbmVudCA9PT0gJ3N0cmluZycgJiZcclxuICAgICAgICAgICAgdGFnTmFtZU9yQ29tcG9uZW50LmluY2x1ZGVzKCctJykgJiZcclxuICAgICAgICAgICAgX25hbm8uY3VzdG9tRWxlbWVudHMuaGFzKHRhZ05hbWVPckNvbXBvbmVudCkpO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcldlYkNvbXBvbmVudDogKHRhZ05hbWVPckNvbXBvbmVudCwgcHJvcHMsIGNoaWxkcmVuLCBfcmVuZGVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tRWxlbWVudCA9IF9uYW5vLmN1c3RvbUVsZW1lbnRzLmdldCh0YWdOYW1lT3JDb21wb25lbnQpO1xyXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IF9yZW5kZXIoeyBjb21wb25lbnQ6IGN1c3RvbUVsZW1lbnQsIHByb3BzOiBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIHByb3BzKSwgeyBjaGlsZHJlbjogY2hpbGRyZW4gfSkgfSk7XHJcbiAgICAgICAgLy8gZ2V0IHRoZSBodG1sIHRhZyBhbmQgdGhlIGlubmVyVGV4dCBmcm9tIHN0cmluZ1xyXG4gICAgICAgIC8vIG1hdGNoWzFdOiBIVE1MVGFnXHJcbiAgICAgICAgLy8gbWF0Y2hbMl06IGlubmVyVGV4dFxyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gY29tcG9uZW50LnRvU3RyaW5nKCkubWF0Y2goL148KD88dGFnPlthLXpdKyk+KC4qKTxcXC9cXGs8dGFnPj4kLyk7XHJcbiAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG1hdGNoWzFdKTtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBtYXRjaFsyXTtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWlubmVyLWRlY2xhcmF0aW9uc1xyXG4gICAgICAgICAgICBmdW5jdGlvbiByZXBsYWNlcihtYXRjaCwgcDEsIF9vZmZzZXQsIF9zdHJpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaC5yZXBsYWNlKHAxLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gcmVtb3ZlIGV2ZW50cyBsaWtlIG9uQ2xpY2sgZnJvbSBET01cclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBlbGVtZW50LmlubmVyVGV4dC5yZXBsYWNlKC88XFx3K1tePl0qKFxccyhvblxcdyopPVwiW15cIl0qXCIpL2dtLCByZXBsYWNlcik7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5jb25zdCBpbml0R2xvYmFsVmFyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaXNTU1IgPSAoMCwgaGVscGVyc19qc18xLmRldGVjdFNTUikoKSA9PT0gdHJ1ZSA/IHRydWUgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IHsgcGF0aG5hbWU6ICcvJyB9O1xyXG4gICAgY29uc3QgZG9jdW1lbnQgPSBpc1NTUiA/ICgwLCByZWdleERvbV9qc18xLmRvY3VtZW50U1NSKSgpIDogd2luZG93LmRvY3VtZW50O1xyXG4gICAgZ2xvYmFsVGhpcy5fbmFubyA9IHsgaXNTU1IsIGxvY2F0aW9uLCBkb2N1bWVudCwgY3VzdG9tRWxlbWVudHM6IG5ldyBNYXAoKSwgc3NyVHJpY2tzIH07XHJcbn07XHJcbmluaXRHbG9iYWxWYXIoKTtcclxuY29uc3QgaW5pdFNTUiA9IChwYXRobmFtZSA9ICcvJykgPT4ge1xyXG4gICAgX25hbm8ubG9jYXRpb24gPSB7IHBhdGhuYW1lIH07XHJcbiAgICBnbG9iYWxUaGlzLmRvY3VtZW50ID0gX25hbm8uZG9jdW1lbnQgPSAoMCwgY29yZV9qc18xLmlzU1NSKSgpID8gKDAsIHJlZ2V4RG9tX2pzXzEuZG9jdW1lbnRTU1IpKCkgOiB3aW5kb3cuZG9jdW1lbnQ7XHJcbn07XHJcbmV4cG9ydHMuaW5pdFNTUiA9IGluaXRTU1I7XHJcbmNvbnN0IHJlbmRlclNTUiA9IChjb21wb25lbnQsIG9wdGlvbnMgPSB7fSkgPT4ge1xyXG4gICAgY29uc3QgeyBwYXRobmFtZSwgY2xlYXJTdGF0ZSA9IHRydWUgfSA9IG9wdGlvbnM7XHJcbiAgICAoMCwgZXhwb3J0cy5pbml0U1NSKShwYXRobmFtZSk7XHJcbiAgICBpZiAoY2xlYXJTdGF0ZSlcclxuICAgICAgICBzdGF0ZV9qc18xLl9zdGF0ZS5jbGVhcigpO1xyXG4gICAgcmV0dXJuICgwLCBjb3JlX2pzXzEucmVuZGVyKShjb21wb25lbnQsIG51bGwsIHRydWUpLmpvaW4oJycpO1xyXG59O1xyXG5leHBvcnRzLnJlbmRlclNTUiA9IHJlbmRlclNTUjtcclxuY29uc3QgY2xlYXJTdGF0ZSA9ICgpID0+IHtcclxuICAgIHN0YXRlX2pzXzEuX3N0YXRlLmNsZWFyKCk7XHJcbn07XHJcbmV4cG9ydHMuY2xlYXJTdGF0ZSA9IGNsZWFyU3RhdGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNzci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLl9jbGVhclN0YXRlID0gZXhwb3J0cy5fc3RhdGUgPSB2b2lkIDA7XHJcbi8qKiBIb2xkcyB0aGUgc3RhdGUgb2YgdGhlIHdob2xlIGFwcGxpY2F0aW9uLiAqL1xyXG5leHBvcnRzLl9zdGF0ZSA9IG5ldyBNYXAoKTtcclxuLyoqIENsZWFycyB0aGUgc3RhdGUgb2YgdGhlIHdob2xlIGFwcGxpY2F0aW9uLiAqL1xyXG5jb25zdCBfY2xlYXJTdGF0ZSA9ICgpID0+IHtcclxuICAgIGV4cG9ydHMuX3N0YXRlLmNsZWFyKCk7XHJcbn07XHJcbmV4cG9ydHMuX2NsZWFyU3RhdGUgPSBfY2xlYXJTdGF0ZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhdGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TdG9yZSA9IHZvaWQgMDtcclxuY29uc3QgY29yZV9qc18xID0gcmVxdWlyZShcIi4vY29yZS5qc1wiKTtcclxuY2xhc3MgU3RvcmUge1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgeW91ciBvd24gU3RvcmUuXHJcbiAgICAgKiBAcGFyYW0gZGVmYXVsdFN0YXRlIFBhc3MgdGhlIGluaXRpYWwgU3RhdGUuXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgU3RvcmUgKG9ubHkgcmVxdWlyZWQgaWYgeW91IHBlcnNpc3QgdGhlIHN0YXRlIGluIGxvY2FsU3RvcmFnZSBvciBzZXNzaW9uU3RvcmFnZSkuXHJcbiAgICAgKiBAcGFyYW0gc3RvcmFnZSBQYXNzICdtZW1vcnknLCAnbG9jYWwnIG9yICdzZXNzaW9uJy5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdFN0YXRlLCBuYW1lID0gJycsIHN0b3JhZ2UgPSAnbWVtb3J5Jykge1xyXG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICAgICAgICBpZiAoKDAsIGNvcmVfanNfMS5pc1NTUikoKSlcclxuICAgICAgICAgICAgc3RvcmFnZSA9ICdtZW1vcnknO1xyXG4gICAgICAgIHRoaXMuX2lkID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3ByZXZTdGF0ZSA9IGRlZmF1bHRTdGF0ZTtcclxuICAgICAgICBpZiAoc3RvcmFnZSA9PT0gJ21lbW9yeScgfHwgIXN0b3JhZ2UpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjb25zdCBTdG9yYWdlID0gc3RvcmFnZSA9PT0gJ2xvY2FsJyA/IGxvY2FsU3RvcmFnZSA6IHNlc3Npb25TdG9yYWdlO1xyXG4gICAgICAgIC8vIGdldC9zZXQgaW5pdGlhbCBzdGF0ZSBvZiBTdG9yYWdlXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLl9pZCk7XHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLl9wcmV2U3RhdGUgPSBKU09OLnBhcnNlKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLl9pZCwgSlNPTi5zdHJpbmdpZnkoZGVmYXVsdFN0YXRlKSk7XHJcbiAgICB9XHJcbiAgICBwZXJzaXN0KG5ld1N0YXRlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0b3JhZ2UgPT09ICdtZW1vcnknKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgU3RvcmFnZSA9IHRoaXMuX3N0b3JhZ2UgPT09ICdsb2NhbCcgPyBsb2NhbFN0b3JhZ2UgOiBzZXNzaW9uU3RvcmFnZTtcclxuICAgICAgICBTdG9yYWdlLnNldEl0ZW0odGhpcy5faWQsIEpTT04uc3RyaW5naWZ5KG5ld1N0YXRlKSk7XHJcbiAgICB9XHJcbiAgICAvKiogQ2xlYXJzIHRoZSBzdGF0ZSBvZiB0aGUgd2hvbGUgc3RvcmUuICovXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICAvLyBAdHMtaWdub3JlXHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSB0aGlzLl9wcmV2U3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0b3JhZ2UgPT09ICdsb2NhbCcpXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuX2lkKTtcclxuICAgICAgICBlbHNlIGlmICh0aGlzLl9zdG9yYWdlID09PSAnc2Vzc2lvbicpXHJcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5faWQpO1xyXG4gICAgfVxyXG4gICAgc2V0U3RhdGUobmV3U3RhdGUpIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICB9XHJcbiAgICBzZXQgc3RhdGUobmV3U3RhdGUpIHtcclxuICAgICAgICB0aGlzLl9wcmV2U3RhdGUgPSB0aGlzLl9zdGF0ZTtcclxuICAgICAgICB0aGlzLl9zdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgICAgIHRoaXMucGVyc2lzdChuZXdTdGF0ZSk7XHJcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmZvckVhY2goZm5jID0+IHtcclxuICAgICAgICAgICAgZm5jKHRoaXMuX3N0YXRlLCB0aGlzLl9wcmV2U3RhdGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IHN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgIH1cclxuICAgIHVzZSgpIHtcclxuICAgICAgICBjb25zdCBpZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA5KTtcclxuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZ2V0IHN0YXRlKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLnN0YXRlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRTdGF0ZTogKG5ld1N0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1YnNjcmliZTogKGZuYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNldChpZCwgZm5jKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2FuY2VsOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXJzLmhhcyhpZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuU3RvcmUgPSBTdG9yZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vIGZpeGVzIGFuIGlzc3VlIGluIHN0ZEAwLjgwLjAgKGRlbm8pXHJcbi8vIGludGVyZmFjZSBSZWFkYWJsZVN0cmVhbTxSPiB7XHJcbi8vICAgZ2V0SXRlcmF0b3IoKTogYW55XHJcbi8vIH1cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD10eXBlcy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZFUlNJT04gPSB2b2lkIDA7XHJcbi8vIFRISVMgSVMgQU4gQVVUT0dFTkVSQVRFRCBGSUxFLiBETyBOT1QgRURJVCBUSElTIEZJTEUgRElSRUNUTFkuXHJcbmV4cG9ydHMuVkVSU0lPTiA9ICcwLjAuMzYnO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD12ZXJzaW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLndpdGhTdHlsZXMgPSB2b2lkIDA7XHJcbmNvbnN0IGNvcmVfanNfMSA9IHJlcXVpcmUoXCIuL2NvcmUuanNcIik7XHJcbmNvbnN0IGNvbXBvbmVudF9qc18xID0gcmVxdWlyZShcIi4vY29tcG9uZW50LmpzXCIpO1xyXG5jb25zdCBmcmFnbWVudF9qc18xID0gcmVxdWlyZShcIi4vZnJhZ21lbnQuanNcIik7XHJcbmNvbnN0IGhlbG1ldF9qc18xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9oZWxtZXQuanNcIik7XHJcbmNvbnN0IHdpdGhTdHlsZXMgPSAoLi4uc3R5bGVzKSA9PiAoV3JhcHBlZENvbXBvbmVudCkgPT4ge1xyXG4gICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgY29tcG9uZW50X2pzXzEuQ29tcG9uZW50IHtcclxuICAgICAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IF9hID0gdGhpcy5wcm9wcywgeyBjaGlsZHJlbiB9ID0gX2EsIHJlc3QgPSBfX3Jlc3QoX2EsIFtcImNoaWxkcmVuXCJdKTtcclxuICAgICAgICAgICAgY29uc3QgaGVsbWV0cyA9IFtdO1xyXG4gICAgICAgICAgICBzdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlbG1ldHMucHVzaCgoMCwgY29yZV9qc18xLmgpKGhlbG1ldF9qc18xLkhlbG1ldCwgbnVsbCwgKDAsIGNvcmVfanNfMS5oKSgnc3R5bGUnLCBudWxsLCBzdHlsZSkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBzdHlsZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF9zdHlsZSA9IHN0eWxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfc3R5bGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbG1ldHMucHVzaCgoMCwgY29yZV9qc18xLmgpKGhlbG1ldF9qc18xLkhlbG1ldCwgbnVsbCwgKDAsIGNvcmVfanNfMS5oKSgnc3R5bGUnLCBudWxsLCBfc3R5bGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHN0eWxlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF9zdHlsZSA9IChfYSA9IHN0eWxlLnRvU3RyaW5nKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChzdHlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfc3R5bGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbG1ldHMucHVzaCgoMCwgY29yZV9qc18xLmgpKGhlbG1ldF9qc18xLkhlbG1ldCwgbnVsbCwgKDAsIGNvcmVfanNfMS5oKSgnc3R5bGUnLCBudWxsLCBfc3R5bGUpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMFxyXG4gICAgICAgICAgICAgICAgPyAoMCwgY29yZV9qc18xLmgpKFdyYXBwZWRDb21wb25lbnQsIE9iamVjdC5hc3NpZ24oe30sIHJlc3QpLCBjaGlsZHJlbilcclxuICAgICAgICAgICAgICAgIDogKDAsIGNvcmVfanNfMS5oKShXcmFwcGVkQ29tcG9uZW50LCBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzKSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoMCwgY29yZV9qc18xLmgpKGZyYWdtZW50X2pzXzEuRnJhZ21lbnQsIG51bGwsIC4uLmhlbG1ldHMsIGNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuZXhwb3J0cy53aXRoU3R5bGVzID0gd2l0aFN0eWxlcztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2l0aFN0eWxlcy5qcy5tYXAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnbmFuby1qc3gnO1xuaW1wb3J0IHsgZGVmaW5lQXNDdXN0b21FbGVtZW50cyB9IGZyb20gJy4vZXhwb3NlJztcbmltcG9ydCB7IGggfSBmcm9tICduYW5vLWpzeC9saWIvY29yZSc7XG5pbXBvcnQgeyBGcmFnbWVudCB9IGZyb20gJ25hbm8tanN4L2xpYi9mcmFnbWVudCc7XG5cbmV4cG9ydCBjbGFzcyBXQyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBoOiB0eXBlb2YgaCA9IGg7XG4gIHN0YXRpYyBmOiB0eXBlb2YgRnJhZ21lbnQgPSBGcmFnbWVudDtcblxuICBzdGF0aWMgJHN0eWxlcz86ICcqLnNjc3MnW107XG4gIHN0YXRpYyAkY29uZmlnPzogQ29tcG9uZW50Q29uZmlnO1xuXG4gICQodjogb2JqZWN0KTogYW55IHtcbiAgICBjb25zdCBzdGF0ZSA9IChkYXRhID0ge30sIGNiPzogRnVuY3Rpb24pID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJveHkoZGF0YSwge1xuICAgICAgICBnZXQ6IChvYmo6IGFueSwgcHJvcDogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKHByb3AgPT09ICdfaXNQcm94eScpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgXG4gICAgICAgICAgaWYgKChBcnJheS5pc0FycmF5KG9ialtwcm9wXSkgfHwgdHlwZW9mIG9ialtwcm9wXSA9PT0gJ29iamVjdCcpICYmICFvYmpbcHJvcF0uX2lzUHJveHkpIHtcbiAgICAgICAgICAgIG9ialtwcm9wXSA9IHN0YXRlKG9ialtwcm9wXSwgY2IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiBvYmpbcHJvcF07XG4gICAgICAgIH0sXG4gIFxuICAgICAgICBzZXQ6IChvYmo6IGFueSwgcHJvcDogYW55LCB2YWx1ZTogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKG9ialtwcm9wXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgfTtcbiAgXG4gICAgICAgICAgb2JqW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgXG4gICAgICAgIGRlbGV0ZVByb3BlcnR5OiAob2JqOiBhbnksIHByb3A6IGFueSkgPT4ge1xuICAgICAgICAgIGRlbGV0ZSBvYmpbcHJvcF07XG4gICAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBzdGF0ZSh2IHx8IHt9LCAoKSA9PiB0aGlzLnVwZGF0ZSgpKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZXhwb3NlKHRhZ25hbWU6IHN0cmluZywgb3B0aW9ucz86IENvbXBvbmVudENvbmZpZykge1xuICAgIGRlZmluZUFzQ3VzdG9tRWxlbWVudHModGhpcywgdGFnbmFtZSwgb3B0aW9ucyk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHdjd2MgPSB7IFdDIH0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=