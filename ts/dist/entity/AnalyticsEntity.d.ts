import { AgentGatewayEntityBase } from '../AgentGatewayEntityBase';
import type { AgentGatewaySDK } from '../AgentGatewaySDK';
import type { Control } from '../types';
import type { Analytics, AnalyticsLoadMatch } from '../AgentGatewayTypes';
declare class AnalyticsEntity extends AgentGatewayEntityBase<Analytics> {
    constructor(client: AgentGatewaySDK, entopts: any);
    make(this: AnalyticsEntity): AnalyticsEntity;
    load(this: any, reqmatch?: AnalyticsLoadMatch, ctrl?: Control): Promise<AnalyticsEntity>;
}
export { AnalyticsEntity };
