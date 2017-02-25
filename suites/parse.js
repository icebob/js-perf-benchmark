"use strict";

let Promise	= require("bluebird");
let { getDataFile } = require("../utils");

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("JSON parser benchmark");

let parse = require("fast-json-parse");
let json3 = require("json3");
let json5 = require("json5");

let bench = new Benchmarkify({ async: false, name: "Parse JSON (150b) to JS object"});
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