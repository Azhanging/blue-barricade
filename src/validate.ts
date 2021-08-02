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
		if (!(currentModel instanceof Object || currentModel instanceof Array)) return undefined;
		return deepModel({
			model: currentModel,
			prop: splitProp.join(`.`)
		});
	}
	return currentModel;
}

function getMessage ( opts: {
	message: TRuleMessage;
	value?: any;
	prop: string;
} ) {
	const {
		message,
		value,
		prop
	} = opts;
	return utils.hook(null, message || `validate ${prop} error`, [value]);
}

//验证规则
function validateRules ( opts: {
	prop: string;
	rules: TValidateRule[];
	value: any;
	//是否为迭代器类型
	isIterator?: boolean;
	//迭代器索引
	iteratorIndex?: number;
} ): string {
	const {rules, value, prop, isIterator, iteratorIndex} = opts;
	let error = ``;
	for (const ruleItem of rules) {
		//如果当前的rules组中已经产生错误了，则跳出
		if (error) break;
		//当前规则
		let rule;
		//错误信息
		let message;

		//函数类型验证处理
		const fnValidate = ( ruleFn: Function ): boolean => {
			//验证结果
			const validateResult = ruleFn({
				value,
				isIterator,
				iteratorIndex
			});
			if (typeof validateResult.status === 'boolean') {
				const {status, message: validateMessage} = validateResult;
				if (status === false && validateMessage) {
					message = validateMessage;
				} else if (status === true) {
					return true;
				}
			} else if (typeof validateResult === 'boolean' && validateResult) {
				return true;
			}
			return false;
		};

		if (typeof ruleItem !== 'string') {
			//设置当前的规则
			rule = ruleItem.rule;
			message = ruleItem.message;
		} else {
			rule = ruleItem;
		}
		if (rule instanceof RegExp) {
			if (rule.test(value)) continue;
			error = getMessage({
				message,
				value,
				prop
			});
		} else if (typeof rule === 'string') {
			//内置方法
			const currentRule = $rules[ rule ];
			//内置规则不存在，则抛出异常
			if (!currentRule) throw (`${rule} rule is undefined`);
			const {rule: $rule, message: $message} = currentRule;
			if ($rule instanceof RegExp) {
				if ($rule.test(value)) continue;
			} else if (typeof $rule === 'function') {
				if (fnValidate($rule)) continue;
			} else {
				console.error(`rule is not RegExp or Function`);
				continue;
			}
			error = getMessage({
				message,
				value,
				prop
			});
		} else if (typeof rule === 'function') {
			//验证结果
			if (fnValidate(rule)) continue;
			error = getMessage({
				message,
				value,
				prop
			});
		}
	}
	return error;
}

const iteratorPlaceholder = `*`;

function genIteratorRules ( opts: {
	prop: string;
	model: TValidateModel;
	rules: TValidateRule[];
} ): TValidateRules[] {
	const {prop, model, rules} = opts;
	const propChars: string[] = prop.split(`.`);
	if (!propChars.includes(iteratorPlaceholder)) return;
	const collects: TValidateRules[] = [];
	propChars.forEach(( char, index ) => {
		if (char !== iteratorPlaceholder) return;
		const currentProp = propChars.slice(0, index).join(`.`);
		const currentValue = deepModel({
			model,
			prop: currentProp
		});
		//不等于数组，这里直接截止了
		if (!(currentValue instanceof Array)) return;
		for (let i = 0; i < currentValue.length; i++) {
			const footProp = propChars.slice(index + 1).join(`.`) || ``;
			const resultProp = `${currentProp}.${i}.${footProp}`;
			if (resultProp.includes(iteratorPlaceholder)) {
				collects.push(...genIteratorRules({
					prop: resultProp,
					model,
					rules
				}));
			} else {
				collects.push({
					prop: resultProp,
					rules,
					isIterator: true,
					iteratorIndex: i
				});
			}
		}
	});
	return collects;
}

//在规则中设置迭代器的规则
function setIteratorRuleInRules ( opts: {
	rules: TValidateRules[];
	model: TValidateModel;
} ) {
	const {rules, model} = opts;
	const iteratorRules = {};
	rules.forEach(( rule, index ) => {
		const {prop, rules} = rule;
		if (!prop.includes(iteratorPlaceholder)) return;
		iteratorRules[ index ] = genIteratorRules({
			prop,
			model,
			rules
		});
	});
	//统计新增的长度
	let joinCount = 0;
	for (let index in iteratorRules) {
		const _index = parseInt(index);
		const _rules = iteratorRules[ _index ];
		(_rules || []).forEach(( rule ) => {
			rules.splice(_index + joinCount, 0, rule);
			++joinCount;
		});
	}
	//过滤训迭代器相关数据
	return rules.filter(( rule ) => {
		return !rule.prop.includes(iteratorPlaceholder);
	});
}

//验证器
export function validate ( opts: {
	rules: TValidateRules[];
	model: TValidateModel;
} ): TValidateResult {
	const {rules, model} = opts;
	//错误集合`
	const errors: TErrors[] = [];
	//错误信息集合
	const errorsMessage: string[] = [];
	//在规则中设置迭代器的规则
	const _rules = setIteratorRuleInRules({
		rules,
		model
	});
	_rules.forEach(( rule ) => {
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