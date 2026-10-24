# AgentGateway SDK utility: prepare_body
require_relative 'media'
module AgentGatewayUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AgentGatewayUtilities.raw_body(ctx.reqdata) if AgentGatewayUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
