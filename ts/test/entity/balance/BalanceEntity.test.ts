

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


describe('BalanceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AGENT_GATEWAY_TEST_LIVE=TRUE.
  afterEach(liveDelay('AGENT_GATEWAY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AgentGatewaySDK.test()
    const ent = testsdk.Balance()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AGENT_GATEWAY_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'balance.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"h":"Created At","n":"createdAt","r":false,"sh":"Unix timestamp ms","t":"`$INTEGER`","key$":"createdAt","index$":0},"credits":{"a":true,"h":"Credits","n":"credits","r":false,"t":"`$INTEGER`","key$":"credits","index$":1}},"name":"balance","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/keys/balance","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/keys/balance","q":{},"r":{},"s":[{"lit":"api"},{"lit":"keys"},{"lit":"balance"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"balance","name__orig":"balance","Name":"Balance","name_":"balance","name-":"balance","NAME":"BALANCE","index$":2}, {"active":true,"entity":"balance","key$":"BasicBalanceFlow","kind":"basic","name":"BasicBalanceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"balance_ref01","srcdatavar":"balance_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-balance_ref01"}}],"index$":0}]}, 'Balance', {"GET /api/keys/balance":{"protocol":"http","operationId":"getBalance","responses":{"200":{"description":"Balance info","content":{"application/json":{"schema":{"type":"object","properties":{"credits":{"example":150,"key$":"credits","type":"integer"},"createdAt":{"description":"Unix timestamp ms","example":1709000000000,"key$":"createdAt","type":"integer"}},"x-ref":"#/components/schemas/Balance","index$":0}}}},"401":{"description":"Invalid key","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"security":[{"bearerAuth":[]}],"securitySource":"definition","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","description":"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let balance_ref01_data = Object.values(setup.data.existing.balance)[0] as any

    // LOAD
    const balance_ref01_ent = client.Balance()
    const balance_ref01_match_dt0: any = {}
    const balance_ref01_data_dt0 = (await balance_ref01_ent.load(balance_ref01_match_dt0)).data()
    assert(null != balance_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/balance/BalanceTestData.json')

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
    ['balance01','balance02','balance03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AGENT_GATEWAY_TEST_BALANCE_ENTID': idmap,
    'AGENT_GATEWAY_TEST_LIVE': 'FALSE',
    'AGENT_GATEWAY_TEST_EXPLAIN': 'FALSE',
    'AGENT_GATEWAY_APIKEY': '',
  })

  idmap = env['AGENT_GATEWAY_TEST_BALANCE_ENTID']

  const live = 'TRUE' === env.AGENT_GATEWAY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AGENT_GATEWAY_TEST_BALANCE_ENTID']
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
  
