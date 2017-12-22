# jasmineMatchers

A set of custom matchers to be used in your [Jasmine](http://jasmine.github.io/) specs

Heavily inspired by [jasmine-jquery](https://github.com/velesin/jasmine-jquery) it provides a simple, lean alternative for a smaller set of features

## Installation

Either:

- Simply download _jasmineMatchers.min.js_ from [here](https://raw.github.com/MassimoFoti/jasmineMatchers/master/dist/jasmineMatchers.min.js) and include it in your Jasmine's test runner file. Remember to also include jQuery
- Use Bower ```bower install jasmineMatchers```

## Custom matchers

- `toMatchDuckType(object, duckType, [matchType])`
  - Use [duck typing](https://en.wikipedia.org/wiki/Duck_typing) for type checking
  - matchType is an optional boolean argument, set it to false to not compare type of properties using $.type()
  - e.g. `expect({name: "Ciccio"}).toMatchDuckType({name: "Duck"})`
  - e.g. `expect({name: "Ciccio"}).toMatchDuckType({})`
  - e.g. `expect({name: "Ciccio"}).not.toMatchDuckType({code: "007"})`
  - e.g. `expect({name: "Ciccio"}).not.toMatchDuckType({name: []})`
  - e.g. `expect({name: "Ciccio"}).toMatchDuckType({name: []}, false)`  

## jQuery-based matchers

- `toBeChecked()`
  - e.g. `expect($('<input type="checkbox" checked="checked">')).toBeChecked()`

- `toBeDisabled()`
  - e.g. `expect('<input type="text" disabled="disabled">').toBeDisabled()`

- `toBeEmpty()`
  - Pass if there is no child DOM element/s or text

- `toBeMatchedBy(jQuerySelector)`
  - Check to see if the set of matched elements matches the given selector
  - e.g.  `expect($('<div class='test'></div>')).toBeMatchedBy('.test')`

- `toBeSelected()`
  - e.g. `expect($('<option selected="selected"></option>')).toBeSelected()`

- `toBeVisible()`
  - Elements are considered visible if they consume space in the document. Even if they have both width and height set to zero
  - In order for this matcher to work, the jQuery object must be part of the current document DOM

- `toHaveAttr(attributeName, [expectedValue])`
  - expectedValue is optional, if omitted it will check only if attribute exists

- `toHaveClass(className)`
  - e.g. `expect($('<div class="test"></div>')).toHaveClass("test")`
  
- `toHaveCss(propertyName, [expectedValue])`
  - expectedValue is optional, if omitted it will check only if the computed style property exists

## Would you like to use fixtures inside Jasmine?

Take a look at [jasmineFixtures](https://github.com/MassimoFoti/jasmineFixtures````)