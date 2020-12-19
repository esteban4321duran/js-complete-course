// Mark and John are trying to compare their BMI (Body Mass Index), which is
// calculated using the formula:
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg
// and height in meter).

// Your tasks:
// 1. Store Mark's and John's mass and height in variables
// 2. Calculate both their BMIs using the formula (you can even implement both
// versions)
// 3. Create a Boolean variable 'markHigherBMI' containing information about
// whether Mark has a higher BMI than John.

// Test data:
// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
// m tall.
// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
// m tall.

///////////////////////////////////////////////////////////////////////////////////

//Test 1
const markMass1 = 78; //kg
const markHeight1 = 1.69; //m
const johnMass1 = 92;
const johnHeight1 = 1.95;

const markBMI1 = markMass1 / markHeight1 ** 2;
const johnBMI1 = johnMass1 / johnHeight1 ** 2;

const markHigherBMI1 = markBMI1 > johnBMI1;

//Test 2
const markMass2 = 95; //kg
const markHeight2 = 1.88; //m
const johnMass2 = 85;
const johnHeight2 = 1.76;

const markBMI2 = markMass2 / markHeight2 ** 2;
const johnBMI2 = johnMass2 / johnHeight2 ** 2;

const markHigherBMI2 = markBMI2 > johnBMI2;

console.log('TEST 1');
console.log('Mark BMI: ' + markBMI1);
console.log('John BMI: ' + johnBMI1);
console.log('Mark has a higher BMI: ' + markHigherBMI1);

console.log('TEST 2');
console.log('Mark BMI: ' + markBMI2);
console.log('John BMI: ' + johnBMI2);
console.log('Mark has a higher BMI: ' + markHigherBMI2); 