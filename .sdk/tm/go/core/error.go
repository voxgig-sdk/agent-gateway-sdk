package core

type AgentGatewayError struct {
	IsAgentGatewayError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAgentGatewayError(code string, msg string, ctx *Context) *AgentGatewayError {
	return &AgentGatewayError{
		IsAgentGatewayError: true,
		Sdk:              "AgentGateway",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AgentGatewayError) Error() string {
	return e.Msg
}
