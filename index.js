"use strict";
exports.__esModule = true;
var big_js_1 = require("big.js");
var fixCalc = function (loan, year, rate) {
    // 总贷款额
    var oldLoan = loan;
    var loanCalc = big_js_1["default"](loan).times(10000);
    var months = parseInt(big_js_1["default"](year).times(12).toFixed(0));
    var rateCalc = big_js_1["default"](rate).div(100);
    var rateMounth = rateCalc.div(12);
    var a = (rateMounth.plus(1)).pow(months);
    var b = (loanCalc.times(rateMounth)).times(a);
    var c = a.minus(1);
    var repaymentMonthly = b.div(c);
    // 总利息
    var interest = (repaymentMonthly.times(months)).minus(loanCalc).div(10000);
    // 总还款额
    var total = big_js_1["default"](oldLoan).plus(interest);
    // 建议月流水
    var incomeMonthly = repaymentMonthly.times(2);
    // 月供本金
    var monthlyRepay = big_js_1["default"](loanCalc).div(months);
    // 月供利息
    var monthlyInterest = interest.div(months);
    // 月供 = 月供本金 + 月供利息
    var monthlyAll = total.div(months);
    var calcDataArray = [];
    for (var i = 0; i < months; i++) {
        var surplus = big_js_1["default"](oldLoan).minus(monthlyRepay.plus(i));
        calcDataArray.push({
            monthlyRepay: monthlyRepay.toFixed(2),
            monthlyInterest: monthlyInterest.toFixed(2),
            monthlyAll: monthlyAll.toFixed(2),
            surplus: surplus.toFixed(2) // 剩余本金
        });
    }
    return {
        type: "等额本息",
        loan: oldLoan.toFixed(2),
        total: total.toFixed(2),
        interest: interest.toFixed(2),
        months: months.toString(),
        repaymentMonthly: repaymentMonthly.toFixed(2),
        incomeMonthly: incomeMonthly.toFixed(2),
        monthlyData: calcDataArray
    };
};
exports.fixCalc = fixCalc;
var capitalCalc = function (loan, year, rate) {
    // 总贷款额
    var oldLoan = loan;
    var loanCalc = big_js_1["default"](loan).times(10000);
    var months = parseInt(big_js_1["default"](year).times(12).toString());
    var rateCalc = big_js_1["default"](rate).div(100);
    var rateMounth = rateCalc.div(12);
    var a = loanCalc.div(months);
    var b = loanCalc.times(rateMounth);
    var c = rateMounth.plus(1);
    var d = (a.plus(b)).plus(a.times(c));
    var e = loanCalc.div(months);
    var f = loanCalc.times(rateMounth);
    // 总利息
    var interest = ((d.div(2)).times(months).minus(loanCalc)).div(10000);
    // 总还款额
    var total = big_js_1["default"](oldLoan).plus(interest);
    // 每月月供额
    var repaymentMonthly = e.plus(f);
    // 建议月流水
    var incomeMonthly = repaymentMonthly.times(2);
    var calcMonthly = function (n) {
        var monthlyRepay = a;
        var g = loanCalc.minus(a.times(n - 1));
        var h = g.times(rateMounth);
        var monthlyInterest = h;
        var monthlyAll = monthlyRepay.plus(monthlyInterest);
        var surplus = loanCalc.minus(a.times(n));
        return {
            monthlyRepay: monthlyRepay.toFixed(2),
            monthlyInterest: monthlyInterest.toFixed(2),
            monthlyAll: monthlyAll.toFixed(2),
            surplus: surplus.toFixed(2) // 剩余本金
        };
    };
    var calcDataArray = [];
    for (var i = 0; i < months; i++) {
        calcDataArray.push(calcMonthly(i));
    }
    return {
        type: "等额本金",
        loan: oldLoan.toFixed(2),
        total: total.toFixed(2),
        interest: interest.toFixed(2),
        months: months.toString(),
        repaymentMonthly: repaymentMonthly.toFixed(2),
        incomeMonthly: incomeMonthly.toFixed(2),
        monthlyData: calcDataArray
    };
};
exports.capitalCalc = capitalCalc;
