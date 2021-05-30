import {TRuleMessage, TValidateRule, TValidateRules, TValidateModel, TValidateResult, TErrors} from "./types";
import $rules from './rules';
import utils from './utils';

//是够为深层次的数据
function isDeepModel ( prop: string ) {
	return /\.|\[.+\]/.test(`${prop}`);
}

//深度获取数据
function deepModel ( opts: {
	model: TValidateModel;
	prop: string;
} ): any {
	const {model, prop} = opts;
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
} ): string {
	const {rules, value, prop} = opts;
	let error = ``;
	for (const ruleItem of rules) {
		//如果当前的rules组中已经产生错误了，则跳出
		if (error) break;
		//当前规则
		let rule;
		//错误信息
		let message;
		if (typeof ruleItem !== 'string') {
			//设置当前的规则
			rule = ruleItem.rule;
			message = ruleItem.message;
		} else {
			rule = ruleItem;
		}
		if (rule instanceof RegExp) {
			if (rule.test(value)) continue;
			error = getMessage(message, value);
		} else if (typeof rule === 'string') {
			//内置方法
			const currentRule = $rules[ rule ];
			//内置规则不存在，则抛出异常
			if (!currentRule) throw (`${rule} rule is undefined`);
			const {rule: $rule, message: $message} = currentRule;
			if ($rule instanceof RegExp) {
				if (value === undefined || value === null || $rule.test(value)) continue;
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
export function validate ( opts ): TValidateResult {
	const {rules, model}: {
		rules: TValidateRules[];
		model: TValidateModel;
	} = opts;
	//错误集合`
	const errors: TErrors[] = [];
	//错误信息集合
	const errorsMessage: string[] = [];
	rules.forEach(( rule ) => {
		let value;
		const {prop, rules: fieldRules} = rule;
		if (isDeepModel(prop)) {
			//深度数据
			value = deepModel({
				model,
				prop
			});
		} else {
			value = model[ prop ];
		}
		//非必须校验
		if ((value === '' || value === undefined || value === null) && rule.required === false) return;
		//验证规则
		const error = validateRules({
			prop,
			rules: fieldRules,
			value
		});
		if (error) {
			//记录错误信息
			errorsMessage.push(error);
			//记录错误组
			errors.push({
				prop,
				value,
				message: error
			});
		}
	});

	const errorResult = {
		errors,
		status: errors.length === 0,
		errorMessage: errorsMessage.join(`,`)
	};

	const {hooks} = this.options;
	//错误钩子调用
	utils.hook(this, hooks.error, [errorResult]);
	return errorResult;
}