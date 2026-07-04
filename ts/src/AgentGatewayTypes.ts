// Typed models for the AgentGateway SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Analytics {
}

export type AnalyticsLoadMatch = Partial<Analytics>

export interface ApiKey {
  credit?: number
  key?: string
}

export type ApiKeyCreateData = Partial<ApiKey>

export interface Balance {
  created_at?: number
  credit?: number
}

export type BalanceLoadMatch = Partial<Balance>

export interface Meta {
  status?: string
}

export type MetaLoadMatch = Partial<Meta>

export interface Payment {
  address?: string
  api_key: string
  chain?: string
  credits_added?: number
  ok?: boolean
  rate?: string
  token?: string
  total_credit?: number
  tx_hash: string
  usdc?: number
}

export type PaymentLoadMatch = Partial<Payment>

export type PaymentCreateData = Partial<Payment>

export interface Service {
  api_url?: string
  category?: string
  description?: string
  endpoint?: any[]
  icon?: string
  id?: string
  latency?: number
  name?: string
  status?: string
}

export interface ServiceLoadMatch {
  id: string
}

export type ServiceListMatch = Partial<Service>

