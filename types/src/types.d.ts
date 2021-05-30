export declare type TRuleMessage = string | Function;
export interface TRuleFunction {
    (value: any): boolean;
}
export interface TBarricadeOptions {
    hooks?: {
        error?: () => number;
    };
}
export interface TErrors {
    prop: string;
    value: any;
    message: string;
}
export interface TValidateResult {
    errors: TErrors[];
    status: boolean;
    errorMessage: string;
}
export interface TValidateModel {
    [propName: string]: any;
}
export interface TValidateRule {
    rule: string | RegExp | TRuleFunction;
    message?: TRuleMessage;
}
export interface TValidateRules {
    prop: string;
    rules: TValidateRule[];
    required?: boolean;
}
