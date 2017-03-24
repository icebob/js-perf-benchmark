"use strict";

let _ = require("lodash");
let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("Map vs. Object benchmark");

let bench1 = new Benchmarkify({ async: false, name: "Set Map vs. Add props to object"});

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

let bench2 = new Benchmarkify({ async: false, name: "Get Map vs. Get props from object"});

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

let bench3 = new Benchmarkify({ async: false, name: "Set & Get & Delete with UUID key"});

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