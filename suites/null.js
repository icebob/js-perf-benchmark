"use strict";

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Null & undefined").printHeader();

let bench = benchmark.createSuite("if null or undefined");

const a = 5;

bench.add("if (a)", () => {
	if (a)
		return true;
});

bench.add("if (a == null)", () => {
	if (a == null)
		return true;
});

bench.add("if (a === null || a === undefined)", () => {
	if (a === null || a === undefined)
		return true;
});

bench.add("a?true:false", () => {
	return a ? true: false;
});

bench.add("!!a", () => {
	return !!a;
});

bench.run();

/*
====================
  Null & undefined
====================

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: if null or undefined
√ if (a)                                   371,647,514 rps
√ if (a == null)                           144,106,642 rps
√ if (a === null || a === undefined)       142,983,767 rps
√ a?true:false                             142,835,355 rps
√ !!a                                      144,949,856 rps

   if (a)                                        0%    (371,647,514 rps)   (avg: 2ns)
   if (a == null)                           -61.22%    (144,106,642 rps)   (avg: 6ns)
   if (a === null || a === undefined)       -61.53%    (142,983,767 rps)   (avg: 6ns)
   a?true:false                             -61.57%    (142,835,355 rps)   (avg: 7ns)
   !!a                                         -61%    (144,949,856 rps)   (avg: 6ns)
-----------------------------------------------------------------------
*/