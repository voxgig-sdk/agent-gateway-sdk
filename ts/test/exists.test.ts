
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AgentGatewaySDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AgentGatewaySDK.test()
    equal(testsdk instanceof AgentGatewaySDK, true,
      'AgentGatewaySDK.test() must return a client synchronously')
  })

})
