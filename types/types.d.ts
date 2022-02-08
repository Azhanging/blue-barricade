export declare type TRuleMessage = string | Function;
export interface TRuleFunction {
    (value: any): boolean;
}
export interface TBarricadeOptions {
    hooks?: {
        error?: (result: TValidateResult) => number;
    };
    concatErrorMessage?: boolean;
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
    errorPropsMessage: any;
}
export interface TValidateModel {
    [propName: string]: any;
}
export interface TValidateRule {
    rule: string | RegExp | TRuleFunction;
    message?: TRuleMessage;
}
export interface TValidations {
    prop: string;
    type?: `array` | `string` | `object` | `number` | `undefined`;
    rules: TValidateRule[];
    required?: boolean;
    isIterator?: boolean;
    iteratorIndex: number;
}
