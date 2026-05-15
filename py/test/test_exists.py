# ProjectName SDK exists test

import pytest
from agentgateway_sdk import AgentGatewaySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AgentGatewaySDK.test(None, None)
        assert testsdk is not None
