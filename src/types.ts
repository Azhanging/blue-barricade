//信息类型
export type TRuleMessage = string | Function;

//规则function类型返回值
export interface TRuleFunction {
  (value: any): boolean;
}

//构造函数配置
export interface TBarricadeOptions {
  hooks?: {
    //错误的钩子
    error?: (result: TValidateResult) => number;
  };
  //合并错误的信息
  concatErrorMessage?: boolean;
}

//错误类型
export interface TErrors {
  prop: string;
  value: any;
  message: string;
}

//校验结果数据
export interface TValidateResult {
  errors: TErrors[];
  status: boolean;
  errorMessage: string;
  errorPropsMessage: any;
}

export interface TValidateModel {
  [propName: string]: any;
}

//验证规则配置
export interface TValidateRule {
  rule: string | RegExp | TRuleFunction;
  message?: TRuleMessage;
}

//验证信息配置
export interface TValidations {
  //数据字段或者数据链，用.链接，支持迭代器符号使用*
  prop: string;
  //类型判断
  type?: `array` | `string` | `object` | `number` | `undefined`;
  //校验规则
  rules: TValidateRule[];
  //是否必须校验
  required?: boolean;
  //是否为迭代器类型
  isIterator?: boolean;
  //迭代器索引
  iteratorIndex: number;
}
