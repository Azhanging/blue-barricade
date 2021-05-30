import {validate} from './validate';
import {TValidateRule, TValidateRules, TValidateResult, TBarricadeOptions} from "./types";
import rules from './rules';

class BlueBarricade {

	//添加规则
	static addRule ( name: string, rule: TValidateRule ) {
		if (rules[ name ]) {
			throw(`has same ${name} rule`);
		}
		rules[ name ] = rule;
	}

	public options: TBarricadeOptions = {};

	constructor ( opts: TBarricadeOptions ) {
		this.options = Object.assign({
			hooks: {}
		}, opts, {});
	}

	//验证
	validate ( opts: {
		model: {
			[ propName: string ]: any;
		},
		rules: TValidateRules[]
	} ): Promise<TValidateResult> {
		const {
			model,
			rules
		} = opts
		return new Promise(( resolve ) => {
			//验证成功
			return resolve(validate.call(this, {
				rules,
				model
			}));
		});
	}
}

export default BlueBarricade;