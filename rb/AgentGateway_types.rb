# frozen_string_literal: true

# Typed models for the AgentGateway SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Analytics entity data model.
class Analytics
end

# Request payload for Analytics#load.
class AnalyticsLoadMatch
end

# ApiKey entity data model.
#
# @!attribute [rw] credits
#   @return [Integer, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
ApiKey = Struct.new(
  :credits,
  :key,
  keyword_init: true
)

# Request payload for ApiKey#create.
#
# @!attribute [rw] credits
#   @return [Integer, nil]
#
# @!attribute [rw] key
#   @return [String, nil]
ApiKeyCreateData = Struct.new(
  :credits,
  :key,
  keyword_init: true
)

# Balance entity data model.
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] credits
#   @return [Integer, nil]
Balance = Struct.new(
  :createdAt,
  :credits,
  keyword_init: true
)

# Request payload for Balance#load.
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] credits
#   @return [Integer, nil]
BalanceLoadMatch = Struct.new(
  :createdAt,
  :credits,
  keyword_init: true
)

# Meta entity data model.
#
# @!attribute [rw] status
#   @return [String, nil]
Meta = Struct.new(
  :status,
  keyword_init: true
)

# Request payload for Meta#load.
#
# @!attribute [rw] status
#   @return [String, nil]
MetaLoadMatch = Struct.new(
  :status,
  keyword_init: true
)

# Payment entity data model.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] api_key
#   @return [String]
#
# @!attribute [rw] chain
#   @return [String, nil]
#
# @!attribute [rw] credits_added
#   @return [Integer, nil]
#
# @!attribute [rw] ok
#   @return [Boolean, nil]
#
# @!attribute [rw] rate
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] total_credits
#   @return [Integer, nil]
#
# @!attribute [rw] tx_hash
#   @return [String]
#
# @!attribute [rw] usdc
#   @return [Float, nil]
Payment = Struct.new(
  :address,
  :api_key,
  :chain,
  :credits_added,
  :ok,
  :rate,
  :token,
  :total_credits,
  :tx_hash,
  :usdc,
  keyword_init: true
)

# Request payload for Payment#load.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] api_key
#   @return [String, nil]
#
# @!attribute [rw] chain
#   @return [String, nil]
#
# @!attribute [rw] credits_added
#   @return [Integer, nil]
#
# @!attribute [rw] ok
#   @return [Boolean, nil]
#
# @!attribute [rw] rate
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] total_credits
#   @return [Integer, nil]
#
# @!attribute [rw] tx_hash
#   @return [String, nil]
#
# @!attribute [rw] usdc
#   @return [Float, nil]
PaymentLoadMatch = Struct.new(
  :address,
  :api_key,
  :chain,
  :credits_added,
  :ok,
  :rate,
  :token,
  :total_credits,
  :tx_hash,
  :usdc,
  keyword_init: true
)

# Request payload for Payment#create.
#
# @!attribute [rw] address
#   @return [String, nil]
#
# @!attribute [rw] api_key
#   @return [String]
#
# @!attribute [rw] chain
#   @return [String, nil]
#
# @!attribute [rw] credits_added
#   @return [Integer, nil]
#
# @!attribute [rw] ok
#   @return [Boolean, nil]
#
# @!attribute [rw] rate
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] total_credits
#   @return [Integer, nil]
#
# @!attribute [rw] tx_hash
#   @return [String]
#
# @!attribute [rw] usdc
#   @return [Float, nil]
PaymentCreateData = Struct.new(
  :address,
  :api_key,
  :chain,
  :credits_added,
  :ok,
  :rate,
  :token,
  :total_credits,
  :tx_hash,
  :usdc,
  keyword_init: true
)

# Service entity data model.
#
# @!attribute [rw] apiUrl
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] endpoints
#   @return [Array, nil]
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] latency
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Service = Struct.new(
  :apiUrl,
  :category,
  :description,
  :endpoints,
  :icon,
  :id,
  :latency,
  :name,
  :status,
  keyword_init: true
)

# Request payload for Service#load.
#
# @!attribute [rw] id
#   @return [String]
ServiceLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Service#list.
#
# @!attribute [rw] apiUrl
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] endpoints
#   @return [Array, nil]
#
# @!attribute [rw] icon
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] latency
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
ServiceListMatch = Struct.new(
  :apiUrl,
  :category,
  :description,
  :endpoints,
  :icon,
  :id,
  :latency,
  :name,
  :status,
  keyword_init: true
)

