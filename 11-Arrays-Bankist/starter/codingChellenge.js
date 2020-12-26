'use strict';
// ******************************************************
// challenge 1
// ******************************************************
// const data1 = {
//   julia: [3, 5, 2, 12, 7],
//   kate: [4, 1, 15, 7, 3],
// };
// const data2 = {
//   julia: [9, 16, 6, 8, 3],
//   kate: [10, 5, 6, 1, 4],
// };

// const checkDogs = function (dogsJulia, dogsKate) {
//   const newDogsJulia = dogsJulia.slice(1, dogsJulia.length - 2);
//   console.log(newDogsJulia);
//   const both = [...newDogsJulia, ...dogsKate];

//   both.forEach(function (age, i) {
//     console.log(
//       `${
//         age >= 3
//           ? 'Dog number ' + (i + 1) + ' is an adult'
//           : 'Dog number ' + (i + 1) + ' is still a puppy'
//       }`
//     );
//   });
// };
// checkDogs(data1.julia, data1.kate);
// checkDogs(data2.julia, data2.kate);

// ******************************************************
// challenge 2
// ******************************************************

const data1 = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));

//   const adultAges = humanAges.filter(age => age >= 18);
//   const avgAdultAges = adultAges.reduce(
//     (acc, age, i, arr) => (acc += age / arr.length),
//     0
//   );
//  return avgAdultAges;
// };
// console.log('Avg. adult ages: ' + calcAverageHumanAge(data1));
// console.log('Avg. adult ages: ' + calcAverageHumanAge(data2));

// ******************************************************
// challenge 3
// ******************************************************
const calcAverageHumanAge = ages => {
  return ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => (acc += age / arr.length), 0);
};

console.log('Avg. adult ages: ' + calcAverageHumanAge(data1));
console.log('Avg. adult ages: ' + calcAverageHumanAge(data2));
