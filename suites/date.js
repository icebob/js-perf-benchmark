"use strict";

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("Date.now benchmark");

let bench = new Benchmarkify({ async: false, name: "Date.now() performance"});

const cycle = 10 * 1000;

// ----

bench.add("Call every cycle", () => {
	let c = 0;
	let time;
	while (++c < cycle) {
		time = Date.now();
	}
	return time;
});

// ----

let now;
let timer = setInterval(() => {
	now = Date.now();
}, 1000);

bench.add("Call only every sec", () => {
	let c = 0;
	let time;
	while (++c < cycle) {
		time = now;
	}
	return time;
});

bench.run().then(() => clearInterval(timer));