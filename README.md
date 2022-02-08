# blue-barricade

内置校验器规则

```javascript
const rules = {
  //手机号
  phone: {
    rule: /^1{10}$/,
    message: `手机号码有误`,
  },
  //邮箱
  email: {
    rule: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
    message: `邮箱有误`,
  },
  //价格
  price: {
    rule: /^0\.\d{1,2}$|^[^0]?\d+(\.\d{1,2})?$/,
    message: `价格有误`,
  },
  //数值
  number: {
    rule: /^\d+$/,
    message: `数值有误`,
  },
  //必须有值的验证
  required: {
    rule: /.+/,
    message: `值有误`,
  },
};
```

校验器

```javascript
const barricade = new BlueBarricade({
  //是否合并错误的信息
  concatErrorMessage: false,
  //钩子处理
  hooks: {
    error,
  },
});
barricade
  .validate({
    model: {
      a: 1,
    },
    validations: [
      {
        prop: `a`,
        rules: [
          {
            rule: /\d/, //支持正则
            message: `错误信息`, //错误信息 string|fn
          },
          `number` /*走内置校验器*/,
          {
            rule: `number`,
            message: `输入的数值有点问题`,
          },
          {
            rule(opts) {
              /* 
                isIterator: undefined
                iteratorIndex: undefined
                value: any
              */
              return true || false;
            },
            message: `错误信息`,
          },
        ],
      },
    ],
  })
  .then((res) => {
    const {
      status, //验证状态
      errors, //错误信息组内容
      errorMessage, //错误信息 可配置为非合并
      errorPropsMessage, //错误属性信息集合 多数用于做数据绑定显示错误信息
    } = res;
  });
```
