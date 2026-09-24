

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AgentGatewaySDK, BaseFeature, stdutil } from '../../..'

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


describe('MetaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AGENT_GATEWAY_TEST_LIVE=TRUE.
  afterEach(liveDelay('AGENT_GATEWAY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AgentGatewaySDK.test()
    const ent = testsdk.Meta()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AGENT_GATEWAY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'meta.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":0}},"name":"meta","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /health","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/health","q":{},"r":{},"s":[{"lit":"health"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"meta","name__orig":"meta","Name":"Meta","name_":"meta","name-":"meta","NAME":"META","index$":3}, {"active":true,"entity":"meta","key$":"BasicMetaFlow","kind":"basic","name":"BasicMetaFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"meta_ref01","srcdatavar":"meta_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-meta_ref01"}}],"index$":0}]}, 'Meta', {"GET /health":{"protocol":"http","operationId":"healthCheck","responses":{"200":{"description":"OK","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"example":"ok","key$":"status","type":"string"}},"index$":0}}}}},"parameters":[],"security":[],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","description":"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let meta_ref01_data = Object.values(setup.data.existing.meta)[0] as any

    // LOAD
    const meta_ref01_ent = client.Meta()
    const meta_ref01_match_dt0: any = {}
    const meta_ref01_data_dt0 = (await meta_ref01_ent.load(meta_ref01_match_dt0)).data()
    assert(null != meta_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/meta/MetaTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AgentGatewaySDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['meta01','meta02','meta03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AGENT_GATEWAY_TEST_META_ENTID': idmap,
    'AGENT_GATEWAY_TEST_LIVE': 'FALSE',
    'AGENT_GATEWAY_TEST_EXPLAIN': 'FALSE',
    'AGENT_GATEWAY_APIKEY': '',
  })

  idmap = env['AGENT_GATEWAY_TEST_META_ENTID']

  const live = 'TRUE' === env.AGENT_GATEWAY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AGENT_GATEWAY_TEST_META_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AgentGatewaySDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
