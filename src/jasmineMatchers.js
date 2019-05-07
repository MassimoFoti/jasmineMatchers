/* istanbul ignore if */
if(typeof(jQuery) === "undefined"){
	throw("Unable to find jQuery");
}

/* istanbul ignore else */
if(typeof(window.jasmineMatchers) === "undefined"){
	window.jasmineMatchers = {};
}

/**
 * @typedef {Object} jasmineMatchers.result
 *
 * @property {boolean} pass
 * @property {string} [message]
 */

(function(){
	"use strict";

	jasmineMatchers.version = "0.5";

	/* Utils */

	const isPrimitive = function(actual){
		// boolean
		if(actual === false || actual === true){
			return true;
		}
		// null
		if(actual === null || actual === undefined){
			return true;
		}
		// number
		if(typeof actual === "number"){
			return true;
		}
		// string
		if(typeof actual === "string"){
			return true;
		}
		return false;
	};

	/**
	 * @param {Object} element
	 * @return {boolean} True if the element is a HTMLElement or a jQuery object.
	 */
	const isValidElement = function(element) {
		return element instanceof HTMLElement || element instanceof jQuery;
	};

	const class2type = {};
	["Array", "Boolean", "Date", "Error", "Function", "Number", "Object", "RegExp", "String", "Symbol"].forEach(function(element){
		class2type["[object " + element + "]"] = element.toLowerCase();
	});

	/**
	 * Determine the internal JavaScript [[Class]] of an object
	 * Based on jQuery.type()
	 * @param {*} obj
	 * @return {string}
	 */
	const getType = function(obj){
		if(obj === null){
			return "null";
		}
		const rawType = typeof obj;
		if((rawType === "object") || (rawType === "function")){
			/* http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/ */
			const stringType = Object.prototype.toString.call(obj);
			return class2type[stringType];
		}
		return rawType;
	};

	/* Generic matchers */

	jasmineMatchers.toBeExtensible = function(){
		return {
			/**
			 * @param {Object} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				const result = {
					pass: false
				};
				// Primitive values are not frozen in older browser (IE11 and before)
				if(isPrimitive(actual) === true){
					result.pass = false;
					result.message = "Expected: " + actual + " to be extensible";
					return result;
				}
				if(Object.isExtensible(actual) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Expected: " + actual + " to be extensible";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeFalse = function(){
		return {
			/**
			 * @param {Object} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				const result = {
					pass: false
				};
				if(actual === false){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Expected: " + actual + " to equal: false";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeFrozen = function(){
		return {
			/**
			 * @param {Object} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				const result = {
					pass: false
				};
				// Primitive values are not frozen in older browser (IE11 and before)
				if(isPrimitive(actual) === true){
					result.pass = false;
					result.message = "Expected: " + actual + " to be frozen";
					return result;
				}
				if(Object.isFrozen(actual) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Expected: " + actual + " to be frozen";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeInstanceOf = function(){
		return {
			/**
			 * @param {Object} actual
			 * @param {Object} type
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, type){
				const result = {
					pass: false
				};
				if(type === undefined){
					result.message = "Please specify the object to test against";
					return result;
				}
				if(actual instanceof type === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Expected: " + actual + " to be instanceof of: " + type;
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeSealed = function(){
		return {
			/**
			 * @param {Object} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				const result = {
					pass: false
				};
				// Primitive values are not sealed in older browser (IE11 and before)
				if(isPrimitive(actual) === true){
					result.pass = false;
					result.message = "Expected: " + actual + " to be sealed";
					return result;
				}
				if(Object.isSealed(actual) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Expected: " + actual + " to be sealed";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeTrue = function(){
		return {
			/**
			 * @param {Object} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				const result = {
					pass: false
				};
				if(actual === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Expected: " + actual + " to equal: true";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveProperty = function(){
		return {
			/**
			 * @param {Object} actual
			 * @param {string} propertyName
			 * @param {string} expectedValue
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, propertyName, expectedValue){
				const result = {
					pass: false
				};
				if(getType(propertyName) !== "string"){
					result.message = "Please specify the property as string";
					return result;
				}
				if(actual[propertyName] === undefined){
					result.message = "Property: " + propertyName + " not found";
					return result;
				}
				if(hasProperty(actual[propertyName], expectedValue) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Expected: " + propertyName + " to equal: " + expectedValue + " but current value is: " + actual[propertyName];
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveReadonlyProperty = function(){
		return {
			/**
			 * @param {Object} actual
			 * @param {string} property
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, property){
				const result = {
					pass: false
				};
				if(getType(property) !== "string"){
					result.message = "Please specify the name of the property as string";
					return result;
				}
				const desc = Object.getOwnPropertyDescriptor(actual, property);
				if(desc === undefined){
					result.message = "Unable to find property: " + property;
					return result;
				}
				if(desc.writable === false){
					result.pass = true;
					return result;
				}
				result.message = "Property: " + property + " is not readonly";
				return result;
			}
		};
	};

	jasmineMatchers.toMatchDuckType = function(){
		return {
			/**
			 * @param {Object} actual
			 * @param {Object} duckType
			 * @param {boolean} [matchType] Define if we have to compare type of property. Default to true
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, duckType, matchType){
				const result = {
					pass: false
				};
				if(duckType === undefined){
					result.message = "Please specify an instance of a duckType";
					return result;
				}
				if(getType(actual) !== getType(duckType)){
					result.message = "Type mismatch, comparing: " + getType(actual) + " vs " + getType(duckType);
					return result;
				}
				if(matchType === undefined){
					// By default we check for type
					matchType = true;
				}
				for(const key in duckType){
					/* istanbul ignore else */
					if(duckType.hasOwnProperty(key) === true){
						const duckProp = duckType[key];
						if(actual.hasOwnProperty(key) === true){
							if(matchType === true){
								if(getType(duckProp) !== getType(actual[key])){
									result.pass = false;
									result.message = "Type of: ." + key + " does not match. Supposed to be: " + getType(duckProp);
									return result;
								}
							}
						}
						else{
							result.message = "The following duck property is missing: ." + key;
							return result;
						}
					}
				}
				result.pass = true;
				return result;
			}
		};
	};

	/* jQuery-based matchers */

	const hasProperty = function(actualValue, expectedValue){
		if(expectedValue === undefined){
			return actualValue !== undefined;
		}
		return actualValue === expectedValue;
	};

	jasmineMatchers.toBeChecked = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				const result = {
					pass: false
				};

				if(isValidElement(actual) === false){
					result.message = "Please specify an Element";
					return result;
				}
				if(jQuery(actual).is(":checked") === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element is not checked";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeDisabled = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				const result = {
					pass: false
				};
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element";
					return result;
				}
				if(jQuery(actual).is(":disabled") === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element is not disabled";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeEmpty = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				const result = {
					pass: false
				};
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element";
					return result;
				}
				if(jQuery(actual).is(":empty") === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element is not empty";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toContainElement = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @param {jQuery|HTMLElement} element
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, element){
				const result = {
					pass: false
				};
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element as parent";
					return result;
				}
				if(isValidElement(element) === false){
					result.message = "Please specify an Element as child";
					return result;
				}
				if(jQuery(actual).find(element).length > 0) {
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element " + element + " is not contained in " + actual;
					return result;
				}
			}
		};
	};

	jasmineMatchers.toContainElementsMatching = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @param {string} selector
			 * @param {number|undefined} cardinality
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, selector, cardinality){
				const result = {
					pass: false
				};

				// Validate arguments
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element as container";
					return result;
				}
				if(getType(selector) !== "string"){
					result.message = "Please specify the selector as string";
					return result;
				}
				if(getType(cardinality) !== "undefined" && getType(cardinality) !== "number"){
					result.message = "Please specify the cardinality as number";
					return result;
				}

				const matchesCount = jQuery(actual).find(selector).length;

				// If the cardinality is not specified,
				// the test passes if there is at least one child element matching the selector.
				if(cardinality === undefined){
					if(matchesCount > 0){
						result.pass = true;
					}
					else {
						result.message = "Element " + actual + " does not contain any element matched by: " + selector;
					}
				}
				else {
					if(matchesCount === cardinality) {
						result.pass = true;
					}
					else {
						result.message = "Element " + actual + " contains " + matchesCount + " elements matched by: " + selector + " and not " + cardinality;
					}
				}
				return result;
			}
		};
	};

	jasmineMatchers.toBeMatchedBy = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @param {string} selector
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, selector){
				const result = {
					pass: false
				};
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element";
					return result;
				}
				if(getType(selector) !== "string"){
					result.message = "Please specify the selector as string";
					return result;
				}
				if(jQuery(actual).filter(selector).length > 0){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element not matched by: " + selector;
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeSelected = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				const result = {
					pass: false
				};
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element";
					return result;
				}
				if(jQuery(actual).is(":selected") === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element is not selected";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toBeVisible = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual){
				const result = {
					pass: false
				};
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element";
					return result;
				}
				if(jQuery(actual).is(":visible") === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Element is not visible";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveAttr = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @param {string} attributeName
			 * @param {string} expectedValue
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, attributeName, expectedValue){
				const result = {
					pass: false
				};
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element";
					return result;
				}
				if(getType(attributeName) !== "string"){
					result.message = "Please specify the attribute as string";
					return result;
				}
				if(hasProperty(jQuery(actual).attr(attributeName), expectedValue) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Attribute: " + attributeName + " does not match";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveClass = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @param {string} className
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, className){
				const result = {
					pass: false
				};
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element";
					return result;
				}
				if(getType(className) !== "string"){
					result.message = "Please specify the name of the CSS class as string";
					return result;
				}
				if(jQuery(actual).hasClass(className) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "CSS class: " + className + " not found";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveCss = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @param {string} propertyName
			 * @param {string} expectedValue
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, propertyName, expectedValue){
				const result = {
					pass: false
				};
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element";
					return result;
				}
				if(getType(propertyName) !== "string"){
					result.message = "Please specify the CSS property as string";
					return result;
				}
				// Second case is Chrome only
				if(jQuery(actual).css(propertyName) === "" || jQuery(actual).css(propertyName) === "0px"){
					result.message = "CSS property: " + propertyName + " not found";
					return result;
				}
				if(hasProperty(jQuery(actual).css(propertyName), expectedValue) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "CSS property: " + propertyName + " does not match";
					return result;
				}
			}
		};
	};

	jasmineMatchers.toHaveProp = function(){
		return {
			/**
			 * @param {jQuery|HTMLElement} actual
			 * @param {string} propertyName
			 * @param {string} expectedValue
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, propertyName, expectedValue){
				const result = {
					pass: false
				};
				if(isValidElement(actual) === false){
					result.message = "Please specify an Element";
					return result;
				}
				if(getType(propertyName) !== "string"){
					result.message = "Please specify the property as string";
					return result;
				}
				if(hasProperty(jQuery(actual).prop(propertyName), expectedValue) === true){
					result.pass = true;
					return result;
				}
				else{
					result.message = "Property: " + propertyName + " does not match";
					return result;
				}
			}
		};
	};

	jasmine.getEnv().beforeEach(function(){
		jasmine.getEnv().addMatchers(jasmineMatchers);
	});

}());