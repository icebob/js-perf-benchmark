"use strict";

let _ = require("lodash");
let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Timers benchmark").printHeader();

let bench1 = benchmark.createSuite("setTimeout & unref");

bench1.add("setTimeout", () => {
	return setTimeout(() => {
		let b = 10 + 5;
	}, 500);
});

bench1.add("setTimeout with unref", () => {
	let timer = setTimeout(() => {
		let b = 10 + 5;
	}, 500);

	timer.unref();
	return timer;
});

bench1.run();/*.then(() => {
	return bench2.run();
});*/

/*
====================
  Timers benchmark
====================

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: setTimeout & unref
√ setTimeout                    1,842,341 rps
√ setTimeout with unref           310,437 rps

   setTimeout                       0%      (1,842,341 rps)   (avg: 542ns)
   setTimeout with unref       -83.15%        (310,437 rps)   (avg: 3μs)
-----------------------------------------------------------------------
*/