"use strict";

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("UUID benchmark");

let TokenGenerator = require("uuid-token-generator");
let tokgen128 = new TokenGenerator(128, TokenGenerator.BASE62);
const uuidV4 = require("uuid/v4");

let bench = new Benchmarkify({ async: false, name: "UUID generators"});

// ----
console.log("uuid-token-generator:", tokgen128.generate());
bench.add("uuid-token-generator", () => {
	return tokgen128.generate();
});

console.log("uuid:", uuidV4());
bench.add("uuid", () => {
	return uuidV4();
});


const lut = []; 
for (let i=0; i<256; i++) { lut[i] = (i<16?"0":"")+(i).toString(16); }

function e7() {
	const d0 = Math.random()*0xffffffff|0;
	const d1 = Math.random()*0xffffffff|0;
	const d2 = Math.random()*0xffffffff|0;
	const d3 = Math.random()*0xffffffff|0;
	return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+"-"+
		lut[d1&0xff]+lut[d1>>8&0xff]+"-"+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+"-"+
		lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+"-"+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
		lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];		
}

console.log("e7:", e7());
bench.add("e7", () => {
	return e7();
});

bench.run();