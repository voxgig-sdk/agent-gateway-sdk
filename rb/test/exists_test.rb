# AgentGateway SDK exists test

require "minitest/autorun"
require_relative "../AgentGateway_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AgentGatewaySDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
