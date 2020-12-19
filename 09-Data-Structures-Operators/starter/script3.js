'use strict';

//************************************************
// Strings 1
//************************************************
const airline = 'TAP Air Portugal';
const plane = 'A320';

// console.log(plane[0]);
// console.log(plane[2]);
// console.log('B504'[3]);
// console.log(airline.length);
// console.log(airline.indexOf('A'));
// console.log(airline.lastIndexOf('a'));
// console.log(airline.slice(airline.indexOf(' ') + 1, 10));

//extracting first word
console.log(airline.slice(0, airline.indexOf(' ')));

console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-3));

console.log(airline.slice(0, -2));

const airplane = {
  airline,
  model: plane,
  seatsPerRow: 6,

  checkMiddleSeat(seat) {
    //A,B,C		D,E,F		G,H,I
    const s = seat.slice(-1);
    if (s === 'B' || s === 'E')
      console.log(seat + ": You got the middle seat :'(");
    else {
      console.log(seat + ": Lucky! You didn't get a middle seat");
    }
  },
};

airplane.checkMiddleSeat('11B');
airplane.checkMiddleSeat('23E');
airplane.checkMiddleSeat('71C');

//************************************************
// Strings 2
//************************************************

console.log(airplane.airline.toLowerCase());
console.log(airplane.airline.toUpperCase());

const passenger = 'ESTeban';
const passengerLower = passenger.toLowerCase();
const passengerCapi = passengerLower[0].toUpperCase() + passengerLower.slice(1);

console.log(passengerCapi);

//comparing emails

const email = 'esteban@gmail.com';
const loginEmail = '     Esteban@Gmail.com  \n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
const normalizedEmail = loginEmail.toLowerCase().trim();

console.log(normalizedEmail);

const priceGB = '288,78£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const [firstName, lastName] = 'Esteban Duran'.split(' ');
const newName = ['Ing.', firstName, lastName].join(' ');
console.log(newName);

function capitalizeName(name) {
  const names = name.split(' ');
  const nameCapitalized = [];
  for (const n of names) {
    nameCapitalized.push(n[0].toUpperCase() + n.slice(1));
  }
  return nameCapitalized.join(' ');
}
const capName1 = capitalizeName('esteban frederick johhan sebastian');
const capName2 = capitalizeName('jessica parker adamsson');
console.log(capName1, capName2);

function maskCreditCard(number) {
  const str = number + '';
  const visibleDigits = 4;
  //Leave the last four digits
  const last = str.slice(-visibleDigits);
  //pad the last four digits from the start until we match the original length of the input string
  return last.padStart(str.length, '*');
}
console.log(maskCreditCard(478342347487328));
console.log(maskCreditCard(939473980023004));
console.log(maskCreditCard(574777399920932));

const msg = 'Bad weather...All departures delayed...';
console.log(msg.repeat(10));
