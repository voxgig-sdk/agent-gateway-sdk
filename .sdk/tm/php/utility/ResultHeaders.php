<?php
declare(strict_types=1);

// AgentGateway SDK utility: result_headers

class AgentGatewayResultHeaders
{
    public static function call(AgentGatewayContext $ctx): ?AgentGatewayResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
