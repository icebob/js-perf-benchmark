"use strict";

let Promise	= require("bluebird");

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("Concatenation");

let bench = new Benchmarkify({ async: false, name: "String concat"});

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