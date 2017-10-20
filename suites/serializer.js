"use strict";

let Benchmarkify = require("benchmarkify");
let benchmark = new Benchmarkify("Serializer benchmark").printHeader();

let _ = require("lodash");

let bench1 = benchmark.createSuite("Serialize object");
let bench2 = benchmark.createSuite("Deserialize object");

// ----

let data = {
	nodeID: "server-2-135843",
	requestID: "caf10e0d-d3d2-4747-8d27-16ffc49d52d8",
	action: "posts.find",
	params: {
		limit: 5,
		sort: "-createdAt -votes",
		q: "test"
	},
	success: true,
	fields: [
		"id",
		"name",
		"status"
	]
};
/*
(function () {

	function serialize(o) {
		const buf = [];

		buf.push(o.nodeID);
		buf.push(o.requestID);
		buf.push(o.action);
		buf.push(o.params.limit);
		buf.push(o.params.sort);
		buf.push(o.params.q);

		buf.push(o.success ? 1 : 0);

		buf.push(o.fields.length);

		for (let i = 0; i < o.fields.length; i++)
			buf.push(o.fields[i]);

		return buf.join("\0");		
	}
	
	function deserialize(o) {
		const arr = o.split("\0");
		const res = {
			nodeID: arr[0],
			requestID: arr[1],
			action: arr[2],
			params: {
				limit: Number(arr[3]),
				sort: arr[4],
				q: arr[5]
			},
			success: !!arr[6],
			fields: []
		};

		for(let i = 0; i < arr[7]; i++)
			res.fields[i] = arr[8 + i];

		return res;
	}

	const t = serialize(data);
	console.log("serialize v1 length:", t.length);
	console.log("serialize v1:", t);

	const r = deserialize(t);

	if (r == t)
		throw new Error("Same object!");
	if (_.isEqual(r, t))
		throw new Error("The source & result is not equal!");

	bench1.add("serialize v1 with Array.push", () => {
		return serialize(data);
	});

	bench2.add("deserialize v1 with Array.push", () => {
		return deserialize(t);
	});
})();
*/
/*
(function () {

	function serialize(o) {
		const buf = new Array(6 + 1 + 4);

		buf[0] = o.nodeID;
		buf[1] = o.requestID;
		buf[2] = o.action;
		buf[3] = o.params.limit;
		buf[4] = o.params.sort;
		buf[5] = o.params.q;

		buf[6] = o.fields.length;

		for (let i = 0; i < o.fields.length; i++)
			buf[7 + i] = o.fields[i];

		return buf.join("\0");
	}

	function deserialize(o) {
		const arr = o.split("\0");
		const res = {
			params: {}
		};
		res.nodeID = arr[0];
		res.requestID = arr[1];
		res.action = arr[2];
		res.params.limit = Number(arr[3]);
		res.params.sort = arr[4];
		res.params.q = arr[5];

		res.fields = new Array(arr[6]);
		for(let i = 0; i < arr[6]; i++)
			res.fields[i] = arr[7 + i];

		return res;
	}

	const t = serialize(data);
	console.log("serialize v2 length:", t.length);
	//console.log("serialize v2:", serialize(data));
	//console.log("deserialize v2:", deserialize(t));

	const r = deserialize(t);

	if (r == t)
		throw new Error("Same object!");
	if (_.isEqual(r, t))
		throw new Error("The source & result is not equal!");

	console.log(r);

	bench1.add("serialize v2 with Array[0]", () => {
		return serialize(data);
	});

	bench2.add("deserialize v2 with Array[0]", () => {
		return deserialize(t);
	});

})();


(function () {

	function serialize(o) {
		const buf = Buffer.allocUnsafe(310);

		let offset = 0;
		offset += buf.write(o.nodeID, offset);
		offset += buf.write(o.requestID, offset);
		offset += buf.write(o.action, offset);
		offset += buf.writeInt32LE(o.params.limit, offset);
		offset += buf.write(o.params.sort, offset);
		offset += buf.write(o.params.q, offset);
		
		offset += buf.writeUInt32BE(o.fields.length, offset);

		for (let i = 0; i < o.fields.length; i++)
			offset += buf.write(o.fields[i], offset);

		return buf;
	}

	let buf = serialize(data);
	console.log("serialize v3 length: ", buf.length);

	bench1.add("serialize v3 with Buffer", () => {
		return serialize(data);
	});

})();
*/
(function () {

	const t = JSON.stringify(data);
	console.log("JSON.stringify length: ", t.length);

	bench1.add("JSON.stringify", () => {
		return JSON.stringify(data);
	});

	bench2.add("JSON.parse", () => {
		return JSON.parse(t);
	});

})();

(function () {
	const jsonpack = require('jsonpack');

	const t = jsonpack.pack(data);
	console.log("JSONPack length: ", t.length);

	bench1.add("JSONPack.pack", () => {
		return jsonpack.pack(data);
	});

	bench2.add("JSONPack.unpack", () => {
		return jsonpack.unpack(t);
	});

})();

// ----

(function () {
	const avro = require('avsc');

	const schema = avro.Type.forSchema({
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
			},
			{ name: 'success', type: 'boolean' },
			{
				name: 'fields', type: {
					type: 'array', items: "string"
				}
			}
		]
	});
	
	//const schema = avro.Type.forValue(data);

	const buff = schema.toBuffer(data);
	console.log("avsc length: ", Buffer.byteLength(buff, 'utf8'));

	//const res = schema.fromBuffer(t);
	//console.log(res);

	bench1.add("avsc.toBuffer", () => {
		return schema.toBuffer(data);
	});

	bench2.add("avsc.fromBuffer", () => {
		return schema.fromBuffer(buff);
	})

})();


(function () {
	const Compactr = require('compactr');

	const schema = Compactr.schema({
		nodeID: { type: 'string' },
		requestID: { type: 'string' },
		action: { type: 'string' },
		params: { type: 'object', schema: {
			limit: { type: 'number' },
			sort: { type: 'string' },
			q: { type: 'string' }
		}},
		success: { type: 'boolean' },
		fields: { type: 'array', items: { type: 'string' }}
	});
	
	const buff = schema.write(data).buffer();
	console.log("compactr length: ", Buffer.byteLength(buff, 'utf8'));

	bench1.add("compactr.write", () => {
		return schema.write(data).buffer();
	});

	bench2.add("compactr.read", () => {
		return schema.read(buff);
	})

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

(function() {
	const staticProto = require("./example.proto.js");
	const Packet = staticProto.packets.Packet;

	let buff = Packet.encode(data).finish();
	console.log("protobuf length: ", Buffer.byteLength(buff, 'utf8'));

	bench1.add("protobuf.encode", () => {
		return Packet.encode(data).finish();
	});

	bench2.add("protobuf.decode", () => {
		return Packet.decode(buff);
	});	

})();

benchmark.run([bench1, bench2]);

