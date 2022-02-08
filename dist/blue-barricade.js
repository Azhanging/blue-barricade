/*!
 * 
 * blue-barricade.js 0.0.4
 * (c) 2016-2022 Blue
 * Released under the MIT License.
 * https://github.com/azhanging/blue-barricade
 * time:Tue, 08 Feb 2022 09:54:15 GMT
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BlueBarricade"] = factory();
	else
		root["BlueBarricade"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./static";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


var BlueBarricade = /** @class */ (function () {
    function BlueBarricade(opts) {
        this.options = {};
        this.options = Object.assign({
            //钩子
            hooks: {
                //错误德钩子
                error: function () { },
            },
            //合并错误的信息
            concatErrorMessage: false,
        }, opts, {});
    }
    //添加规则
    BlueBarricade.addRule = function (name, rule) {
        if (_rules__WEBPACK_IMPORTED_MODULE_1__["default"][name]) {
            throw "has same " + name + " rule";
        }
        _rules__WEBPACK_IMPORTED_MODULE_1__["default"][name] = rule;
    };
    //验证
    BlueBarricade.prototype.validate = function (opts) {
        var _this = this;
        var _a = opts.model, model = _a === void 0 ? {} : _a, _b = opts.validations, validations = _b === void 0 ? [] : _b;
        return new Promise(function (resolve) {
            //验证成功
            return resolve(_validate__WEBPACK_IMPORTED_MODULE_0__["validate"].call(_this, {
                validations: validations,
                model: model,
            }));
        });
    };
    return BlueBarricade;
}());
/* harmony default export */ __webpack_exports__["default"] = (BlueBarricade);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
/* harmony import */ var _rules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);


//是够为深层次的数据
function isDeepModel(prop) {
    return /\.|\[.+\]/.test("" + prop);
}
//深度获取数据
function deepModel(opts) {
    var model = opts.model, prop = opts.prop;
    var splitProp = prop.split(".");
    var currentProp = splitProp.shift();
    var currentModel = model[currentProp];
    if (splitProp.length > 0) {
        if (!(currentModel instanceof Object || currentModel instanceof Array))
            return undefined;
        return deepModel({
            model: currentModel,
            prop: splitProp.join("."),
        });
    }
    return currentModel;
}
function getMessage(opts) {
    var message = opts.message, value = opts.value, prop = opts.prop;
    return _utils__WEBPACK_IMPORTED_MODULE_1__["default"].hook(null, message || "validate " + prop + " error", [value]);
}
//验证规则
function validateRules(opts) {
    var rules = opts.rules, value = opts.value, prop = opts.prop, isIterator = opts.isIterator, iteratorIndex = opts.iteratorIndex;
    var error = "";
    var _loop_1 = function (ruleItem) {
        //如果当前的rules组中已经产生错误了，则跳出
        if (error)
            return "break";
        //当前规则
        var rule = void 0;
        //错误信息
        var message;
        //函数类型验证处理
        var fnValidate = function (ruleFn) {
            //验证结果
            var validateResult = ruleFn({
                value: value,
                isIterator: isIterator,
                iteratorIndex: iteratorIndex,
            });
            if (typeof validateResult.status === "boolean") {
                var status_1 = validateResult.status, validateMessage = validateResult.message;
                if (status_1 === false && validateMessage) {
                    message = validateMessage;
                }
                else if (status_1 === true) {
                    return true;
                }
            }
            else if (typeof validateResult === "boolean" && validateResult) {
                return true;
            }
            return false;
        };
        if (typeof ruleItem !== "string") {
            //设置当前的规则
            rule = ruleItem.rule;
            message = ruleItem.message;
        }
        else {
            rule = ruleItem;
        }
        if (rule instanceof RegExp) {
            if (rule.test(value))
                return "continue";
            error = getMessage({
                message: message,
                value: value,
                prop: prop,
            });
        }
        else if (typeof rule === "string") {
            //内置方法
            var currentRule = _rules__WEBPACK_IMPORTED_MODULE_0__["default"][rule];
            //内置规则不存在，则抛出异常
            if (!currentRule)
                throw rule + " rule is undefined";
            var $rule = currentRule.rule, $message = currentRule.message;
            if ($rule instanceof RegExp) {
                if ($rule.test(value))
                    return "continue";
            }
            else if (typeof $rule === "function") {
                if (fnValidate($rule))
                    return "continue";
            }
            else {
                console.error("rule is not RegExp or Function");
                return "continue";
            }
            error = getMessage({
                message: message,
                value: value,
                prop: prop,
            });
        }
        else if (typeof rule === "function") {
            //验证结果
            if (fnValidate(rule))
                return "continue";
            error = getMessage({
                message: message,
                value: value,
                prop: prop,
            });
        }
    };
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var ruleItem = rules_1[_i];
        var state_1 = _loop_1(ruleItem);
        if (state_1 === "break")
            break;
    }
    return error;
}
//迭代器占位符
var iteratorPlaceholder = "*";
//生成迭代器规则
function genIteratorRules(opts) {
    var prop = opts.prop, model = opts.model, rules = opts.rules;
    var propChars = prop.split(".");
    var index = propChars.indexOf(iteratorPlaceholder);
    if (index === -1)
        return;
    var collects = [];
    var char = propChars[index];
    //当前prop字节不是迭代器字符，跳出
    if (char !== iteratorPlaceholder)
        return;
    var currentProp = propChars.slice(0, index).join(".");
    var currentValue = deepModel({
        model: model,
        prop: currentProp,
    });
    //不等于数组，这里直接截止了
    if (!(currentValue instanceof Array))
        return;
    for (var i = 0; i < currentValue.length; i++) {
        var footProp = propChars.slice(index + 1).join(".") || "";
        var resultProp = currentProp + "." + i + "." + footProp;
        if (resultProp.includes(iteratorPlaceholder)) {
            collects.push.apply(collects, genIteratorRules({
                prop: resultProp,
                model: model,
                rules: rules,
            }));
        }
        else {
            collects.push({
                prop: resultProp,
                rules: rules,
                isIterator: true,
                iteratorIndex: i,
            });
        }
    }
    return collects;
}
//在规则中设置迭代器的规则
function setIteratorRuleInRules(opts) {
    var validations = opts.validations, model = opts.model;
    var iteratorRules = {};
    validations.forEach(function (rule, index) {
        var prop = rule.prop, rules = rule.rules;
        if (!prop.includes(iteratorPlaceholder))
            return;
        iteratorRules[index] = genIteratorRules({
            prop: prop,
            model: model,
            rules: rules,
        });
    });
    //统计新增的长度
    var joinCount = 0;
    var _loop_2 = function (index) {
        var _index = parseInt(index);
        var _rules = iteratorRules[_index];
        (_rules || []).forEach(function (rule) {
            validations.splice(_index + joinCount, 0, rule);
            ++joinCount;
        });
    };
    for (var index in iteratorRules) {
        _loop_2(index);
    }
    //过滤训迭代器相关数据
    return validations.filter(function (rule) {
        return !rule.prop.includes(iteratorPlaceholder);
    });
}
//值类型判断
function valueTypeValidate(opts) {
    var rule = opts.rule;
    return false;
}
//验证器
function validate(opts) {
    var _this = this;
    var validations = opts.validations, model = opts.model;
    //错误集合`
    var errors = [];
    //错误信息集合
    var errorsMessage = [];
    //在规则中设置迭代器的规则
    var _validations = setIteratorRuleInRules({
        validations: validations,
        model: model,
    });
    _validations.forEach(function (validation) {
        var value;
        var prop = validation.prop, rules = validation.rules;
        if (isDeepModel(prop)) {
            //深度数据
            value = deepModel({
                model: model,
                prop: prop,
            });
        }
        else {
            value = model[prop];
        }
        //非必须校验
        if ((value === "" || value === undefined || value === null) &&
            validation.required === false)
            return;
        //类型验证
        if (validation.type) {
            valueTypeValidate.call(_this, {
                validation: validation,
            });
        }
        //验证规则
        var error = validateRules({
            prop: prop,
            rules: rules,
            value: value,
        });
        if (error) {
            //记录错误信息
            errorsMessage.push(error);
            //记录错误组
            errors.push({
                prop: prop,
                value: value,
                message: error,
            });
        }
    });
    var concatErrorMessage = this.options.concatErrorMessage;
    var errorResult = {
        //错误
        errors: errors,
        //当前的状态
        status: errors.length === 0,
        //错误信息 是否合并
        errorMessage: concatErrorMessage
            ? errorsMessage.join(",")
            : errorsMessage[0] || "",
        //错误属性信息集合 多数用于做数据绑定显示错误信息
        errorPropsMessage: (function () {
            var errorPropsMessage = {};
            errors.forEach(function (error) {
                errorPropsMessage[error.prop] = error.message;
            });
            return errorPropsMessage;
        })(),
    };
    var hooks = this.options.hooks;
    //错误钩子调用
    _utils__WEBPACK_IMPORTED_MODULE_1__["default"].hook(this, hooks.error, [errorResult]);
    return errorResult;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var rules = {
    //手机号
    phone: {
        rule: /^1{10}$/,
        message: "\u624B\u673A\u53F7\u7801\u6709\u8BEF",
    },
    //邮箱
    email: {
        rule: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
        message: "\u90AE\u7BB1\u6709\u8BEF",
    },
    //金额
    money: {
        rule: /^0\.\d{1,2}$|^[^0]?\d+(\.\d{1,2})?$/,
        message: "\u91D1\u989D\u6709\u8BEF",
    },
    //通用数值
    number: {
        rule: /^0\.\d{1,2}$|^[^0]?\d+(\.\d+)?$/,
        message: "\u6570\u503C\u6709\u8BEF",
    },
    //数值
    intNumber: {
        rule: /^\d+$/,
        message: "\u6570\u503C\u6709\u8BEF",
    },
    //浮点数值
    floatNumber: {
        rule: /^\d+.\d+$/,
        message: "\u6570\u503C\u6709\u8BEF",
    },
    //必须有值的验证
    required: {
        rule: /^.+$/,
        message: "\u5F53\u524D\u503C\u6709\u8BEF",
    },
};
/* harmony default export */ __webpack_exports__["default"] = (rules);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var utils = {
    hook: function (ctx, fn, args) {
        if (typeof fn === 'function') {
            return fn.apply(ctx, args);
        }
        return fn;
    }
};
/* harmony default export */ __webpack_exports__["default"] = (utils);


/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=blue-barricade.js.map