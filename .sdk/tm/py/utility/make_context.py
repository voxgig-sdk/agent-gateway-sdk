# AgentGateway SDK utility: make_context

from core.context import AgentGatewayContext


def make_context_util(ctxmap, basectx):
    return AgentGatewayContext(ctxmap, basectx)
