# Typed models for the AgentGateway SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Analytics:
    pass


@dataclass
class AnalyticsLoadMatch:
    pass


@dataclass
class ApiKey:
    credit: Optional[int] = None
    key: Optional[str] = None


@dataclass
class ApiKeyCreateData:
    credit: Optional[int] = None
    key: Optional[str] = None


@dataclass
class Balance:
    created_at: Optional[int] = None
    credit: Optional[int] = None


@dataclass
class BalanceLoadMatch:
    created_at: Optional[int] = None
    credit: Optional[int] = None


@dataclass
class Meta:
    status: Optional[str] = None


@dataclass
class MetaLoadMatch:
    status: Optional[str] = None


@dataclass
class Payment:
    api_key: str
    tx_hash: str
    address: Optional[str] = None
    chain: Optional[str] = None
    credits_added: Optional[int] = None
    ok: Optional[bool] = None
    rate: Optional[str] = None
    token: Optional[str] = None
    total_credit: Optional[int] = None
    usdc: Optional[float] = None


@dataclass
class PaymentLoadMatch:
    address: Optional[str] = None
    api_key: Optional[str] = None
    chain: Optional[str] = None
    credits_added: Optional[int] = None
    ok: Optional[bool] = None
    rate: Optional[str] = None
    token: Optional[str] = None
    total_credit: Optional[int] = None
    tx_hash: Optional[str] = None
    usdc: Optional[float] = None


@dataclass
class PaymentCreateData:
    address: Optional[str] = None
    api_key: Optional[str] = None
    chain: Optional[str] = None
    credits_added: Optional[int] = None
    ok: Optional[bool] = None
    rate: Optional[str] = None
    token: Optional[str] = None
    total_credit: Optional[int] = None
    tx_hash: Optional[str] = None
    usdc: Optional[float] = None


@dataclass
class Service:
    api_url: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    endpoint: Optional[list] = None
    icon: Optional[str] = None
    id: Optional[str] = None
    latency: Optional[float] = None
    name: Optional[str] = None
    status: Optional[str] = None


@dataclass
class ServiceLoadMatch:
    id: str


@dataclass
class ServiceListMatch:
    api_url: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    endpoint: Optional[list] = None
    icon: Optional[str] = None
    id: Optional[str] = None
    latency: Optional[float] = None
    name: Optional[str] = None
    status: Optional[str] = None

