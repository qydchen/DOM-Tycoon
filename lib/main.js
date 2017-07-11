// run 'webpack --watch lib/main.js lib/DOMTycoon.js' after making a change

const DOMTycoonCollection = require("./DOMTycoonCollection.js");

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
  } else if (arg instanceof HTMLElement) {
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
