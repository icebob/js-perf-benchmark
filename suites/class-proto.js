"use strict";

let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Class vs Prototypes").printHeader();

let bench = benchmark.createSuite("Classes vs Prototype");

// ----
function ProtoObj() {
	this.count = 0;
}

ProtoObj.prototype.increment = function() {
	this.count++;
};

// ----

class ClassObj {
	constructor() {
		this.count = 0;
	}

	increment() {
		this.count++;
	}
}

// ----
bench.add("Prototype", () => {
	let proto = new ProtoObj();
	proto.increment();
});

bench.add("Class", () => {
	let clss = new ClassObj();
	clss.increment();
});

bench.run();

/*
=======================
  Class vs Prototypes
=======================

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: Classes vs Prototype
√ Prototype       375,685,478 rps
√ Class           144,994,882 rps

   Prototype            0%    (375,685,478 rps)   (avg: 2ns)
   Class           -61.41%    (144,994,882 rps)   (avg: 6ns)
-----------------------------------------------------------------------
*/