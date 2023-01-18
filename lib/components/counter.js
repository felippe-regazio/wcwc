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

/***/ "./src/components/style.scss":
/*!***********************************!*\
  !*** ./src/components/style.scss ***!
  \***********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":host {\n  display: block;\n  background-color: gray;\n}\n:host button {\n  color: yellow;\n}", "",{"version":3,"sources":["webpack://./src/components/style.scss"],"names":[],"mappings":"AAAA;EACE,cAAA;EACA,sBAAA;AACF;AACE;EACE,aAAA;AACJ","sourcesContent":[":host {\n  display: block;\n  background-color: gray;\n\n  button {\n    color: yellow;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/core/index.tsx":
/*!****************************!*\
  !*** ./src/core/index.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WC": () => (/* binding */ WC),
/* harmony export */   "WC_REGISTERED_STYLES": () => (/* binding */ WC_REGISTERED_STYLES)
/* harmony export */ });
/* harmony import */ var nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-jsx/lib/core */ "./node_modules/nano-jsx/lib/core.js");
/* harmony import */ var s_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! s-js */ "./node_modules/s-js/dist/es/S.js");
/* harmony import */ var nano_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! nano-jsx */ "./node_modules/nano-jsx/lib/index.js");
/* harmony import */ var nano_jsx__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(nano_jsx__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in nano_jsx__WEBPACK_IMPORTED_MODULE_2__) if(["default","WC_REGISTERED_STYLES","WC"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => nano_jsx__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
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
        this.$store = this.$store && this.reactiveStore(this.$store);
        this.render();
    }
    root() {
        if (this.$shadow && !this.shadowRoot) {
            this.attachShadow(this.$shadow);
        }
        return this.$shadow ? this.shadowRoot : this;
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const target = this.root();
                const template = this.domDiff(this.__template, this.template());
                (0,nano_jsx_lib_core__WEBPACK_IMPORTED_MODULE_0__.render)(template, target);
                this.addStyles();
                Promise.resolve(true);
            }
            catch (error) {
                Promise.reject(error);
            }
        });
    }
    domDiff(a, b) {
        if (!a) {
            this.__template = b;
            return b;
        }
        return b;
    }
    addStyles() {
        var _a, _b;
        try {
            if (typeof window === 'undefined') {
                return false;
            }
            if ((this.$styles && this.$styles.length) && (this.$shadow || !WC_REGISTERED_STYLES[this.tagName])) {
                const styleRoot = this.$shadow ? this.root() : window.document ? (((_a = window.document) === null || _a === void 0 ? void 0 : _a.head) || ((_b = window.document) === null || _b === void 0 ? void 0 : _b.body)) : this;
                const style = this.$styles && this.$styles.map((s) => s.toString()).join('') || '';
                const styleElement = Object.assign(document.createElement('style'), { textContent: style });
                styleElement.dataset.target = this.tagName.toLowerCase();
                styleRoot === null || styleRoot === void 0 ? void 0 : styleRoot.append(styleElement);
                if (!this.$shadow) {
                    WC_REGISTERED_STYLES[this.tagName] = style;
                }
            }
        }
        catch (error) {
            return true;
        }
    }
    reactiveStore(data = {}) {
        return new Proxy(data, {
            get: (obj, prop) => {
                if (prop === '_isProxy')
                    return true;
                if (['object', 'array'].includes(Object.prototype.toString.call(obj[prop]).slice(8, -1).toLowerCase()) && !obj[prop]._isProxy) {
                    obj[prop] = new Proxy(obj[prop], this.reactiveStore(data));
                }
                return obj[prop];
            },
            set: (obj, prop, value) => {
                if (obj[prop] === value)
                    return true;
                obj[prop] = value;
                this.render().catch(console.error);
                return true;
            },
            deleteProperty: (obj, prop) => {
                delete obj[prop];
                this.render().catch(console.error);
                return true;
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




/***/ }),

/***/ "./node_modules/nano-jsx/lib/index.js":
/*!********************************************************************************!*\
  !*** delegated ./node_modules/nano-jsx/lib/index.js from dll-reference shared ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference shared */ "dll-reference shared"))(298);

/***/ }),

/***/ "./node_modules/s-js/dist/es/S.js":
/*!****************************************************************************!*\
  !*** delegated ./node_modules/s-js/dist/es/S.js from dll-reference shared ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference shared */ "dll-reference shared"))(502);

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
/******/ 			id: moduleId,
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
/*!************************************!*\
  !*** ./src/components/counter.tsx ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./src/core/index.tsx");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/components/style.scss");


class MyComponent extends _core__WEBPACK_IMPORTED_MODULE_0__.WC {
    constructor() {
        super(...arguments);
        this.$shadow = { mode: 'open' };
        this.$styles = [_style_scss__WEBPACK_IMPORTED_MODULE_1__["default"]];
        this.$store = {
            count: 0
        };
    }
    template() {
        return ((0,_core__WEBPACK_IMPORTED_MODULE_0__.h)(_core__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            (0,_core__WEBPACK_IMPORTED_MODULE_0__.h)("h1", null, this.$store.count),
            (0,_core__WEBPACK_IMPORTED_MODULE_0__.h)("button", { onClick: () => this.inc() }, "+ Inc"),
            (0,_core__WEBPACK_IMPORTED_MODULE_0__.h)("button", { onClick: () => this.dec() }, "- Dec"),
            (0,_core__WEBPACK_IMPORTED_MODULE_0__.h)("div", null,
                (0,_core__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, "a"),
                (0,_core__WEBPACK_IMPORTED_MODULE_0__.h)("span", null,
                    (0,_core__WEBPACK_IMPORTED_MODULE_0__.h)("p", null, "b")))));
    }
    inc() {
        this.$store.count++;
    }
    dec() {
        this.$store.count--;
    }
}
MyComponent.expose('my-custom-element');

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=counter.js.map