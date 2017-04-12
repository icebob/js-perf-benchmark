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