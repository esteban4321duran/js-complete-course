'strict mode';
//////////////////////////////////////////////
// challenge 1
//////////////////////////////////////////////

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`This ${this.make} is going at ${this.speed} km/h`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`This ${this.make} is going at ${this.speed} km/h`);
// };

// const car1 = new Car('BMW', 100);
// const car2 = new Car('Honda', 120);
// const maxSpeed = 200;
// const minSpeed = 80;

// const speedUp = function (car) {
//   car.accelerate();
//   if (car.speed === maxSpeed) {
//     clearInterval(accelerationTimer);
//   }
// };
// const speedDown = function (car) {
//   car.brake();
//   if (car.speed === minSpeed) {
//     clearInterval(brakingTimer);
//   }
// };
// const accelerationTimer = setInterval(speedUp, 1000, car1);
// const brakingTimer = setInterval(speedDown, 1000, car2);

//////////////////////////////////////////////
// challenge 2
//////////////////////////////////////////////
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`This ${this.make} is going at ${this.speed} km/h`);
// };
// Car.prototype.brake = function

// const kmToMiPerHour = 1.6;
// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 10;
//     console.log(`This ${this.make} is going at ${this.speed} km/h`);
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`This ${this.make} is going at ${this.speed} km/h`);
//   }
//   get speedUS() {
//     return this.speed / kmToMiPerHour;
//   }
//   set speedUS(speed) {
//     this.speed = speed * kmToMiPerHour;
//   }
// }

// const car1 = new Car('Nissan', 100);
// car1.speedUS = 100;
// console.log(car1.speed);
// console.log(car1.speedUS);
// car1.accelerate();
// console.log(car1.speedUS);

//////////////////////////////////////////////
// challenge 3
//////////////////////////////////////////////

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`This ${this.make} is going at ${this.speed} km/h`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`This ${this.make} is going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);
// EV.prototype.constructor = EV;

// EV.prototype.chargeTo = function (amount) {
//   this.charge = amount;
// };

// //override Car.accelerate()
// EV.prototype.accelerate = function () {
//   if (this.charge > 0) {
//     this.speed += 20;
//     this.charge -= 1;
//     console.log(
//       `This ${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
//     );
//   } else console.log(`This ${this.make} depleted it's battery.`);
// };

// const ev1 = new EV('Tesla', 120, 3);

// const speedUp = function (car) {
//   if (car.charge <= 0) clearInterval(accelTimer);
//   car.accelerate();
// };

// const accelTimer = setInterval(speedUp, 500, ev1);

//////////////////////////////////////////////
// challenge 4
//////////////////////////////////////////////
// class Car {
//   make;
//   speed;
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   accelerate() {
//     this.speed += 20;
//     console.log(`This ${this.make} is going at ${this.speed} km/h`);
//     return this;
//   }
//   brake() {
//     this.speed -= 5;
//     console.log(`This ${this.make} is going at ${this.speed} km/h`);
//     return this;
//   }
// }

// class EV extends Car {
//   #charge;

//   constructor(make, speed, charge) {
//     super(make, speed);
//     this.#charge = charge;
//   }
//   accelerate() {
//     this.speed += 20;
//     this.#charge--;
//     console.log(
//       `This ${this.make} is going at ${this.speed} km/h with a charge of ${
//         this.#charge
//       }%`
//     );
//     return this;
//   }
//   chargeTo(amount) {
//     this.#charge = amount;
//     console.log(`${this.make}'s battery: ${this.#charge}%`);
//     return this;
//   }
// }

// const ev1 = new EV('Rivian', 100, 24);

// ev1
//   .accelerate()
//   .accelerate()
//   .accelerate()
//   .brake()
//   .brake()
//   .brake()
//   .chargeTo(100);
