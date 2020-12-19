const bill = Number(prompt('Enter a bill value: '));

const tipPercent = bill >= 50 && bill <= 300 ? 15 : 20;
const tip = (bill * tipPercent) / 100;
const total = bill + tip;

console.log(`Bill calculator:`);
console.log(`The bill was ${bill}. The tip (${tipPercent}%) was ${tip}. And the total value was ${total}`);