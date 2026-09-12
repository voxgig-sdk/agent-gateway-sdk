import { AgentGatewayEntityBase } from '../AgentGatewayEntityBase';
import type { AgentGatewaySDK } from '../AgentGatewaySDK';
import type { Control } from '../types';
import type { ApiKey, ApiKeyCreateData } from '../AgentGatewayTypes';
declare class ApiKeyEntity extends AgentGatewayEntityBase<ApiKey> {
    constructor(client: AgentGatewaySDK, entopts: any);
    make(this: ApiKeyEntity): ApiKeyEntity;
    create(this: any, reqdata?: ApiKeyCreateData, ctrl?: Control): Promise<ApiKeyEntity>;
}
export { ApiKeyEntity };
