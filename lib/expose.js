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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/*!************************!*\
  !*** ./src/expose.tsx ***!
  \************************/
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

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=expose.js.map