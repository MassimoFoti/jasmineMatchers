# jasmineMatchers

A set of custom matchers to be used in your [Jasmine](http://jasmine.github.io/) specs

Heavily inspired by [jasmine-jquery](https://github.com/velesin/jasmine-jquery) it provides a simple, lean alternative for a smaller set of features

## Installation

Either:

- Simply download _jasmineMatchers.min.js_ from [here](https://raw.github.com/MassimoFoti/jasmineMatchers/master/dist/jasmineMatchers.min.js) and include it in your Jasmine's test runner file. Remember to also include jQuery
- Use Bower ```bower install jasmineMatchers```

## Custom matchers

- `toMatchDuckType(duckType, [matchType])`
  - Use [duck typing](https://en.wikipedia.org/wiki/Duck_typing) for type checking
  - matchType is an optional boolean argument, set it to false to not compare type of properties using $.type()
  - `expect({name: "Ciccio"}).toMatchDuckType({name: "Duck"})`
  - `expect({name: "Ciccio"}).toMatchDuckType({})`
  - `expect({name: "Ciccio"}).not.toMatchDuckType({code: "007"})`
  - `expect({name: "Ciccio"}).not.toMatchDuckType({name: []})`
  - `expect({name: "Ciccio"}).toMatchDuckType({name: []}, false)`
  
- `toHaveReadonly(propertyName)`
  - Check if the given property of the object is read-only
	```javascript
	  var myObj = {};
	  Object.defineProperty(myObj, "name", {
		enumerable: true,
		configurable: false,
		writable: false,
		value: "Ciccio"
	  });
	  expect(myObj).toHaveReadonly("name");
	  
	  var frozenObj = {name: "Ciccio"};
	  Object.freeze(frozenObj);
	  expect(frozenObj).toHaveReadonly("name");
	  
	  var sealedObj = {name: "Ciccio"};
	  Object.freeze(sealedObj);
	  expect(sealedObj).not.toHaveReadonly("name"); 
	```   

## jQuery-based matchers

- `toBeChecked()`
  - `expect($('<input type="checkbox" checked="checked">')).toBeChecked()`

- `toBeDisabled()`
  - `expect('<input type="text" disabled="disabled">').toBeDisabled()`

- `toBeEmpty()`
  - Pass if there is no child DOM element/s or text

- `toBeMatchedBy(jQuerySelector)`
  - Check to see if the set of matched elements matches the given selector
  - `expect($('<div class='test'></div>')).toBeMatchedBy('.test')`

- `toBeSelected()`
  - `expect($('<option selected="selected"></option>')).toBeSelected()`

- `toBeVisible()`
  - Elements are considered visible if they consume space in the document. Even if they have both width and height set to zero
  - In order for this matcher to work, the jQuery object must be part of the current document DOM

- `toHaveAttr(attributeName, [expectedValue])`
  - expectedValue is optional, if omitted it will check only if attribute exists

- `toHaveClass(className)`
  - `expect($('<div class="test"></div>')).toHaveClass("test")`
  
- `toHaveCss(propertyName, [expectedValue])`
  - expectedValue is optional, if omitted it will check only if the computed style property exists

## Would you like to use fixtures inside Jasmine?

Take a look at [jasmineFixtures](https://github.com/MassimoFoti/jasmineFixtures)