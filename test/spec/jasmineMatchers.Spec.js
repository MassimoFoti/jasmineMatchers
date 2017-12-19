describe("jasmineMatchers", function(){

	"use strict";

	beforeEach(function(){


	});

	it("Requires jQuery in order to work", function(){
		expect(jQuery).toBeDefined();
	});

	it("Lives inside its own namespace", function(){
		expect(jasmineMatchers).toBeDefined();
	});

	describe(".version", function(){
		it("Reports the current version number", function(){
			expect(jasmineMatchers.version).toBeDefined();
		});
	});

});