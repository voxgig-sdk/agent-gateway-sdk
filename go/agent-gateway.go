package voxgigagentgatewaysdk

import (
	"github.com/voxgig-sdk/agent-gateway-sdk/core"
	"github.com/voxgig-sdk/agent-gateway-sdk/entity"
	"github.com/voxgig-sdk/agent-gateway-sdk/feature"
	_ "github.com/voxgig-sdk/agent-gateway-sdk/utility"
)

// Type aliases preserve external API.
type AgentGatewaySDK = core.AgentGatewaySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AgentGatewayEntity = core.AgentGatewayEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AgentGatewayError = core.AgentGatewayError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAnalyticsEntityFunc = func(client *core.AgentGatewaySDK, entopts map[string]any) core.AgentGatewayEntity {
		return entity.NewAnalyticsEntity(client, entopts)
	}
	core.NewApiKeyEntityFunc = func(client *core.AgentGatewaySDK, entopts map[string]any) core.AgentGatewayEntity {
		return entity.NewApiKeyEntity(client, entopts)
	}
	core.NewBalanceEntityFunc = func(client *core.AgentGatewaySDK, entopts map[string]any) core.AgentGatewayEntity {
		return entity.NewBalanceEntity(client, entopts)
	}
	core.NewMetaEntityFunc = func(client *core.AgentGatewaySDK, entopts map[string]any) core.AgentGatewayEntity {
		return entity.NewMetaEntity(client, entopts)
	}
	core.NewPaymentEntityFunc = func(client *core.AgentGatewaySDK, entopts map[string]any) core.AgentGatewayEntity {
		return entity.NewPaymentEntity(client, entopts)
	}
	core.NewServiceEntityFunc = func(client *core.AgentGatewaySDK, entopts map[string]any) core.AgentGatewayEntity {
		return entity.NewServiceEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAgentGatewaySDK = core.NewAgentGatewaySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
