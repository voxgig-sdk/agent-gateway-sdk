# ApiKey entity test

require "minitest/autorun"
require "json"
require_relative "../AgentGateway_sdk"
require_relative "runner"

class ApiKeyEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = AgentGatewaySDK.test(nil, nil)
    ent = testsdk.ApiKey(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = AgentGatewayConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = AgentGatewaySDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.ApiKey(nil).create({ "credits" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = api_key_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "api_key." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    api_key_ref01_ent = client.ApiKey(nil)
    api_key_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.api_key"), "api_key_ref01"))

    api_key_ref01_data_result = api_key_ref01_ent.create(api_key_ref01_data, nil)
    api_key_ref01_data = Helpers.to_map(api_key_ref01_data_result.respond_to?(:data_get) ? api_key_ref01_data_result.data_get : api_key_ref01_data_result)
    assert !api_key_ref01_data.nil?

  end
end

def api_key_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "api_key", "ApiKeyTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AgentGatewaySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["api_key01", "api_key02", "api_key03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["AGENT_GATEWAY_TEST_API_KEY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "AGENT_GATEWAY_TEST_API_KEY_ENTID" => idmap,
    "AGENT_GATEWAY_TEST_LIVE" => "FALSE",
    "AGENT_GATEWAY_TEST_EXPLAIN" => "FALSE",
    "AGENT_GATEWAY_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["AGENT_GATEWAY_TEST_API_KEY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["AGENT_GATEWAY_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["AGENT_GATEWAY_APIKEY"],
      },
      extra || {},
    ])
    client = AgentGatewaySDK.new(Helpers.to_map(merged_opts))
  end

  live = env["AGENT_GATEWAY_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["AGENT_GATEWAY_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
