# AgentGateway SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AgentGatewayFeatures
  def self.make_feature(name)
    case name
    when "base"
      AgentGatewayBaseFeature.new
    when "test"
      AgentGatewayTestFeature.new
    else
      AgentGatewayBaseFeature.new
    end
  end
end
