<?php
declare(strict_types=1);

// AgentGateway SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AgentGatewayFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AgentGatewayBaseFeature();
            case "test":
                return new AgentGatewayTestFeature();
            default:
                return new AgentGatewayBaseFeature();
        }
    }
}
