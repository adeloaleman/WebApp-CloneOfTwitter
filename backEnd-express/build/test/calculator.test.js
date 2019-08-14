"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mocha_1 = require("mocha");
var calculator_1 = require("../src/calculator");
mocha_1.describe("Calculator", function () {
    mocha_1.it("Should be able to add two numbers", function () {
        var calculator = new calculator_1.Calculator();
        var expected = 10;
        var actual = calculator.add(5, 5);
        chai_1.expect(actual).to.eq(expected);
    });
    mocha_1.it("Should be able to divide two numbers", function () {
        var calculator = new calculator_1.Calculator();
        var expected = 5;
        var actual = calculator.div(10, 2);
        chai_1.expect(actual).to.eq(expected);
    });
});
