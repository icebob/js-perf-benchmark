"use strict";

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Object properties").printHeader();

let bench = benchmark.createSuite("Create object with many properties");

/*
	Discussion about this suite:
	
		http://stackoverflow.com/questions/43372746/why-so-bad-the-performance-of-the-nodejs-object-creation-if-num-of-props-greater
*/

function OneProp() {
    this.prop1 = 5;
}
function SevenProps() {
    this.prop1 = 5;
    this.prop2 = "";
    this.prop3 = false;
    this.prop4 = 1;
    this.prop5 = 0;
    this.prop6 = null;
    this.prop7 = "Hello";
}
function EightProps() {
    this.prop1 = 5;
    this.prop2 = "";
    this.prop3 = false;
    this.prop4 = 1;
    this.prop5 = 0;
    this.prop6 = null;
    this.prop7 = "Hello";
    this.prop8 = 12345;
}
function NineProps() {
    this.prop1 = 5;
    this.prop2 = "";
    this.prop3 = false;
    this.prop4 = 1;
    this.prop5 = 0;
    this.prop6 = null;
    this.prop7 = "Hello";
    this.prop8 = 12345;
    this.prop9 = "asd";
}

var onePropProto = {
    prop1: undefined
};
var sevenPropsProto = {
    prop1: undefined,
    prop2: undefined,
    prop3: undefined,
    prop4: undefined,
    prop5: undefined,
    prop6: undefined,
    prop7: undefined
};
var eightPropsProto = {
    prop1: undefined,
    prop2: undefined,
    prop3: undefined,
    prop4: undefined,
    prop5: undefined,
    prop6: undefined,
    prop7: undefined,
    prop8: undefined
};
var ninePropsProto = {
    prop1: undefined,
    prop2: undefined,
    prop3: undefined,
    prop4: undefined,
    prop5: undefined,
    prop6: undefined,
    prop7: undefined,
    prop8: undefined,
    prop9: undefined
};

// ----

bench.add("Create raw object with 1 prop", () => {
	let opts = {
		prop1: 5
	};
	return opts;
});

bench.add("Create object with 1 prop via constructor", () => {
	let opts = new OneProp();
	return opts;
});

bench.add("Create object with 1 prop using prototype", () => {
	let opts = Object.create(onePropProto);
    opts.prop1 = 5;
	return opts;
});

bench.add("Create raw object with 7 props", () => {
	let opts = {
		prop1: 5,
		prop2: "",
		prop3: false,
		prop4: 1,
		prop5: 0,
		prop6: null,
		prop7: "Hello"
	};
	return opts;
});

bench.add("Create object with 7 props via constructor", () => {
	let opts = new SevenProps();
	return opts;
});

bench.add("Create object with 7 props using prototype", () => {
	let opts = Object.create(sevenPropsProto);
    opts.prop1 = 5;
    opts.prop2 = "";
    opts.prop3 = false;
    opts.prop4 = 1;
    opts.prop5 = 0;
    opts.prop6 = null;
    opts.prop7 = "Hello";
	return opts;
});

bench.add("Create raw object with 8 props", () => {
	let opts = {
		prop1: 5,
		prop2: "",
		prop3: false,
		prop4: 1,
		prop5: 0,
		prop6: null,
		prop7: "Hello",
		prop8: 12345
	};
	return opts;
});

bench.add("Create object with 8 props via constructor", () => {
	let opts = new EightProps();
	return opts;
});

bench.add("Create object with 8 props using prototype", () => {
	let opts = Object.create(eightPropsProto);
	opts.prop1 = 5;
	opts.prop2 = "";
	opts.prop3 = false;
	opts.prop4 = 1;
	opts.prop5 = 0;
	opts.prop6 = null;
	opts.prop7 = "Hello";
	opts.prop8 = 12345;
	return opts;
});

bench.add("Create raw object with 9 props", () => {
	let opts = {
		prop1: 5,
		prop2: "",
		prop3: false,
		prop4: 1,
		prop5: 0,
		prop6: null,
		prop7: "Hello",
		prop8: 12345,
		prop9: "asd"
	};
	return opts;
});

bench.add("Create object with 9 props via constructor", () => {
	let opts = new NineProps();
	return opts;
});

bench.add("Create object with 9 props with prototype", () => {
	let opts = Object.create(ninePropsProto);
	opts.prop1 = 5;
	opts.prop2 = "";
	opts.prop3 = false;
	opts.prop4 = 1;
	opts.prop5 = 0;
	opts.prop6 = null;
	opts.prop7 = "Hello";
	opts.prop8 = 12345;
	opts.prop9 = "asd";
	return opts;
});

bench.run();