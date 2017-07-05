class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }
}

DOMNodeCollection.prototype.on = function(action, cb) {
  this.each(el => {
    el.addEventListener(action, cb.bind(el));
  });
};

DOMNodeCollection.prototype.off = function(action, cb) {
  this.each(el => {
    el.removeEventListener(action, cb.bind(el));
  });
};

DOMNodeCollection.prototype.remove = function() {
  this.each(el => {
    el.remove();
  });
};

DOMNodeCollection.prototype.find = function(selector) {
  let found = [];
  this.each(el => {
    let arr = Array.prototype.slice.call(el.querySelectorAll(selector));
    found = found.concat(arr);
  });
  let foundDom = new DOMNodeCollection(found);
  return foundDom;
};

DOMNodeCollection.prototype.children = function(){
  let resultChildren = [];
  this.each (el => {
    let arr = Array.prototype.slice.call(el.children);
    resultChildren = resultChildren.concat(arr);
  });
  let childrenDom = new DOMNodeCollection(resultChildren);
  return childrenDom;
};

DOMNodeCollection.prototype.parent = function() {
  let resultParents = [];
  this.each(el => {
    resultParents.push(el.parentNode);
  });
  let parentDom = new DOMNodeCollection(resultParents);
  return parentDom;
};

DOMNodeCollection.prototype.addClass = function(newClassName){
  this.each(el => {
    el.className += ` ${newClassName}`;
  });
};

DOMNodeCollection.prototype.removeClass = function(className){
  this.each(el => {
    el.className = el.className.replace(className, "");
  });
};

DOMNodeCollection.prototype.append = function(arg){
  if (arg instanceof HTMLElement){
    this.each((el)=>{
      let argClone = arg.cloneNode(true);
      el.appendChild(argClone);
    });

  } else if (typeof arg === 'string'){
    this.each((el)=>{
      el.innerHTML += arg;
    })

  } else if (arg instanceof DOMNodeCollection){
    this.each((parent)=> {
      arg.each((child) => {
        let childClone = child.cloneNode(true);
        parent.appendChild(childClone);
      });
    });
  }
};

DOMNodeCollection.prototype.empty = function(){
  this.each(el => {
    el.innerHTML = "";
  });
};

DOMNodeCollection.prototype.html = function(string){
  if (string === undefined) {
    return this.htmlElements[0].innerHTML;
  } else {
    this.each(el => {
      el.innerHTML = string;
    });
  }
};

DOMNodeCollection.prototype.attr = function(arg, value){
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

DOMNodeCollection.prototype.each = function(cb) {
  this.htmlElements.forEach(el => cb(el));
};

module.exports = DOMNodeCollection;
