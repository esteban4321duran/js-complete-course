'use strict';

// ************************************************
// Array destructuring
// ************************************************

// //Traditional array accessing, index by index
// const arr = [1, 2, 3];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];
// console.log(a, b, c);

// //Destructuring array
// const [x, y, z] = arr;
// console.log(x, y, z);

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

// let [main, , secondary] = restaurant.categories;
// console.log(`Main category: ${main}`);
// console.log(`Secondary category: ${secondary}`);

//Swaping varibles traditionally
// function traditionalSwap() {
//   const aux = main;
//   main = secondary;
//   secondary = aux;
// }
// traditionalSwap();
// console.log(`Main category: ${main}`);
// console.log(`Secondary category: ${secondary}`);

// //Swaping variables using destructuring
// [main, secondary] = [secondary, main]; //destructure this new array with the variables inverted
// console.log(`Main category: ${main}`);
// console.log(`Secondary category: ${secondary}`);

// //Using array destructuring to return multiple values from functions/methods
// const [starter, main] = restaurant.order(2, 0); //This function returns an array of values that can simply be destructured
// console.log(`Starter Course: ${starter}`);
// console.log(`Main Course: ${main}`);

// //destructuring nested arrays
// const nested = [2, 4, [5, 6]];
// // let [i, , j] = nested;
// // console.log(i, j);
// //To access the elements of a nested array, we to perform a destructuring assignment inside a destructuring assignment
// const [i, , [j, k]] = nested;
// console.log(i, j, k);

// ************************************************
// Object destructuring
// ************************************************
//object desturcturing assignment
// const { name, openingHours, starterMenu } = restaurant;
// console.log(name, openingHours, starterMenu);
// //object destructuring assignment with custom varible names
// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tags,
// } = restaurant;
// console.log(restaurantName, hours, tags);

// //Specifying default values for destructuring variables
// const {
//   ratings: userRatings = ['No user ratings available'],
//   mainMenu: menu = ['No menu available'],
// } = restaurant;

// console.log(userRatings, menu);

// //Destructuring nested objects
// const {
//   fri: { open, close },
// } = hours;
// console.log(`open from ${open} to ${close}`);

// //Argument object destructuring
// restaurant.delivery({
//   time: '21:30',
//   address: 'Pje. M. Auxiliadora 2069',
//   starterIndex: 1,
//   mainIndex: 2,
// });

// //Testing destructuring parameters default values
// restaurant.delivery({
//   address: '25 de Mayo 1500',
//   mainIndex: 1,
// });
// restaurant.delivery({
//   starterIndex: 2,
//   mainIndex: 2,
// });

// // ************************************************
// // The spread operator (...)
// // ************************************************
// // The spread operator replaces comma-separated lists of values
// // it can only be used there

// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// //Use the spread operator to push the individual
// const goodNewArr = [1, 2, ...arr];
// console.log(goodNewArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// //Using the spread operator to create a shallow copy of the restaurant.mainMenu
// const mainMenuCopy = [...restaurant.mainMenu];

// //Using th spread operator to merge starterMenu and mainMenu
// const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(fullMenu);

// // *> The spread operator can be used with all JS iterables: arrays, strings, maps, sets
// const str = 'Esteban';
// console.log(...str);
// //This is the same as
// console.log('E', 's', 't', 'e', 'b', 'a', 'n');

// //using the spread operator to pass a comma-separated list of arguments
// // const ingredients = [
// //   prompt("Let's make pasta! \ningredient 1: "),
// //   prompt("Let's make pasta! \ningredient 2: "),
// //   prompt("Let's make pasta! \ningredient 3: "),
// // ];
// // restaurant.orderCustomPasta(...ingredients);

// //Using spread operator to create shallow copy of our restaurant object
// //since ES6 spread operator can not only be used on iterables, but also on objects
// //create a shallow copy and add more properties
// const newRestaurant = { ...restaurant, foundation: 1999, CEO: 'mojang' };
// console.log(newRestaurant);

// //create a shallow copy
// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurant.name);
// console.log(restaurantCopy.name);

// // ************************************************
// // Rest pattern
// // ************************************************
// // 1) destructuring:
// // Spread, ... on the RIGHT side of the assignment operator ===> unpacks array
// const arr = [1, 2, ...[4, 6]];

// // REST, ... on the LEFT side of the assignment operator ===> condense elements into an array
// const [a, b, ...others] = [1, 2, 3, 4, 5];
// //The rest patter
// console.log(a, b, others);

// //Performing both operations on the same line
// //rest
// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];

// console.log(pizza, risotto, otherFood);

// //REST pattern and objects
// const { sat, ...weekdays } = restaurant.openingHours; //perform object destructuring on the openingHours object. sat property is stored separatedly from the rest of the properties. they're all condensed into an array using the REST pattern

// //2) functions
// const add = function (...numbers) {
//   //collect a list of comman-separated list of values into an array using the REST pattern
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// };
// //passing a list of comma separated values to be condensed into an array
// add(2, 4);
// add(2, 4, 6, 4, 3);
// add(2, 4, 3, 9, 4, 2, 4, 6);

// const x = [23, 5, 7];
// //Use the spread operator instead of a comma-separated list, as it should be used
// add(...x);

// restaurant.orderCustomPizza('cheese', 'onion', 'sausage', 'bacon');
// restaurant.orderCustomPizza(`mayonaise`);

// // ************************************************
// // More about locial operators & short circuiting
// // ************************************************
// // console.log(45 || 'lawrence');
// // console.log('' || 'love' || 'peaceful');
// // console.log(undefined || null || '' || 0);

// //long way of doing an ssignment depending on the existance of a value
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10; //check if the property exist, I.E. it is defined, as undefined evaluates to falsy, we assign a default value to guests1
// console.log(guests1);

// restaurant.numGuests = false;
// //short way of doing an assignment depending on the existance of a value
// const guests2 = restaurant.numGuests ?? 10;
// console.log(guests2);

// console.log(10 && null && 'esteban');

// //Nullish coalescing operator
// let veryImportantObject;

// veryImportantObject = veryImportantObject ?? {
//   numericValue: 100,
//   description: 'hi bitches',
// }; //check to see if the object is defined as a safety mechanism. if not, define it right now

// console.log(veryImportantObject);

// // ************************************************
// // for-of loop
// // ************************************************
// const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of fullMenu) console.log(item);

// for (const [i, el] of fullMenu.entries()) {
//   console.log(`${i + 1}: ${el}`);
// }

// const coordinates = [
//   [5, 5],
//   [8, 1],
//   [7, 3],
// ];
// for (const [x, y] of coordinates) {
//   console.log(`(${x},${y})`);
// }

// // ************************************************
// // Optional chaining
// // ************************************************

// //Read the open property only if the mon object is defined
// //without optional chaining
// if (restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);

// //with optional chaining
// console.log(restaurant.openingHours?.mon?.open);

// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// for (const day of days) {
//   const open = restaurant.openingHours[day]?.open ?? 'closed';
//   console.log(`On ${day} we open at ${open}`);
// }

// //The pair ?. & ?? are used for checking if properties/methods are defined. If they're not, we assign a default value to them

// console.log(restaurant.deliverDonut?.('blue berry') ?? 'Method does not exist');

// ************************************************
// Optional chaining
// ************************************************

//Looping over an object keys
console.log(`We're open on: `);
for (const prop of Object.keys(restaurant.openingHours)) {
  console.log(prop);
}

// console.log('property names of the window object:');
// const windowPropNames = Object.keys(this);

// for (const prop of windowPropNames) {
//   console.log(prop);
// }

// console.log('property values of the window object:');
// const windowPropNames = Object.values(this);

// for (const prop of windowPropNames) {
//   console.log(prop);
// }

// console.log('key-value pairs of the window object:');
// const windowMembers = Object.entries(this);

// for (const prop of windowMembers) {
//   console.log(...prop);
// }

for (const [day, { open, close }] of Object.entries(restaurant.openingHours)) {
  console.log(`On ${day} we're open from ${open} to ${close}`);
}
