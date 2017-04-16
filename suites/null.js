"use strict";

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Null & undefined").printHeader();

let bench = benchmark.createSuite("if null or undefined");

const a = 5;

bench.add("if (a)", () => {
	if (a)
		return true;
});

bench.add("if (a == null)", () => {
	if (a == null)
		return true;
});

bench.add("if (a === null || a === undefined)", () => {
	if (a === null || a === undefined)
		return true;
});

bench.add("a?true:false", () => {
	return a ? true: false;
});

bench.add("!!a", () => {
	return !!a;
});

bench.run();