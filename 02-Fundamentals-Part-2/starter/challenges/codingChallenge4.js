'use strict';

const calcTip = bill => (bill >= 50) && (bill <= 300) ? bill * 0.15 : bill * 0.2;
const add = (x, y) => x + y;
const calcAverage = function (arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

//calculate tips
for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
}
//calculate totals
for (let i = 0; i < bills.length; i++) {
    totals.push(add(bills[i], tips[i]));
}

console.log(bills);
console.log(tips);
console.log(totals);
console.log(`Bills average: ${calcAverage(bills)}`);