export interface Analytics {
}
export interface AnalyticsLoadMatch {
}
export interface ApiKey {
    credits?: number;
    key?: string;
}
export interface ApiKeyCreateData {
    credits?: number;
    key?: string;
}
export interface Balance {
    createdAt?: number;
    credits?: number;
}
export interface BalanceLoadMatch {
    createdAt?: number;
    credits?: number;
}
export interface Meta {
    status?: string;
}
export interface MetaLoadMatch {
    status?: string;
}
export interface Payment {
    address?: string;
    api_key: string;
    chain?: string;
    credits_added?: number;
    ok?: boolean;
    rate?: string;
    token?: string;
    total_credits?: number;
    tx_hash: string;
    usdc?: number;
}
export interface PaymentLoadMatch {
    address?: string;
    api_key?: string;
    chain?: string;
    credits_added?: number;
    ok?: boolean;
    rate?: string;
    token?: string;
    total_credits?: number;
    tx_hash?: string;
    usdc?: number;
    $action?: string;
    [action: string]: any;
}
export interface PaymentCreateData {
    address?: string;
    api_key: string;
    chain?: string;
    credits_added?: number;
    ok?: boolean;
    rate?: string;
    token?: string;
    total_credits?: number;
    tx_hash: string;
    usdc?: number;
}
export interface Service {
    apiUrl?: string;
    category?: string;
    description?: string;
    endpoints?: any[];
    icon?: string;
    id?: string;
    latency?: number;
    name?: string;
    status?: string;
}
export interface ServiceLoadMatch {
    id: string;
}
export interface ServiceListMatch {
    category?: string;
    search?: string;
    $action?: string;
    [action: string]: any;
}
