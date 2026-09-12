import { AnalyticsEntity } from './entity/AnalyticsEntity';
import { ApiKeyEntity } from './entity/ApiKeyEntity';
import { BalanceEntity } from './entity/BalanceEntity';
import { MetaEntity } from './entity/MetaEntity';
import { PaymentEntity } from './entity/PaymentEntity';
import { ServiceEntity } from './entity/ServiceEntity';
export type * from './AgentGatewayTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AgentGatewayEntityBase } from './AgentGatewayEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class AgentGatewaySDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Analytics(entopts?: Record<string, any>): AnalyticsEntity;
    ApiKey(entopts?: Record<string, any>): ApiKeyEntity;
    Balance(entopts?: Record<string, any>): BalanceEntity;
    Meta(entopts?: Record<string, any>): MetaEntity;
    Payment(entopts?: Record<string, any>): PaymentEntity;
    Service(entopts?: Record<string, any>): ServiceEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AgentGatewaySDK;
    tester(testopts?: any, sdkopts?: any): AgentGatewaySDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AgentGatewaySDK;
export { stdutil, config, BaseFeature, AgentGatewayEntityBase, AgentGatewaySDK, SDK, };
