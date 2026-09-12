import { Context } from './Context';
declare class AgentGatewayError extends Error {
    isAgentGatewayError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { AgentGatewayError };
