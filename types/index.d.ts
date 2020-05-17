import { TBarricadeOpts, TValidateRule, TValidateRules } from "./types-validate";
declare class BlueBarricade {
    private options;
    constructor(options: TBarricadeOpts);
    static addRule(name: string, rule: TValidateRule): void;
    validate(rules: TValidateRules[]): Promise<any>;
}
export default BlueBarricade;
