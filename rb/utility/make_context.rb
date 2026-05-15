# AgentGateway SDK utility: make_context
require_relative '../core/context'
module AgentGatewayUtilities
  MakeContext = ->(ctxmap, basectx) {
    AgentGatewayContext.new(ctxmap, basectx)
  }
end
