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
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/nano-jsx/lib/index.js":
/*!********************************************************************************!*\
  !*** delegated ./node_modules/nano-jsx/lib/index.js from dll-reference shared ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference shared */ "dll-reference shared"))(298);

/***/ }),

/***/ "./node_modules/nano-jsx/lib/core.js":
/*!*******************************************************************************!*\
  !*** delegated ./node_modules/nano-jsx/lib/core.js from dll-reference shared ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference shared */ "dll-reference shared"))(961);

/***/ }),

/***/ "dll-reference shared":
/*!*************************!*\
  !*** external "shared" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = shared;

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./src/core/index.tsx ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WC": () => (/* binding */ WC),
/* harmony export */   "WC_REGISTERED_STYLES": () => (/* binding */ WC_REGISTERED_STYLES)
/* harmony export */ });
/* harmony import */ var nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-jsx/lib/core */ "./node_modules/nano-jsx/lib/core.js");
/* harmony import */ var nano_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! nano-jsx */ "./node_modules/nano-jsx/lib/index.js");
/* harmony import */ var nano_jsx__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nano_jsx__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in nano_jsx__WEBPACK_IMPORTED_MODULE_1__) if(["default","WC_REGISTERED_STYLES","WC"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => nano_jsx__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
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
class WC extends HTMLElement {
    connectedCallback() {
        this.addStyle().catch(console.error);
        this.render().catch(console.error);
    }
    root() {
        if (this.shadow && !this.shadowRoot) {
            this.attachShadow(this.shadow);
        }
        return this.shadow ? this.shadowRoot : this;
    }
    addStyle() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof window === 'undefined') {
                    Promise.resolve(false);
                }
                if ((this.styles && this.styles.length) && (this.shadow || !WC_REGISTERED_STYLES[this.tagName])) {
                    const styleRoot = this.shadow ? this.shadowRoot : window.document ? (((_a = window.document) === null || _a === void 0 ? void 0 : _a.head) || ((_b = window.document) === null || _b === void 0 ? void 0 : _b.body)) : this;
                    const style = this.styles && this.styles.map((s) => s.toString()).join('') || '';
                    const styleElement = Object.assign(document.createElement('style'), { textContent: style });
                    styleElement.dataset.target = this.tagName.toLowerCase();
                    styleRoot === null || styleRoot === void 0 ? void 0 : styleRoot.append(styleElement);
                    if (!this.shadow) {
                        WC_REGISTERED_STYLES[this.tagName] = style;
                    }
                }
            }
            catch (error) {
                Promise.reject(error);
            }
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const target = this.root();
                const template = this.template();
                (0,nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_0__.render)(template, target);
                Promise.resolve(true);
            }
            catch (error) {
                Promise.reject(error);
            }
        });
    }
    static expose(tagname) {
        if (typeof window !== 'undefined' && 'customElements' in window) {
            window.customElements.define(tagname, this);
        }
    }
    template() { return ''; }
}


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map