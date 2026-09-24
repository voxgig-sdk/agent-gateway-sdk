

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


describe('ServiceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when AGENT_GATEWAY_TEST_LIVE=TRUE.
  afterEach(liveDelay('AGENT_GATEWAY_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AgentGatewaySDK.test()
    const ent = testsdk.Service()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.AGENT_GATEWAY_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'service.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"apiUrl":{"a":true,"h":"Api Url","n":"apiUrl","r":false,"t":"`$STRING`","key$":"apiUrl","index$":0},"category":{"a":true,"h":"Category","n":"category","r":false,"t":"`$STRING`","key$":"category","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"t":"`$STRING`","key$":"description","index$":2},"endpoints":{"a":true,"h":"Endpoints","n":"endpoints","r":false,"t":"`$ARRAY`","key$":"endpoints","index$":3},"icon":{"a":true,"h":"Icon","n":"icon","r":false,"t":"`$STRING`","key$":"icon","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":6}},"id":{"field":"id","name":"id"},"name":"service","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/services","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/api/services","q":{"exist":["category","search"]},"r":{},"s":[{"lit":"api"},{"lit":"services"}],"t":{"req":"`reqdata`","res":"`body.services`"},"index$":0},{"a":true,"co":{"id":"GET /api/services/health","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/services/health","q":{"$action":"health"},"r":{},"s":[{"lit":"api"},{"lit":"services"},{"lit":"health"}],"t":{"req":"`reqdata`","res":"`body.services`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/services/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"crypto-feeds","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/services/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"api"},{"lit":"services"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"service","name__orig":"service","Name":"Service","name_":"service","name-":"service","NAME":"SERVICE","index$":5}, {"active":true,"entity":"service","key$":"BasicServiceFlow","kind":"basic","name":"BasicServiceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"service_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"service_ref01","srcdatavar":"service_ref01_data","suffix":"_dt0"},"m":{"id":"service01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-service_ref01"}}],"index$":1}]}, 'Service', {"GET /api/services":{"protocol":"http","operationId":"listServices","responses":{"200":{"description":"Service list","content":{"application/json":{"schema":{"type":"object","properties":{"services":{"items":{"properties":{"apiUrl":{"type":"string","key$":"apiUrl"},"category":{"enum":["infrastructure","defi","blockchain","data","security","gaming"],"type":"string","key$":"category"},"description":{"type":"string","key$":"description"},"endpoints":{"items":{"type":"string"},"type":"array","key$":"endpoints"},"icon":{"type":"string","key$":"icon"},"id":{"type":"string","key$":"id"},"name":{"type":"string","key$":"name"}},"type":"object","x-ref":"#/components/schemas/Service","index$":0},"key$":"services","type":"array"},"count":{"key$":"count","type":"integer"},"total":{"key$":"total","type":"integer"}}}}}}},"parameters":[{"name":"category","in":"query","schema":{"type":"string"},"description":"Filter by category","index$":0},{"name":"search","in":"query","schema":{"type":"string"},"description":"Search by name or description","index$":1}],"security":[],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","description":"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access."}}},"GET /api/services/health":{"protocol":"http","operationId":"getHealth","responses":{"200":{"description":"Health status","content":{"application/json":{"schema":{"type":"object","properties":{"services":{"items":{"properties":{"id":{"type":"string"},"latency":{"type":"number"},"name":{"type":"string"},"status":{"enum":["online","offline"],"type":"string"}},"type":"object"},"key$":"services","type":"array"},"online":{"key$":"online","type":"integer"},"offline":{"key$":"offline","type":"integer"}}}}}}},"parameters":[],"security":[],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","description":"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access."}}},"GET /api/services/{id}":{"protocol":"http","operationId":"getService","responses":{"200":{"description":"Service detail","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","key$":"id"},"name":{"type":"string","key$":"name"},"description":{"type":"string","key$":"description"},"category":{"enum":["infrastructure","defi","blockchain","data","security","gaming"],"type":"string","key$":"category"},"icon":{"type":"string","key$":"icon"},"apiUrl":{"type":"string","key$":"apiUrl"},"endpoints":{"items":{"type":"string"},"type":"array","key$":"endpoints"}},"x-ref":"#/components/schemas/Service","index$":0}}}},"404":{"description":"Service not found"}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"example":"crypto-feeds","index$":0}],"security":[],"securitySource":"operation","securitySchemes":{"bearerAuth":{"type":"http","scheme":"bearer","description":"Your API key from POST /api/keys/create. Free tier: 50 req/day without a key. Paid: Bearer <api_key> for full access."}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let service_ref01_data = Object.values(setup.data.existing.service)[0] as any

    // LIST
    const service_ref01_ent = client.Service()
    const service_ref01_match: any = {}

    const service_ref01_list = (await service_ref01_ent.list(service_ref01_match)).map((e: any) => e.data())


    // LOAD
    const service_ref01_match_dt0: any = {}
    service_ref01_match_dt0.id = service_ref01_data.id
    const service_ref01_data_dt0 = (await service_ref01_ent.load(service_ref01_match_dt0)).data()
    assert(service_ref01_data_dt0.id === service_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/service/ServiceTestData.json')

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
    ['service01','service02','service03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'AGENT_GATEWAY_TEST_SERVICE_ENTID': idmap,
    'AGENT_GATEWAY_TEST_LIVE': 'FALSE',
    'AGENT_GATEWAY_TEST_EXPLAIN': 'FALSE',
    'AGENT_GATEWAY_APIKEY': '',
  })

  idmap = env['AGENT_GATEWAY_TEST_SERVICE_ENTID']

  const live = 'TRUE' === env.AGENT_GATEWAY_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['AGENT_GATEWAY_TEST_SERVICE_ENTID']
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
  
