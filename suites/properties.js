"use strict";

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Object properties").printHeader();

let bench = benchmark.createSuite("Create object with many properties");

// ----

bench.add("Create object with 1 prop", () => {
	let opts = {
		prop1: 5
	};
	return opts;
});

bench.add("Create object with 8 prop", () => {
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

bench.add("Create object with 9 prop", () => {
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

bench.add("Create object with 20 prop", () => {
	let opts = {
		prop1: 5,
		prop2: "",
		prop3: false,
		prop4: 1,
		prop5: 0,
		prop6: null,
		prop7: "Hello",
		prop8: 12345,
		prop9: "asd",
		prop10: false,
		prop11: 5,
		prop12: "",
		prop13: false,
		prop14: 1,
		prop15: 0,
		prop16: null,
		prop17: "Hello",
		prop18: 12345,
		prop19: "asd",
		prop20: false
	};
	return opts;
});

bench.run();