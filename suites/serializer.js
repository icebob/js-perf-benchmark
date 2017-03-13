"use strict";

let Benchmarkify = require("benchmarkify");
Benchmarkify.printHeader("Serializer benchmark");

let bench1 = new Benchmarkify({ async: false, name: "Serialize object" });

// ----

let data = {
	nodeID: "server-2-135843",
	requestID: "caf10e0d-d3d2-4747-8d27-16ffc49d52d8",
	action: "posts.find",
	params: {
		limit: 5,
		sort: "-createdAt -votes",
		q: "test"
	}
};

(function () {

	const t = JSON.stringify(data);
	console.log("JSON.stringify length: ", t.length);

	bench1.add("JSON.stringify", () => {
		return JSON.stringify(data);
	});

})();

// ----

(function () {
	const avro = require('avsc');

	/*const schema = avro.Type.forSchema({
		type: 'record',
		fields: [
			{ name: 'nodeID', type: 'string' },
			{ name: 'requestID', type: 'string' },
			{ name: 'action', type: 'string' },
			{
				name: 'params', type: {
					type: 'record',
					fields: [
						{ name: 'limit', type: 'int' },
						{ name: 'sort', type: 'string' },
						{ name: 'q', type: 'string' }
					]
				}
			}
		]
	});*/
	const schema = avro.Type.forValue(data);

	const t = schema.toBuffer(data);
	console.log("avsc length: ", t.toString().length);

	bench1.add("avsc", () => {
		return schema.toBuffer(data);
	});

})();

// ----

(function () {
	const PSON = require('pson');

	const pson = new PSON.StaticPair(["nodeID", "requestID", "action", "params", "limit", "sort", "q"]);

	const t = pson.encode(data).compact();
	console.log("PSON length: ", t.limit);
	

	bench1.add("PSON", () => {
		const bb = pson.encode(data).compact();
		return bb;
	});

})();



bench1.run();