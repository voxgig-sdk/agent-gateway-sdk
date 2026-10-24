"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "analytics",
        "accessor": "Analytics",
        "op": "load",
        "method": "GET",
        "path": "/api/stats",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "api_key",
        "accessor": "ApiKey",
        "op": "create",
        "method": "POST",
        "path": "/api/keys/create",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "key": "gw_abc123...",
            "credits": 200
        },
        "idField": "id"
    },
    {
        "entity": "balance",
        "accessor": "Balance",
        "op": "load",
        "method": "GET",
        "path": "/api/keys/balance",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "credits": 150,
            "createdAt": 1709000000000
        },
        "idField": "id"
    },
    {
        "entity": "meta",
        "accessor": "Meta",
        "op": "load",
        "method": "GET",
        "path": "/health",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "status": "ok"
        },
        "idField": "id"
    },
    {
        "entity": "payment",
        "accessor": "Payment",
        "op": "create",
        "method": "POST",
        "path": "/api/credits/topup",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "ok": true,
            "usdc": 1,
            "credits_added": 1,
            "total_credits": 1
        },
        "idField": "id"
    },
    {
        "entity": "payment",
        "accessor": "Payment",
        "op": "load",
        "method": "GET",
        "path": "/api/payments/info",
        "action": "info",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "chain": "Base (L2)",
            "token": "USDC",
            "address": "x",
            "rate": "500 credits per 1 USDC"
        },
        "idField": "id"
    },
    {
        "entity": "service",
        "accessor": "Service",
        "op": "list",
        "method": "GET",
        "path": "/api/services",
        "args": [],
        "select": {
            "category": "v1",
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "category",
            "search"
        ],
        "queryArgs": [
            {
                "name": "category",
                "wire": "category"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "services": [
                {
                    "id": "x",
                    "name": "x",
                    "description": "x",
                    "category": "infrastructure",
                    "icon": "x",
                    "apiUrl": "x",
                    "endpoints": [
                        "x"
                    ]
                }
            ],
            "count": 1,
            "total": 1
        },
        "idField": "id"
    },
    {
        "entity": "service",
        "accessor": "Service",
        "op": "list",
        "method": "GET",
        "path": "/api/services/health",
        "action": "health",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "services": [
                {
                    "id": "x",
                    "name": "x",
                    "status": "online",
                    "latency": 1
                }
            ],
            "online": 1,
            "offline": 1
        },
        "idField": "id"
    },
    {
        "entity": "service",
        "accessor": "Service",
        "op": "load",
        "method": "GET",
        "path": "/api/services/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "crypto-feeds"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "id": "x",
            "name": "x",
            "description": "x",
            "category": "infrastructure",
            "icon": "x",
            "apiUrl": "x",
            "endpoints": [
                "x"
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map