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
 * @property {Boolean} pass
 * @property {String} [message]
 */

(function(){
	"use strict";

	jasmineMatchers.version = "0.1";

	/* Generic matchers */

	jasmineMatchers.toMatchDuckType = function(){
		return {
			/**
			 * @param {Object} actual
			 * @param {Object} duckType
			 * @param {Boolean} [matchType] Define if we have to compare type of property. Default to true
			 * @return {jasmineMatchers.result}
			 */
			compare: function(actual, duckType, matchType){
				var result = {
					pass: false
				};
				if(duckType === undefined){
					result.message = "Please specify an instance of a duckType";
					return result;
				}
				if(jQuery.type(actual) !== jQuery.type(duckType)){
					result.message = "Type mismatch, comparing: " + jQuery.type(actual) + " vs " + jQuery.type(duckType);
					return result;
				}
				if(matchType === undefined){
					// By default we check for type
					matchType = true;
				}
				for(var key in duckType){
					/* istanbul ignore else */
					if(duckType.hasOwnProperty(key) === true){
						var duckProp = duckType[key];
						if(actual.hasOwnProperty(key) === true){
							if(matchType === true){
								if(jQuery.type(duckProp) !== jQuery.type(actual[key])){
									result.pass = false;
									result.message = "Type of: ." + key + " does not match. Supposed to be: " + jQuery.type(duckProp);
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

	jasmineMatchers.toBeReadonly = function(){
		return {
			/**
			 * @param {Object} parentObject
			 * @param {String} property
			 * @return {jasmineMatchers.result}
			 */
			compare: function(parentObject, property){
				var result = {
					pass: false
				};
				if(jQuery.type(property) !== "string"){
					result.message = "Please specify the name of the property as string";
					return result;
				}
				var desc = Object.getOwnPropertyDescriptor(parentObject, property);
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

	/* jQuery-based matchers */

	jasmineMatchers.toBeMatchedBy = function(){
		return {
			/**
			 * @param {jQuery} element
			 * @param {String} selector
			 * @return {jasmineMatchers.result}
			 */
			compare: function(element, selector){
				var result = {
					pass: false
				};
				if(jQuery.type(selector) !== "string"){
					result.message = "Please specify the selector as string";
					return result;
				}
				if(jQuery(element).filter(selector).length > 0){
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

	jasmineMatchers.toHaveClass = function(){
		return {
			/**
			 * @param {jQuery} element
			 * @param {String} className
			 * @return {jasmineMatchers.result}
			 */
			compare: function(element, className){
				var result = {
					pass: false
				};
				if(jQuery.type(className) !== "string"){
					result.message = "Please specify the name of the CSS class as string";
					return result;
				}
				if(jQuery(element).hasClass(className) === true){
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

	jasmine.getEnv().beforeEach(function(){
		jasmine.getEnv().addMatchers(jasmineMatchers);
	});

}());