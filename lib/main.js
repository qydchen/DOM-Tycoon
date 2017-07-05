const DOMTycoonCollection = require("./dom_node_collection.js");

const functionList = [];
let isReady = false;

window.$l = (arg) => {
  if (typeof arg === "string"){
    let elementList = document.querySelectorAll(arg);
    let arrayList = [];
    elementList.forEach(el => {
      arrayList.push(el);
    });
    let DOMTycoon = new DOMTycoonCollection(arrayList);
    return DOMTycoon;

  } else if (arg instanceof HTMLElement) {
    let DOMTycoon = new DOMTycoonCollection([arg]);
    return DOMTycoon;

  } else if (typeof arg === 'function') {
    return function (arg) => {
      if (!isReady) {
        functionList.push(arg);
      } else {
        arg();
      }
    };
  };

};

$l.extend = (base, ...objs) => {
  objs.forEach(obj => {
    base = Object.assign(base, obj)
  })
  return base;
};

$l.ajax = (options) => {
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

    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };
  request.send(JSON.stringify(options.data));
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

document.addEventListener("DOMContentLoaded", () => {
  isReady = true;
  functionList.forEach(arg => arg() );
});
