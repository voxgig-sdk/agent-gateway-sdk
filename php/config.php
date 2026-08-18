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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
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
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/stats',
                  'parts' => [
                    'api',
                    'stats',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'key',
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
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/keys/create',
                  'parts' => [
                    'api',
                    'keys',
                    'create',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'credits',
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
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/keys/balance',
                  'parts' => [
                    'api',
                    'keys',
                    'balance',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/health',
                  'parts' => [
                    'health',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
              'name' => 'address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'api_key',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'chain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'credits_added',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'ok',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'rate',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'token',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'total_credits',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'tx_hash',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'usdc',
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
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/credits/topup',
                  'parts' => [
                    'api',
                    'credits',
                    'topup',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/payments/info',
                  'parts' => [
                    'api',
                    'payments',
                    'info',
                  ],
                  'select' => [
                    '$action' => 'info',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'category',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'endpoints',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'icon',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'latency',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'service',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'search',
                        'orig' => 'search',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/services',
                  'parts' => [
                    'api',
                    'services',
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'search',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.services`',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/services/health',
                  'parts' => [
                    'api',
                    'services',
                    'health',
                  ],
                  'select' => [
                    '$action' => 'health',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.services`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'crypto-feeds',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/services/{id}',
                  'parts' => [
                    'api',
                    'services',
                    '{id}',
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
