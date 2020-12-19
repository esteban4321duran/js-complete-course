'use strict';

//************** functions ***************//
// function greet() {
//     console.log(`Welcome to javascript!!`);
// }

// function fruitProcessor(fruit) {
//     switch (fruit) {
//         case 'apple':
//             return `Delicious ${fruit} juice`;
//         case 'orange':
//             return `Refreshing ${fruit} juice`;
//         case 'grape':
//             return `Sweet ${fruit} juice`;
//         default:
//             return `Cannot process a ${fruit}`;
//     }
// }

// const juice1 = fruitProcessor('apple');
// const juice2 = fruitProcessor('orange');
// const juice3 = fruitProcessor('banana');
// const juice4 = fruitProcessor('watermelon');
// const juice5 = fruitProcessor('grape');

// console.log(juice1);
// console.log(juice2);
// console.log(juice3);
// console.log(juice4);
// console.log(juice5);


// //**** function declarations vs function expressions *****//
// const birthYear = 1993;
// const graduationYear = 2011;

// function calcAge(birthYear) {
//     return 2020 - birthYear;
// }

// const age = calcAge(birthYear);
// console.log(`My age is ${age}`);

// const calcSinceGraduation = function (graduationYear) {
//     return 2020 - graduationYear;
// }


// //**** Arrow functions *****//
// const calcTimeSince = year => 2020 - year;
// const calcTimeUntilRetirement = birthYear => {
//     const age = 2020 - birthYear;
//     return 65 - age;
// }

// // const timeSinceRenaisance = calcTimeSince(1572);
// // console.log(`Time since renaisance ${timeSinceRenaisance} years.`);

// const birthYear = 1985;
// console.log(`Years until retirement: ${calcTimeUntilRetirement(birthYear)}`);



//*************  Introduction to arrays ************/
// const daysWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
// const firstDay = daysWeek[0];
// const lastDay = daysWeek[daysWeek.length - 1];

// console.log(daysWeek);
// console.log(firstDay);
// console.log(lastDay);

// const calcAge = birthYear => 2020 - birthYear;

// const birthYears = [1990, 1979, 1960, 2005, 2002];
// const ages = [calcAge(birthYears[0]),
// calcAge(birthYears[1]),
// calcAge(birthYears[2]),
// calcAge(birthYears[3]),
// calcAge(birthYears[4])];
// console.log(ages);


//******** Basic array operations ***********//
// const colors = ['red', 'yellow', 'green'];
// console.log(colors);

// const newLength = colors.push('light_blue');
// console.log(colors, newLength);

// colors.unshift('purple');
// console.log(colors);

// const removedElement = colors.pop();
// console.log(colors, removedElement);

// colors.shift();
// console.log(colors);

// console.log(colors.indexOf('red'));

// console.log(colors.includes('blue'));

// if (colors.includes('green')) console.log('You have the color green');


//*** Object definition with literal syntax, dot notation, bracket notation, object methods***
const esteban = {
    firstName: 'Esteban',
    lastName: 'Duran',
    birthYear: 2000,
    job: 'Student',
    friends: ['Agustina', 'Alejandro', 'Matias', 'Juan'],
    hasDriversLicense: true,
    calcAge: function () {
        this.age = 2020 - this.birthYear;
        return this.age;
    },
    canDrive: function (age) {
        return age >= 18;
    },
    getSummary: function () {
        return `${this.firstName} ${this.firstName} is ${this.calcAge()} years old. ${this.job !== 'Unnocupied' ? ('He currently works as a ' + this.job) : 'He is currently unnocupied'}. He has ${this.friends.length} friends, and his best friend is ${this.friends[0]}. He ${this.hasDriversLicense ? 'has' : 'doesn\'t have'} a drivers license.`
    }
};

esteban.calcAge();
console.log(esteban);
console.log(esteban.age);
console.log(esteban['lastName']);

// const request = prompt('What do you want to know about Esteban?');
// if (esteban[request]) {
//     alert(esteban[request]);
// } else {
//     alert('Wrong request')
// }

console.log(`${esteban.firstName} has ${esteban.friends.length} friends, and his best friend is ${esteban.friends[0]}.`);

console.log(esteban.age);
console.log(esteban.canDrive(esteban.age));
console.log(esteban.getSummary());

