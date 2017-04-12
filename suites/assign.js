"use strict";

let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Assign").printHeader();

let bench = benchmark.createSuite("Object assign");

// ----

bench.add("Set props", () => {
	let obj = {};
	obj.a = 5;
	obj.b = false;
	obj.c = "Test data";
	obj.d = {
		id: 1,
		name: "John"
	};
	return obj;
});

bench.add("Object.assign", () => {
	let obj = {};
	Object.assign(obj, {
		a: 5,
		b: false,
		c: "Test data",
		d: {
			id: 1,
			name: "John"
		}
	});

	return obj;
});

bench.run();