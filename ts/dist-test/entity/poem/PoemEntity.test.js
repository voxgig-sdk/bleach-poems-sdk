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
(0, node_test_1.describe)('PoemEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BLEACH_POEMS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BLEACH_POEMS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BleachPoemsSDK.test();
        const ent = testsdk.Poem();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('poem hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.BleachPoemsSDK.test(offline).Poem().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.BleachPoemsSDK.test(offline).Poem()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.BleachPoemsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Poem().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.BleachPoemsSDK.test().Poem().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.BleachPoemsSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Poem().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Poem().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.BleachPoemsSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Poem().list({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BLEACH_POEMS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'poem.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "lines": { "a": true, "h": "Lines", "n": "lines", "r": true, "sh": "The lines of the poem", "t": "`$ARRAY`", "key$": "lines", "index$": 1 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "sh": "The title of the poem", "t": "`$STRING`", "key$": "title", "index$": 2 }, "volume": { "a": true, "h": "Volume", "n": "volume", "r": true, "sh": "The volume number of the Bleach manga", "t": "`$INTEGER`", "key$": "volume", "index$": 3 } }, "id": { "field": "id", "name": "id" }, "name": "poem", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /poems", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/poems", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "poems" }], "t": { "req": "`reqdata`", "res": "`body.poems`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /random", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/random", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "random" }], "t": { "req": "`reqdata`", "res": "`body.lines`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /poems/{volume}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 1, "k": "param", "n": "id", "or": "volume", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/poems/{volume}", "q": { "exist": ["id"] }, "r": { "param": { "volume": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "poems" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "poem", "name__orig": "poem", "Name": "Poem", "name_": "poem", "name-": "poem", "NAME": "POEM", "index$": 0 }, { "active": true, "entity": "poem", "key$": "BasicPoemFlow", "kind": "basic", "name": "BasicPoemFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "poem_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "poem_ref01", "srcdatavar": "poem_ref01_data", "suffix": "_dt0" }, "m": { "id": "poem01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-poem_ref01" } }], "index$": 1 }] }, 'Poem', { "GET /poems": { "protocol": "http", "parameters": [] }, "GET /random": { "protocol": "http", "parameters": [] }, "GET /poems/{volume}": { "protocol": "http", "parameters": [{ "name": "volume", "in": "path", "description": "Volume number (must be between 1 and 74)", "required": true, "schema": { "type": "integer", "minimum": 1, "maximum": 74 }, "example": 1, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
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
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
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