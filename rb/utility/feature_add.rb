# AgentGateway SDK utility: feature_add
module AgentGatewayUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
