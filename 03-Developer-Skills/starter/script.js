// // Remember, we're gonna use strict mode in all scripts now!
// 'use strict';

// const reverseNumber = (value) => {
//   value = String(value);
//   let reverse = '';
//   for (let i = value.length - 1; i >= 0; i--) {
//     reverse += value.charAt(i);
//   }
//   return Number(reverse);
// };
// const reverseString = (value) => {
//   value = String(value);
//   let reverse = '';
//   for (let i = value.length - 1; i >= 0; i--) {
//     reverse += value.charAt(i);
//   }
//   return reverse;
// };

// const value = 1990;
// const friend = 'Frederick the Giant';

// console.log(reverseNumber(value));
// console.log(reverseString(friend));

//********* Practicing Jonas' 4 steps to solve problems**********/
//                  Problem 1
// find temperature amplitude in an array of temperatures

//subproblems;
// Handle reading errors
// find min temp
// find max temp
// subtrac min from max
const findMaxTemp = function (array) {
    let max = array[0];
    // debugger;
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') continue;
        if (array[i] > max) max = array[i];
    }
    return max;
};
const findMinTemp = function (array) {
    let min = array[0];
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] !== 'number') continue;
        if (array[i] < min) min = array[i];
    }
    return min;
};
const calcTempAmplitude = function (tempArray) {
    if (tempArray.length === 0) {
        return 'empty array';
    } else {
        const min = findMinTemp(tempArray);
        const max = findMaxTemp(tempArray);
        return max - min;
    }
};

const temperatures = [-1, -5, 2, 7, 10, 'error', 6, -3, 0];

console.log(findMinTemp(temperatures));
console.log(findMaxTemp(temperatures));
console.log(`Temperature amplitude: ${calcTempAmplitude(temperatures)}`);

//                Problem 2
// find temperature amplitude in two arrays
// Should i display two different results?
//     No, just a single result
// we could merge the arrays
//     how to merge 2 arrays?
//          JS arrays have method concat()

//subproblems;
// Handle reading errors
// find min temp
// find max temp
// subtrac min from max
// merge 2 arrays

const calcTempAmplitude2 = function (tempArray1, tempArray2) {
    const finalArray = tempArray1.concat(tempArray2);
    const min = findMinTemp(finalArray);
    const max = findMaxTemp(finalArray);

    return max - min;
};

const temperatures2 = [7, 15, 12, 7, -3, 'error', 'error', -1, 2];

console.log(
    `Temperature amplitude: ${calcTempAmplitude2(temperatures, temperatures2)}`
);

//******* Debugging with the console and breakpoints ***********/
