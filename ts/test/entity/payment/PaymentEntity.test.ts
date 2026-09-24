

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


describe('PaymentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AGENT_GATEWAY_TEST_LIVE=TRUE.
  afterEach(liveDelay('AGENT_GATEWAY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AgentGatewaySDK.test()
    const ent = testsdk.Payment()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AGENT_GATEWAY_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'payment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"api_key":{"a":true,"h":"Api Key","n":"api_key","r":true,"t":"`$STRING`","key$":"api_key","index$":0},"credits_added":{"a":true,"h":"Credits Added","n":"credits_added","r":false,"t":"`$INTEGER`","key$":"credits_added","index$":1},"ok":{"a":true,"h":"Ok","n":"ok","r":false,"t":"`$BOOLEAN`","key$":"ok","index$":2},"total_credits":{"a":true,"h":"Total Credits","n":"total_credits","r":false,"t":"`$INTEGER`","key$":"total_credits","index$":3},"tx_hash":{"a":true,"h":"Tx Hash","n":"tx_hash","r":true,"sh":"Transaction hash of USDC transfer on Base","t":"`$STRING`","key$":"tx_hash","index$":4},"usdc":{"a":true,"h":"Usdc","n":"usdc","r":false,"t":"`$NUMBER`","key$":"usdc","index$":5}},"name":"payment","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/credits/topup","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/credits/topup","q":{},"r":{},"s":[{"lit":"api"},{"lit":"credits"},{"lit":"topup"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/payments/info","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/payments/info","q":{"$action":"info"},"r":{},"s":[{"lit":"api"},{"lit":"payments"},{"lit":"info"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"payment","name__orig":"payment","Name":"Payment","name_":"payment","name-":"payment","NAME":"PAYMENT","index$":4}, {"active":true,"entity":"payment","key$":"BasicPaymentFlow","kind":"basic","name":"BasicPaymentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"payment_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"payment_ref01","srcdatavar":"payment_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-payment_ref01"}}],"index$":1}]}, 'Payment', {"POST /api/credits/topup":{"protocol":"http","operationId":"topupCredits","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["api_key","tx_hash"],"properties":{"api_key":{"type":"string","key$":"api_key"},"tx_hash":{"type":"string","description":"Transaction hash of USDC transfer on Base","key$":"tx_hash"}},"index$":1}}}},"responses":{"200":{"description":"Credits added","content":{"application/json":{"schema":{"type":"object","properties":{"ok":{"type":"boolean","key$":"ok"},"usdc":{"type":"number","key$":"usdc"},"credits_added":{"type":"integer","key$":"credits_added"},"total_credits":{"type":"integer","key$":"total_credits"}},"index$":0}}}}},"parameters":[],"security":[],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","description":"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access."}}},"GET /api/payments/info":{"protocol":"http","operationId":"getPaymentInfo","responses":{"200":{"description":"Payment details","content":{"application/json":{"schema":{"type":"object","properties":{"chain":{"example":"Base (L2)","key$":"chain","type":"string"},"token":{"example":"USDC","key$":"token","type":"string"},"address":{"key$":"address","type":"string"},"rate":{"example":"500 credits per 1 USDC","key$":"rate","type":"string"}}}}}}},"parameters":[],"security":[],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","description":"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const payment_ref01_ent = client.Payment()
    let payment_ref01_data = setup.data.new.payment['payment_ref01']

    payment_ref01_data = (await payment_ref01_ent.create(payment_ref01_data)).data()
    assert(null != payment_ref01_data)


    // LOAD
    const payment_ref01_match_dt0: any = {}
    const payment_ref01_data_dt0 = (await payment_ref01_ent.load(payment_ref01_match_dt0)).data()
    assert(null != payment_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/payment/PaymentTestData.json')

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
    ['payment01','payment02','payment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AGENT_GATEWAY_TEST_PAYMENT_ENTID': idmap,
    'AGENT_GATEWAY_TEST_LIVE': 'FALSE',
    'AGENT_GATEWAY_TEST_EXPLAIN': 'FALSE',
    'AGENT_GATEWAY_APIKEY': '',
  })

  idmap = env['AGENT_GATEWAY_TEST_PAYMENT_ENTID']

  const live = 'TRUE' === env.AGENT_GATEWAY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AGENT_GATEWAY_TEST_PAYMENT_ENTID']
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
  
