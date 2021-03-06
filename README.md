 [English](README-en.md) | 简体中文

# housingloan-calc 房贷计算器

![npm](https://img.shields.io/npm/dm/housingloan-calc.svg)  [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/watership/housing-loan-calc/blob/master/LICENSE)

## 计算的数学公式

### 等额本息计算方式

等额本息：每月按相等的金额偿还贷款本息，其中本金逐月递增，利息逐月递减，月还款额不变。
![等额本息计算方式](./images/1.png)

### 等额本金计算方式

等额本金：每月按相等的金额偿还贷款本金，其中本金保持相同，利息逐月递减，月还款额越来越少。
![等额本金计算方式](./images/2.png)

## 如何使用
Browser:

```html
<script src='path/to/housingloan-calc.js'></script>
```

[Node.js](http://nodejs.org):

```bash
$ npm install housingloan-calc
```

```javascript
const housingloanCalc = require('housingloan-calc');
```

ES6 module:

```javascript
import housingloanCalc from 'housingloan-calc';
const [loan, year, rate] = [100, 25, 4.9];

// 等额本息
const Result = housingloanCalc.fixCalc(loan, year, rate);

// 等额本金
const Result = housingloanCalc.capitalCalc(loan, year, rate);

const {
    type, // 类型
    loan, // 总贷款额
    total, // 总还款额
    interest, // 总利息
    months, // 贷款总月份数
    repaymentMonthly, // 每月月供额（等额本息） 或者 首月还款额（等额本金）
    incomeMonthly // 建议您的月收入流水必须需要大于数：流水要求：收入月流水 > 每月还款（月供） x 2
    monthlyData // 每月还款数额，仅等额本金方式时候有效
    } = Result;

monthlyData  = [
    {
    monthlyRepay: Number // 月供本金
    monthlyInterest:  Number // 月供利息
    monthlyAll: Number // 月供 = 月供本金 + 月供利息
    },
    {},
    {},
    {}
    ...
    ]

```

## 作品体验

- 微信小程序，用微信扫描下面二维码即可体验

![xcx](./images/xcx.jpg)

## 如何贡献

欢迎每个人为这个项目做出贡献。可以从查看我们[未解决的问题](https://github.com/watership/housingLoanCalc/issues)、[提交新问题](https://github.com/watership/housingLoanCalc/issues/new?labels=bug)或[提出新功能](https://github.com/watership/housingLoanCalc/issues/new?labels=enhancement)入手，参与讨论投票您喜欢或不喜欢的问题。

## 开源证书

[**The MIT License**](LICENSE).