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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "address", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "api_key", "req": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "chain", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "credits_added", "req": false, "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "ok", "req": false, "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "name": "rate", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "token", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "total_credits", "req": false, "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "tx_hash", "req": true, "short": "Transaction hash of USDC transfer on Base", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "usdc", "req": false, "type": "`$NUMBER`", "index$": 9 }], "name": "payment", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/credits/topup", "json": "{\"operationId\":\"topupCredits\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"api_key\":{\"type\":\"string\"},\"tx_hash\":{\"description\":\"Transaction hash of USDC transfer on Base\",\"type\":\"string\"}},\"required\":[\"api_key\",\"tx_hash\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_added\":{\"type\":\"integer\"},\"ok\":{\"type\":\"boolean\"},\"total_credits\":{\"type\":\"integer\"},\"usdc\":{\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Credits added\"}},\"security\":[],\"securitySchemes\":{\"bearerAuth\":{\"description\":\"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/credits/topup", "segments": [{ "lit": "api" }, { "lit": "credits" }, { "lit": "topup" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /api/payments/info", "json": "{\"operationId\":\"getPaymentInfo\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"type\":\"string\"},\"chain\":{\"example\":\"Base (L2)\",\"type\":\"string\"},\"rate\":{\"example\":\"500 credits per 1 USDC\",\"type\":\"string\"},\"token\":{\"example\":\"USDC\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Payment details\"}},\"security\":[],\"securitySchemes\":{\"bearerAuth\":{\"description\":\"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/payments/info", "segments": [{ "lit": "api" }, { "lit": "payments" }, { "lit": "info" }], "select": { "$action": "info" }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "payment", "name__orig": "payment", "Name": "Payment", "name_": "payment", "name-": "payment", "NAME": "PAYMENT", "index$": 4 }, { "active": true, "entity": "payment", "key$": "BasicPaymentFlow", "kind": "basic", "name": "BasicPaymentFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "payment_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "payment_ref01", "srcdatavar": "payment_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-payment_ref01" } }], "index$": 1 }] }, 'Payment');
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