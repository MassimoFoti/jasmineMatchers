# jasmineMatchers

A set of custom matchers to be used in your [Jasmine](http://jasmine.github.io/) specs

Heavily inspired by [jasmine-jquery](https://github.com/velesin/jasmine-jquery) it provides a simple, lean alternative for a smaller set of features

## Installation

Either:

- Simply download _jasmineMatchers.min.js_ from [here](https://raw.github.com/MassimoFoti/jasmineMatchers/master/dist/jasmineMatchers.min.js) and include it in your Jasmine's test runner file. Remember to also include jQuery
- Use Bower ```bower install jasmineMatchers```

## Custom matchers

- `toBeExtensible()`
  - Check that the tested object is extensible
    
    Objects are extensible by default. An object can be marked as non-extensible using:
    - `Object.preventExtensions()`,
    - `Object.seal()`,
    - `Object.freeze()`
    
    **Important**: This matcher consider primitives (`null`, `undefined`, numbers, strings and booleans) as non extensible objects

- `toBeFalse()`
  - Check that the tested object is strictly equal to `false`
  
- `toBeFrozen()`
  - Check that the tested object is frozen
    
    **Important**: This matcher consider primitives (`null`, `undefined`, numbers, strings and booleans) as non frozen objects  
  
- `toBeInstanceOf(object)`
  - Check that the prototype property of the tested object appears anywhere in the prototype chain of the given object
	```javascript
	  var Car = function(make, model, year){
		this.make = make;
		this.model = model;
		this.year = year;
	  };
	  var auto = new Car("NSU", "Prinz", 1958);
	  expect(auto).toBeInstanceOf(Car); 
	  expect(auto).toBeInstanceOf(Object);
	```   

- `toBeSealed()`
  - Check that the tested object is sealed
    
    **Important**: This matcher consider primitives (`null`, `undefined`, numbers, strings and booleans) as non sealed objects
 
- `toBeTrue()`
  - Check that the tested object is strictly equal to `true`  

- `toHaveProperty(propertyName, [expectedValue])`
  - Check an object for the given property, expectedValue is optional, if omitted it will check only if property exists

- `toHaveReadonlyProperty(propertyName)`
  - Check if the given property of the object is read-only
	```javascript
	  var myObj = {};
	  Object.defineProperty(myObj, "name", {
		enumerable: true,
		configurable: false,
		writable: false,
		value: "Ciccio"
	  });
	  expect(myObj).toHaveReadonlyProperty("name");
	  
	  var frozenObj = {name: "Ciccio"};
	  Object.freeze(frozenObj);
	  expect(frozenObj).toHaveReadonlyProperty("name");
	  
	  var sealedObj = {name: "Ciccio"};
	  Object.seal(sealedObj);
	  expect(sealedObj).not.toHaveReadonlyProperty("name"); 
	``` 
  
- `toMatchDuckType(duckType, [matchType])`
  - Use [duck typing](https://en.wikipedia.org/wiki/Duck_typing) for type checking
  - matchType is an optional boolean argument, set it to false to not compare type of properties using $.type()
  - `expect({name: "Ciccio"}).toMatchDuckType({name: "Duck"})`
  - `expect({name: "Ciccio"}).toMatchDuckType({})`
  - `expect({name: "Ciccio"}).not.toMatchDuckType({code: "007"})`
  - `expect({name: "Ciccio"}).not.toMatchDuckType({name: []})`
  - `expect({name: "Ciccio"}).toMatchDuckType({name: []}, false)`

## jQuery-based matchers

All the matchers below accept both a jQuery object or an HTMLElement

- `toBeChecked()`
  - `expect($('<input type="checkbox" checked="checked">')).toBeChecked()`
  - `expect(document.getElementById("checked")).toBeChecked()`

- `toBeDisabled()`
  - `expect('<input type="text" disabled="disabled">').toBeDisabled()`
  - `expect(document.getElementById("disable")).toBeChecked()`

- `toBeEmpty()`
  - Pass if the tested object contains no child DOM element/s or text

- `toBeMatchedBy(jQuerySelector)`
  - Check to see if the tested object matches the given selector
  - `expect($('<div class='test'></div>')).toBeMatchedBy('.test')`

- `toBeSelected()`
  - `expect($('<option selected="selected"></option>')).toBeSelected()`

- `toBeVisible()`
  - Elements are considered visible if they consume space in the document. Even if they have both width and height set to zero
  - In order for this matcher to work, the tested object must be part of the current document DOM

- `toHaveAttr(attributeName, [expectedValue])`
  - expectedValue is optional, if omitted it will check only if attribute exists

- `toHaveClass(className)`
  - `expect($('<div class="test"></div>')).toHaveClass("test")`
  **Important**: unlike the matcher introduced in Jasmine 3.x, this works both a jQuery object or an HTMLElement 
  
- `toHaveCss(propertyName, [expectedValue])`
  - expectedValue is optional, if omitted it will check only if the computed style property exists

- `toHaveProp(propertyName, [expectedValue])`
  - Use jQuery.prop() to check for [boolean attributes](https://www.w3.org/TR/html4/intro/sgmltut.html#h-3.3.4.2) expectedValue is optional, if omitted it will check only if attribute exists
    ([attributes vs. properties](http://api.jquery.com/prop/#prop-propertyName))

## Would you like to use fixtures inside Jasmine?

Take a look at [jasmineFixtures](https://github.com/MassimoFoti/jasmineFixtures)