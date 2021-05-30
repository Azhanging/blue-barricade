const rules = {
	//手机号
	phone: {
		rule: /^1{10}$/,
		message: `手机号码有误`
	},
	//邮箱
	email: {
		rule: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
		message: `邮箱有误`
	},
	//价格
	price: {
		rule: /^0\.\d{1,2}$|^[^0]?\d+(\.\d{1,2})?$/,
		message: `价格有误`
	},
	//数值
	number: {
		rule: /^\d+$/,
		message: `数值有误`
	},
	//必须有值的验证
	required: {
		rule: /.+/,
		message: `值有误`
	}
};

export default rules;