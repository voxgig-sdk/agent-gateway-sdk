package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAnalyticsEntityFunc func(client *AgentGatewaySDK, entopts map[string]any) AgentGatewayEntity

var NewApiKeyEntityFunc func(client *AgentGatewaySDK, entopts map[string]any) AgentGatewayEntity

var NewBalanceEntityFunc func(client *AgentGatewaySDK, entopts map[string]any) AgentGatewayEntity

var NewMetaEntityFunc func(client *AgentGatewaySDK, entopts map[string]any) AgentGatewayEntity

var NewPaymentEntityFunc func(client *AgentGatewaySDK, entopts map[string]any) AgentGatewayEntity

var NewServiceEntityFunc func(client *AgentGatewaySDK, entopts map[string]any) AgentGatewayEntity

