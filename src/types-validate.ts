//信息类型
export type TRuleMessage = string | Function;

//配置信息
export interface TBarricadeOpts {
	model: {
		[ field: string ]: any;
	};
}

//规则function类型返回值
export interface TRuleFunction {
	( value: any ): boolean;
}

//验证规则配置
export interface TValidateRule {
	rule: string | RegExp | TRuleFunction;
	message: TRuleMessage;
}

//规则配置
export interface TValidateRules {
	//数据字段或者数据链，用.链接
	prop: string;
	//校验规则
	rules: TValidateRule[],
	//是否必须校验
	required: boolean;
}