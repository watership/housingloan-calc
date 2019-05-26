const housingloanCalc = require('housingloan-calc');
const [loan, year, rate] = [100, 25, 4.9];
 

// 等额本息
const Result = housingloanCalc.fixCalc(loan, year, rate);
const Result2 = housingloanCalc.capitalCalc(loan, year, rate);

console.log(Result)