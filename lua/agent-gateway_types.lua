-- Typed models for the AgentGateway SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Analytics

---@class AnalyticsLoadMatch

---@class ApiKey
---@field credit? number
---@field key? string

---@class ApiKeyCreateData
---@field credit? number
---@field key? string

---@class Balance
---@field created_at? number
---@field credit? number

---@class BalanceLoadMatch
---@field created_at? number
---@field credit? number

---@class Meta
---@field status? string

---@class MetaLoadMatch
---@field status? string

---@class Payment
---@field address? string
---@field api_key string
---@field chain? string
---@field credits_added? number
---@field ok? boolean
---@field rate? string
---@field token? string
---@field total_credit? number
---@field tx_hash string
---@field usdc? number

---@class PaymentLoadMatch
---@field address? string
---@field api_key? string
---@field chain? string
---@field credits_added? number
---@field ok? boolean
---@field rate? string
---@field token? string
---@field total_credit? number
---@field tx_hash? string
---@field usdc? number

---@class PaymentCreateData
---@field address? string
---@field api_key string
---@field chain? string
---@field credits_added? number
---@field ok? boolean
---@field rate? string
---@field token? string
---@field total_credit? number
---@field tx_hash string
---@field usdc? number

---@class Service
---@field api_url? string
---@field category? string
---@field description? string
---@field endpoint? table
---@field icon? string
---@field id? string
---@field latency? number
---@field name? string
---@field status? string

---@class ServiceLoadMatch
---@field id string

---@class ServiceListMatch
---@field api_url? string
---@field category? string
---@field description? string
---@field endpoint? table
---@field icon? string
---@field id? string
---@field latency? number
---@field name? string
---@field status? string

local M = {}

return M
