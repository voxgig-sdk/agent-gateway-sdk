# AgentGateway SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "AgentGateway",
            "slug": "agent-gateway",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://agent-gateway-kappa.vercel.app",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "analytics": {},
                "api_key": {},
                "balance": {},
                "meta": {},
                "payment": {},
                "service": {},
            },
        },
        "entity": {
      "analytics": {
        "fields": [],
        "name": "analytics",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/stats",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "stats",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "stats",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "api_key": {
        "fields": [
          {
            "name": "credits",
            "type": "`$INTEGER`",
          },
          {
            "name": "key",
            "type": "`$STRING`",
          },
        ],
        "name": "api_key",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/keys/create",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "keys",
                  },
                  {
                    "lit": "create",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "keys",
                  "create",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "balance": {
        "fields": [
          {
            "name": "createdAt",
            "short": "Unix timestamp ms",
            "type": "`$INTEGER`",
          },
          {
            "name": "credits",
            "type": "`$INTEGER`",
          },
        ],
        "name": "balance",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/keys/balance",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "keys",
                  },
                  {
                    "lit": "balance",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "keys",
                  "balance",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "meta": {
        "fields": [
          {
            "name": "status",
            "type": "`$STRING`",
          },
        ],
        "name": "meta",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/health",
                "segments": [
                  {
                    "lit": "health",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "health",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "payment": {
        "fields": [
          {
            "name": "address",
            "type": "`$STRING`",
          },
          {
            "name": "api_key",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "chain",
            "type": "`$STRING`",
          },
          {
            "name": "credits_added",
            "type": "`$INTEGER`",
          },
          {
            "name": "ok",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "rate",
            "type": "`$STRING`",
          },
          {
            "name": "token",
            "type": "`$STRING`",
          },
          {
            "name": "total_credits",
            "type": "`$INTEGER`",
          },
          {
            "name": "tx_hash",
            "req": True,
            "short": "Transaction hash of USDC transfer on Base",
            "type": "`$STRING`",
          },
          {
            "name": "usdc",
            "type": "`$NUMBER`",
          },
        ],
        "name": "payment",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/credits/topup",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "credits",
                  },
                  {
                    "lit": "topup",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "credits",
                  "topup",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/payments/info",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "payments",
                  },
                  {
                    "lit": "info",
                  },
                ],
                "select": {
                  "$action": "info",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "payments",
                  "info",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "service": {
        "fields": [
          {
            "name": "apiUrl",
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "endpoints",
            "type": "`$ARRAY`",
          },
          {
            "name": "icon",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "latency",
            "type": "`$NUMBER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "service",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/services",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "services",
                  },
                ],
                "select": {
                  "exist": [
                    "category",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.services`",
                },
                "parts": [
                  "api",
                  "services",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/services/health",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "services",
                  },
                  {
                    "lit": "health",
                  },
                ],
                "select": {
                  "$action": "health",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.services`",
                },
                "parts": [
                  "api",
                  "services",
                  "health",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "crypto-feeds",
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api/services/{id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "services",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "api",
                  "services",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
