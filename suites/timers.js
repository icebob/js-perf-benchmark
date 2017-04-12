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