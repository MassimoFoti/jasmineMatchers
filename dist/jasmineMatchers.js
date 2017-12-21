/*! 
jasmineMatchers 0.1 2017-12-21T07:03:58.695Z
Copyright 2017 Massimo Foti (massimo@massimocorner.com)
Licensed under the Apache License, Version 2.0 | http://www.apache.org/licenses/LICENSE-2.0
 */
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