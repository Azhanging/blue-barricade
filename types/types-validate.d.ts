export declare type TRuleMessage = string | Function;
export interface TBarricadeOpts {
    model: {
        [field: string]: any;
    };
}
export interface TRuleFunction {
    (value: any): boolean;
}
export interface TValidateRule {
    rule: string | RegExp | TRuleFunction;
    message: TRuleMessage;
}
export interface TValidations {
    prop: string;
    rules: TValidateRule[];
    required: boolean;
}
