import { validate } from "./validate";
import {
  TValidateRule,
  TValidations,
  TValidateResult,
  TBarricadeOptions,
} from "./types";
import rules from "./rules";

class BlueBarricade {
  //添加规则
  static addRule(name: string, rule: TValidateRule) {
    if (rules[name]) {
      throw `has same ${name} rule`;
    }
    rules[name] = rule;
  }

  public options: TBarricadeOptions = {};

  constructor(opts: TBarricadeOptions) {
    this.options = Object.assign(
      {
        //钩子
        hooks: {
          //错误德钩子
          error: () => {},
        },
        //合并错误的信息
        concatErrorMessage: false,
      },
      opts,
      {}
    );
  }

  //验证
  validate(opts: {
    model: {
      [propName: string]: any;
    };
    validations: TValidations[];
  }): Promise<TValidateResult> {
    const { model = {}, validations = [] } = opts;
    return new Promise((resolve) => {
      //验证成功
      return resolve(
        validate.call(this, {
          validations,
          model,
        })
      );
    });
  }
}

export default BlueBarricade;
