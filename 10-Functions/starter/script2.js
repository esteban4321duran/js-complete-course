'use strict';
// ***********************************************************
// IIFE
// ***********************************************************
// (function () {
//   console.log('This will never run again');
// })();
// (value => console.log('This value never be shown again: ' + value))(1000);

// ***********************************************************
// Closures
// ***********************************************************
// const secureBooking = function () {
//   //private scope. defined by the function
//   let passengerCount = 0;

//   return function () {
//     //due to closures
//     passengerCount++;
//     console.log(`${passengerCount} passengers`);
//   };
// };

// const booker = secureBooking();
// booker();
// booker();
// booker();

// //booker function still has access to the passengerCount variable declared on the parent execution context of the booker function due to a CLOSURE
// console.dir(booker);

//more closure examples
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
const h = function () {
  const b = 200;
  f = function () {
    console.log(b / 3);
  };
};

//the g function assigns a function to f. f was declared higher in the scope chain.
g();
// the f function closed-over the variable environment of g
f();
console.dir(f);
// f is reasigned to the function created inside h
h();
//the f function now closed-over the variable environment of h
f();
console.dir(f);

//example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding ${n} passengers`);
    console.log(`There are 3 groups each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will startt boarding in ${wait} seconds`);
};

const perGroup = 400;
boardPassengers(120, 3);
