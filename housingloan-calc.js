import Big from './big.mjs';

export default class {
    // 等额本息计算方式
    fixCalc(loan, year, rate) {
        let oldLoan = loan;
        loan = Big(loan).times(10000);
        let months = Number.parseInt(Big(year).times(12));
        rate = Big(rate).div(100);
        const rateMounth = rate.div(12)

        const a = (rateMounth.plus(1)).pow(months);
        const b = (loan.times(rateMounth)).times(a);
        const c = a.minus(1)
        const repaymentMonthly = b.div(c);
        const interest = Big(repaymentMonthly.times(months) - loan).div(10000);
        const total = Big(oldLoan).plus(interest);
        const incomeMonthly = repaymentMonthly.times(2);

        return {
            type: "等额本息",
            loan: oldLoan.toFixed(2), // 总贷款额
            total: total.toFixed(2), // 总还款额
            interest: interest.toFixed(2), // 总利息
            months: months.toString(), // 贷款总月份数
            repaymentMonthly: repaymentMonthly.toFixed(2), // 每月月供额
            incomeMonthly: Number.parseInt(incomeMonthly),
            monthlyData: []
        }
    }

    // 等额本金计算方式
    capitalCalc(loan, year, rate) {
        let oldLoan = loan;
        loan = Big(loan).times(10000);
        let months = Number.parseInt(Big(year).times(12));
        rate = Big(rate).div(100);
        const rateMounth = rate.div(12)

        const a = loan.div(months);
        const b = loan.times(rateMounth);
        const c = rateMounth.plus(1);
        const d = (a.plus(b)).plus(a.times(c));
        const e = loan.div(months);
        const f = loan.times(rateMounth);
        

        // 总利息
        const interest = ((d.div(2)).times(months).minus(loan)).div(10000);
        // 总还款额
        const total = Big(oldLoan).plus(interest);

        const repaymentMonthly =  e.plus(f);

        const incomeMonthly = repaymentMonthly.times(2);

        function calc(n) {
            let monthlyRepay = a;
            const g = loan.minus(a.times(n-1));
            const h = g.times(rateMounth);
            let monthlyInterest = h;
            let monthlyAll = monthlyRepay.plus(monthlyInterest);
            const surplus = loan.minus(a.times(n));
            return {
                monthlyRepay: monthlyRepay.toFixed(2),  // 月供本金
                monthlyInterest: monthlyInterest.toFixed(2), // 月供利息
                monthlyAll: monthlyAll.toFixed(2), // 月供 = 月供本金 + 月供利息
                surplus: surplus.toFixed(2)
            }
        }
        let calcDataArray = [];
        for(let i=0;i<months;i++){
            calcDataArray.push(calc(i));
        }

        return {
            type: "等额本金",
            loan: oldLoan.toFixed(2), // 总贷款额
            total: total.toFixed(2), // 总还款额
            interest: interest.toFixed(2), // 总利息
            months: months.toString(), // 贷款总月份数
            repaymentMonthly: repaymentMonthly.toFixed(2), // 每月月供额
            incomeMonthly: Number.parseInt(incomeMonthly),
            monthlyData: calcDataArray,
        }

    }

    
}
