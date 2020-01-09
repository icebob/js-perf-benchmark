"use strict";

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

bench.add("await", async done => {
	await add(5, 8);
	done();
});

bench.add("Aigle Promise.resolve + 5 x then", async done => {
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
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: Promise vs BlueBird vs Aigle vs await
√ No promise*                               169,827,247 rps
√ ES6 Promise.resolve*                       11,274,951 rps
√ ES6 new Promise*                           11,719,615 rps
√ Bluebird Promise.resolve*                   5,079,560 rps
√ Bluebird Promise.resolve + 5 x then*        1,105,344 rps
√ Bluebird new Promise*                       7,109,401 rps
√ Aigle Promise.resolve*                     12,550,337 rps
√ Aigle Promise.resolve + 5 x then*           3,226,746 rps
√ Aigle new Promise*                          8,765,586 rps
√ await*                                      7,436,999 rps
√ Aigle Promise.resolve + 5 x then*           2,344,155 rps

   No promise*                                    0%    (169,827,247 rps)   (avg: 5ns)
   ES6 Promise.resolve*                      -93.36%     (11,274,951 rps)   (avg: 88ns)
   ES6 new Promise*                           -93.1%     (11,719,615 rps)   (avg: 85ns)
   Bluebird Promise.resolve*                 -97.01%      (5,079,560 rps)   (avg: 196ns)
   Bluebird Promise.resolve + 5 x then*      -99.35%      (1,105,344 rps)   (avg: 904ns)
   Bluebird new Promise*                     -95.81%      (7,109,401 rps)   (avg: 140ns)
   Aigle Promise.resolve*                    -92.61%     (12,550,337 rps)   (avg: 79ns)
   Aigle Promise.resolve + 5 x then*          -98.1%      (3,226,746 rps)   (avg: 309ns)
   Aigle new Promise*                        -94.84%      (8,765,586 rps)   (avg: 114ns)
   await*                                    -95.62%      (7,436,999 rps)   (avg: 134ns)
   Aigle Promise.resolve + 5 x then*         -98.62%      (2,344,155 rps)   (avg: 426ns)
-----------------------------------------------------------------------

*/