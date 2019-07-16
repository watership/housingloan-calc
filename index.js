"use strict";
exports.__esModule = true;
var big_js_1 = require("big.js");
var fixCalc = function (loan, year, rate) {
    var oldLoan = loan;
    var loanCalc = big_js_1["default"](loan).times(10000);
    var months = parseInt(big_js_1["default"](year).times(12).toFixed(0));
    var rateCalc = big_js_1["default"](rate).div(100);
    var rateMounth = rateCalc.div(12);
    var a = (rateMounth.plus(1)).pow(months);
    var b = (loanCalc.times(rateMounth)).times(a);
    var c = a.minus(1);
    var repaymentMonthly = b.div(c);
    var interest = (repaymentMonthly.times(months)).minus(loanCalc).div(10000);
    var total = big_js_1["default"](oldLoan).plus(interest);
    var incomeMonthly = repaymentMonthly.times(2);
    return {
        type: "等额本息",
        loan: oldLoan.toFixed(2),
        total: total.toFixed(2),
        interest: interest.toFixed(2),
        months: months.toString(),
        repaymentMonthly: repaymentMonthly.toFixed(2),
        incomeMonthly: incomeMonthly.toFixed(2),
        monthlyData: ''
    };
};
exports.fixCalc = fixCalc;
var capitalCalc = function (loan, year, rate) {
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
    var repaymentMonthly = e.plus(f);
    var incomeMonthly = repaymentMonthly.times(2);
    // function calc(n: number, m: number): Array<number>{
    //     const calcMonthly = (n: number)=>{
    //         let monthlyRepay = a;
    //         const g = loanCalc.minus(a.times(n-1));
    //         const h = g.times(rateMounth);
    //         let monthlyInterest = h;
    //         let monthlyAll = monthlyRepay.plus(monthlyInterest);
    //         const surplus = loanCalc.minus(a.times(n));
    //         return {
    //             monthlyRepay: monthlyRepay.toFixed(2),  // 月供本金
    //             monthlyInterest: monthlyInterest.toFixed(2), // 月供利息
    //             monthlyAll: monthlyAll.toFixed(2), // 月供 = 月供本金 + 月供利息
    //             surplus: surplus.toFixed(2)
    //         }
    //     }
    //     let calcDataArray = [];
    //     for(let i=0;i<m;i++){
    //         calcDataArray.push(calcMonthly(i));
    //     }
    //     return calcDataArray
    // }
    return {
        type: "等额本金",
        loan: oldLoan.toFixed(2),
        total: total.toFixed(2),
        interest: interest.toFixed(2),
        months: months.toString(),
        repaymentMonthly: repaymentMonthly.toFixed(2),
        incomeMonthly: incomeMonthly.toFixed(2),
        monthlyData: ''
    };
};
exports.capitalCalc = capitalCalc;
