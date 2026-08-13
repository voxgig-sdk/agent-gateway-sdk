<?php
declare(strict_types=1);

// Typed models for the AgentGateway SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Analytics entity data model. */
class Analytics
{
}

/** Request payload for Analytics#load. */
class AnalyticsLoadMatch
{
}

/** ApiKey entity data model. */
class ApiKey
{
    public ?int $credits = null;
    public ?string $key = null;
}

/** Request payload for ApiKey#create. */
class ApiKeyCreateData
{
    public ?int $credits = null;
    public ?string $key = null;
}

/** Balance entity data model. */
class Balance
{
    public ?int $createdAt = null;
    public ?int $credits = null;
}

/** Request payload for Balance#load. */
class BalanceLoadMatch
{
    public ?int $createdAt = null;
    public ?int $credits = null;
}

/** Meta entity data model. */
class Meta
{
    public ?string $status = null;
}

/** Request payload for Meta#load. */
class MetaLoadMatch
{
    public ?string $status = null;
}

/** Payment entity data model. */
class Payment
{
    public ?string $address = null;
    public string $api_key;
    public ?string $chain = null;
    public ?int $credits_added = null;
    public ?bool $ok = null;
    public ?string $rate = null;
    public ?string $token = null;
    public ?int $total_credits = null;
    public string $tx_hash;
    public ?float $usdc = null;
}

/** Request payload for Payment#load. */
class PaymentLoadMatch
{
    public ?string $address = null;
    public ?string $api_key = null;
    public ?string $chain = null;
    public ?int $credits_added = null;
    public ?bool $ok = null;
    public ?string $rate = null;
    public ?string $token = null;
    public ?int $total_credits = null;
    public ?string $tx_hash = null;
    public ?float $usdc = null;
}

/** Request payload for Payment#create. */
class PaymentCreateData
{
    public ?string $address = null;
    public string $api_key;
    public ?string $chain = null;
    public ?int $credits_added = null;
    public ?bool $ok = null;
    public ?string $rate = null;
    public ?string $token = null;
    public ?int $total_credits = null;
    public string $tx_hash;
    public ?float $usdc = null;
}

/** Service entity data model. */
class Service
{
    public ?string $apiUrl = null;
    public ?string $category = null;
    public ?string $description = null;
    public ?array $endpoints = null;
    public ?string $icon = null;
    public ?string $id = null;
    public ?float $latency = null;
    public ?string $name = null;
    public ?string $status = null;
}

/** Request payload for Service#load. */
class ServiceLoadMatch
{
    public string $id;
}

/** Request payload for Service#list. */
class ServiceListMatch
{
    public ?string $apiUrl = null;
    public ?string $category = null;
    public ?string $description = null;
    public ?array $endpoints = null;
    public ?string $icon = null;
    public ?string $id = null;
    public ?float $latency = null;
    public ?string $name = null;
    public ?string $status = null;
}

