
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { BleachPoemsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'poem.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set BLEACH_POEMS_TEST_POEM_ENTID JSON to run live')
      return
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['BLEACH_POEMS_TEST_POEM_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'BLEACH_POEMS_TEST_POEM_ENTID': idmap,
    'BLEACH_POEMS_TEST_LIVE': 'FALSE',
    'BLEACH_POEMS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BLEACH_POEMS_TEST_POEM_ENTID']

  const live = 'TRUE' === env.BLEACH_POEMS_TEST_LIVE

  if (live) {
    client = new BleachPoemsSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
