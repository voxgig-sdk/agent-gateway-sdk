<?php
declare(strict_types=1);

// AgentGateway SDK configuration

class AgentGatewayConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "AgentGateway",
                "slug" => "agent-gateway",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://agent-gateway-kappa.vercel.app",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "analytics" => [],
                    "api_key" => [],
                    "balance" => [],
                    "meta" => [],
                    "payment" => [],
                    "service" => [],
                ],
            ],
            "entity" => [
        'analytics' => [
          'fields' => [],
          'name' => 'analytics',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/stats',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'stats',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'stats',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'api_key' => [
          'fields' => [
            [
              'name' => 'credits',
              'title' => 'Credits',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'key',
              'title' => 'Key',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'api_key',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/keys/create',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'keys',
                    ],
                    [
                      'lit' => 'create',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'keys',
                    'create',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'balance' => [
          'fields' => [
            [
              'name' => 'createdAt',
              'title' => 'Created At',
              'type' => '`$INTEGER`',
              'short' => 'Unix timestamp ms',
            ],
            [
              'name' => 'credits',
              'title' => 'Credits',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'balance',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/keys/balance',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'keys',
                    ],
                    [
                      'lit' => 'balance',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'keys',
                    'balance',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'meta' => [
          'fields' => [
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'meta',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/health',
                  'segments' => [
                    [
                      'lit' => 'health',
                    ],
                  ],
                  'parts' => [
                    'health',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'payment' => [
          'fields' => [
            [
              'name' => 'api_key',
              'title' => 'Api Key',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'credits_added',
              'title' => 'Credits Added',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'ok',
              'title' => 'Ok',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'total_credits',
              'title' => 'Total Credits',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'tx_hash',
              'title' => 'Tx Hash',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Transaction hash of USDC transfer on Base',
            ],
            [
              'name' => 'usdc',
              'title' => 'Usdc',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'payment',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/credits/topup',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'credits',
                    ],
                    [
                      'lit' => 'topup',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'credits',
                    'topup',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/payments/info',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'payments',
                    ],
                    [
                      'lit' => 'info',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'payments',
                    'info',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [
                    '$action' => 'info',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'service' => [
          'fields' => [
            [
              'name' => 'apiUrl',
              'title' => 'Api Url',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'category',
              'title' => 'Category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'title' => 'Description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'endpoints',
              'title' => 'Endpoints',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'icon',
              'title' => 'Icon',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'service',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/services',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'services',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'services',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.services`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                      [
                        'name' => 'search',
                        'orig' => 'search',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'search',
                    ],
                  ],
                ],
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/services/health',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'services',
                    ],
                    [
                      'lit' => 'health',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'services',
                    'health',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.services`',
                  ],
                  'args' => [],
                  'select' => [
                    '$action' => 'health',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/services/{id}',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'services',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'services',
                    '{id}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 'crypto-feeds',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return AgentGatewayFeatures::make_feature($name);
    }
}
