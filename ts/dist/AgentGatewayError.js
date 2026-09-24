"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentGatewayError = void 0;
class AgentGatewayError extends Error {
    isAgentGatewayError = true;
    sdk = 'AgentGateway';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.AgentGatewayError = AgentGatewayError;
//# sourceMappingURL=AgentGatewayError.js.map