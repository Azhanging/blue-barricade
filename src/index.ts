import { validate } from './validate';
import { TBarricadeOpts, TValidateRule, TValidateRules } from "./types-validate";
import rules from './rules';

class BlueBarricade {

	private options: TBarricadeOpts;

	constructor ( options: TBarricadeOpts ) {
		this.options = options;
	}

	//添加规则
	static addRule ( name: string, rule: TValidateRule ) {
		if (rules[ name ]) {
			return console.error(`has same ${name} rule`);
		}
		rules[ name ] = rule;
	}

	//验证
	validate ( rules: TValidateRules[] ): Promise<any> {
		const { options } = this;
		return new Promise(( resolve, reject ) => {
			const result = validate({
				rules,
				model: options.model
			});
			//验证成功
			return resolve(result);
		});
	}
}

export default BlueBarricade;