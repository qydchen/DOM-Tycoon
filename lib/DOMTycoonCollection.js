class DOMTycoonCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }
}

DOMTycoonCollection.prototype.on = function(action, cb) {
  this.each(el => {
    el.addEventListener(action, cb.bind(el));
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
  let node = this.nodes[integer];
  return new DOMNodeCollection([node]);
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
