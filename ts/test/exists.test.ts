
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AgentGatewaySDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await AgentGatewaySDK.test()
    equal(null !== testsdk, true)
  })

})
