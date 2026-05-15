
import { Context } from './Context'


class AgentGatewayError extends Error {

  isAgentGatewayError = true

  sdk = 'AgentGateway'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  AgentGatewayError
}

