//importing module
// import {
//   addToCart,
//   totalPrice as price,
//   totalQuantity,
// } from './shoppingCart.js';
// addToCart('bread', 6);
// console.log(price, totalQuantity);

// import * as ShoppingCart from './shoppingCart.js';
// import clean from './shoppingCart.js';

// console.log(`Importing module`);

// console.log(ShoppingCart.cart);
// ShoppingCart.addToCart(`Buttter`, 2);
// ShoppingCart.addToCart(`Pizza`, 2);
// ShoppingCart.addToCart(`Salmon`, 2);
// console.log(ShoppingCart.cart);
// clean(6);

//Importing function from module without bundler
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//importing function from module with bundler (parcel)
import cloneDeep from 'lodash-es';
import { addToCart } from './shoppingCart.js';
import { cart } from './shoppingCart';

// const state = {
//   cart: [
//     { product: 'bread', quantity: 5 },
//     { product: 'pizza', quantity: 5 },
//   ],
//   user: { loggedIn: true },
// };
// const stateClone = Object.assign({}, state);
// const stateDeepClone = cloneDeep(state);
// state.user.loggedIn = false;
// console.log(state);
// console.log(stateClone);
// console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

addToCart('Bread', 4);
addToCart('Cheese', 2);

console.log(cart);

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`${this.greeting}, my name is ${this.name}`);
  }
}

// ***********************************************
// Transpilling & polyfilling
// ***********************************************
//ES6 real new features can't be transpilled. They need to be polyfilled
console.log(cart.filter(el => el.quantity >= 4));
Promise.resolve('Test').then(res => console.log(res));

//Polyfilling is done by importing this library
import 'core-js/stable';
//Polyfilling async functions
import 'regenerator-runtime/runtime';
