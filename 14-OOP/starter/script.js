'use strict';

// ****************************************************
// Constructor functions and the new operator
// ****************************************************
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// const calcAge = function (currentYear) {
//   return currentYear - this.birthYear;
// };

// const p1 = new Person('Esteban', 2000);
// const p2 = new Person('Julie', 1995);
// const currentYear = 2020;

// console.log(Person.prototype);
// console.log(p1);
// console.log(p2);

// ****************************************************
// prototypes
// ****************************************************
// Person.prototype.calcAge = calcAge;
// Person.prototype.species = 'Homo Sapiens';

// const p3 = new Person('Cecilia', 2005);

// console.log(
//   `The ${p3.species}, ${p3.firstName} is ${p3.calcAge(2021)} years old`
// );
// console.log(p3.__proto__ === Person.prototype);
// console.log(Person.prototype.isPrototypeOf(p3));

// console.log(p3.hasOwnProperty('firstName'));
// console.log(p3.hasOwnProperty('species'));

// ****************************************************
// prototypal inheritance
// ****************************************************
// console.log(p1.__proto__);
// console.log(p1.__proto__.__proto__);
// console.log(p1.__proto__.__proto__.__proto__);

// the calling of mehotds like hasOwnProperty, which are defined on the Object() constructor, work thanks to the prototype chain

// console.dir(Person.prototype.constructor);

// const arr = [1, 2, 3, 1, 2, 3, 5, 1, 2, 3];

// console.log(arr.__proto__ === Array.prototype);
// console.log(arr.__proto__.__proto__);

// extending arrays functionality even further by adding methods to the Array prototype
// Array.prototype.unique = function () {
//   return [...new Set(this)];
// };

// console.log(arr.unique());
// however extending the functionality of built-in objects is a BAD practice

// const h1 = document.querySelector('h1');

// ****************************************************
// ES6 classes
// ****************************************************
// class Person {
//   constructor(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   }
//   greet() {
//     console.log(`${this.firstName} says Hi!`);
//   }
//   calcAge(currentYear) {
//     console.log(
//       `${this.firstName} is ${currentYear - this.birthYear} years old`
//     );
//   }
// }
// class Label {
//   constructor(msg) {
//     this.msg = msg;
//     this.element = document.createElement('p');
//     this.element.textContent = this.msg;
//   }
// }

// const p1 = new Person('Jessica', 1993);

// console.log(p1);
// p1.greet();
// p1.calcAge(2021);
// console.log(p1.__proto__ === Person.prototype);

// const el = new Label('Change the world. My final message.');
// document.body.append(el.element);
// console.log(el);

// ****************************************************
// static methods
// ****************************************************
// const Block = function (type, breakable, dropItem, dropAmount = 1) {
//   this.type = type;
//   this.breakable = breakable;
//   this.dropItem = dropItem;
//   this.dropAmount = dropAmount;
// };
// const mine = function () {
//   if (this.breakable)
//     console.log(
//       `You mine the ${this.type}. You got ${this.dropAmount} ${this.dropItem}`
//     );
//   else console.log('This block is unbreakable');
// };
// const warn = function () {
//   console.log(`Going alone at night is very dangerous.`);
// };
// Block.prototype.mine = mine;
// Block.warn = warn;
// Block.entity = function () {
//   console.log(this);
// };
// const b1 = new Block('iron', true, 'iron ore');
// console.log(b1);
// b1.mine();
// Block.warn();
// // b1.warn();
// Block.entity();

// class Entity {
//   constructor(entityName, uuid) {
//     this.entityName = entityName;
//     this.uuid = uuid;
//   }

//   static killAll() {
//     console.log('All instances were killed');
//   }
//   toString() {
//     return `The entity ${this.uuid}, is a ${this.entityName}`;
//   }
// }
// const creeper = new Entity('Creeper', 192948);

// Entity.killAll();
// console.log(creeper.toString());

// ****************************************************
// Object.crete()
// ****************************************************

// const PersonProto = {
//   calcAge(currentYear) {
//     console.log(
//       `${this.firstName} is ${currentYear - this.birthYear} years old.`
//     );
//   },
// };

// const steven = Object.create(PersonProto);
// steven.firstName = 'Steven';
// steven.birthYear = 1999;

// steven.calcAge(2021);
// console.log(steven.__proto__);

// ****************************************************
// inheritance between "classes"
// ****************************************************
// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };
// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };
// const Approved = function (firstName, birthYear, course, grade) {
//   Student.call(this, firstName, birthYear, course);
//   this.grade = grade;
// };

// //link prototypes. Prototypal inheritance/delegation is achieved
// Student.prototype = Object.create(Person.prototype);
// Student.prototype.constructor = Student;
// Approved.prototype = Object.create(Student.prototype);
// Approved.prototype.constructor = Approved;

// const mike = new Student('Mike', 2005, 'Computer Science');

// Person.prototype.calcAge = function (currentYear) {
//   return currentYear - this.birthYear;
// };
// Student.prototype.introduce = function () {
//   console.log(
//     `My name is ${this.firstName}. I'm ${this.calcAge(2021)} and I study ${
//       this.course
//     }.`
//   );
// };

// // mike.introduce();
// // console.dir(Student.prototype.constructor);
// const sussie = new Approved('Sussie', 2002, 'Accounting', 8.9);

// //Person defines calcAge()
// //Student defines introduce()
// //an object created from the Student constructor has access to the methods in the prototype property of the Student constructor.

// ****************************************************
// another class example & the encapsulation convention '_'
// ****************************************************

// //Bank accounts
// class Account {
//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this._pin = pin;
//     //movements is protected, not quite private, yet not public by convention
//     this._movements = [];
//     this.locale = navigator.language;
//     console.log(`Thanks for opening an account ${owner}`);
//   }
//   deposit(amount) {
//     if (Math.abs(amount) === 0) {
//       console.log(`The movement should be greater than 0`);
//       return;
//     }
//     this._movements.push(amount);
//   }
//   withdrawal(amount) {
//     this.deposit(-amount);
//   }
//   _approveLoan(amount) {
//     console.log(`Loan approved`);
//     return true;
//   }
//   requestLoan(amount) {
//     if (this._approveLoan(amount)) {
//       this.deposit(amount);
//     }
//   }
// }

// const account1 = new Account('Jonas', 'EUR', 1111);
// account1.deposit(150);
// account1.withdrawal(100);
// account1.requestLoan(1000);

// ****************************************************
// actual encapsulation: class fields '#'
// ****************************************************
// //Bank accounts
// class Account {
//   //public fields
//   locale = navigator.language;
//   //private fields
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.#pin = pin;
//     //movements is protected, not quite private, yet not public by convention
//     console.log(`Thanks for opening an account ${owner}`);
//   }
//   deposit(amount) {
//     if (Math.abs(amount) === 0) {
//       console.log(`The movement should be greater than 0`);
//       return;
//     }
//     this.#movements.push(amount);
//   }
//   withdrawal(amount) {
//     this.deposit(-amount);
//   }
//   #approveLoan(amount) {
//     console.log(`Loan approved`);
//     return true;
//   }
//   requestLoan(amount) {
//     if (this.#approveLoan(amount)) {
//       this.deposit(amount);
//     }
//   }
// }

// const account1 = new Account('Jonas', 'EUR', 1111);
// account1.deposit(150);
// account1.withdrawal(100);
// account1.requestLoan(1000);
