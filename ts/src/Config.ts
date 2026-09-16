
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'AgentGateway',
        slug: "agent-gateway",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
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
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://agent-gateway-kappa.vercel.app",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      analytics: {
      },

      api_key: {
      },

      balance: {
      },

      meta: {
      },

      payment: {
      },

      service: {
      },

    }
  }


  entity = {
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
                  "lit": "api"
                },
                {
                  "lit": "stats"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "stats"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "api_key": {
      "fields": [
        {
          "name": "credits",
          "type": "`$INTEGER`"
        },
        {
          "name": "key",
          "type": "`$STRING`"
        }
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
                  "lit": "api"
                },
                {
                  "lit": "keys"
                },
                {
                  "lit": "create"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "keys",
                "create"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "balance": {
      "fields": [
        {
          "name": "createdAt",
          "short": "Unix timestamp ms",
          "type": "`$INTEGER`"
        },
        {
          "name": "credits",
          "type": "`$INTEGER`"
        }
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
                  "lit": "api"
                },
                {
                  "lit": "keys"
                },
                {
                  "lit": "balance"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "keys",
                "balance"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "meta": {
      "fields": [
        {
          "name": "status",
          "type": "`$STRING`"
        }
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
                  "lit": "health"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "health"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "payment": {
      "fields": [
        {
          "name": "address",
          "type": "`$STRING`"
        },
        {
          "name": "api_key",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "chain",
          "type": "`$STRING`"
        },
        {
          "name": "credits_added",
          "type": "`$INTEGER`"
        },
        {
          "name": "ok",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "rate",
          "type": "`$STRING`"
        },
        {
          "name": "token",
          "type": "`$STRING`"
        },
        {
          "name": "total_credits",
          "type": "`$INTEGER`"
        },
        {
          "name": "tx_hash",
          "req": true,
          "short": "Transaction hash of USDC transfer on Base",
          "type": "`$STRING`"
        },
        {
          "name": "usdc",
          "type": "`$NUMBER`"
        }
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
                  "lit": "api"
                },
                {
                  "lit": "credits"
                },
                {
                  "lit": "topup"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "credits",
                "topup"
              ]
            }
          ]
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
                  "lit": "api"
                },
                {
                  "lit": "payments"
                },
                {
                  "lit": "info"
                }
              ],
              "select": {
                "$action": "info"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "payments",
                "info"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "service": {
      "fields": [
        {
          "name": "apiUrl",
          "type": "`$STRING`"
        },
        {
          "name": "category",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "endpoints",
          "type": "`$ARRAY`"
        },
        {
          "name": "icon",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "latency",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "search",
                    "orig": "search",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/services",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "services"
                }
              ],
              "select": {
                "exist": [
                  "category",
                  "search"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.services`"
              },
              "parts": [
                "api",
                "services"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/api/services/health",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "services"
                },
                {
                  "lit": "health"
                }
              ],
              "select": {
                "$action": "health"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.services`"
              },
              "parts": [
                "api",
                "services",
                "health"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/services/{id}",
              "segments": [
                {
                  "lit": "api"
                },
                {
                  "lit": "services"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "api",
                "services",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

