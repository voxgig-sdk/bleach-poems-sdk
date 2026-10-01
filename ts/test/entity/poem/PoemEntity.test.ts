

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { BleachPoemsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PoemEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BLEACH_POEMS_TEST_LIVE=TRUE.
  afterEach(liveDelay('BLEACH_POEMS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BleachPoemsSDK.test()
    const ent = testsdk.Poem()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BLEACH_POEMS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'poem.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"lines":{"a":true,"h":"Lines","n":"lines","r":true,"sh":"The lines of the poem","t":"`$ARRAY`","key$":"lines","index$":1},"title":{"a":true,"h":"Title","n":"title","r":true,"sh":"The title of the poem","t":"`$STRING`","key$":"title","index$":2},"volume":{"a":true,"h":"Volume","n":"volume","r":true,"sh":"The volume number of the Bleach manga","t":"`$INTEGER`","key$":"volume","index$":3}},"id":{"field":"id","name":"id"},"name":"poem","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /poems","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/poems","q":{},"r":{},"s":[{"lit":"poems"}],"t":{"req":"`reqdata`","res":"`body.poems`"},"index$":0},{"a":true,"co":{"id":"GET /random","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/random","q":{},"r":{},"s":[{"lit":"random"}],"t":{"req":"`reqdata`","res":"`body.lines`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /poems/{volume}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":1,"k":"param","n":"id","or":"volume","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/poems/{volume}","q":{"exist":["id"]},"r":{"param":{"volume":"id"}},"s":[{"lit":"poems"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"poem","name__orig":"poem","Name":"Poem","name_":"poem","name-":"poem","NAME":"POEM","index$":0}, {"active":true,"entity":"poem","key$":"BasicPoemFlow","kind":"basic","name":"BasicPoemFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"poem_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"poem_ref01","srcdatavar":"poem_ref01_data","suffix":"_dt0"},"m":{"id":"poem01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-poem_ref01"}}],"index$":1}]}, 'Poem', {"GET /poems":{"protocol":"http","parameters":[]},"GET /random":{"protocol":"http","parameters":[]},"GET /poems/{volume}":{"protocol":"http","parameters":[{"name":"volume","in":"path","description":"Volume number (must be between 1 and 74)","required":true,"schema":{"type":"integer","minimum":1,"maximum":74},"example":1,"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let poem_ref01_data = Object.values(setup.data.existing.poem)[0] as any

    // LIST
    const poem_ref01_ent = client.Poem()
    const poem_ref01_match: any = {}

    const poem_ref01_list = (await poem_ref01_ent.list(poem_ref01_match)).map((e: any) => e.data())


    // LOAD
    const poem_ref01_match_dt0: any = {}
    poem_ref01_match_dt0.id = poem_ref01_data.id
    const poem_ref01_data_dt0 = (await poem_ref01_ent.load(poem_ref01_match_dt0)).data()
    assert(poem_ref01_data_dt0.id === poem_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/poem/PoemTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = BleachPoemsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['poem01','poem02','poem03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BLEACH_POEMS_TEST_POEM_ENTID': idmap,
    'BLEACH_POEMS_TEST_LIVE': 'FALSE',
    'BLEACH_POEMS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BLEACH_POEMS_TEST_POEM_ENTID']

  const live = 'TRUE' === env.BLEACH_POEMS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BLEACH_POEMS_TEST_POEM_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new BleachPoemsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
