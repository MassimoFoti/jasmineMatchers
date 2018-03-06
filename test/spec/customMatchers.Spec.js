describe("jasmineMatchers", function(){

	"use strict";

	describe("Provides the following custom matchers for Jasmine:", function(){

		describe(".toBeFalse()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeFalse();
			});

			describe("Given an actual value", function(){

				describe("Matches if the actual value is:", function(){

					it("Strictly equal to false", function(){
						var result = matcher.compare(false);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if the actual value is:", function(){

					it("true", function(){
						var result = matcher.compare(true);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected: true to equal: false");
					});

					it("null", function(){
						var result = matcher.compare(null);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected: null to equal: false");
					});

					it("undefined", function(){
						var result = matcher.compare(undefined);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected: undefined to equal: false");
					});

					it("an empty string", function(){
						var result = matcher.compare("");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected:  to equal: false");
					});

					it("an empty array", function(){
						var result = matcher.compare([]);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected:  to equal: false");
					});

					it("an empty plain object", function(){
						var result = matcher.compare({});
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected: [object Object] to equal: false");
					});

				});

			});

		});

		describe(".toBeInstanceOf()", function(){

			var matcher, Car, auto;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeInstanceOf();
				Car = function(make, model, year){
					this.make = make;
					this.model = model;
					this.year = year;
				};
				auto = new Car("NSU", "Prinz", 1958);
			});

			describe("Given an actual value and an object", function(){

				describe("Matches if:", function(){

					it("The prototype property of the actual value appears anywhere in the prototype chain of the object", function(){
						var carResult = matcher.compare(auto, Car);
						expect(carResult.pass).toBe(true);

						var objResult = matcher.compare(auto, Object);
						expect(objResult.pass).toBe(true);
					});

				});

				describe("Fails if:", function(){

					it("Only one argument is provided", function(){
						var result = matcher.compare(auto);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the object to test against");
					});

					it("The prototype property of the actual value does not appears anywhere in the prototype chain of the object", function(){
						var MockConstructor = function(){
						};
						var mockIstance = new MockConstructor();
						var result = matcher.compare(mockIstance, Car);
						expect(result.pass).toBe(false);
					});

				});

			});

		});

		describe(".toBeTrue()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toBeTrue();
			});

			describe("Given an actual value", function(){

				describe("Matches if the actual value is:", function(){

					it("Strictly equal to true", function(){
						var result = matcher.compare(true);
						expect(result.pass).toBe(true);
					});

				});

				describe("Fails if the actual value is:", function(){

					it("false", function(){
						var result = matcher.compare(false);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected: false to equal: true");
					});

					it("null", function(){
						var result = matcher.compare(null);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected: null to equal: true");
					});

					it("undefined", function(){
						var result = matcher.compare(undefined);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected: undefined to equal: true");
					});

					it("an empty string", function(){
						var result = matcher.compare("");
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected:  to equal: true");
					});

					it("an empty array", function(){
						var result = matcher.compare([]);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected:  to equal: true");
					});

					it("an empty plain object", function(){
						var result = matcher.compare({});
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Expected: [object Object] to equal: true");
					});

				});

			});

		});

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
						var element = jQuery("<div id=\"x\"></div>");
						var result = matcher.compare(element);
						expect(result.pass).toBe(false);
						expect(result.message).toBe("Please specify the property as string");
					});

				});

			});

		});

		describe(".toHaveReadonlyProperty()", function(){

			var matcher;
			beforeEach(function(){
				matcher = jasmineMatchers.toHaveReadonlyProperty();
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

	});

});