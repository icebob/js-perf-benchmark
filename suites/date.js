"use strict";

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Date.now benchmark").printHeader();

let bench = benchmark.createSuite("Date.now() performance");

const cycle = 10 * 1000;

// ----

bench.add("Call new Date()", () => {
	let c = 0;
	let time;
	while (++c < cycle) {
		time = new Date();
	}
	return time;
});

// ----

bench.add("Call Date.now", () => {
	let c = 0;
	let time;
	while (++c < cycle) {
		time = Date.now();
	}
	return time;
});

// ----

bench.add("Call process.hrtime", () => {
	let c = 0;
	let time;
	while (++c < cycle) {
		time = process.hrtime();
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

/*
======================
  Date.now benchmark
======================

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: Date.now() performance
√ Call new Date()                   557 rps
√ Call Date.now                     971 rps
√ Call process.hrtime             2,781 rps
√ Call only every sec           192,918 rps

   Call new Date()           -99.71%            (557 rps)   (avg: 1ms)
   Call Date.now              -99.5%            (971 rps)   (avg: 1ms)
   Call process.hrtime       -98.56%          (2,781 rps)   (avg: 359μs)
   Call only every sec            0%        (192,918 rps)   (avg: 5μs)
-----------------------------------------------------------------------
*/