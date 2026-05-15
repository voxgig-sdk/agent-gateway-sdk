package = "voxgig-sdk-agent-gateway"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/agent-gateway-sdk.git"
}
description = {
  summary = "AgentGateway SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["agent-gateway_sdk"] = "agent-gateway_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
