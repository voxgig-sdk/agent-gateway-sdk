# Typed models for the AgentGateway SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Analytics(TypedDict):
    pass


class AnalyticsLoadMatch(TypedDict):
    pass


class ApiKey(TypedDict, total=False):
    credit: int
    key: str


class ApiKeyCreateData(TypedDict, total=False):
    credit: int
    key: str


class Balance(TypedDict, total=False):
    created_at: int
    credit: int


class BalanceLoadMatch(TypedDict, total=False):
    created_at: int
    credit: int


class Meta(TypedDict, total=False):
    status: str


class MetaLoadMatch(TypedDict, total=False):
    status: str


class PaymentRequired(TypedDict):
    api_key: str
    tx_hash: str


class Payment(PaymentRequired, total=False):
    address: str
    chain: str
    credits_added: int
    ok: bool
    rate: str
    token: str
    total_credit: int
    usdc: float


class PaymentLoadMatch(TypedDict, total=False):
    address: str
    api_key: str
    chain: str
    credits_added: int
    ok: bool
    rate: str
    token: str
    total_credit: int
    tx_hash: str
    usdc: float


class PaymentCreateDataRequired(TypedDict):
    api_key: str
    tx_hash: str


class PaymentCreateData(PaymentCreateDataRequired, total=False):
    address: str
    chain: str
    credits_added: int
    ok: bool
    rate: str
    token: str
    total_credit: int
    usdc: float


class Service(TypedDict, total=False):
    api_url: str
    category: str
    description: str
    endpoint: list
    icon: str
    id: str
    latency: float
    name: str
    status: str


class ServiceLoadMatch(TypedDict):
    id: str


class ServiceListMatch(TypedDict, total=False):
    api_url: str
    category: str
    description: str
    endpoint: list
    icon: str
    id: str
    latency: float
    name: str
    status: str
