"use strict";

let Promise	= require("bluebird");
let { getDataFile } = require("../utils");

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("JSON parser benchmark");

let parse = require("fast-json-parse");

let bench = new Benchmarkify({ async: false, name: "Parse JSON (10k) to JS object"});
let data = getDataFile("10k.json");

// ----
bench.add("Built-in JSON.parse", () => {
	try {
		return JSON.parse(data);
	} catch (e) {
	}
});

bench.add("fast-json-parse", () => {
	return parse(data);
});

bench.run();