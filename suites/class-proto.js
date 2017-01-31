"use strict";

let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("Class vs Prototypes");

let bench = new Benchmarkify({ async: false, name: "Classes vs Prototype"});

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