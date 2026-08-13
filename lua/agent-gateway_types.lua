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
---@field credits? number
---@field key? string

---@class ApiKeyCreateData
---@field credits? number
---@field key? string

---@class Balance
---@field createdAt? number
---@field credits? number

---@class BalanceLoadMatch
---@field createdAt? number
---@field credits? number

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
---@field total_credits? number
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
---@field total_credits? number
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
---@field total_credits? number
---@field tx_hash string
---@field usdc? number

---@class Service
---@field apiUrl? string
---@field category? string
---@field description? string
---@field endpoints? table
---@field icon? string
---@field id? string
---@field latency? number
---@field name? string
---@field status? string

---@class ServiceLoadMatch
---@field id string

---@class ServiceListMatch
---@field apiUrl? string
---@field category? string
---@field description? string
---@field endpoints? table
---@field icon? string
---@field id? string
---@field latency? number
---@field name? string
---@field status? string

local M = {}

return M
