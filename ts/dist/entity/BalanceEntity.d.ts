import { AgentGatewayEntityBase } from '../AgentGatewayEntityBase';
import type { AgentGatewaySDK } from '../AgentGatewaySDK';
import type { Control } from '../types';
import type { Balance, BalanceLoadMatch } from '../AgentGatewayTypes';
declare class BalanceEntity extends AgentGatewayEntityBase<Balance> {
    constructor(client: AgentGatewaySDK, entopts: any);
    make(this: BalanceEntity): BalanceEntity;
    load(this: any, reqmatch?: BalanceLoadMatch, ctrl?: Control): Promise<BalanceEntity>;
}
export { BalanceEntity };
