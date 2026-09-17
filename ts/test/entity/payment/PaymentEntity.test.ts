

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"api_key","req":true,"type":"`$STRING`","index$":0},{"active":true,"name":"credits_added","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"ok","req":false,"type":"`$BOOLEAN`","index$":2},{"active":true,"name":"total_credits","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"tx_hash","req":true,"short":"Transaction hash of USDC transfer on Base","type":"`$STRING`","index$":4},{"active":true,"name":"usdc","req":false,"type":"`$NUMBER`","index$":5}],"name":"payment","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/credits/topup","json":"{\"operationId\":\"topupCredits\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"api_key\":{\"type\":\"string\"},\"tx_hash\":{\"description\":\"Transaction hash of USDC transfer on Base\",\"type\":\"string\"}},\"required\":[\"api_key\",\"tx_hash\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"credits_added\":{\"type\":\"integer\"},\"ok\":{\"type\":\"boolean\"},\"total_credits\":{\"type\":\"integer\"},\"usdc\":{\"type\":\"number\"}},\"type\":\"object\"}}},\"description\":\"Credits added\"}},\"security\":[],\"securitySchemes\":{\"bearerAuth\":{\"description\":\"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/credits/topup","segments":[{"lit":"api"},{"lit":"credits"},{"lit":"topup"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /api/payments/info","json":"{\"operationId\":\"getPaymentInfo\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"address\":{\"type\":\"string\"},\"chain\":{\"example\":\"Base (L2)\",\"type\":\"string\"},\"rate\":{\"example\":\"500 credits per 1 USDC\",\"type\":\"string\"},\"token\":{\"example\":\"USDC\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Payment details\"}},\"security\":[],\"securitySchemes\":{\"bearerAuth\":{\"description\":\"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access.\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/payments/info","segments":[{"lit":"api"},{"lit":"payments"},{"lit":"info"}],"select":{"$action":"info"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"payment","name__orig":"payment","Name":"Payment","name_":"payment","name-":"payment","NAME":"PAYMENT","index$":4}, {"active":true,"entity":"payment","key$":"BasicPaymentFlow","kind":"basic","name":"BasicPaymentFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"payment_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"payment_ref01","srcdatavar":"payment_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-payment_ref01"}}],"index$":1}]}, 'Payment')
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
  
