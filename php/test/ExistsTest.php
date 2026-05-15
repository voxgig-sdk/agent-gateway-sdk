<?php
declare(strict_types=1);

// AgentGateway SDK exists test

require_once __DIR__ . '/../agentgateway_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AgentGatewaySDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
