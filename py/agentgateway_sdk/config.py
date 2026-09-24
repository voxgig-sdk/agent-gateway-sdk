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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
                "parts": [
                  "api",
                  "stats",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
            "title": "Credits",
            "type": "`$INTEGER`",
          },
          {
            "name": "key",
            "title": "Key",
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
                "parts": [
                  "api",
                  "keys",
                  "create",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
            "title": "Created At",
            "type": "`$INTEGER`",
            "short": "Unix timestamp ms",
          },
          {
            "name": "credits",
            "title": "Credits",
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
                "parts": [
                  "api",
                  "keys",
                  "balance",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
            "title": "Status",
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
                "kind": "http",
                "method": "GET",
                "orig": "/health",
                "segments": [
                  {
                    "lit": "health",
                  },
                ],
                "parts": [
                  "health",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
            "name": "api_key",
            "title": "Api Key",
            "type": "`$STRING`",
            "req": True,
          },
          {
            "name": "credits_added",
            "title": "Credits Added",
            "type": "`$INTEGER`",
          },
          {
            "name": "ok",
            "title": "Ok",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "total_credits",
            "title": "Total Credits",
            "type": "`$INTEGER`",
          },
          {
            "name": "tx_hash",
            "title": "Tx Hash",
            "type": "`$STRING`",
            "req": True,
            "short": "Transaction hash of USDC transfer on Base",
          },
          {
            "name": "usdc",
            "title": "Usdc",
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
                "parts": [
                  "api",
                  "credits",
                  "topup",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
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
                "parts": [
                  "api",
                  "payments",
                  "info",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {
                  "$action": "info",
                },
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
            "title": "Api Url",
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "title": "Category",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
          },
          {
            "name": "endpoints",
            "title": "Endpoints",
            "type": "`$ARRAY`",
          },
          {
            "name": "icon",
            "title": "Icon",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
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
                "parts": [
                  "api",
                  "services",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.services`",
                },
                "args": {
                  "query": [
                    {
                      "name": "category",
                      "orig": "category",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "category",
                    "search",
                  ],
                },
              },
              {
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
                "parts": [
                  "api",
                  "services",
                  "health",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.services`",
                },
                "args": {},
                "select": {
                  "$action": "health",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
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
                "parts": [
                  "api",
                  "services",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "crypto-feeds",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
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
