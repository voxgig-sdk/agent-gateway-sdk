// Typed models for the AgentGateway SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Analytics is the typed data model for the analytics entity.
type Analytics struct {
}

// AnalyticsLoadMatch is the typed request payload for Analytics.LoadTyped.
type AnalyticsLoadMatch struct {
}

// ApiKey is the typed data model for the api_key entity.
type ApiKey struct {
	Credit *int `json:"credit,omitempty"`
	Key *string `json:"key,omitempty"`
}

// ApiKeyCreateData is the typed request payload for ApiKey.CreateTyped.
type ApiKeyCreateData struct {
	Credit *int `json:"credit,omitempty"`
	Key *string `json:"key,omitempty"`
}

// Balance is the typed data model for the balance entity.
type Balance struct {
	CreatedAt *int `json:"created_at,omitempty"`
	Credit *int `json:"credit,omitempty"`
}

// BalanceLoadMatch is the typed request payload for Balance.LoadTyped.
type BalanceLoadMatch struct {
	CreatedAt *int `json:"created_at,omitempty"`
	Credit *int `json:"credit,omitempty"`
}

// Meta is the typed data model for the meta entity.
type Meta struct {
	Status *string `json:"status,omitempty"`
}

// MetaLoadMatch is the typed request payload for Meta.LoadTyped.
type MetaLoadMatch struct {
	Status *string `json:"status,omitempty"`
}

// Payment is the typed data model for the payment entity.
type Payment struct {
	Address *string `json:"address,omitempty"`
	ApiKey string `json:"api_key"`
	Chain *string `json:"chain,omitempty"`
	CreditsAdded *int `json:"credits_added,omitempty"`
	Ok *bool `json:"ok,omitempty"`
	Rate *string `json:"rate,omitempty"`
	Token *string `json:"token,omitempty"`
	TotalCredit *int `json:"total_credit,omitempty"`
	TxHash string `json:"tx_hash"`
	Usdc *float64 `json:"usdc,omitempty"`
}

// PaymentLoadMatch is the typed request payload for Payment.LoadTyped.
type PaymentLoadMatch struct {
	Address *string `json:"address,omitempty"`
	ApiKey *string `json:"api_key,omitempty"`
	Chain *string `json:"chain,omitempty"`
	CreditsAdded *int `json:"credits_added,omitempty"`
	Ok *bool `json:"ok,omitempty"`
	Rate *string `json:"rate,omitempty"`
	Token *string `json:"token,omitempty"`
	TotalCredit *int `json:"total_credit,omitempty"`
	TxHash *string `json:"tx_hash,omitempty"`
	Usdc *float64 `json:"usdc,omitempty"`
}

// PaymentCreateData is the typed request payload for Payment.CreateTyped.
type PaymentCreateData struct {
	Address *string `json:"address,omitempty"`
	ApiKey string `json:"api_key"`
	Chain *string `json:"chain,omitempty"`
	CreditsAdded *int `json:"credits_added,omitempty"`
	Ok *bool `json:"ok,omitempty"`
	Rate *string `json:"rate,omitempty"`
	Token *string `json:"token,omitempty"`
	TotalCredit *int `json:"total_credit,omitempty"`
	TxHash string `json:"tx_hash"`
	Usdc *float64 `json:"usdc,omitempty"`
}

// Service is the typed data model for the service entity.
type Service struct {
	ApiUrl *string `json:"api_url,omitempty"`
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	Endpoint *[]any `json:"endpoint,omitempty"`
	Icon *string `json:"icon,omitempty"`
	Id *string `json:"id,omitempty"`
	Latency *float64 `json:"latency,omitempty"`
	Name *string `json:"name,omitempty"`
	Status *string `json:"status,omitempty"`
}

// ServiceLoadMatch is the typed request payload for Service.LoadTyped.
type ServiceLoadMatch struct {
	Id string `json:"id"`
}

// ServiceListMatch is the typed request payload for Service.ListTyped.
type ServiceListMatch struct {
	ApiUrl *string `json:"api_url,omitempty"`
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	Endpoint *[]any `json:"endpoint,omitempty"`
	Icon *string `json:"icon,omitempty"`
	Id *string `json:"id,omitempty"`
	Latency *float64 `json:"latency,omitempty"`
	Name *string `json:"name,omitempty"`
	Status *string `json:"status,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
