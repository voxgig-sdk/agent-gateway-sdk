import { AgentGatewayEntityBase } from '../AgentGatewayEntityBase';
import type { AgentGatewaySDK } from '../AgentGatewaySDK';
import type { Control } from '../types';
import type { Payment, PaymentLoadMatch, PaymentCreateData } from '../AgentGatewayTypes';
declare class PaymentEntity extends AgentGatewayEntityBase<Payment> {
    constructor(client: AgentGatewaySDK, entopts: any);
    make(this: PaymentEntity): PaymentEntity;
    load(this: any, reqmatch?: PaymentLoadMatch, ctrl?: Control): Promise<PaymentEntity>;
    create(this: any, reqdata?: PaymentCreateData, ctrl?: Control): Promise<PaymentEntity>;
}
export { PaymentEntity };
