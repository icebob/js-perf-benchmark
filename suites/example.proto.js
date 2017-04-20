/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.packets = (function() {

    /**
     * Namespace packets.
     * @exports packets
     * @namespace
     */
    var packets = {};

    packets.Params = (function() {

        /**
         * Properties of a Params.
         * @typedef packets.Params$Properties
         * @type {Object}
         * @property {number} [limit] Params limit.
         * @property {string} [sort] Params sort.
         * @property {string} [q] Params q.
         */

        /**
         * Constructs a new Params.
         * @exports packets.Params
         * @constructor
         * @param {packets.Params$Properties=} [properties] Properties to set
         */
        function Params(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Params limit.
         * @type {number}
         */
        Params.prototype.limit = 0;

        /**
         * Params sort.
         * @type {string}
         */
        Params.prototype.sort = "";

        /**
         * Params q.
         * @type {string}
         */
        Params.prototype.q = "";

        /**
         * Creates a new Params instance using the specified properties.
         * @param {packets.Params$Properties=} [properties] Properties to set
         * @returns {packets.Params} Params instance
         */
        Params.create = function create(properties) {
            return new Params(properties);
        };

        /**
         * Encodes the specified Params message. Does not implicitly {@link packets.Params.verify|verify} messages.
         * @param {packets.Params$Properties} message Params message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Params.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.limit != null && message.hasOwnProperty("limit"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.limit);
            if (message.sort != null && message.hasOwnProperty("sort"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sort);
            if (message.q != null && message.hasOwnProperty("q"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.q);
            return writer;
        };

        /**
         * Encodes the specified Params message, length delimited. Does not implicitly {@link packets.Params.verify|verify} messages.
         * @param {packets.Params$Properties} message Params message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Params.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Params message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {packets.Params} Params
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Params.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.packets.Params();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.limit = reader.int32();
                    break;
                case 2:
                    message.sort = reader.string();
                    break;
                case 3:
                    message.q = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Params message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {packets.Params} Params
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Params.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Params message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Params.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (!$util.isInteger(message.limit))
                    return "limit: integer expected";
            if (message.sort != null && message.hasOwnProperty("sort"))
                if (!$util.isString(message.sort))
                    return "sort: string expected";
            if (message.q != null && message.hasOwnProperty("q"))
                if (!$util.isString(message.q))
                    return "q: string expected";
            return null;
        };

        /**
         * Creates a Params message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {packets.Params} Params
         */
        Params.fromObject = function fromObject(object) {
            if (object instanceof $root.packets.Params)
                return object;
            var message = new $root.packets.Params();
            if (object.limit != null)
                message.limit = object.limit | 0;
            if (object.sort != null)
                message.sort = String(object.sort);
            if (object.q != null)
                message.q = String(object.q);
            return message;
        };

        /**
         * Creates a Params message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link packets.Params.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {packets.Params} Params
         */
        Params.from = Params.fromObject;

        /**
         * Creates a plain object from a Params message. Also converts values to other types if specified.
         * @param {packets.Params} message Params
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Params.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.limit = 0;
                object.sort = "";
                object.q = "";
            }
            if (message.limit != null && message.hasOwnProperty("limit"))
                object.limit = message.limit;
            if (message.sort != null && message.hasOwnProperty("sort"))
                object.sort = message.sort;
            if (message.q != null && message.hasOwnProperty("q"))
                object.q = message.q;
            return object;
        };

        /**
         * Creates a plain object from this Params message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Params.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Params to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Params.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Params;
    })();

    packets.Packet = (function() {

        /**
         * Properties of a Packet.
         * @typedef packets.Packet$Properties
         * @type {Object}
         * @property {string} [nodeID] Packet nodeID.
         * @property {string} [requestID] Packet requestID.
         * @property {string} [action] Packet action.
         * @property {packets.Params$Properties} [params] Packet params.
         */

        /**
         * Constructs a new Packet.
         * @exports packets.Packet
         * @constructor
         * @param {packets.Packet$Properties=} [properties] Properties to set
         */
        function Packet(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Packet nodeID.
         * @type {string}
         */
        Packet.prototype.nodeID = "";

        /**
         * Packet requestID.
         * @type {string}
         */
        Packet.prototype.requestID = "";

        /**
         * Packet action.
         * @type {string}
         */
        Packet.prototype.action = "";

        /**
         * Packet params.
         * @type {(packets.Params$Properties|null)}
         */
        Packet.prototype.params = null;

        /**
         * Creates a new Packet instance using the specified properties.
         * @param {packets.Packet$Properties=} [properties] Properties to set
         * @returns {packets.Packet} Packet instance
         */
        Packet.create = function create(properties) {
            return new Packet(properties);
        };

        /**
         * Encodes the specified Packet message. Does not implicitly {@link packets.Packet.verify|verify} messages.
         * @param {packets.Packet$Properties} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nodeID != null && message.hasOwnProperty("nodeID"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nodeID);
            if (message.requestID != null && message.hasOwnProperty("requestID"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.requestID);
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.action);
            if (message.params != null && message.hasOwnProperty("params"))
                $root.packets.Params.encode(message.params, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Packet message, length delimited. Does not implicitly {@link packets.Packet.verify|verify} messages.
         * @param {packets.Packet$Properties} message Packet message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Packet.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Packet message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {packets.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.packets.Packet();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nodeID = reader.string();
                    break;
                case 2:
                    message.requestID = reader.string();
                    break;
                case 3:
                    message.action = reader.string();
                    break;
                case 4:
                    message.params = $root.packets.Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Packet message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {packets.Packet} Packet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Packet.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Packet message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Packet.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nodeID != null && message.hasOwnProperty("nodeID"))
                if (!$util.isString(message.nodeID))
                    return "nodeID: string expected";
            if (message.requestID != null && message.hasOwnProperty("requestID"))
                if (!$util.isString(message.requestID))
                    return "requestID: string expected";
            if (message.action != null && message.hasOwnProperty("action"))
                if (!$util.isString(message.action))
                    return "action: string expected";
            if (message.params != null && message.hasOwnProperty("params")) {
                var error = $root.packets.Params.verify(message.params);
                if (error)
                    return "params." + error;
            }
            return null;
        };

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {packets.Packet} Packet
         */
        Packet.fromObject = function fromObject(object) {
            if (object instanceof $root.packets.Packet)
                return object;
            var message = new $root.packets.Packet();
            if (object.nodeID != null)
                message.nodeID = String(object.nodeID);
            if (object.requestID != null)
                message.requestID = String(object.requestID);
            if (object.action != null)
                message.action = String(object.action);
            if (object.params != null) {
                if (typeof object.params !== "object")
                    throw TypeError(".packets.Packet.params: object expected");
                message.params = $root.packets.Params.fromObject(object.params);
            }
            return message;
        };

        /**
         * Creates a Packet message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link packets.Packet.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {packets.Packet} Packet
         */
        Packet.from = Packet.fromObject;

        /**
         * Creates a plain object from a Packet message. Also converts values to other types if specified.
         * @param {packets.Packet} message Packet
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Packet.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.nodeID = "";
                object.requestID = "";
                object.action = "";
                object.params = null;
            }
            if (message.nodeID != null && message.hasOwnProperty("nodeID"))
                object.nodeID = message.nodeID;
            if (message.requestID != null && message.hasOwnProperty("requestID"))
                object.requestID = message.requestID;
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = message.action;
            if (message.params != null && message.hasOwnProperty("params"))
                object.params = $root.packets.Params.toObject(message.params, options);
            return object;
        };

        /**
         * Creates a plain object from this Packet message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Packet.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Packet to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Packet.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Packet;
    })();

    return packets;
})();

module.exports = $root;
