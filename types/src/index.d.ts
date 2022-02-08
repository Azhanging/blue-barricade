import { TValidateRule, TValidations, TValidateResult, TBarricadeOptions } from "./types";
declare class BlueBarricade {
    static addRule(name: string, rule: TValidateRule): void;
    options: {};
    constructor(opts: TBarricadeOptions);
    validate(opts: {
        model: {
            [propName: string]: any;
        };
        rules: TValidations[];
    }): Promise<TValidateResult>;
}
export default BlueBarricade;
