import { AgentGatewayEntityBase } from '../AgentGatewayEntityBase';
import type { AgentGatewaySDK } from '../AgentGatewaySDK';
import type { Control } from '../types';
import type { Meta, MetaLoadMatch } from '../AgentGatewayTypes';
declare class MetaEntity extends AgentGatewayEntityBase<Meta> {
    constructor(client: AgentGatewaySDK, entopts: any);
    make(this: MetaEntity): MetaEntity;
    load(this: any, reqmatch?: MetaLoadMatch, ctrl?: Control): Promise<MetaEntity>;
}
export { MetaEntity };
