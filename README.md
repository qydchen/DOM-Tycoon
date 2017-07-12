# DOM-Tycoon

DOM-Tycoon is an incredibly lightweight library built using vanilla JavaScript that replicates functionality of jQuery. The library assists in HTML document traversal and manipulation, event handling, and dispatching AJAX requests.

## Using this library

  Clone the repo, then:

  ```html
  <head>
    <meta charset="utf-8">
    <script type="text/javascript" src="./js/DOMTycoon.js"   charset="utf-8"></script>
    ...
  </head>
  ```

## Basic Functionalities

- `$l(arg)` instantiates a new instance of a **selection** of DOM nodes. Pass in a string to collect the relevant CSS selector or HTML element. Pass in a function and the function will be stored in a queue and executed after DOMContentLoaded.

- `$l.ajax(options)` to send an AJAX request. This returns a `Promise` object.

Default parameters:
```
{
  contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  method: 'GET',
  url: '',
  success: () => {},
    error: () => {},
      data: {}
}
```

### Manipulation and Traversal

- `html(string)` replaces the inner HTML of each element in a selection. If no arguments are given, it will return the inner HTML of the first node in the selection.

- `empty()` clears the inner HTML for all nodes in the selection.

- `append(children)` will add the children to the end of the selection. The children can be an HTML element, a string or a selection of DOM nodes.

- `attr(arg, value)` will return an HTML `class` with the given value will be set on the selection if both arguments are given. If only the first argument is given, the value of the given `class` will be returned for the first node in the selection.

- `addClass(...classNames)` adds one or more `class`es.  

- `removeClass(...classNames)` removes `class`es from all nodes in a selection. Multiple `class`es may be added or removed at once.

- `children()` returns a new selection of all children.

- `parent()` returns a new selection of the parent.

- `find(selector)` returns an array of all elements that contain the provided CSS selector.

- `remove()` removes all children from the selection.

### Event Handling

-  `on(action, cb)` adds an event listener action on a node collection that executes the given callback.

- `off(action)` clears the event listener of the event type specified.

## A Game Inspired implemented with  DOM-Tycoon
A simple implementation of the classic game Snake demonstrates the core functionality of the library. Check out a live demo and the source code below.

[Game](http://davidchen.world/MushroomMania/)

[Repo](https://github.com/qydchen/MushroomMania)
