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

bench.add("Set props more than 8", () => {
	let obj = {};
	obj.a = 5;
	obj.b = false;
	obj.c = "Test data";
	obj.d = {
		id: 1,
		name: "John"
	};
	obj.e = 100;
	obj.f = "FFF";
	obj.g = true;
	obj.h = {};
	obj.i = 12.34;

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

/*
==========
  Assign
==========

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: Object assign
√ Set props                   369,030,119 rps
√ Set props more than 8        24,306,409 rps
√ Object.assign                11,528,254 rps

   Set props                        0%    (369,030,119 rps)   (avg: 2ns)
   Set props more than 8       -93.41%     (24,306,409 rps)   (avg: 41ns)
   Object.assign               -96.88%     (11,528,254 rps)   (avg: 86ns)
-----------------------------------------------------------------------
*/