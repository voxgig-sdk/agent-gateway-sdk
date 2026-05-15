-- AgentGateway SDK error

local AgentGatewayError = {}
AgentGatewayError.__index = AgentGatewayError


function AgentGatewayError.new(code, msg, ctx)
  local self = setmetatable({}, AgentGatewayError)
  self.is_sdk_error = true
  self.sdk = "AgentGateway"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AgentGatewayError:error()
  return self.msg
end


function AgentGatewayError:__tostring()
  return self.msg
end


return AgentGatewayError
