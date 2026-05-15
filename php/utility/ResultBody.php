<?php
declare(strict_types=1);

// AgentGateway SDK utility: result_body

class AgentGatewayResultBody
{
    public static function call(AgentGatewayContext $ctx): ?AgentGatewayResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
