// Typed models for the AgentGateway SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Analytics {
}

export interface AnalyticsLoadMatch {
}

export interface ApiKey {
  credit?: number
  key?: string
}

export interface ApiKeyCreateData {
  credit?: number
  key?: string
}

export interface Balance {
  created_at?: number
  credit?: number
}

export interface BalanceLoadMatch {
  created_at?: number
  credit?: number
}

export interface Meta {
  status?: string
}

export interface MetaLoadMatch {
  status?: string
}

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

export interface PaymentLoadMatch {
  address?: string
  api_key?: string
  chain?: string
  credits_added?: number
  ok?: boolean
  rate?: string
  token?: string
  total_credit?: number
  tx_hash?: string
  usdc?: number
}

export interface PaymentCreateData {
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

export interface ServiceListMatch {
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

