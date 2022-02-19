"use strict";

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("UUID benchmark").printHeader();
let crypto = require("crypto");


let TokenGenerator = require("uuid-token-generator");
let tokgen128 = new TokenGenerator(128, TokenGenerator.BASE62);
const uuidV1 = require("uuid/v1");
const uuidV3 = require("uuid/v3");
const uuidV4 = require("uuid/v4");
const uuidV5 = require("uuid/v5");
const e7 = require("../utils/e7");
const hyperid = require("hyperid")();

let bench = benchmark.createSuite("UUID generators");

// ----
console.log("crypto-randomBytes:", crypto.randomUUID());
bench.ref("crypto-randomUUID", () => {
	return crypto.randomUUID();
});

console.log("uuid-token-generator:", tokgen128.generate());
bench.add("uuid-token-generator", () => {
	return tokgen128.generate();
});

console.log("uuid1:", uuidV1());
bench.add("uuid v1", () => {
	return uuidV1();
});

console.log("uuid3:", uuidV3('hello.example.com', uuidV3.DNS));
bench.add("uuid v3", () => {
	return uuidV3('hello.example.com', uuidV3.DNS);
});

console.log("uuid4:", uuidV4());
bench.add("uuid v4", () => {
	return uuidV4();
});

console.log("uuid5:", uuidV5('hello.example.com', uuidV5.DNS));
bench.add("uuid v5", () => {
	return uuidV5('hello.example.com', uuidV5.DNS);
});

console.log("e7:", e7());
bench.add("e7", () => {
	return e7();
});

console.log("hyperid", hyperid(true));
bench.add("hyperid", () => {
	return hyperid(true);
});

bench.run();

/*
==================
  UUID benchmark
==================

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

uuid-token-generator: 38Dv4vSwwsr4maiIB7t3y5
uuid1: 66be3b80-331e-11ea-9926-9575595a9dcc
uuid3: 9125a8dc-52ee-365b-a5aa-81b0b3681cf6
uuid4: 6d50096b-4558-4a61-aecf-65a450c05242
uuid5: fdda765f-fc57-5604-a269-52a7df8164ec
e7: d452265c-eff3-4267-87a2-c22cbba240a1
Suite: UUID generators
√ uuid-token-generator           283,229 rps
√ uuid v1                      1,289,208 rps
√ uuid v3                        155,326 rps
√ uuid v4                        465,395 rps
√ uuid v5                        158,105 rps
√ e7                           5,639,757 rps

   uuid-token-generator       -94.98%        (283,229 rps)   (avg: 3μs)
   uuid v1                    -77.14%      (1,289,208 rps)   (avg: 775ns)
   uuid v3                    -97.25%        (155,326 rps)   (avg: 6μs)
   uuid v4                    -91.75%        (465,395 rps)   (avg: 2μs)
   uuid v5                     -97.2%        (158,105 rps)   (avg: 6μs)
   e7                              0%      (5,639,757 rps)   (avg: 177ns)
-----------------------------------------------------------------------
*/