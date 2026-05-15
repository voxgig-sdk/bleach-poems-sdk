
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BleachPoemsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await BleachPoemsSDK.test()
    equal(null !== testsdk, true)
  })

})
