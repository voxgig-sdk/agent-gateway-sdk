package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/agent-gateway-sdk/go"
	"github.com/voxgig-sdk/agent-gateway-sdk/go/core"

	vs "github.com/voxgig-sdk/agent-gateway-sdk/go/utility/struct"
)

func TestPaymentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Payment(nil)
		if ent == nil {
			t.Fatal("expected non-nil PaymentEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := paymentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "payment." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set AGENTGATEWAY_TEST_PAYMENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		paymentRef01Ent := client.Payment(nil)
		paymentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "payment"}, setup.data), "payment_ref01"))

		paymentRef01DataResult, err := paymentRef01Ent.Create(paymentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		paymentRef01Data = core.ToMapAny(paymentRef01DataResult)
		if paymentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		paymentRef01MatchDt0 := map[string]any{}
		paymentRef01DataDt0Loaded, err := paymentRef01Ent.Load(paymentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if paymentRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func paymentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "payment", "PaymentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read payment test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse payment test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"payment01", "payment02", "payment03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("AGENTGATEWAY_TEST_PAYMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"AGENTGATEWAY_TEST_PAYMENT_ENTID": idmap,
		"AGENTGATEWAY_TEST_LIVE":      "FALSE",
		"AGENTGATEWAY_TEST_EXPLAIN":   "FALSE",
		"AGENTGATEWAY_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["AGENTGATEWAY_TEST_PAYMENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["AGENTGATEWAY_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["AGENTGATEWAY_APIKEY"],
			},
			extra,
		})
		client = sdk.NewAgentGatewaySDK(core.ToMapAny(mergedOpts))
	}

	live := env["AGENTGATEWAY_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["AGENTGATEWAY_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
