describe("jasmineMatchers", function(){

	"use strict";

	describe("Provides the following DOM-related custom matchers for Jasmine:", function(){

		beforeEach(function(){
			jasmineFixtures.loadHTML("main.htm");
		});

		describe(".toBeChecked()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeChecked();
			});

			describe("Given an HTMLElement", function(){

				describe("Matches if:", function(){

					it("The HTMLElement object is a checked checkbox", function(){
						const element = document.getElementById("boxChecked");
						const result = matcher.compare(element);
						expect(result.pass).toBe(true);
					});

					it("The HTMLElement object is a checked radiobutton", function(){
						const element = document.getElementById("radioChecked");
						const result = matcher.compare(element);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The HTMLElement is an unchecked checkbox", function(){
						const element = document.getElementById("box");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not checked");
					});

					it("The HTMLElement is an unchecked radiobutton", function(){
						const element = document.getElementById("radio");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not checked");
					});

				});

			});

		});

		describe(".toBeDisabled()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeDisabled();
			});

			describe("Given an HTMLElement", function(){

				describe("Matches if:", function(){

					it("The HTMLElement is disabled", function(){
						const element = document.getElementById("disabled");
						const result = matcher.compare(element);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The HTMLElement object is not disabled", function(){
						const element = document.getElementById("enabled");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not disabled");
					});

				});

			});

		});

		describe(".toBeEmpty()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeEmpty();
			});

			describe("Given an HTMLElement", function(){

				describe("Matches if:", function(){

					it("The HTMLElement object is empty", function(){
						const element = document.getElementById("generic");
						const elementResult = matcher.compare(element);
						expect(elementResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The HTMLElement object contains child elements", function(){
						const element = document.createElement("div");
						element.appendChild(document.createElement("span"));
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not empty");
					});

					it("The HTMLElement object contains text", function(){
						const element = document.createElement("div");
						element.textContent = "test";
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not empty");
					});

				});

			});

		});

		describe(".toContainElement()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toContainElement();
			});

			describe("Given an HTMLElement (from now on Element1) and another HTMLElement (from now on Element2)", function(){

				describe("Matches if:", function(){

					it("Element2 is a child of Element1", function(){
						const element = document.getElementById("container");
						const childElement = document.getElementById("containedLevel1");
						const result = matcher.compare(element, childElement);
						expect(result.pass).toBe(true);
					});

					it("Element2 is a child, with any nesting level, of Element1", function(){
						const element = document.getElementById("container");
						const childElement = document.getElementById("containedLevel2");
						const result = matcher.compare(element, childElement);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("Element2 is not a child of the Element1", function(){
						const element = document.getElementById("container");
						const notChildElement = document.getElementById("notContained");
						const result = matcher.compare(element, notChildElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element " + notChildElement + " is not contained in " + element);
					});

					it("Only one argument is provided", function(){
						const element = document.getElementById("container");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element as child");
					});

					it("Element1 is not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element as parent");
					});

					it("Element2 is not an HTMLElement", function(){
						const element = document.getElementById("container");
						const notValidChildElement = "text";
						const result = matcher.compare(element, notValidChildElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element as child");
					});

				});

			});

		});

		describe(".toContainElementsMatching()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toContainElementsMatching();
			});

			describe("Given an HTMLElement (from now on Container), a selector and optionally a cardinality", function(){

				describe("Matches if:", function(){

					it("The cardinality is undefined and the Container contains at least one element matching the selector", function(){
						const element = document.getElementById("container");

						// One child
						const selectorById = "#containedLevel1";
						const resultById = matcher.compare(element, selectorById);
						expect(resultById.pass).toBe(true);

						// More than one child, at any nesting level
						const selectorByClass = ".groupA";
						const resultByClass = matcher.compare(element, selectorByClass);
						expect(resultByClass.pass).toBe(true);
					});

					it("The Container contains n elements matching the selector, where n is equal to the provided cardinality", function(){
						const element = document.getElementById("container");

						// One child
						const selectorById = "#containedLevel1";
						const cardinalityById = 1;
						const resultById = matcher.compare(element, selectorById, cardinalityById);
						expect(resultById.pass).toBe(true);

						// More than one child, at any nesting level
						const selectorByClass = ".groupA";
						const cardinalityByClass = 2;
						const resultByClass = matcher.compare(element, selectorByClass, cardinalityByClass);
						expect(resultByClass.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The cardinality is undefined, and there aren't elements in Container matching the selector", function(){
						const element = document.getElementById("container");
						const selector = ".notExistingElement";

						const result = matcher.compare(element, selector);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element " + element + " does not contain any element matched by: " + selector);
					});

					it("There are more elements in Container matching the selector than what specified by the cardinality", function(){
						const element = document.getElementById("container");
						const selector = ".groupA";
						const wrongCardinality = 1;

						const result = matcher.compare(element, selector, wrongCardinality);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element " + element + " contains 2 elements matched by: " + selector + " and not " + wrongCardinality);
					});

					it("There are less elements in Container matching the selector than what specified by the cardinality", function(){
						const element = document.getElementById("container");
						const selector = ".groupA";
						const wrongCardinality = 3;

						const result = matcher.compare(element, selector, wrongCardinality);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element " + element + " contains 2 elements matched by: " + selector + " and not " + wrongCardinality);
					});

					it("Only one argument is provided", function(){
						const element = document.getElementById("container");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the selector as string");
					});

					it("Container is neither not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element as container");
					});

					it("The selector provided is not a string", function(){
						const element = document.getElementById("container");
						const notValidSelector = 1;
						const result = matcher.compare(element, notValidSelector);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the selector as string");
					});

					it("The cardinality provided is not a number", function(){
						const element = document.getElementById("container");
						const selector = ".groupA";
						const notValidCardinality = "mockCardinality";
						const result = matcher.compare(element, selector, notValidCardinality);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the cardinality as number");
					});

				});

			});

		});

		describe(".toBeMatchedBy()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeMatchedBy();
			});

			describe("Given an HTMLElement and a selector", function(){

				describe("Matches if:", function(){

					it("The HTMLElement matches the selector", function(){
						const element = document.getElementById("generic");
						const result = matcher.compare(element, "div");
						expect(result.pass).toBe(true);
						const moreResult = matcher.compare(element, ".test");
						expect(moreResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The HTMLElement does not matches the selector", function(){
						const element = document.createElement("div");
						element.classList.add("test");
						const result = matcher.compare(element, "span");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element not matched by: span");
					});

					it("Only one argument is provided", function(){
						const element = document.createElement("div");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the selector as string");
					});

				});

			});

		});

		describe(".toBeSelected()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeSelected();
			});

			describe("Given an HTMLElement", function(){

				describe("Matches if:", function(){

					it("The HTMLElement is selected", function(){
						const element = document.getElementById("selected");
						const result = matcher.compare(element);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The HTMLElement is not selected", function(){
						const element = document.getElementById("unselected");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not selected");
					});

				});

			});

		});

		describe(".toBeVisible()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeVisible();
			});

			describe("Given an HTMLElement", function(){

				describe("Matches if:", function(){

					it("The HTMLElement is visible", function(){
						const genericResult = matcher.compare(document.getElementById("generic"));
						expect(genericResult.pass).toBe(true);
						const blockResult = matcher.compare(document.getElementById("blockDisplay"));
						expect(blockResult.pass).toBe(true);
						const visibilityResult = matcher.compare(document.getElementById("visibleVisibility"));
						expect(visibilityResult.pass).toBe(true);
					});

					it("The HTMLElement CSS has both height and width set to zero", function(){
						const zeroDimensionsResult = matcher.compare(document.getElementById("zeroDimensions"));
						expect(zeroDimensionsResult.pass).toBe(true);
					});

					it("The HTMLElement CSS contains: visibility: hidden (it takes space in the document)", function(){
						const hiddenVisibilityResult = matcher.compare(document.getElementById("hiddenVisibility"));
						expect(hiddenVisibilityResult.pass).toBe(true);
					});

					it("The HTMLElement CSS contains: opacity: 0 (it takes space in the document)", function(){
						const opacityResult = matcher.compare(document.getElementById("zeroOpacity"));
						expect(opacityResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The HTMLElement CSS contains display: none", function(){
						const noneDisplayResult = matcher.compare(document.getElementById("noneDisplay"));
						expect(noneDisplayResult.pass).toBe(false);
						expect(noneDisplayResult.message).toBe("Element is not visible");
					});

					it("The HTMLElement CSS has a parent with display: none", function(){
						const noneDisplayResult = matcher.compare(document.getElementById("hiddenByParent"));
						expect(noneDisplayResult.pass).toBe(false);
						expect(noneDisplayResult.message).toBe("Element is not visible");
					});

					it("The HTMLElement is not part of the current document DOM", function(){
						const element = document.createElement("div");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Element is not visible");
					});

				});

			});

		});

		describe(".toHaveAttr()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveAttr();
			});

			describe("Given an HTMLElement, the name of an attribute and an optional value", function(){

				describe("Matches if:", function(){

					it("The attribute is found", function(){
						const element = document.getElementById("generic");
						const result = matcher.compare(element, "class");
						expect(result.pass).toBe(true);
					});

					it("The attribute is found and its value matches", function(){
						const element = document.createElement("div");
						element.classList.add("test");
						const result = matcher.compare(element, "class", "test");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The attribute is not found", function(){
						const element = document.createElement("div");
						element.classList.add("test");
						const result = matcher.compare(element, "missing");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Attribute: missing does not match");
					});

					it("The attribute is found, but its value does not matches", function(){
						const element = document.createElement("div");
						element.classList.add("test");
						const result = matcher.compare(element, "class", "missing");
						expect(result.pass).toBe(false);
					});

					it("Only one argument is provided", function(){
						const element = document.createElement("div");
						element.setAttribute("id", "x");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the attribute as string");
					});

				});

			});

		});

		describe(".toHaveClass()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveClass();
			});

			describe("Given an HTMLElement and the name of a CSS class", function(){

				describe("Matches if:", function(){

					it("The class is found", function(){
						const element = document.getElementById("generic");
						const result = matcher.compare(element, "test");
						expect(result.pass).toBe(true);
					});

					it("The HTMLElement also contains multiple classes other then the given one", function(){
						const element = document.createElement("div");
						element.classList.add("test", "more");
						const result = matcher.compare(element, "test");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is not a HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The class is not found", function(){
						const element = document.createElement("div");
						element.classList.add("test");
						const result = matcher.compare(element, "missing");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("CSS class: missing not found");
					});

					it("Only one argument is provided", function(){
						const element = document.createElement("div");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the name of the CSS class as string");
					});

				});

			});

		});

		describe(".toHaveCss()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveCss();
			});

			describe("Given an HTMLElement, the name of a CSS property and an optional value. Check the computed style property", function(){

				describe("Matches if:", function(){

					it("The CSS property is found inside an inline style", function(){
						const element = document.getElementById("blockDisplay");
						const result = matcher.compare(element, "display");
						expect(result.pass).toBe(true);
					});

					it("The CSS property is found inside an embedded style", function(){
						const element = document.getElementById("computed");
						const result = matcher.compare(element, "box-sizing");
						expect(result.pass).toBe(true);
					});

					it("The CSS property is found inside an inline style and its value matches", function(){
						const element = document.getElementById("blockDisplay");
						const result = matcher.compare(element, "display", "block");
						expect(result.pass).toBe(true);
					});

					it("The CSS property is found inside an embedded style and its value matches", function(){
						const element = document.getElementById("computed");
						const result = matcher.compare(element, "box-sizing", "border-box");
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The CSS property is not found", function(){
						const element = document.getElementById("blockDisplay");
						const result = matcher.compare(element, "border-width");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("CSS property: border-width not found");
					});

					it("The CSS property is found, but its value does not matches", function(){
						const element = document.getElementById("blockDisplay");
						const result = matcher.compare(element, "display", "xxx");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("CSS property: display does not match");
					});

					it("Only one argument is provided", function(){
						const element = document.createElement("div");
						element.setAttribute("id", "x");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the CSS property as string");
					});

				});

			});

		});

		describe(".toHaveProp()", function(){

			let matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveProp();
			});

			describe("Given an HTMLElement, the name of a property and an optional value", function(){

				describe("Matches if:", function(){

					it("The property is found", function(){
						const element = document.getElementById("radioChecked");
						const nodeResult = matcher.compare(element, "checked");
						expect(nodeResult.pass).toBe(true);
					});

					it("The property is found and its value matches", function(){
						const element = document.getElementById("radioChecked");
						const result = matcher.compare(element, "checked", true);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("The object is not an HTMLElement", function(){
						const notValidElement = "text";
						const result = matcher.compare(notValidElement);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify an Element");
					});

					it("The property is not found", function(){
						const element = document.getElementById("radioChecked");
						const result = matcher.compare(element, "missing");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Property: missing does not match");
					});

					it("The property is found, but its value does not matches", function(){
						const element = document.getElementById("radioChecked");
						const result = matcher.compare(element, "checked", "false");
						expect(result.pass).toBe(false);
					});

					it("Only one argument is provided", function(){
						const element = document.getElementById("generic");
						const result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the property as string");
					});

				});

			});

		});

	});

});