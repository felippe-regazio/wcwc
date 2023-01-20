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
___CSS_LOADER_EXPORT___.push([module.id, "my-custom-element {\n  display: block;\n  padding: 16px;\n  margin: 8px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  background-color: rgba(100, 100, 100, 0.5);\n}\nmy-custom-element * {\n  box-sizing: border-box;\n}\nmy-custom-element h1 {\n  padding: 8px;\n}\nmy-custom-element p {\n  color: #fff;\n}\nmy-custom-element button {\n  padding: 16px;\n  align-items: center;\n  display: inline-flex;\n  justify-content: center;\n  border-radius: 8px;\n  border: none;\n  margin: 8px;\n}", "",{"version":3,"sources":["webpack://./src/components/style.scss"],"names":[],"mappings":"AAAA;EACE,cAAA;EACA,aAAA;EACA,WAAA;EACA,kBAAA;EACA,mBAAA;EACA,0CAAA;AACF;AACE;EACE,sBAAA;AACJ;AAEE;EACE,YAAA;AAAJ;AAGE;EACE,WAAA;AADJ;AAIE;EACE,aAAA;EACA,mBAAA;EACA,oBAAA;EACA,uBAAA;EACA,kBAAA;EACA,YAAA;EACA,WAAA;AAFJ","sourcesContent":["my-custom-element {\n  display: block;\n  padding: 16px;\n  margin: 8px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  background-color: rgba(100, 100, 100, .5);\n\n  * {\n    box-sizing: border-box;\n  }\n\n  h1 {\n    padding: 8px;\n  }\n\n  p {\n    color: #fff;\n  }\n\n  button {\n    padding: 16px;\n    align-items: center;\n    display: inline-flex;\n    justify-content: center;\n    border-radius: 8px;\n    border: none;\n    margin: 8px;\n  }\n}"],"sourceRoot":""}]);
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
/* harmony export */   "WC": () => (/* binding */ WC)
/* harmony export */ });
/* harmony import */ var nano_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nano-jsx */ "./node_modules/nano-jsx/lib/index.js");
/* harmony import */ var nano_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nano_jsx__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _expose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./expose */ "./src/core/expose.tsx");
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
        (0,_expose__WEBPACK_IMPORTED_MODULE_1__.defineAsCustomElements)(this, tagname, [], shadow);
    }
}



/***/ }),

/***/ "./node_modules/nano-jsx/lib/index.js":
/*!********************************************************************************!*\
  !*** delegated ./node_modules/nano-jsx/lib/index.js from dll-reference shared ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference shared */ "dll-reference shared"))(298);

/***/ }),

/***/ "./src/core/expose.tsx":
/*!*****************************************************************!*\
  !*** delegated ./src/core/expose.tsx from dll-reference shared ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = (__webpack_require__(/*! dll-reference shared */ "dll-reference shared"))(695);

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


class Counter extends _core__WEBPACK_IMPORTED_MODULE_0__.WC {
    constructor() {
        super(...arguments);
        this.data = this.$({
            count: 0
        });
    }
    render() {
        return ((0,_core__WEBPACK_IMPORTED_MODULE_0__.h)(_core__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,
            (0,_core__WEBPACK_IMPORTED_MODULE_0__.h)("h1", null, this.data.count),
            (0,_core__WEBPACK_IMPORTED_MODULE_0__.h)("button", { onclick: () => this.data.count++ }, "Inc"),
            (0,_core__WEBPACK_IMPORTED_MODULE_0__.h)("button", { onclick: () => this.data.count-- }, "Dec"),
            this.props.children));
    }
}
Counter.styles = [_style_scss__WEBPACK_IMPORTED_MODULE_1__["default"]];
Counter.expose('my-custom-element');

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=counter.js.map