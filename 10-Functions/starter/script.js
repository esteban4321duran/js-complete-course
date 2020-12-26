'use strict';
// //**********************************************
// // parameters by value & by reference
// //**********************************************
// //default parameters
// const bookings = [];

// const createBooking = function (
//   flightNum,
//   numPassengers = 1,
//   price = 199 * numPassengers
// ) {
//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };
// // createBooking('LH123');
// // createBooking('JT321', 100);
// // createBooking('PD998', undefined, 589);

// //parameters by type vs by reference => primitives vs objects
// const flight = 'LH123';
// const passenger = {
//   name: 'Esteban Duran',
//   passport: 123456789,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH999';
//   passenger.name = 'Mr. ' + passenger.name;

//   if (passenger.passport === 123456789) alert('check in successful!');
//   else alert('Wrong passport. ');
// };
// const newPassport = function (passenger) {
//   passenger.passport = Math.trunc(Math.random() * 100000000);
// };
// checkIn(flight, passenger);
// console.log(flight);
// console.log(passenger);

// newPassport(passenger);
// checkIn(flight, passenger);
// console.log(flight);
// console.log(passenger);

// //**********************************************
// // functions accepting callback functions
// //**********************************************
// const oneWord = function (str) {
//   return str.replace(/ /g, '').toLowerCase();
// };
// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   return [first.toUpperCase(), ...others].join(' ');
// };

// //Higher order function. receives a callback function as an argument
// const transformer = function (str, fn) {
//   console.log(`Original string: ${str}`);
//   console.log(`Transformed string: ${fn(str)}`);
//   console.log(`Transformed by: ${fn.name}(String str)`);
// };
// //pass a function as a callback function
// transformer('javascript is the best language', upperFirstWord);
// transformer(
//   "The C language is so fast you can't even read this words separatedly",
//   oneWord
// );

// const listFunctionProperties = function (fn) {
//   console.log(fn.name);
//   console.log(fn.prototype);
// };

// listFunctionProperties(oneWord);

// const player1 = {
//   hp: 100,
//   maxhp: 200,
//   mp: 0,
//   maxmp: 0,
//   atk: 25,
//   def: 40,
// };

// const foe1 = {
//   hp: 75,
//   maxhp: 75,
//   mp: 10,
//   maxmp: 10,
//   atk: 10,
//   def: 8,
// };

// const applyEffect = function (targets, effect) {
//   for (const target of targets) {
//     effect(target);
//   }
// };

// const heal = function (target) {
//   const healAmount = (20 * target.maxhp) / 100;
//   target.hp =
//     target.hp + healAmount >= target.maxhp
//       ? target.maxhp
//       : target.hp + healAmount;
// };
// const hurt = function (target) {
//   const hurtAmount = 50;
//   target.hp -= hurtAmount;
// };

// console.log(player1);
// console.log(foe1);

// applyEffect([player1, foe1], heal);
// console.log(player1);
// console.log(foe1);

// applyEffect([player1, foe1], hurt);
// console.log(player1);
// console.log(foe1);

// applyEffect([foe1], heal);
// console.log(player1);
// console.log(foe1);

// //**********************************************
// // functions that return functions
// //**********************************************
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting}, ${name}`);
//   };
// };

// const greeterHey = greet('Hey');
// greeterHey('Esteban');

// const greet2 = greeting => name => console.log(`${greeting}, ${name}`);

// greet2('Welcome')('Jonas');

//**********************************************
// manually specifying the this kw in a regular function call
//**********************************************
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, passenger) {
    console.log(
      `${passenger} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}` });
  },
};
lufthansa.book(747, 'Esteban Duran');
lufthansa.book(545, 'Mathias Crays');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
//call method
//In regular function expressions, the this kw points to undefined
// book(228, 'Serena Williams');
book.call(eurowings, 228, 'Serena Williams');
book.call(lufthansa, 943, 'Peter Paulish');
//apply method
const flightData = [676, 'Philippe Philips'];
book.apply(eurowings, flightData);

//however we can just simply say:
book.call(lufthansa, ...flightData);

//bind method
const wingspan = {
  airline: 'Wingspan',
  iataCode: 'WS',
  bookings: [],
};
//Binding the this keywords
const bookWS = book.bind(wingspan);
const bookLH = book.bind(lufthansa);
const bookEW = book.bind(eurowings);
bookWS(117, 'Steven Magnusson');
bookWS(221, 'Jose Samponia');
bookWS(590, 'Gertrudiz Gerez');

//binding the this keywords and the flightNum
const bookLH100 = book.bind(lufthansa, 100);
bookLH100('Frederick Magnusson');

console.log(lufthansa);
console.log(eurowings);
console.log(wingspan);

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// using the bind method for partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 220));

const addIVA = addTax.bind(null, 0.21);
console.log(addIVA(100));

const addTax2 = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const add20percent = addTax2(0.2);
console.log(add20percent(400));
