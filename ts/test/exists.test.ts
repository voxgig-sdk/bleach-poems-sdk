
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BleachPoemsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = BleachPoemsSDK.test()
    equal(testsdk instanceof BleachPoemsSDK, true,
      'BleachPoemsSDK.test() must return a client synchronously')
  })

})
