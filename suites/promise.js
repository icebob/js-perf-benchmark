"use strict";

/*
const async_hooks = require('async_hooks');
const hook = async_hooks.createHook({
    init(asyncId, type, triggerAsyncId, resource) { },
    before(asyncId) { },
    after(asyncId) { },
    destroy(asyncId) { },
    promiseResolve(asyncId) { },
});
hook.enable();
*/

let _ = require("lodash");
let PromiseBB = require("bluebird");
let PromiseAigle = require("aigle");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Promise vs BlueBird vs Aigle vs await").printHeader();

let bench = benchmark.createSuite("Promise vs BlueBird vs Aigle vs await");

function add(a, b) {
	return a + b;
}

bench.add("No promise", done => {
	add(5, 8);
	done();
}, false);

bench.ref("ES6 Promise.resolve", done => {
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

bench.add("ES6 Promise.resolve + 5 x then", done => {
	return Promise.resolve()
		.then(() => add(5, 8))
		.then(() => add(3, 2))
		.then(() => add(9, 3))
		.then(() => add(1, 4))
		.then(() => add(6, 7))
		.then(() => done());
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

bench.add("await", async done => {
	await add(5, 8);
	done();
});

bench.add("await 5 x", async done => {
	await add(5, 8);
	await add(3, 2);
	await add(9, 3);
	await add(1, 4);
	await add(6, 7);
	done();
});


bench.run();

/*
=========================================
  Promise vs BlueBird vs Aigle vs await
=========================================

Platform info:
==============
   Windows_NT 10.0.18363 x64
   Node.JS: 12.14.1
   V8: 7.7.299.13-node.16
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: Promise vs BlueBird vs Aigle vs await
√ No promise*                               136,212,065 rps
√ ES6 Promise.resolve*                       12,646,841 rps
√ ES6 new Promise*                           11,579,923 rps
√ ES6 Promise.resolve + 5 x then*             2,778,475 rps
√ Bluebird Promise.resolve*                   5,536,574 rps
√ Bluebird Promise.resolve + 5 x then*        1,101,284 rps
√ Bluebird new Promise*                       5,133,918 rps
√ Aigle Promise.resolve*                      9,730,740 rps
√ Aigle Promise.resolve + 5 x then*           2,545,289 rps
√ Aigle new Promise*                          5,970,670 rps
√ await*                                      9,408,408 rps
√ await 5 x*                                  3,140,225 rps

   No promise*                              +977.04%    (136,212,065 rps)   (avg: 7ns)
   ES6 Promise.resolve* (#)                       0%     (12,646,841 rps)   (avg: 79ns)
   ES6 new Promise*                           -8.44%     (11,579,923 rps)   (avg: 86ns)
   ES6 Promise.resolve + 5 x then*           -78.03%      (2,778,475 rps)   (avg: 359ns)
   Bluebird Promise.resolve*                 -56.22%      (5,536,574 rps)   (avg: 180ns)
   Bluebird Promise.resolve + 5 x then*      -91.29%      (1,101,284 rps)   (avg: 908ns)
   Bluebird new Promise*                     -59.41%      (5,133,918 rps)   (avg: 194ns)
   Aigle Promise.resolve*                    -23.06%      (9,730,740 rps)   (avg: 102ns)
   Aigle Promise.resolve + 5 x then*         -79.87%      (2,545,289 rps)   (avg: 392ns)
   Aigle new Promise*                        -52.79%      (5,970,670 rps)   (avg: 167ns)
   await*                                    -25.61%      (9,408,408 rps)   (avg: 106ns)
   await 5 x*                                -75.17%      (3,140,225 rps)   (avg: 318ns)
-----------------------------------------------------------------------

*/