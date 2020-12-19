'use strict';

// function calcAge(birthYear) {
//   const age = 2020 - birthYear;
//   //   console.log(firstName); //firstName isnt located in this score, so a look-up in the scope chain allow console.log() to find the variable in global scope

//   function printAge() {
//     const output = `${firstName}, you are ${age}, born in ${birthYear}`;
//     console.log(output);

//     if (birthYear >= 1981 && birthYear <= 1996) {
//       const firstName = 'Miles Murdocca'; //JS looks up in the scope chain for a variable only if it is not defined in the current scope. in this case firstName is already defined in this scope, so this value is used, not the one on the global scope

//       const str = `You're a millenial, ${firstName}`;
//       console.log(str);
//       var str2 = `Don't worry we'll get along just fine`;

//       function add(a, b) {
//         return a + b;
//       }
//     }
//     // console.log(str); //str is block-scoped. It cannot be accessed outside of the if statement just above
//     console.log(str2); //str2 is a pre-ES6 variable so it is function scoped, it can be accessed anywhere inside printAge() and on any other innerScope

//     // const sum = add(5, 9); //functions are block-scoped as well. But only in strict mode.
//   }

//   printAge();

//   return age;
// }

// const firstName = 'Natalie portman';
// calcAge(1990);

//*******************************************************
//HOISTING & TDZ (temporal dead zone)
//*******************************************************
// console.log(me); //var variables accessed before declartion have an initial value of undefined
// console.log(job); //let & const variables cannot be accessed before declration, or in their TDZ
// console.log(birthYear);

// var me = 'Esteban';
// let job = 'student';
// const birthYear = 2000;

//Thanks to hoisting we can access functon declarations before their declaration
// console.log(add(10, 5));
// //these calls are in the variables TDZs  (since function expressions , and arrow functions are variables, they have a TDZ)
// console.log(sub(10, 5));
// console.log(mul(2, 10));

// function add(a, b) {
//   return a + b;
// }

// const sub = function (a, b) {
//   return a - b;
// };

// const mul = (a, b) => a * b;

// //*******************************************************
// // this keyword
// //*******************************************************

// const esteban = {
//   name: 'esteban',
//   birthYear: 2000,
//   calcAge: function () {
//     console.log(this);
//     console.log(2020 - this.birthYear);
//   }, //methods in JS are created by assigning a function expression to a key in an object. Functions are just expressions, id est they're just values, so they can be assigned to variables and passed as arguments
// };

// const nancy = {
//   name: 'nancy',
//   birthYear: 1995,
// };
// nancy.calcAge = esteban.calcAge; //Assigning an existing method to another object is called METHOD BORROWING

// // nancy BORROWS the calcAge() method from esteban

// esteban.calcAge();
// nancy.calcAge();
// //When using the this kw inside of a method, it'll point to the object that is calling the method. Even though nancy borrowed the calcAge() method from esteban, nancy calls the method, so the this kw points to nancy

// const age = esteban.calcAge; //copy the calcAge() function to the age variabke

// console.log(age);
// age(); //the this kw is undefined because in this its being used inside of a declared/regular function

//*******************************************************
// Details abput the this used in regular functions and arrow functions
//*******************************************************

//*******************************************************
// the arguments keyword
//*******************************************************
// const addFunction = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// addFunction(10, 5, 2, 4, 56);

// const calculator = {
//   add: addFunction,
// };

// calculator.add(1, 2, 3, 4, 5);

// //*******************************************************
// // primitive vs reference types
// //*******************************************************
// let age = 30;
// let oldAge = age;
// age = 31;

// console.log(age);
// console.log(oldAge);

// const guy = {
//   name: 'esteban',
//   age: 20,
// };

// const friend = guy;
// friend.age = 24;
// friend.name = 'lucas';

// console.log(friend);

//*******************************************************
// primitive vs reference types in practice
//*******************************************************
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

const jessica = {
  firstName: 'Jessica',
  lastName: 'williams',
  age: 27,
};

const marriedJessica = jessica; //marriedJessica stores a reference the jessica object in the heap as well, so we've basically just copied a reference to th eobject.
marriedJessica.lastName = 'Davis';
console.log('Before marriage: ' + jessica.lastName);
console.log('After marriage: ' + marriedJessica.lastName);

//Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'williams',
  age: 27,
  family: ['Alice', 'Joy'],
};

const jessica2Copy = Object.assign({}, jessica2); //Merge the properties of these two objects and store the reference in jessica2Copy
jessica2Copy.lastName = 'Davis';
jessica2Copy.family.push('mary');
jessica2Copy.family.push('John');

console.log('Before marriage: ' + jessica2.lastName);
console.log('After marriage: ' + jessica2Copy.lastName);
console.log(jessica2.family);
console.log(jessica2Copy.family);
