import Big from "big.js";

interface DataBase {
    type: string;
    loan: number;
    total: number;
    interest: number;
    months: number;
    repaymentMonthly: number;
    incomeMonthly: number;
    monthlyData: number[]
}

const fixCalc = function(loan: number, year: number, rate: number){
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

        return <DataBase>{
            type: "等额本息",
            loan: oldLoan.toFixed(2), // 总贷款额
            total: total.toFixed(2), // 总还款额
            interest: interest.toFixed(2), // 总利息
            months: months.toString(), // 贷款总月份数
            repaymentMonthly: repaymentMonthly.toFixed(2), // 每月月供额
            incomeMonthly: Number.parseInt(incomeMonthly),
            monthlyData: [1,2,3]
        }
}

export { fixCalc }