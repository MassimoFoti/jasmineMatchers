describe("jasmineMatchers", function(){

	"use strict";

	it("Requires Jasmine and jQuery in order to work", function(){
		expect(jasmine).toBeDefined();
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

	describe("Provides the following custom matchers for Jasmine:", function(){

		describe(".toHaveProperty()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveProperty();
			});

			describe("Given an object, the name of a property and an optional value", function(){

				describe("Matches if:", function(){

					it("The property is found", function(){
						var element = {name: "Ciccio"};
						var result = matcher.compare(element, "name");
						expect(result.pass).toBe(true);
					});

					it("The property is found and its value matches", function(){
						var element = {name: "Ciccio"};
						var result = matcher.compare(element, "name", "Ciccio");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The property is not found", function(){
						var element = {name: "Ciccio"};
						var result = matcher.compare(element, "missing");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Property: missing not found");
					});

					it("The property is found, but its value does not matches", function(){
						var element = {name: "Ciccio"};
						var result = matcher.compare(element, "name", "Another");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected: name to equal: Another but current value is: Ciccio");
					});

					it("Only one argument is provided", function(){
						var element = jQuery("<div id='x'></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the property as string");
					});

				});

			});

		});

		describe(".toMatchDuckType()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toMatchDuckType();
			});

			describe("Given an object and another object to be used as duckType", function(){

				describe("Matches if:", function(){

					it("The compared object contain the same set of properties as the duckType one, even if values are different", function(){
						var result = matcher.compare({name: "Ciccio"}, {name: "Duck"});
						expect(result.pass).toBe(true);
					});

					it("The compared object contain properties not available inside the duckType one", function(){
						var result = matcher.compare({name: "Ciccio"}, {});
						expect(result.pass).toBe(true);
					});

					it("Neither the object or the duckType contain any own property", function(){
						var result = matcher.compare({}, {});
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The compared objects are of different types", function(){
						var result = matcher.compare({}, []);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Type mismatch, comparing: object vs array");
					});

					it("The duckType object contain properties not available inside the compared one", function(){
						var result = matcher.compare({}, {name: "Ciccio"});
						expect(result.pass).toBe(false);
						expect(result.message).toBe("The following duck property is missing: .name");
					});

					it("The two object contain the same property but it is of different types", function(){
						var result = matcher.compare({name: []}, {name: "Ciccio"});
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Type of: .name does not match. Supposed to be: string");
					});

					it("Only one argument is provided", function(){
						var result = matcher.compare({});
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an instance of a duckType");
					});

				});

				describe("Accept a boolean as third, optional argument", function(){

					it("If set to false, the type of properties is not compared", function(){
						var result = matcher.compare({name: []}, {name: "Ciccio"}, false);
						expect(result.pass).toBe(true);
						expect(result.message).toBeUndefined();
					});

				});

			});

		});

		describe(".toHaveReadonly()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveReadonly();
			});

			describe("Given an object and the name of one its properties", function(){

				describe("Matches if:", function(){

					it("The given property is defined as readonly", function(){
						var myObj = {};
						Object.defineProperty(myObj, "name", {
							enumerable: true,
							configurable: false,
							writable: false,
							value: "Ciccio"
						});
						var result = matcher.compare(myObj, "name");
						expect(result.pass).toBe(true);
					});

					it("The object is frozen", function(){
						var myObj = {name: "Ciccio"};
						Object.freeze(myObj);
						var result = matcher.compare(myObj, "name");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The given property is not readonly", function(){
						var result = matcher.compare({name: "Ciccio"}, "name");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Property: name is not readonly");
					});

					it("The given property does not exists", function(){
						var result = matcher.compare({name: "Ciccio"}, "xxx");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Unable to find property: xxx");
					});

					it("The object is sealed but the property is still writeable", function(){
						var myObj = {name: "Ciccio"};
						Object.seal(myObj);
						var result = matcher.compare(myObj, "name");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Property: name is not readonly");
					});

					it("The name of the property is not passed as a string", function(){
						var result = matcher.compare({}, []);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the name of the property as string");
					});

					it("Only one argument is provided", function(){
						var result = matcher.compare({});
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the name of the property as string");
					});

				});

			});

		});

	});

	describe("Provides the following jQuery-based custom matchers for Jasmine:", function(){

		beforeEach(function(){
			jasmineFixtures.loadHTML("main.htm");
		});

		describe(".toBeChecked()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeChecked();
			});

			describe("Given a jQuery object", function(){

				describe("Matches if:", function(){

					it("The jQuery object is a checked checkbox", function(){
						var element = jQuery("#boxChecked");
						var result = matcher.compare(element);
						expect(result.pass).toBe(true);
					});

					it("The jQuery object is a checked radiobutton", function(){
						var element = jQuery("#radioChecked");
						var result = matcher.compare(element);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The jQuery object is an unchecked checkbox", function(){
						var element = jQuery("#box");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not checked");
					});

					it("The jQuery object is an unchecked radiobutton", function(){
						var element = jQuery("#radio");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not checked");
					});

				});

			});

		});

		describe(".toBeDisabled()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeDisabled();
			});

			describe("Given a jQuery object", function(){

				describe("Matches if:", function(){

					it("The jQuery object is disabled", function(){
						var element = jQuery("#disabled");
						var result = matcher.compare(element);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The jQuery object is not disabled", function(){
						var element = jQuery("#enabled");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not disabled");
					});

				});

			});

		});

		describe(".toBeEmpty()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeEmpty();
			});

			describe("Given a jQuery object", function(){

				describe("Matches if:", function(){

					it("The jQuery object is empty", function(){
						var element = jQuery("<div></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The jQuery object contains child elements", function(){
						var element = jQuery("<div><span></span></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not empty");
					});

					it("The jQuery object contains text", function(){
						var element = jQuery("<div>test</div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not empty");
					});

				});

			});

		});

		describe(".toBeMatchedBy()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeMatchedBy();
			});

			describe("Given a jQuery object and a selector", function(){

				describe("Matches if:", function(){

					it("The jQuery object matches the selector", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "div");
						expect(result.pass).toBe(true);
						var moreResult = matcher.compare(element, ".test");
						expect(moreResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The jQuery object does not matches the selector", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "span");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element not matched by: span");
					});

					it("Only one argument is provided", function(){
						var element = jQuery("<div></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the selector as string");
					});

				});

			});

		});

		describe(".toBeSelected()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeSelected();
			});

			describe("Given a jQuery object", function(){

				describe("Matches if:", function(){

					it("The jQuery object is selected", function(){
						var element = jQuery("#selected");
						var result = matcher.compare(element);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The jQuery object is not selected", function(){
						var element = jQuery("#unselected");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not selected");
					});

				});

			});

		});

		describe(".toBeVisible()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeVisible();
			});

			describe("Given a jQuery object", function(){

				describe("Matches if:", function(){

					it("The jQuery object is visible", function(){
						var genericResult = matcher.compare(jQuery("#generic"), "class");
						expect(genericResult.pass).toBe(true);
						var blockResult = matcher.compare(jQuery("#blockDisplay"), "class");
						expect(blockResult.pass).toBe(true);
						var visibilityResult = matcher.compare(jQuery("#visibleVisibility"), "class");
						expect(visibilityResult.pass).toBe(true);
					});

					it("The jQuery object CSS has both height and width set to zero", function(){
						var zeroDimensionsResult = matcher.compare(jQuery("#zeroDimensions"), "class");
						expect(zeroDimensionsResult.pass).toBe(true);
					});

					it("The jQuery object CSS contains: visibility: hidden (it takes space in the document)", function(){
						var hiddenVisibilityResult = matcher.compare(jQuery("#hiddenVisibility"), "class");
						expect(hiddenVisibilityResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The jQuery object is not visible", function(){
						var noneDisplayResult = matcher.compare(jQuery("#noneDisplay"), "class");
						expect(noneDisplayResult.pass).toBe(false);
						expect(noneDisplayResult.message).toBe("Element is not visible");

					});

					it("The jQuery object is not part of the current document DOM", function(){
						var element = jQuery("<div></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not visible");
					});

				});

			});

		});

		describe(".toHaveAttr()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveAttr();
			});

			describe("Given a jQuery object, the name of an attribute and an optional value", function(){

				describe("Matches if:", function(){

					it("The attribute is found", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "class");
						expect(result.pass).toBe(true);
					});

					it("The attribute is found and its value matches", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "class", "test");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The attribute is not found", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "missing");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Attribute: missing does not match");
					});

					it("The attribute is found, but its value does not matches", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "class", "missing");
						expect(result.pass).toBe(false);
					});

					it("Only one argument is provided", function(){
						var element = jQuery("<div id='x'></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the attribute as string");
					});

				});

			});

		});

		describe(".toHaveClass()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveClass();
			});

			describe("Given a jQuery object and the name of a CSS class", function(){

				describe("Matches if:", function(){

					it("The class is found", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "test");
						expect(result.pass).toBe(true);
					});

					it("The jQuery object also contains multiple classes other then the given one", function(){
						var element = jQuery("<div class='test more'></div>");
						var result = matcher.compare(element, "test");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The class is not found", function(){
						var element = jQuery("<div class='test'></div>");
						var result = matcher.compare(element, "missing");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("CSS class: missing not found");
					});

					it("Only one argument is provided", function(){
						var element = jQuery("<div></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the name of the CSS class as string");
					});

				});

			});

		});

		describe(".toHaveCss()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveCss();
			});

			describe("Given a jQuery object, the name of a CSS property and an optional value. Check the computed style property", function(){

				describe("Matches if:", function(){

					it("The CSS property is found inside an inline style", function(){
						var element = jQuery("#blockDisplay");
						var result = matcher.compare(element, "display");
						expect(result.pass).toBe(true);
					});

					it("The CSS property is found inside an embedded style", function(){
						var element = jQuery("#computed");
						var result = matcher.compare(element, "box-sizing");
						expect(result.pass).toBe(true);
					});

					it("The CSS property is found inside an inline style and its value matches", function(){
						var element = jQuery("#blockDisplay");
						var result = matcher.compare(element, "display", "block");
						expect(result.pass).toBe(true);
					});

					it("The CSS property is found inside an embedded style and its value matches", function(){
						var element = jQuery("#computed");
						var result = matcher.compare(element, "box-sizing", "border-box");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The CSS property is not found", function(){
						var element = jQuery("#blockDisplay");
						var result = matcher.compare(element, "border-width");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("CSS property: border-width not found");
					});

					it("The CSS property is found, but its value does not matches", function(){
						var element = jQuery("#blockDisplay");
						var result = matcher.compare(element, "display", "xxx");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("CSS property: display does not match");
					});

					it("Only one argument is provided", function(){
						var element = jQuery("<div id='x'></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the CSS property as string");
					});

				});

			});

		});

		describe(".toHaveProp()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveProp();
			});

			describe("Given a jQuery object, the name of a property and an optional value", function(){

				describe("Matches if:", function(){

					it("The property is found", function(){
						var element = jQuery("#radioChecked");
						var result = matcher.compare(element, "checked");
						expect(result.pass).toBe(true);
					});

					it("The property is found and its value matches", function(){
						var element = jQuery("#radioChecked");
						var result = matcher.compare(element, "checked", true);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The property is not found", function(){
						var element = jQuery("#radioChecked");
						var result = matcher.compare(element, "missing");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Property: missing does not match");
					});

					it("The property is found, but its value does not matches", function(){
						var element = jQuery("#radioChecked");
						var result = matcher.compare(element, "checked", "false");
						expect(result.pass).toBe(false);
					});

					it("Only one argument is provided", function(){
						var element = jQuery("#generic");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the property as string");
					});

				});

			});

		});

	});

});