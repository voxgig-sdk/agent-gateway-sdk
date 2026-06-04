# AgentGateway SDK

Call 40+ services — DNS, screenshots, crypto prices, scraping, code execution, geo, PDF — behind one API key

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Agent Gateway

[Agent Gateway](https://agent-gateway-kappa.vercel.app) is a hosted API gateway that fronts 40+ production services behind a single API key, aimed at AI agents and automation workloads. Categories include infrastructure, DeFi, blockchain data, security, and gaming.

What you get from the API:

- A catalogue endpoint listing every available service (e.g. `GET /api/services`) and a health endpoint reporting real-time status (`GET /api/services/health`).
- Concrete service endpoints such as live cryptocurrency price feeds at `GET /api/price/{SYMBOL}`, plus DNS lookups, screenshots, web scraping, sandboxed code execution, geolocation, and PDF processing.
- API key management — generate a key instantly with `POST /api/keys/create` and check remaining credits with `GET /api/keys/balance`.
- A payment flow built on HTTP 402: requests without sufficient credit return `402 Payment Required` with payment details, and agents retry the request with a USDC-on-Base transaction hash.

Operational notes: authentication is by Bearer token in the `Authorization` header, keys are issued without signup, and the free tier is rate-limited to 50 requests per day. Pricing is metered in credits (1 USDC = 500 credits) that never expire.

## Try it

**TypeScript**
```bash
npm install agent-gateway
```

**Python**
```bash
pip install agent-gateway-sdk
```

**PHP**
```bash
composer require voxgig/agent-gateway-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/agent-gateway-sdk/go
```

**Ruby**
```bash
gem install agent-gateway-sdk
```

**Lua**
```bash
luarocks install agent-gateway-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AgentGatewaySDK } from 'agent-gateway'

const client = new AgentGatewaySDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o agent-gateway-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "agent-gateway": {
      "command": "/abs/path/to/agent-gateway-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Analytics** | Usage and health analytics for the gateway and its underlying services, surfaced via endpoints like `GET /api/services/health`. | `/api/stats` |
| **ApiKey** | API key lifecycle — instantly issued bearer tokens created via `POST /api/keys/create` and used in the `Authorization` header. | `/api/keys/create` |
| **Balance** | Credit balance for an API key, queried via `GET /api/keys/balance`; credits are denominated against the 1 USDC = 500 credits rate. | `/api/keys/balance` |
| **Meta** | Gateway-level metadata such as the service catalogue and overall status. | `/health` |
| **Payment** | USDC-on-Base payment records and the HTTP 402 Payment Required flow that lets agents pay per request and resume with a transaction hash. | `/api/credits/topup` |
| **Service** | An individual upstream service exposed through the gateway (DNS, screenshots, crypto prices, scraping, code execution, geo, PDF, etc.), listed at `GET /api/services`. | `/api/services` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from agentgateway_sdk import AgentGatewaySDK

client = AgentGatewaySDK({})


# Load a specific analytics
analytics, err = client.Analytics(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'agentgateway_sdk.php';

$client = new AgentGatewaySDK([]);


// Load a specific analytics
[$analytics, $err] = $client->Analytics(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/agent-gateway-sdk/go"

client := sdk.NewAgentGatewaySDK(map[string]any{})

```

### Ruby

```ruby
require_relative "AgentGateway_sdk"

client = AgentGatewaySDK.new({})


# Load a specific analytics
analytics, err = client.Analytics(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("agent-gateway_sdk")

local client = sdk.new({})


-- Load a specific analytics
local analytics, err = client:Analytics(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AgentGatewaySDK.test()
const result = await client.Analytics().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AgentGatewaySDK.test(None, None)
result, err = client.Analytics(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AgentGatewaySDK::test(null, null);
[$result, $err] = $client->Analytics(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Analytics(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AgentGatewaySDK.test(nil, nil)
result, err = client.Analytics(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Analytics(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Agent Gateway

- Upstream: [https://agent-gateway-kappa.vercel.app](https://agent-gateway-kappa.vercel.app)

- Proprietary service operated as a hosted gateway; no open-source licence is published.
- Free tier of 50 requests per day with no credit card required.
- Paid usage is pay-as-you-go: 1 USDC = 500 credits, credits do not expire.
- Payments settle in USDC on the Base network, including per-request HTTP 402 Payment Required flows for AI agents.

---

Generated from the Agent Gateway OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
