<?php
declare(strict_types=1);

// AgentGateway SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AgentGatewayMakeContext
{
    public static function call(array $ctxmap, ?AgentGatewayContext $basectx): AgentGatewayContext
    {
        return new AgentGatewayContext($ctxmap, $basectx);
    }
}
