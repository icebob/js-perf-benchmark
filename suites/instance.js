"use strict";

let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Class instances").printHeader();

let bench = benchmark.createSuite("Class instances performance");

// ----

class ClassObj {
	constructor() {
		this.init();
	}

	init() {
		this.count = 0;
		this.a = 5;
		this.b = "Lorem ipsum";
		this.c = false;
		this.d = {
			id: 1,
			name: "Test",
			status: true
		},
		this.e = [1,5,8,3,5,9];
	}

	increment() {
		this.count++;
	}

	decrement() {
		this.count++;
	}
}

// ----

bench.add("Create new instance", () => {
	let clss = new ClassObj();
	return clss;
});

let lastInstance;

bench.add("Reused instances", () => {
	let clss;
	if (lastInstance) {
		let clss = lastInstance;
		clss.init();
	} else {
		clss = new ClassObj();
	}

	lastInstance = clss;
	return clss;
});

bench.run();

/*
===================
  Class instances
===================

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: Class instances performance
√ Create new instance       370,657,510 rps
√ Reused instances           34,146,535 rps

   Create new instance            0%    (370,657,510 rps)   (avg: 2ns)
   Reused instances          -90.79%     (34,146,535 rps)   (avg: 29ns)
-----------------------------------------------------------------------
*/