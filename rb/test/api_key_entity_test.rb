# ApiKey entity test

require "minitest/autorun"
require "json"
require_relative "../AgentGateway_sdk"
require_relative "runner"

class ApiKeyEntityTest < Minitest::Test
  def test_create_instance
    testsdk = AgentGatewaySDK.test(nil, nil)
    ent = testsdk.ApiKey(nil)
    assert !ent.nil?
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
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set AGENTGATEWAY_TEST_API_KEY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    api_key_ref01_ent = client.ApiKey(nil)
    api_key_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.api_key"), "api_key_ref01"))

    api_key_ref01_data_result, err = api_key_ref01_ent.create(api_key_ref01_data, nil)
    assert_nil err
    api_key_ref01_data = Helpers.to_map(api_key_ref01_data_result)
    assert !api_key_ref01_data.nil?

  end
end

def api_key_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "api_key", "ApiKeyTestData.json")
  entity_data_source = File.read(entity_data_file)
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

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["AGENTGATEWAY_TEST_API_KEY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "AGENTGATEWAY_TEST_API_KEY_ENTID" => idmap,
    "AGENTGATEWAY_TEST_LIVE" => "FALSE",
    "AGENTGATEWAY_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["AGENTGATEWAY_TEST_API_KEY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["AGENTGATEWAY_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = AgentGatewaySDK.new(Helpers.to_map(merged_opts))
  end

  live = env["AGENTGATEWAY_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["AGENTGATEWAY_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
