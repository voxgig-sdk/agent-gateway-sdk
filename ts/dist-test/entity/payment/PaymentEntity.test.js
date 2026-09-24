"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PaymentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AGENT_GATEWAY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AGENT_GATEWAY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AgentGatewaySDK.test();
        const ent = testsdk.Payment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AGENT_GATEWAY_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'payment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "api_key": { "a": true, "h": "Api Key", "n": "api_key", "r": true, "t": "`$STRING`", "key$": "api_key", "index$": 0 }, "credits_added": { "a": true, "h": "Credits Added", "n": "credits_added", "r": false, "t": "`$INTEGER`", "key$": "credits_added", "index$": 1 }, "ok": { "a": true, "h": "Ok", "n": "ok", "r": false, "t": "`$BOOLEAN`", "key$": "ok", "index$": 2 }, "total_credits": { "a": true, "h": "Total Credits", "n": "total_credits", "r": false, "t": "`$INTEGER`", "key$": "total_credits", "index$": 3 }, "tx_hash": { "a": true, "h": "Tx Hash", "n": "tx_hash", "r": true, "sh": "Transaction hash of USDC transfer on Base", "t": "`$STRING`", "key$": "tx_hash", "index$": 4 }, "usdc": { "a": true, "h": "Usdc", "n": "usdc", "r": false, "t": "`$NUMBER`", "key$": "usdc", "index$": 5 } }, "name": "payment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/credits/topup", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/credits/topup", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "credits" }, { "lit": "topup" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/payments/info", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/payments/info", "q": { "$action": "info" }, "r": {}, "s": [{ "lit": "api" }, { "lit": "payments" }, { "lit": "info" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "payment", "name__orig": "payment", "Name": "Payment", "name_": "payment", "name-": "payment", "NAME": "PAYMENT", "index$": 4 }, { "active": true, "entity": "payment", "key$": "BasicPaymentFlow", "kind": "basic", "name": "BasicPaymentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "payment_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "payment_ref01", "srcdatavar": "payment_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-payment_ref01" } }], "index$": 1 }] }, 'Payment', { "POST /api/credits/topup": { "protocol": "http", "operationId": "topupCredits", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["api_key", "tx_hash"], "properties": { "api_key": { "type": "string", "key$": "api_key" }, "tx_hash": { "type": "string", "description": "Transaction hash of USDC transfer on Base", "key$": "tx_hash" } }, "index$": 1 } } } }, "responses": { "200": { "description": "Credits added", "content": { "application/json": { "schema": { "type": "object", "properties": { "ok": { "type": "boolean", "key$": "ok" }, "usdc": { "type": "number", "key$": "usdc" }, "credits_added": { "type": "integer", "key$": "credits_added" }, "total_credits": { "type": "integer", "key$": "total_credits" } }, "index$": 0 } } } } }, "parameters": [], "security": [], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "description": "Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access." } } }, "GET /api/payments/info": { "protocol": "http", "operationId": "getPaymentInfo", "responses": { "200": { "description": "Payment details", "content": { "application/json": { "schema": { "type": "object", "properties": { "chain": { "example": "Base (L2)", "key$": "chain", "type": "string" }, "token": { "example": "USDC", "key$": "token", "type": "string" }, "address": { "key$": "address", "type": "string" }, "rate": { "example": "500 credits per 1 USDC", "key$": "rate", "type": "string" } } } } } } }, "parameters": [], "security": [], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "description": "Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const payment_ref01_ent = client.Payment();
        let payment_ref01_data = setup.data.new.payment['payment_ref01'];
        payment_ref01_data = (await payment_ref01_ent.create(payment_ref01_data)).data();
        (0, node_assert_1.default)(null != payment_ref01_data);
        // LOAD
        const payment_ref01_match_dt0 = {};
        const payment_ref01_data_dt0 = (await payment_ref01_ent.load(payment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != payment_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/payment/PaymentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AgentGatewaySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['payment01', 'payment02', 'payment03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AGENT_GATEWAY_TEST_PAYMENT_ENTID': idmap,
        'AGENT_GATEWAY_TEST_LIVE': 'FALSE',
        'AGENT_GATEWAY_TEST_EXPLAIN': 'FALSE',
        'AGENT_GATEWAY_APIKEY': '',
    });
    idmap = env['AGENT_GATEWAY_TEST_PAYMENT_ENTID'];
    const live = 'TRUE' === env.AGENT_GATEWAY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AGENT_GATEWAY_TEST_PAYMENT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AgentGatewaySDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.AGENT_GATEWAY_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.AGENT_GATEWAY_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PaymentEntity.test.js.map