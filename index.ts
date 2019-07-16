import Big from "big.js";

interface housingloanBase {
    type: string;
    loan: string;
    total: string;
    interest: string;
    months: string;
    repaymentMonthly: string;
    incomeMonthly: string;
    monthlyData: any
}

interface monthlyData {
    monthlyRepay: string;  // 月供本金
    monthlyInterest: string; // 月供利息
    monthlyAll: string; // 月供 = 月供本金 + 月供利息
    surplus: string;
}

const fixCalc = function(loan: number, year: number, rate: number):housingloanBase {
        let oldLoan = loan;
        let loanCalc: Big = Big(loan).times(10000);
        let months: number = parseInt(Big(year).times(12).toFixed(0));
        let rateCalc: Big = Big(rate).div(100);
        const rateMounth = rateCalc.div(12)

        const a: Big = (rateMounth.plus(1)).pow(months);
        const b: Big = (loanCalc.times(rateMounth)).times(a);
        const c: Big = a.minus(1)
        const repaymentMonthly: Big = b.div(c);

        const interest: Big = (repaymentMonthly.times(months)).minus(loanCalc).div(10000);
        const total: Big = Big(oldLoan).plus(interest);
        const incomeMonthly: Big = repaymentMonthly.times(2);

        return {
            type: "等额本息",
            loan: oldLoan.toFixed(2), // 总贷款额
            total: total.toFixed(2), // 总还款额
            interest: interest.toFixed(2), // 总利息
            months: months.toString(), // 贷款总月份数
            repaymentMonthly: repaymentMonthly.toFixed(2), // 每月月供额
            incomeMonthly: incomeMonthly.toFixed(2),
            monthlyData: ''
        }
}

const capitalCalc = function(loan: number, year: number, rate: number): housingloanBase {
    let oldLoan = loan;
    let loanCalc: Big = Big(loan).times(10000);
    let months: number = parseInt(Big(year).times(12).toString());
    let rateCalc: Big = Big(rate).div(100);
    const rateMounth = rateCalc.div(12)

    const a: Big = loanCalc.div(months);
    const b: Big = loanCalc.times(rateMounth);
    const c: Big = rateMounth.plus(1);
    const d: Big = (a.plus(b)).plus(a.times(c));
    const e: Big = loanCalc.div(months);
    const f: Big = loanCalc.times(rateMounth);
    

    // 总利息
    const interest: Big = ((d.div(2)).times(months).minus(loanCalc)).div(10000);
    // 总还款额
    const total: Big = Big(oldLoan).plus(interest);

    const repaymentMonthly: Big =  e.plus(f);

    const incomeMonthly: Big = repaymentMonthly.times(2);

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
        loan: oldLoan.toFixed(2), // 总贷款额
        total: total.toFixed(2), // 总还款额
        interest: interest.toFixed(2), // 总利息
        months: months.toString(), // 贷款总月份数
        repaymentMonthly: repaymentMonthly.toFixed(2), // 每月月供额
        incomeMonthly: incomeMonthly.toFixed(2),
        monthlyData: '',
    }

}


export { fixCalc, capitalCalc }