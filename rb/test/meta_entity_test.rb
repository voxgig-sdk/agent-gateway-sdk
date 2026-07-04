# Meta entity test

require "minitest/autorun"
require "json"
require_relative "../AgentGateway_sdk"
require_relative "runner"

class MetaEntityTest < Minitest::Test
  def test_create_instance
    testsdk = AgentGatewaySDK.test(nil, nil)
    ent = testsdk.Meta(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = meta_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "meta." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set AGENTGATEWAY_TEST_META_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    meta_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.meta")))
    meta_ref01_data = nil
    if meta_ref01_data_raw.length > 0
      meta_ref01_data = Helpers.to_map(meta_ref01_data_raw[0][1])
    end

    # LOAD
    meta_ref01_ent = client.Meta(nil)
    meta_ref01_match_dt0 = {}
    meta_ref01_data_dt0_loaded = meta_ref01_ent.load(meta_ref01_match_dt0, nil)
    assert !meta_ref01_data_dt0_loaded.nil?

  end
end

def meta_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "meta", "MetaTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AgentGatewaySDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["meta01", "meta02", "meta03"],
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
  entid_env_raw = ENV["AGENTGATEWAY_TEST_META_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "AGENTGATEWAY_TEST_META_ENTID" => idmap,
    "AGENTGATEWAY_TEST_LIVE" => "FALSE",
    "AGENTGATEWAY_TEST_EXPLAIN" => "FALSE",
    "AGENTGATEWAY_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["AGENTGATEWAY_TEST_META_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["AGENTGATEWAY_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["AGENTGATEWAY_APIKEY"],
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
