"use strict";

let Promise	= require("bluebird");
let { getDataFile } = require("../utils");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("JSON stringify benchmark").printHeader();

let safeStringify = require("fast-safe-stringify");
let fastStringify = require("fast-json-stringify");
let json3 = require("json3");
let jso5 = require("json5");

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