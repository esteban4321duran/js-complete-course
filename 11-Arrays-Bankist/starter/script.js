'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//states
let movementsSorted = false;

const updateUI = function (account) {
  calcDisplayMovements(account.movements);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
};

const calcDisplayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //sort mutates the original array. that's why we create a shallow copy of the array and sort that one
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">€${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterBegin', html);
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => (acc += mov), 0);
  labelBalance.textContent = `€${account.balance}`;
};

const calcDisplaySummary = function (account) {
  const movements = account.movements;
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, deposit) => (acc += deposit), 0);
  labelSumIn.textContent = `€${incomes}`;

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, withdrawal) => (acc += withdrawal), 0);
  labelSumOut.textContent = `€${Math.abs(outcomes)}`;

  //in our bank each deposit gets a 1.2% interest
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1) //Exclude interests that are below 1 euro
    .reduce((acc, interest) => (acc += interest), 0);
  labelSumInterest.textContent = `€${interest}`;
};

const createUsernames = function (accounts) {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

//event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting IE reload the page
  e.preventDefault();

  //Find the account whose username and pin match those entered by the user
  currentAccount = accounts.find(
    account => account.username === inputLoginUsername.value
  );
  //This is a way of checking if the value returned is not undefined IE the username entered corresponds to an account that exists
  // if (!currentAccount) {
  //   console.log('ACCOUNT NOT FOUND');
  //   return;
  // }
  //However, using the conditional chain is a much more elgant and ES6-like way of doing such thing
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('LOGIN SUCCESSFUL');
    //display UI, welcome message, balance, summary and movements
    login(currentAccount);
  } else {
    // console.log('WRONG ACCOUNT OR PASSWORD');
  }
});

const login = function (account) {
  displayWelcome(account);
  displayUI();
  updateUI(account);
  clearInputField(inputLoginUsername);
  clearInputField(inputLoginPin);
  movementsSorted = false;
};

const resetWelcome = function () {
  labelWelcome.innerHTML = 'Log in to get started';
};
const displayWelcome = function (currentAccount) {
  labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
};
const displayUI = function () {
  containerApp.style.opacity = 100;
};

const hideUI = function () {
  containerApp.style.opacity = 0;
  resetWelcome();
};
const clearInputField = function (field) {
  field.value = '';
  field.blur();
};

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );
  if (checkMovement(currentAccount, receiverAccount, amount)) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
    clearInputField(inputTransferTo);
    clearInputField(inputTransferAmount);
  }
});

const checkMovement = function (currentAccount, receiverAccount, amount) {
  return (
    receiverAccount &&
    currentAccount?.username !== receiverAccount?.username &&
    amount > 0 &&
    currentAccount?.balance >= amount
  );
};

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (checkLoanAmount(currentAccount.movements, amount)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});
const checkLoanAmount = function (movements, amount) {
  return amount > 0 && movements.some(mov => mov > amount * 0.1);
};
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const delUsername = inputCloseUsername.value;
  const delPin = Number(inputClosePin.value);
  if (
    checkCredentials(currentAccount, { username: delUsername, pin: delPin })
  ) {
    const delIndex = accounts.findIndex(
      account => account.username === delUsername
    );

    accounts.splice(delIndex, 1);
    clearInputField(inputCloseUsername);
    clearInputField(inputClosePin);
    hideUI();
  }
});

const checkCredentials = function (currentAccount, credentials) {
  return (
    currentAccount.username === credentials.username &&
    currentAccount.pin === credentials.pin
  );
};

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  movementsSorted = !movementsSorted;
  calcDisplayMovements(currentAccount.movements, movementsSorted);
  btnSort.classList.toggle('sorted');
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300, -540];

/////////////////////////////////////////////////
// *************************************************
// simple array methods
// *************************************************
// let arr = ['a', 'b', 'c', 'd', 'e', 'f'];
// //slice
// console.log('slice method');
// console.log(arr.slice(2));
// console.log(arr.slice(-3));
// console.log(arr.slice(1, -1));
// //splice
// console.log('splice methods');
// console.log(arr.splice(1, 2));
// console.log(arr);

// //reverse
// let arr2 = ['g', 'h', 'i', 'j', 'k', 'l'];
// console.log('reverse method');
// console.log(arr2.reverse());

// //concat
// console.log('concat method');
// const letters = arr.concat(arr2);
// console.log(letters);

// // *************************************************
// // forEach on arrays
// // *************************************************
// // for (const movement of movements) {
// //   if (movement > 0) {
// //     console.log(`You deposited ${movement}`);
// //   } else if (movement < 0) {
// //     console.log(`you withdrew ${Math.abs(movement)}`);
// //   }
// // }

// movements.forEach(function (movement, i) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   } else if (movement < 0) {
//     console.log(`Movement ${i + 1}: you withdrew ${Math.abs(movement)}`);
//   }
// });

// // *************************************************
// // forEach on maps & sets
// // *************************************************
// const currenciesSet = new Set();
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
//   currenciesSet.add(key);
// });

// currenciesSet.forEach(function (value, _, map) {
//   //key & value are the same
//   console.log(`${value}`);
// });

// // *************************************************
// // the Array.map() method
// // *************************************************
// const euroToUSD = 1.1;
// //we map all the elements of the original array into a new array after applying a callback function into each of them
// const movementsUSD = movements.map(mov => mov * euroToUSD);

// console.log(movements);
// console.log(movementsUSD);

// const movementsUSDforof = [];
// for (const mov of movements) movementsUSDforof.push(mov * euroToUSD);
// console.log(movementsUSDforof);

// const movDescriptions = movements.map((mov, i) => {
//   return `Movement ${i + 1}: you ${
//     mov > 0 ? 'deposited' : 'withdrew'
//   } €${mov}.`;
// });

// console.log(movDescriptions);

// // *************************************************
// // the Array.filter() method
// // *************************************************
// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(movements);
// console.log(deposits);
// console.log(withdrawals);

// // *************************************************
// // the Array.reduce() method
// // *************************************************
// //the reduce method boils down the elemenents in an array into a single value

// //In the callback function for the reduce method, the first parameter is always the accumulator that we return after iterating over the array
// const balance = movements.reduce((acc, mov) => (acc += mov), 0);
// console.log(movements);
// console.log(`Account balance: ${balance}`);

// //use the reduce method to find the max number
// const max = movements.reduce((max, mov) => (mov > max ? mov : max), 0);
// const min = movements.reduce((min, mov) => {
//   //initialize the min value to the first movement
//   min = min ?? mov;
//   return mov < min ? mov : min;
// }, undefined);
// console.log(movements);
// console.log(min);
// console.log(max);

// // *************************************************
// // Combining array methods
// // *************************************************
// const euroToUSD = 1.1;
// const deposits = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * euroToUSD)
//   .reduce((acc, mov) => (acc += mov), 0);
// console.log(movements);
// console.log(deposits);

// // *************************************************
// // array.find() method
// // *************************************************
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// const account = accounts.find(account => account.owner === 'Jessica Davis');
// console.log(accounts);
// console.log(account);

// *************************************************
// array.some() & array.every();
// *************************************************
// console.log(movements);
// console.log(movements.includes(-130));
// console.log(movements.some(mov => mov < -650));
// console.log(account1?.movements?.every(mov => mov > 0));

// *************************************************
// array.flat() & array.flatMap();
// *************************************************
// //calculate bank global balance
// const accountMovements = accounts.map(account => account.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const globalBalance = allMovements.reduce((acc, mov) => (acc += mov), 0);
// console.log(globalBalance);

// //without using flatMap()
// const globalBalance2 = accounts
//   .map(account => account.movements)
//   .flat()
//   .reduce((acc, mov) => (acc += mov), 0);
// console.log(globalBalance2);

// //using flatMap()
// const globalBalance3 = accounts
//   .flatMap(account => account.movements)
//   .reduce((acc, mov) => (acc += mov), 0);

// *************************************************
// array.sort()
// *************************************************
// const students = ['Duran', 'Albornoz', 'Cabrera', 'Brandan'];
// console.log(students);
// console.log(students.sort());
// const ages = [20, 1000, 8, 45, 32];

// console.log(ages);
// console.log('Wrong way of using array.sort() to sort numbers:');
// console.log(ages.sort());
// console.log('Correct way of using array.sort() to sort numbers:');
// console.log(ages.sort((a, b) => (a > b ? 1 : -1)));
// console.log(ages.sort((a, b) => a - b));

// *************************************************
// non-literal array creation
// *************************************************
// let a = new Array();
// let b = new Array(5);
// let c = new Array(1, 2, 3, 4, 5, 6, 7);

// console.log(a);
// console.log(b);
// console.log(c);

// a = a.map(e => 5);
// b = b.map(e => 7);

// console.log(a);
// console.log(b);
// console.log(c);

// a.fill(2.54356);
// b.fill(2.54356, 2);
// b.fill(2.54356, 3, 5);

// console.log(a);
// console.log(b);
// console.log(c);

// const x = Array.from({ length: 7 }, (_, i) => (i + 1) * 5);
// console.log(x);

// const rng = Array.from({ length: 100 }, _ => Math.floor(Math.random() * 6 + 1));
// console.log(rng);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );
//   console.log(movementsUI);
// });
