import { TValidateRule, TValidateRules, TValidateResult, TBarricadeOptions } from "./types";
declare class BlueBarricade {
    static addRule(name: string, rule: TValidateRule): void;
    options: {};
    constructor(opts: TBarricadeOptions);
    validate(opts: {
        model: {
            [propName: string]: any;
        };
        rules: TValidateRules[];
    }): Promise<TValidateResult>;
}
export default BlueBarricade;
