"use strict";

let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("Assign");

let bench = new Benchmarkify({ async: false, name: "Object assign"});

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