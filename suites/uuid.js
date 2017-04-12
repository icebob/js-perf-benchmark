"use strict";

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("UUID benchmark").printHeader();

let TokenGenerator = require("uuid-token-generator");
let tokgen128 = new TokenGenerator(128, TokenGenerator.BASE62);
const uuidV4 = require("uuid/v4");
const e7 = require("../utils/e7");

let bench = benchmark.createSuite("UUID generators");

// ----
console.log("uuid-token-generator:", tokgen128.generate());
bench.add("uuid-token-generator", () => {
	return tokgen128.generate();
});

console.log("uuid:", uuidV4());
bench.add("uuid", () => {
	return uuidV4();
});


console.log("e7:", e7());
bench.add("e7", () => {
	return e7();
});

bench.run();