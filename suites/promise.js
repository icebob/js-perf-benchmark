"use strict";

let _ = require("lodash");
let PromiseBB = require("bluebird");

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("Promise vs BlueBird vs Native");

let bench = new Benchmarkify({ async: true, name: "Promise vs BlueBird vs Native"});

function add(a, b) {
	return a + b;
}

bench.skip("No promise", () => {
	return add(5, 8);
}, false);

bench.skip("ES6 Promise.resolve", () => {
	return Promise.resolve().then(() => {
		return add(5, 8);
	});
});

bench.skip("ES6 new Promise", () => {
	return new Promise(resolve => {
		resolve(add(5, 8));
	});
});

bench.skip("Bluebird Promise.resolve", () => {
	return PromiseBB.resolve().then(() => {
		return add(5, 8);
	});
});

bench.skip("Bluebird Promise.resolve + 5 x then", () => {
	return PromiseBB.resolve()
		.then(() => add(5, 8))
		.then(() => add(3, 2))
		.then(() => add(9, 3))
		.then(() => add(1, 4))
		.then(() => add(6, 7));
});

bench.skip("Bluebird new Promise", () => {
	return new PromiseBB(resolve => {
		resolve(add(5, 8));
	});
});
/*
function resolver(resolve) {

		let req = {
			a: 5,
			b: "Hello",
			c: true,
			d: null
		};
		resolve(add(req.a, 8));

}

bench.add("Bluebird new Promise with local var", () => {
	return new PromiseBB(resolve => {
		return resolver(resolve);
	});
});
*/

bench.run();