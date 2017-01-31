"use strict";

let Promise	= require("bluebird");
let { getDataFile } = require("../utils");

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("JSON stringify benchmark");

let safeStringify = require("fast-safe-stringify");
let fastStringify = require("fast-json-stringify");

let dataFiles = ["150", "1k", "10k", "50k", "100k", "1M"];

function runTest(dataName) {

	let bench = new Benchmarkify({ async: false, name: `Stringify JS object to JSON (${dataName})`});
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

	bench.add("fast-safe-stringify", () => {
		return safeStringify(data);
	});

	bench.add("fast-json-stringify", () => {
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