<?php
declare(strict_types=1);

// AgentGateway SDK utility: feature_add

class AgentGatewayFeatureAdd
{
    public static function call(AgentGatewayContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
