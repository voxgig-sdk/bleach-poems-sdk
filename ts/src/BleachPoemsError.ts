
import { Context } from './Context'


class BleachPoemsError extends Error {

  isBleachPoemsError = true

  sdk = 'BleachPoems'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  BleachPoemsError
}

