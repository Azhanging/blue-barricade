import { TValidateRules, TValidateModel, TValidateResult } from "./types";
export declare function validate(opts: {
    rules: TValidateRules[];
    model: TValidateModel;
}): TValidateResult;
