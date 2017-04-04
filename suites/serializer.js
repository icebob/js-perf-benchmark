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
/*
(function () {

	function serialize(o) {
		const buf = [];

		buf.push(data.nodeID);
		buf.push(data.requestID);
		buf.push(data.action);
		buf.push("" + data.params.limit);
		buf.push(data.params.sort);
		buf.push(data.params.q);

		return buf.join("|");
	}
	
	console.log("serialize v1 length:", serialize(data).length);
	console.log("serialize v1:", serialize(data));

	bench1.add("serialize v1 with Array.push", () => {
		return serialize(data);
	});

})();*/

(function () {

	function serialize(o) {
		const buf = new Array(6);

		buf[0] = data.nodeID;
		buf[1] = data.requestID;
		buf[2] = data.action;
		buf[3] = data.params.limit;
		buf[4] = data.params.sort;
		buf[5] = data.params.q;

		return buf.join("|");
	}

	
	console.log("serialize v2 length:", serialize(data).length);
	console.log("serialize v2:", serialize(data));

	bench1.add("serialize v2 with Array[0]", () => {
		return serialize(data);
	});

})();
/*
(function () {

	function serialize(o) {
		//const buf = Buffer.allocUnsafe(160);
		const buf = new Buffer(160);

		buf.write(data.nodeID);
		buf.write(data.requestID);
		buf.write(data.action);
		buf.writeInt32LE(data.params.limit);
		buf.write(data.params.sort);
		buf.write(data.params.q);

		return buf;
	}

	
	console.log("serialize v3 length: ", serialize(data));

	bench1.add("serialize v3 with Buffer", () => {
		return serialize(data);
	});

})();*/

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
	/*
	const schema = avro.Type.forValue(data);

	const t = schema.toBuffer(data);
	console.log("avsc length: ", Buffer.byteLength(t, 'utf8'));

	const res = schema.fromBuffer(t);
	console.log(res);

	bench1.add("avsc", () => {
		return schema.toBuffer(data);
	});
*/
})();

// ----
/*
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

*/

bench1.run();