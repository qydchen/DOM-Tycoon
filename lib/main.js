const DOMNodeCollection = require("./dom_node_collection.js");

const functionList = [];
let isReady = false;

function $l(arg) {
  if (typeof arg === "string"){
    let elementList = document.querySelectorAll(arg);
    let arrayList = [];
    elementList.forEach(el => {
      arrayList.push(el);
    });
    let domNode = new DOMNodeCollection(arrayList);
    return domNode;

  } else if (arg instanceof HTMLElement) {
    let domNode = new DOMNodeCollection([arg]);
    return domNode;

  } else if (typeof arg === 'function') {
    return function (arg) => {
      if (!isReady) {
        functionList.push(arg);
      } else {
        arg();
      }
    };
  };
}

window.$l = $l;
window.DOMNodeCollection = DOMNodeCollection;

$l.extend = (base, ...objs) => {
  objs.forEach(obj => {
    base = Object.assign(base, obj)
  })
  return base;
};

$l.ajax = (options) => {
  defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    url: '',
    method: 'GET',
    success: () => {},
    error: () => {},
    data: {},
  };
  options = $l.extend(defaults, options);

  if (options.method === "GET") {
    options.url += "?" + convertQuery(options.data);
  };

  const request = new XMLHttpRequest();
  request.open(options.method, options.url, true);
  request.onload = () => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    };
  };
  request.send(JSON.stringify(options.data));
}

convertQuery = obj => {
  let result = "";
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
}

document.addEventListener("DOMContentLoaded", () => {
  isReady = true;
  functionList.forEach(arg => arg() );
});
