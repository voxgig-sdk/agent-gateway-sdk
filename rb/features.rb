# AgentGateway SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AgentGatewayFeatures
  def self.make_feature(name)
    case name
    when "base"
      AgentGatewayBaseFeature.new
    when "ratelimit"
      AgentGatewayRatelimitFeature.new
    when "retry"
      AgentGatewayRetryFeature.new
    when "test"
      AgentGatewayTestFeature.new
    when "timeout"
      AgentGatewayTimeoutFeature.new
    else
      AgentGatewayBaseFeature.new
    end
  end
end
