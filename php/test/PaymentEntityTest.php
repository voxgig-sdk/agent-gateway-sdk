<?php
declare(strict_types=1);

// Payment entity test

require_once __DIR__ . '/../agentgateway_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PaymentEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = AgentGatewaySDK::test(null, null);
        $ent = $testsdk->Payment(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = AgentGatewayConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = AgentGatewaySDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Payment(null)->load(["api_key" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = payment_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "payment." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        $client = $setup["client"];

        // CREATE
        $payment_ref01_ent = $client->Payment(null);
        $payment_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.payment"), "payment_ref01"));

        $payment_ref01_data_result = $payment_ref01_ent->create($payment_ref01_data, null);
        $payment_ref01_data = Helpers::to_map(is_object($payment_ref01_data_result) && method_exists($payment_ref01_data_result, 'data_get') ? $payment_ref01_data_result->data_get() : $payment_ref01_data_result);
        $this->assertNotNull($payment_ref01_data);

        // LOAD
        $payment_ref01_match_dt0 = [];
        $payment_ref01_data_dt0_loaded = $payment_ref01_ent->load($payment_ref01_match_dt0, null);
        $this->assertNotNull($payment_ref01_data_dt0_loaded);

    }
}

function payment_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/payment/PaymentTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AgentGatewaySDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["payment01", "payment02", "payment03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("AGENT_GATEWAY_TEST_PAYMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "AGENT_GATEWAY_TEST_PAYMENT_ENTID" => $idmap,
        "AGENT_GATEWAY_TEST_LIVE" => "FALSE",
        "AGENT_GATEWAY_TEST_EXPLAIN" => "FALSE",
        "AGENT_GATEWAY_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["AGENT_GATEWAY_TEST_PAYMENT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["AGENT_GATEWAY_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["AGENT_GATEWAY_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new AgentGatewaySDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["AGENT_GATEWAY_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["AGENT_GATEWAY_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
