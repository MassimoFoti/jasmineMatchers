/* istanbul ignore if */
if(typeof(jQuery) === "undefined"){
	throw("Unable to find jQuery");
}

/* istanbul ignore else */
if(typeof(window.jasmineFixture) === "undefined"){
	window.jasmineMatchers = {};
}

(function(){
	"use strict";

	jasmineMatchers.version = "0.1";

}());