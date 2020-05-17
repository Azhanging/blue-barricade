import { TRuleMessage, TValidateRule, TValidateRules } from "./types-validate";
import $rules from './rules';
import utils from './utils';

//是够为深层次的数据
function isDeepModel ( prop: string ) {
	return /\.|\[.+\]/.test(`${prop}`);
}

//深度获取数据
function deepModel ( opts: {
	model: any;
	prop: string
} ): any {
	const { model, prop } = opts;
	const splitProp = prop.split(`.`);
	const currentProp = splitProp.shift();
	const currentModel = model[ currentProp ];
	if (splitProp.length > 0) {
		if (!(currentModel instanceof Object || currentModel instanceof Array)) {
			return undefined;
		}
		return deepModel({
			model: currentModel,
			prop: splitProp.join(`.`)
		});
	}
	return currentModel;
}

function getMessage ( message: TRuleMessage, value?: any ) {
	return utils.hook(null, message, [value]);
}

//验证规则
function validateRules ( opts: {
	prop: string;
	rules: TValidateRule[];
	value: any;
} ) {
	const { rules, value, prop } = opts;
	let error = ``;
	for (const item of rules) {
		const { rule, message } = item;
		if (error) break;
		if (rule instanceof RegExp) {
			if (rule.test(value)) continue;
			error = getMessage(message, value);
		} else if (typeof rule === 'string') {
			//内置方法
			const currentRule = $rules[ rule ];
			const { rule: $rule, message: $message } = currentRule;
			if ($rule instanceof RegExp) {
				if ($rule.test(value)) continue;
			} else if (typeof $rule === 'function') {
				if ($rule(value)) continue;
			} else {
				console.error(`rule is not RegExp or Function`);
				continue;
			}
			error = getMessage(message || $message || `validate ${prop} error`, value);
		} else if (typeof rule === 'function') {
			if (rule(value)) continue;
			error = getMessage(message, value);
		}
	}
	return error;
}

//验证器
export function validate ( opts ) {
	const { rules, model }: {
		rules: TValidateRules[];
		model: any;
	} = opts;
	const errors = [];
	rules.forEach(( rule ) => {
		let value = null;
		if (isDeepModel(rule.prop)) {
			//深度数据
			value = deepModel({
				model,
				prop: rule.prop
			});
		} else {
			value = model[ rule.prop ];
		}
		//非必须校验
		if ((value === '' || value === undefined || value === null) && rule.required === false) return;
		//验证规则
		const error = validateRules({
			prop: rule.prop,
			rules: rule.rules,
			value
		});
		if (error) {
			errors.push(error);
		}
	});
	return {
		errors,
		status: errors.length === 0,
		errorMessage: errors.join(`,`)
	};
}