<?php
declare(strict_types=1);

// AgentGateway SDK utility: prepare_body

class AgentGatewayPrepareBody
{
    public static function call(AgentGatewayContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
