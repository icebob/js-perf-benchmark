"use strict";

let _ = require("lodash");
let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("Timers benchmark");

let bench1 = new Benchmarkify({ async: false, name: "setTimeout & unref"});

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