"use strict";

let _ = require("lodash");
let PromiseBB = require("bluebird");
let PromiseAigle = require("aigle");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Promise vs BlueBird vs Aigle").printHeader();

let bench = benchmark.createSuite("Promise vs BlueBird vs Aigle");

function add(a, b) {
	return a + b;
}

bench.add("No promise", done => {
	add(5, 8);
	done();
}, false);

bench.add("ES6 Promise.resolve", done => {
	return Promise.resolve().then(() => {
		add(5, 8);
		done();
	});
});

bench.add("ES6 new Promise", done => {
	return new Promise(resolve => {
		resolve(add(5, 8));
		done();
	});
});

bench.add("Bluebird Promise.resolve", done => {
	return PromiseBB.resolve().then(() => {
		add(5, 8);
		done();
	});
});

bench.add("Bluebird Promise.resolve + 5 x then", done => {
	return PromiseBB.resolve()
		.then(() => add(5, 8))
		.then(() => add(3, 2))
		.then(() => add(9, 3))
		.then(() => add(1, 4))
		.then(() => add(6, 7))
		.then(() => done());
});

bench.add("Bluebird new Promise", done => {
	return new PromiseBB(resolve => {
		resolve(add(5, 8));
		done();
	});
});

bench.add("Aigle Promise.resolve", done => {
	return PromiseAigle.resolve().then(() => {
		add(5, 8);
		done();
	});
});

bench.add("Aigle Promise.resolve + 5 x then", done => {
	return PromiseAigle.resolve()
		.then(() => add(5, 8))
		.then(() => add(3, 2))
		.then(() => add(9, 3))
		.then(() => add(1, 4))
		.then(() => add(6, 7))
		.then(() => done());
});

bench.add("Aigle new Promise", done => {
	return new PromiseAigle(resolve => {
		resolve(add(5, 8));
		done();
	});
});


bench.run();