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

document.addEventListener("DOMContentLoaded", () => {
  isReady = true;
  functionList.forEach(arg => arg() );
});
