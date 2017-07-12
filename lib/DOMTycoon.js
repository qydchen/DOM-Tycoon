/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// run 'webpack --watch lib/main.js lib/DOMTycoon.js' after making a change

const DOMTycoonCollection = __webpack_require__(1);

const functionList = [];
let isReady = false;

window.$l = (arg) => {
  if (typeof arg === "string"){
    let elementList = document.querySelectorAll(arg);
    let arrayList = [];
    elementList.forEach(el => {
      arrayList.push(el);
    });
    return new DOMTycoonCollection(arrayList);
  } else if (typeof arg === 'function') {
    return functionReadyCallback(arg);
  } else {
    return new DOMTycoonCollection([arg]);
  }
};

$l.extend = (...objs) => {
  return Object.assign(...objs);
};

$l.ajax = (options) => {
  return new Promise((successCallback, errorCallback) => {
    const request = new XMLHttpRequest();
    const defaults = {
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      method: "GET",
      url: "",
      success: () => {},
      error: () => {},
      data: {},
    };
    options = $l.extend(defaults, options);
    options.method = options.method.toUpperCase();

    if (options.method === "GET"){
      options.url += "?" + convertQuery(options.data);
    }

    request.open(options.method, options.url, true);
    request.onload = e => {
      let response = JSON.parse(request.response);
      if (request.status === 200) {
        options.success(response);
        successCallback(response);
      } else {
        options.error(response);
        errorCallback(response);
      }
    };
    request.send(JSON.stringify(options.data));
  });
};

function convertQuery(obj) {
  let result = "";
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};

const functionReadyCallback = (callback) => {
  if (!isReady) {
    functionList.push(callback);
  } else {
    callback();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  isReady = true;
  functionList.forEach(arg => arg() );
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMTycoonCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }
}

DOMTycoonCollection.prototype.on = function(action, cb) {
  this.each(node => {
    node.addEventListener(action, cb);
    const eventKey = `eventCache-${action}`;
    if (typeof node[eventKey] === "undefined") {
      node[eventKey] = [];
    }
    node[eventKey].push(cb);
  });
};

DOMTycoonCollection.prototype.off = function(action, cb) {
  this.each(el => {
    el.removeEventListener(action, cb.bind(el));
  });
};

DOMTycoonCollection.prototype.remove = function() {
  this.each(el => {
    el.remove();
  });
};

DOMTycoonCollection.prototype.find = function(selector) {
  let found = [];
  this.each(el => {
    let arr = Array.prototype.slice.call(el.querySelectorAll(selector));
    found = found.concat(arr);
  });
  let foundDom = new DOMTycoonCollection(found);
  return foundDom;
};

DOMTycoonCollection.prototype.children = function(){
  let resultChildren = [];
  this.each (el => {
    let arr = Array.prototype.slice.call(el.children);
    resultChildren = resultChildren.concat(arr);
  });
  let childrenDom = new DOMTycoonCollection(resultChildren);
  return childrenDom;
};

DOMTycoonCollection.prototype.parent = function() {
  let resultParents = [];
  this.each(el => {
    resultParents.push(el.parentNode);
  });
  let parentDom = new DOMTycoonCollection(resultParents);
  return parentDom;
};

DOMTycoonCollection.prototype.addClass = function(newClassName){
  this.each(el => {
    el.className += ` ${newClassName}`;
  });
};

DOMTycoonCollection.prototype.removeClass = function(className){
  this.each(el => {
    el.className = el.className.replace(className, "");
  });
};

DOMTycoonCollection.prototype.append = function(arg){
  if (arg instanceof HTMLElement){
    this.each((el)=>{
      let argClone = arg.cloneNode(true);
      el.appendChild(argClone);
    });

  } else if (typeof arg === 'string'){
    this.each((el)=>{
      el.innerHTML += arg;
    })

  } else if (arg instanceof DOMTycoonCollection){
    this.each((parent)=> {
      arg.each((child) => {
        let childClone = child.cloneNode(true);
        parent.appendChild(childClone);
      });
    });
  }
};

DOMTycoonCollection.prototype.empty = function(){
  this.each(el => {
    el.innerHTML = "";
  });
};

DOMTycoonCollection.prototype.html = function(string){
  if (string === undefined) {
    return this.htmlElements[0].innerHTML;
  } else {
    this.each(el => {
      el.innerHTML = string;
    });
  }
};

DOMTycoonCollection.prototype.eq = function(integer) {
  let node = this.htmlElements[integer];
  return new DOMTycoonCollection([node]);
}

DOMTycoonCollection.prototype.attr = function(arg, value){
  if (value === undefined && arg instanceof String) {
    return this.htmlElements[0].attributes;
  } else if (arg instanceof Object) {
    for (let key in arg){
      this.setAttribute(key, arg[key]);
    }
  } else {
    this.each(el => el.setAttribute(arg,value));
  }
};

DOMTycoonCollection.prototype.each = function(cb) {
  this.htmlElements.forEach(el => cb(el));
};

module.exports = DOMTycoonCollection;


/***/ })
/******/ ]);
