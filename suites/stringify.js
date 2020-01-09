"use strict";

let Promise	= require("bluebird");
let { getDataFile } = require("../utils");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("JSON stringify benchmark").printHeader();

let safeStringify = require("fast-safe-stringify");
let fastStringify = require("fast-json-stringify");
let json3 = require("json3");
let json5 = require("json5");

let dataFiles = ["150", "1k", "10k", "50k", "100k", "1M"];

function runTest(dataName) {

	let bench = benchmark.createSuite(`Stringify JS object to JSON (${dataName})`);
	let data = JSON.parse(getDataFile(dataName + ".json"));

	// ----
	bench.add("Built-in JSON.stringify", () => {
		try {
			return JSON.stringify(data);
		} catch (e) {
			console.error(e);
			throw e;
		}	
	});

	bench.add("json3.stringify", () => {
		return json3.stringify(data);
	});

	bench.add("json5.stringify", () => {
		return json5.stringify(data);
	});

	bench.add("fast-safe-stringify", () => {
		return safeStringify(data);
	});

	bench.skip("fast-json-stringify", () => {
		try {
			return fastStringify(data);
		} catch (e) {
			console.error(e);
			throw e;
		}	
	});

	bench.run().then(() => {
		if (dataFiles.length > 0)
			runTest(dataFiles.shift());
	});
}

runTest(dataFiles.shift());	

/*
============================
  JSON stringify benchmark
============================

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: Stringify JS object to JSON (150)
√ Built-in JSON.stringify           868,739 rps
√ json3.stringify                   851,541 rps
√ json5.stringify                   217,994 rps
√ fast-safe-stringify               751,879 rps
‼ [SKIP] fast-json-stringify

   Built-in JSON.stringify            0%        (868,739 rps)   (avg: 1μs)
   json3.stringify                -1.98%        (851,541 rps)   (avg: 1μs)
   json5.stringify               -74.91%        (217,994 rps)   (avg: 4μs)
   fast-safe-stringify           -13.45%        (751,879 rps)   (avg: 1μs)
   fast-json-stringify (skipped)
-----------------------------------------------------------------------

Suite: Stringify JS object to JSON (1k)
√ Built-in JSON.stringify           212,833 rps
√ json3.stringify                   212,668 rps
√ json5.stringify                    25,349 rps
√ fast-safe-stringify               185,701 rps
‼ [SKIP] fast-json-stringify

   Built-in JSON.stringify            0%        (212,833 rps)   (avg: 4μs)
   json3.stringify                -0.08%        (212,668 rps)   (avg: 4μs)
   json5.stringify               -88.09%         (25,349 rps)   (avg: 39μs)
   fast-safe-stringify           -12.75%        (185,701 rps)   (avg: 5μs)
   fast-json-stringify (skipped)
-----------------------------------------------------------------------

Suite: Stringify JS object to JSON (10k)
√ Built-in JSON.stringify            26,108 rps
√ json3.stringify                    26,610 rps
√ json5.stringify                     2,535 rps
√ fast-safe-stringify                23,458 rps
‼ [SKIP] fast-json-stringify

   Built-in JSON.stringify        -1.89%         (26,108 rps)   (avg: 38μs)
   json3.stringify                    0%         (26,610 rps)   (avg: 37μs)
   json5.stringify               -90.47%          (2,535 rps)   (avg: 394μs)
   fast-safe-stringify           -11.84%         (23,458 rps)   (avg: 42μs)
   fast-json-stringify (skipped)
-----------------------------------------------------------------------

Suite: Stringify JS object to JSON (50k)
√ Built-in JSON.stringify             5,758 rps
√ json3.stringify                     5,782 rps
√ json5.stringify                       528 rps
√ fast-safe-stringify                 5,062 rps
‼ [SKIP] fast-json-stringify

   Built-in JSON.stringify        -0.43%          (5,758 rps)   (avg: 173μs)
   json3.stringify                    0%          (5,782 rps)   (avg: 172μs)
   json5.stringify               -90.87%            (528 rps)   (avg: 1ms)
   fast-safe-stringify           -12.46%          (5,062 rps)   (avg: 197μs)
   fast-json-stringify (skipped)
-----------------------------------------------------------------------

Suite: Stringify JS object to JSON (100k)
√ Built-in JSON.stringify             2,910 rps
√ json3.stringify                     2,903 rps
√ json5.stringify                       269 rps
√ fast-safe-stringify                 2,559 rps
‼ [SKIP] fast-json-stringify

   Built-in JSON.stringify            0%          (2,910 rps)   (avg: 343μs)
   json3.stringify                -0.26%          (2,903 rps)   (avg: 344μs)
   json5.stringify               -90.76%            (269 rps)   (avg: 3ms)
   fast-safe-stringify           -12.08%          (2,559 rps)   (avg: 390μs)
   fast-json-stringify (skipped)
-----------------------------------------------------------------------

Suite: Stringify JS object to JSON (1M)
√ Built-in JSON.stringify               294 rps
√ json3.stringify                       293 rps
√ json5.stringify                        25 rps
√ fast-safe-stringify                   261 rps
‼ [SKIP] fast-json-stringify

   Built-in JSON.stringify            0%            (294 rps)   (avg: 3ms)
   json3.stringify                 -0.6%            (293 rps)   (avg: 3ms)
   json5.stringify               -91.64%             (25 rps)   (avg: 40ms)
   fast-safe-stringify           -11.32%            (261 rps)   (avg: 3ms)
   fast-json-stringify (skipped)
-----------------------------------------------------------------------
*/