

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


describe('ApiKeyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AGENT_GATEWAY_TEST_LIVE=TRUE.
  afterEach(liveDelay('AGENT_GATEWAY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AgentGatewaySDK.test()
    const ent = testsdk.ApiKey()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AGENT_GATEWAY_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api_key.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"credits":{"a":true,"h":"Credits","n":"credits","r":false,"t":"`$INTEGER`","key$":"credits","index$":0},"key":{"a":true,"h":"Key","n":"key","r":false,"t":"`$STRING`","key$":"key","index$":1}},"name":"api_key","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/keys/create","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/keys/create","q":{},"r":{},"s":[{"lit":"api"},{"lit":"keys"},{"lit":"create"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"api_key","name__orig":"api_key","Name":"ApiKey","name_":"api_key","name-":"api-key","NAME":"API_KEY","index$":1}, {"active":true,"entity":"api_key","key$":"BasicApiKeyFlow","kind":"basic","name":"BasicApiKeyFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"api_key_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'ApiKey', {"POST /api/keys/create":{"protocol":"http","operationId":"createApiKey","responses":{"200":{"description":"API key created","content":{"application/json":{"schema":{"type":"object","properties":{"key":{"type":"string","example":"gw_abc123...","key$":"key"},"credits":{"type":"integer","example":200,"key$":"credits"}},"x-ref":"#/components/schemas/ApiKey","index$":0},"example":{"key":"gw_abc123...","credits":200}}}}},"parameters":[],"security":[],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","description":"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const api_key_ref01_ent = client.ApiKey()
    let api_key_ref01_data = setup.data.new.api_key['api_key_ref01']

    api_key_ref01_data = (await api_key_ref01_ent.create(api_key_ref01_data)).data()
    assert(null != api_key_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/api_key/ApiKeyTestData.json')

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
    ['api_key01','api_key02','api_key03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AGENT_GATEWAY_TEST_API_KEY_ENTID': idmap,
    'AGENT_GATEWAY_TEST_LIVE': 'FALSE',
    'AGENT_GATEWAY_TEST_EXPLAIN': 'FALSE',
    'AGENT_GATEWAY_APIKEY': '',
  })

  idmap = env['AGENT_GATEWAY_TEST_API_KEY_ENTID']

  const live = 'TRUE' === env.AGENT_GATEWAY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AGENT_GATEWAY_TEST_API_KEY_ENTID']
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
  
