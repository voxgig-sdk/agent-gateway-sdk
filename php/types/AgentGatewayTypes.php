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

/** Match filter for Analytics#load (any subset of Analytics fields). */
class AnalyticsLoadMatch
{
}

/** ApiKey entity data model. */
class ApiKey
{
    public ?int $credit = null;
    public ?string $key = null;
}

/** Match filter for ApiKey#create (any subset of ApiKey fields). */
class ApiKeyCreateData
{
    public ?int $credit = null;
    public ?string $key = null;
}

/** Balance entity data model. */
class Balance
{
    public ?int $created_at = null;
    public ?int $credit = null;
}

/** Match filter for Balance#load (any subset of Balance fields). */
class BalanceLoadMatch
{
    public ?int $created_at = null;
    public ?int $credit = null;
}

/** Meta entity data model. */
class Meta
{
    public ?string $status = null;
}

/** Match filter for Meta#load (any subset of Meta fields). */
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
    public ?int $total_credit = null;
    public string $tx_hash;
    public ?float $usdc = null;
}

/** Match filter for Payment#load (any subset of Payment fields). */
class PaymentLoadMatch
{
    public ?string $address = null;
    public ?string $api_key = null;
    public ?string $chain = null;
    public ?int $credits_added = null;
    public ?bool $ok = null;
    public ?string $rate = null;
    public ?string $token = null;
    public ?int $total_credit = null;
    public ?string $tx_hash = null;
    public ?float $usdc = null;
}

/** Match filter for Payment#create (any subset of Payment fields). */
class PaymentCreateData
{
    public ?string $address = null;
    public ?string $api_key = null;
    public ?string $chain = null;
    public ?int $credits_added = null;
    public ?bool $ok = null;
    public ?string $rate = null;
    public ?string $token = null;
    public ?int $total_credit = null;
    public ?string $tx_hash = null;
    public ?float $usdc = null;
}

/** Service entity data model. */
class Service
{
    public ?string $api_url = null;
    public ?string $category = null;
    public ?string $description = null;
    public ?array $endpoint = null;
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

/** Match filter for Service#list (any subset of Service fields). */
class ServiceListMatch
{
    public ?string $api_url = null;
    public ?string $category = null;
    public ?string $description = null;
    public ?array $endpoint = null;
    public ?string $icon = null;
    public ?string $id = null;
    public ?float $latency = null;
    public ?string $name = null;
    public ?string $status = null;
}

