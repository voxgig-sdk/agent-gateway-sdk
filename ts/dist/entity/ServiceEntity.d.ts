import { AgentGatewayEntityBase } from '../AgentGatewayEntityBase';
import type { AgentGatewaySDK } from '../AgentGatewaySDK';
import type { Control } from '../types';
import type { Service, ServiceLoadMatch, ServiceListMatch } from '../AgentGatewayTypes';
declare class ServiceEntity extends AgentGatewayEntityBase<Service> {
    constructor(client: AgentGatewaySDK, entopts: any);
    make(this: ServiceEntity): ServiceEntity;
    load(this: any, reqmatch?: ServiceLoadMatch, ctrl?: Control): Promise<ServiceEntity>;
    list(this: any, reqmatch?: ServiceListMatch, ctrl?: Control): Promise<ServiceEntity[]>;
}
export { ServiceEntity };
