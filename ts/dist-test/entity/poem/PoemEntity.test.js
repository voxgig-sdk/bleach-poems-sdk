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
(0, node_test_1.describe)('PoemEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BLEACH_POEMS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BLEACH_POEMS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BleachPoemsSDK.test();
        const ent = testsdk.Poem();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BLEACH_POEMS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'poem.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "lines", "req": true, "short": "The lines of the poem", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "title", "req": true, "short": "The title of the poem", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "volume", "req": true, "short": "The volume number of the Bleach manga", "type": "`$INTEGER`", "index$": 3 }], "id": { "field": "id", "name": "id" }, "name": "poem", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /poems", "json": "{\"operationId\":\"getAllPoems\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"poems\":[{\"lines\":[\"We fear that which we cannot see\"],\"title\":\"Death and Strawberry\",\"volume\":1}]},\"schema\":{\"properties\":{\"poems\":{\"description\":\"Array of all poems from Bleach volumes 1-74\",\"items\":{\"properties\":{\"lines\":{\"description\":\"The lines of the poem\",\"example\":[\"We fear that which we cannot see\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"The title of the poem\",\"example\":\"Death and Strawberry\",\"type\":\"string\"},\"volume\":{\"description\":\"The volume number of the Bleach manga\",\"example\":1,\"maximum\":74,\"minimum\":1,\"type\":\"integer\"}},\"required\":[\"volume\",\"title\",\"lines\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"poems\"],\"type\":\"object\"}}},\"description\":\"Successful response containing all poems\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/poems", "segments": [{ "lit": "poems" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.poems`" }, "index$": 0 }, { "active": true, "args": {}, "contract": { "id": "GET /random", "json": "{\"operationId\":\"getRandomPoem\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"lines\":[\"If you want to know me\",\"look inside your heart\"],\"title\":\"Heart\",\"volume\":42},\"schema\":{\"properties\":{\"lines\":{\"description\":\"The lines of the poem\",\"example\":[\"We fear that which we cannot see\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"The title of the poem\",\"example\":\"Death and Strawberry\",\"type\":\"string\"},\"volume\":{\"description\":\"The volume number of the Bleach manga\",\"example\":1,\"maximum\":74,\"minimum\":1,\"type\":\"integer\"}},\"required\":[\"volume\",\"title\",\"lines\"],\"type\":\"object\"}}},\"description\":\"Successful response containing a random poem\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/random", "segments": [{ "lit": "random" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.lines`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": 1, "kind": "param", "name": "id", "orig": "volume", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /poems/{volume}", "json": "{\"operationId\":\"getPoemByVolume\",\"parameters\":[{\"description\":\"Volume number (must be between 1 and 74)\",\"example\":1,\"in\":\"path\",\"name\":\"volume\",\"required\":true,\"schema\":{\"maximum\":74,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"lines\":[\"We fear that which we cannot see\"],\"title\":\"Death and Strawberry\",\"volume\":1},\"schema\":{\"properties\":{\"lines\":{\"description\":\"The lines of the poem\",\"example\":[\"We fear that which we cannot see\"],\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"title\":{\"description\":\"The title of the poem\",\"example\":\"Death and Strawberry\",\"type\":\"string\"},\"volume\":{\"description\":\"The volume number of the Bleach manga\",\"example\":1,\"maximum\":74,\"minimum\":1,\"type\":\"integer\"}},\"required\":[\"volume\",\"title\",\"lines\"],\"type\":\"object\"}}},\"description\":\"Successful response containing the poem for the specified volume\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid volume number (not a number or out of range)\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Poem not found for the specified volume\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/poems/{volume}", "rename": { "param": { "volume": "id" } }, "segments": [{ "lit": "poems" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "poem", "name__orig": "poem", "Name": "Poem", "name_": "poem", "name-": "poem", "NAME": "POEM", "index$": 0 }, { "active": true, "entity": "poem", "key$": "BasicPoemFlow", "kind": "basic", "name": "BasicPoemFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "poem_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "poem_ref01", "srcdatavar": "poem_ref01_data", "suffix": "_dt0" }, "match": { "id": "poem01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-poem_ref01" } }], "index$": 1 }] }, 'Poem');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let poem_ref01_data = Object.values(setup.data.existing.poem)[0];
        // LIST
        const poem_ref01_ent = client.Poem();
        const poem_ref01_match = {};
        const poem_ref01_list = (await poem_ref01_ent.list(poem_ref01_match)).map((e) => e.data());
        // LOAD
        const poem_ref01_match_dt0 = {};
        poem_ref01_match_dt0.id = poem_ref01_data.id;
        const poem_ref01_data_dt0 = (await poem_ref01_ent.load(poem_ref01_match_dt0)).data();
        (0, node_assert_1.default)(poem_ref01_data_dt0.id === poem_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/poem/PoemTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BleachPoemsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['poem01', 'poem02', 'poem03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BLEACH_POEMS_TEST_POEM_ENTID': idmap,
        'BLEACH_POEMS_TEST_LIVE': 'FALSE',
        'BLEACH_POEMS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BLEACH_POEMS_TEST_POEM_ENTID'];
    const live = 'TRUE' === env.BLEACH_POEMS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BLEACH_POEMS_TEST_POEM_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.BleachPoemsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
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
        explain: 'TRUE' === env.BLEACH_POEMS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PoemEntity.test.js.map