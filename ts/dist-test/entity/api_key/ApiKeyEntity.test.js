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
(0, node_test_1.describe)('ApiKeyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when AGENT_GATEWAY_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('AGENT_GATEWAY_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AgentGatewaySDK.test();
        const ent = testsdk.ApiKey();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.AGENT_GATEWAY_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_key.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "credits": { "a": true, "h": "Credits", "n": "credits", "r": false, "t": "`$INTEGER`", "key$": "credits", "index$": 0 }, "key": { "a": true, "h": "Key", "n": "key", "r": false, "t": "`$STRING`", "key$": "key", "index$": 1 } }, "name": "api_key", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/keys/create", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/keys/create", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "keys" }, { "lit": "create" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "api_key", "name__orig": "api_key", "Name": "ApiKey", "name_": "api_key", "name-": "api-key", "NAME": "API_KEY", "index$": 1 }, { "active": true, "entity": "api_key", "key$": "BasicApiKeyFlow", "kind": "basic", "name": "BasicApiKeyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "api_key_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'ApiKey', { "POST /api/keys/create": { "protocol": "http", "operationId": "createApiKey", "responses": { "200": { "description": "API key created", "content": { "application/json": { "schema": { "type": "object", "properties": { "key": { "type": "string", "example": "gw_abc123...", "key$": "key" }, "credits": { "type": "integer", "example": 200, "key$": "credits" } }, "x-ref": "#/components/schemas/ApiKey", "index$": 0 }, "example": { "key": "gw_abc123...", "credits": 200 } } } } }, "parameters": [], "security": [], "securitySource": "operation", "securitySchemes": { "bearerAuth": { "type": "http", "scheme": "bearer", "description": "Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const api_key_ref01_ent = client.ApiKey();
        let api_key_ref01_data = setup.data.new.api_key['api_key_ref01'];
        api_key_ref01_data = (await api_key_ref01_ent.create(api_key_ref01_data)).data();
        (0, node_assert_1.default)(null != api_key_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_key/ApiKeyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AgentGatewaySDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_key01', 'api_key02', 'api_key03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'AGENT_GATEWAY_TEST_API_KEY_ENTID': idmap,
        'AGENT_GATEWAY_TEST_LIVE': 'FALSE',
        'AGENT_GATEWAY_TEST_EXPLAIN': 'FALSE',
        'AGENT_GATEWAY_APIKEY': '',
    });
    idmap = env['AGENT_GATEWAY_TEST_API_KEY_ENTID'];
    const live = 'TRUE' === env.AGENT_GATEWAY_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['AGENT_GATEWAY_TEST_API_KEY_ENTID'];
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
//# sourceMappingURL=ApiKeyEntity.test.js.map