# AgentGateway SDK feature factory

from feature.base_feature import AgentGatewayBaseFeature
from feature.test_feature import AgentGatewayTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AgentGatewayBaseFeature(),
        "test": lambda: AgentGatewayTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
