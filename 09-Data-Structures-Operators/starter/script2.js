'use strict';
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //Pre ES6 method:
  //key : function (params){}
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  openingHours,

  //ES6 method:
  //methodName(params){}
  delivery({
    //Specify default values for these object destructuring parameters
    starterIndex = 0,
    mainIndex = 0,
    address = 'our closest delivery point',
    time = 'ASAP',
  }) {
    //Destructuring performed right when the function was called, as it received an object argument & the parameter names match the ones from the object argument properties
    console.log(`Order received!`);
    console.log(
      `Delivering: ${this.starterMenu[starterIndex]} with ${this.mainMenu[mainIndex]}. to: ${address}. at: ${time}`
    );
  },

  orderCustomPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious custom pasta with ${ing1}, ${ing2} & ${ing3}`
    );
  },

  orderCustomPizza(mainIngredient, ...otherIngredients) {
    //use REST pattern to accept a variable amount of arguments
    console.log(`Main pizza ingredient: ${mainIngredient}`);
    if (otherIngredients.length !== 0)
      console.log(`Other pizza ingredients: ${otherIngredients}`);
  },
};

// // *******************************************************
// // data structures: sets
// // *******************************************************
// const ordersSet = new Set([
//   'pizza',
//   'pasta',
//   'steak',
//   'pasta',
//   'soup',
//   'pizza',
// ]);
// console.log(ordersSet);

// console.log(ordersSet.has('pasta'));
// ordersSet.add('bolognesa');
// ordersSet.add('bolognesa');
// console.log(ordersSet);

// for (const order of ordersSet) console.log(order);

// let staffOccupations = [
//   'chef',
//   'sousChef',
//   'waiter',
//   'waiter',
//   'cook',
//   'cook',
//   'manager',
//   'waiter',
// ];

// const posSet = new Set(staffOccupations);
// console.log(posSet);
// staffOccupations = [...posSet];
// for (const occup of staffOccupations) console.log(occup);

// *******************************************************
// data structures: maps
// *******************************************************
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
rest.set(2, 'Lisbon, Portugal');
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set(true, 'We`re open')
  .set(false, 'We`re closed');

console.log(rest);

const coords = new Map();

coords.set([0, 0], 'green').set();

//initializing a non empty map
const question = new Map([
  ['question', 'What is the fastest programming language in the world'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Python'],
  ['correct', 1],
  [true, 'Correct !!!'],
  [false, 'Wrong answer'],
]);
console.log(question);

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`option ${key}: ${value}`);
}
// const answer = Number(prompt(question.get('question')));
const answer = 1;
console.log(question.get(answer === question.get('correct')));
