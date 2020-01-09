"use strict";

let Promise	= require("bluebird");
let { getDataFile } = require("../utils");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("JSON parser benchmark").printHeader();

let parse = require("fast-json-parse");
let json3 = require("json3");
let json5 = require("json5");

let bench = benchmark.createSuite("Parse JSON (150b) to JS object");
let data = getDataFile("150.json");

// ----
bench.add("Built-in JSON.parse", () => {
	try {
		return JSON.parse(data);
	} catch (e) {
	}
});

bench.add("json3.parse", () => {
	return json3.parse(data);
});

bench.add("json5.parse", () => {
	return json5.parse(data);
});

bench.add("fast-json-parse", () => {
	return parse(data);
});

bench.run();

/*
=========================
  JSON parser benchmark
=========================

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: Parse JSON (150b) to JS object
√ Built-in JSON.parse           943,405 rps
√ json3.parse                   918,587 rps
√ json5.parse                    49,783 rps
√ fast-json-parse               898,041 rps

   Built-in JSON.parse            0%        (943,405 rps)   (avg: 1μs)
   json3.parse                -2.63%        (918,587 rps)   (avg: 1μs)
   json5.parse               -94.72%         (49,783 rps)   (avg: 20μs)
   fast-json-parse            -4.81%        (898,041 rps)   (avg: 1μs)
-----------------------------------------------------------------------

*/