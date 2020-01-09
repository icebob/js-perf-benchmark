"use strict";

let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Concatenation").printHeader();

let bench = benchmark.createSuite("String concat");

// ----
let str1 = "John";
let str2 = "Doe";

bench.add("Concat with +", () => {
	let s = str1 + str2 + str1 + str2 + str1 + str2 + str1 + str2 + str1 + str2 + str1 + str2 + str1 + str2 + str1 + str2 + str1 + str2 + str1 + str2;
	return s;
});

bench.add("Concat with multiline +", () => {
	let s = str1;
	s = s + str2;
	s = s + str1;
	s = s + str2;
	s = s + str1;
	s = s + str2;
	s = s + str1;
	s = s + str2;
	s = s + str1;
	s = s + str2;
	s = s + str1;
	s = s + str2;
	s = s + str1;
	s = s + str2;
	s = s + str1;
	s = s + str2;
	s = s + str1;
	s = s + str2;
	s = s + str1;
	s = s + str2;
	return s;
});

bench.add("Concat with array & join", () => {
	let s = [];
	s.push(str1); s.push(str2);
	s.push(str1); s.push(str2);
	s.push(str1); s.push(str2);
	s.push(str1); s.push(str2);
	s.push(str1); s.push(str2);
	s.push(str1); s.push(str2);
	s.push(str1); s.push(str2);
	s.push(str1); s.push(str2);
	s.push(str1); s.push(str2);
	s.push(str1); s.push(str2);

	return s.join("");
});

bench.run();

/*
=================
  Concatenation
=================

Platform info:
==============
   Windows_NT 6.1.7601 x64
   Node.JS: 10.16.0
   V8: 6.8.275.32-node.52
   Intel(R) Core(TM) i7-4770K CPU @ 3.50GHz × 8

Suite: String concat
√ Concat with +                  363,104,360 rps
√ Concat with multiline +        141,082,993 rps
√ Concat with array & join         1,808,516 rps

   Concat with +                       0%    (363,104,360 rps)   (avg: 2ns)
   Concat with multiline +        -61.15%    (141,082,993 rps)   (avg: 7ns)
   Concat with array & join        -99.5%      (1,808,516 rps)   (avg: 552ns)
-----------------------------------------------------------------------
*/