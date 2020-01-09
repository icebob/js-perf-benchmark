"use strict";

let _ = require("lodash");
let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Map vs. Object benchmark").printHeader();

let bench1 = benchmark.createSuite("Set Map vs. Add props to object");

let payload = {
	a: 1, 
	b: "String"
};
const cycle = 10 * 1000;

const prefix = "73d29a81-5d41-4043-b81e-9f206aecf3a2";

bench1.add("Map.set", () => {
	let map = new Map();
	let c = 0;
	while (++c < cycle) {
		map.set(prefix + c, payload);
	}
});

bench1.add("Object[]", () => {
	let obj = {};
	let c = 0;
	while (++c < cycle) {
		obj[prefix + c] = payload;
	}
});

let bench2 = benchmark.createSuite("Get Map vs. Get props from object");

// Load work vars
let obj = {};
let map = new Map();
let c = 0;
while (++c < cycle) {
	obj[prefix + c] = payload;
	map.set(prefix + c, payload);
}

bench2.add("Map.get", () => {
	let c = 0;
	let res;
	while (++c < cycle)
		res = map.get(prefix + c);
	
	return res;
});

bench2.add("Object[]", () => {
	let res;
	let c = 0;
	while (++c < cycle)
		res = obj[prefix + c];
	
	return res;
});

const e7 = require("../utils/e7");

let bench3 = benchmark.createSuite("Set & Get & Delete with UUID key");

// Load work vars
obj = {};
map = new Map();
c = 0;
while (++c < 100) {
	const id = e7();
	map.set(id, payload);
}

bench3.add("Set & Get & Delete by uuid x 10k", () => {
	let c = 0;
	while (++c < cycle) {
		const id = e7();
		map.set(id, payload);
		const res = map.get(id);
		if (res == payload)
			map.delete(id);
	}	
});


bench1.run().then(() => {
	return bench2.run();
}).then(() => {
	return bench3.run();
});

/*
============================
  Map vs. Object benchmark
============================

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: Set Map vs. Add props to object
√ Map.set                531 rps
√ Object[]               464 rps

   Map.set             0%            (531 rps)   (avg: 1ms)
   Object[]       -12.73%            (464 rps)   (avg: 2ms)
-----------------------------------------------------------------------

Suite: Get Map vs. Get props from object
√ Map.get                958 rps
√ Object[]               626 rps

   Map.get             0%            (958 rps)   (avg: 1ms)
   Object[]        -34.7%            (626 rps)   (avg: 1ms)
-----------------------------------------------------------------------

Suite: Set & Get & Delete with UUID key
√ Set & Get & Delete by uuid x 10k               197 rps

   Set & Get & Delete by uuid x 10k            0%            (197 rps)   (avg: 5ms)
-----------------------------------------------------------------------

*/