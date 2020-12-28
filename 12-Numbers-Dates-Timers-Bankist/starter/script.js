'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-06-23T17:01:17.194Z',
    '2020-07-26T23:36:17.929Z',
    '2020-08-27T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-27T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelClock = document.querySelector('.clock');
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

/////////////////////////////////////////////////
//states
let movementsSorted = false;

const updateUI = function (account) {
  calcDisplayMovements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
};

const calcDisplayMovements = function (account, sort = false) {
  const movements = account.movements;
  containerMovements.innerHTML = '';

  //sort mutates the original array. that's why we create a shallow copy of the array and sort that one
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const displayDate = formatMovementDate(
      new Date(account.movementsDates[i]),
      account.locale
    );
    const formattedMov = formatCurrency({
      locale: account.locale,
      currency: account.currency,
      amount: mov,
    });
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterBegin', html);
  });
};

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => (acc += mov), 0);
  labelBalance.textContent = formatCurrency({
    locale: account.locale,
    currency: account.currency,
    amount: account.balance,
  });
};

const calcDisplaySummary = function (account) {
  const movements = account.movements;
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, deposit) => (acc += deposit), 0);
  labelSumIn.textContent = formatCurrency({
    locale: account.locale,
    currency: account.currency,
    amount: incomes,
  });

  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, withdrawal) => (acc += withdrawal), 0);
  labelSumOut.textContent = formatCurrency({
    locale: account.locale,
    currency: account.currency,
    amount: outcomes,
  });

  //in our bank each deposit gets a 1.2% interest
  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1) //Exclude interests that are below 1 euro
    .reduce((acc, interest) => (acc += interest), 0);
  labelSumInterest.textContent = formatCurrency({
    locale: account.locale,
    currency: account.currency,
    amount: interest,
  });
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
  if (currentAccount?.pin === +inputLoginPin.value) {
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
  // labelDate.textContent = formatDate(new Date(Date.now()));
  //Use Intl, for achieving internationalized dates
  const options = {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric',
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    account.locale,
    options
  ).format(new Date());
  clock(account.locale);
  setInterval(clock, 1000, currentAccount.locale);
};
const clock = function (locale) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  labelClock.textContent = new Intl.DateTimeFormat(locale, options).format(
    new Date()
  );
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

  const amount = +inputTransferAmount.value;
  const receiverAccount = accounts.find(
    account => account.username === inputTransferTo.value
  );
  if (checkMovement(currentAccount, receiverAccount, amount)) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());

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
  //Math methods automatically perform type coercion
  const amount = Math.floor(inputLoanAmount.value);
  if (checkLoanAmount(currentAccount.movements, amount)) {
    setTimeout(() => {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date());
      updateUI(currentAccount);
    }, 2500);
  }
});
const checkLoanAmount = function (movements, amount) {
  return amount > 0 && movements.some(mov => mov > amount * 0.1);
};
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const delUsername = inputCloseUsername.value;
  const delPin = +inputClosePin.value;
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

const formatDate = function (date) {
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0); //months are 0 based for some reason in JS
  const year = date.getFullYear();
  const hour = `${date.getHours() + 1}`.padStart(2, 0);
  const min = `${date.getMinutes() + 1}`.padStart(2, 0);
  return `${month}/${day}/${year}, ${hour}:${min}`;
};

const formatMovementDate = function (movDate, locale) {
  const daysPassed = calcDaysPassed(new Date(), movDate);
  if (daysPassed === 0) return 'Today';
  else if (daysPassed === 1) return 'Yesterday';
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else return new Intl.DateTimeFormat(locale).format(movDate);
};

const calcDaysPassed = function (date1, date2) {
  const milisectodays = 1000 * 60 * 60 * 24;
  return Math.round(Math.abs(date1 - date2) / milisectodays);
};

const formatCurrency = function ({
  locale: locale = 'en_US',
  currency: currency = 'USD',
  amount: amount = '0',
}) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

//fake always login//////////////////////////////////////////
// currentAccount = account1;
// login(currentAccount);
/////////////////////////////////////////////////////////////

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// // *******************************************
// // numbers. Number
// // *******************************************
// console.log(23 === 23.0);
// console.log(0.1 + 0.2);
// console.log(Number.parseInt('200', 10));
// console.log(Number.parseInt('210', 3));

// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20'));
// console.log(Number.isNaN(1 / 0));

// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20'));
// console.log(Number.isFinite(1 / 0));

// //use the + operator to force type coercion from string to number
// const input = +prompt('Enter a number');
// if (Number.isFinite(input)) alert('thanks');
// else alert('you messed up');

// // *******************************************
// // Math
// // *******************************************

// console.log(Math.sqrt(36));
// console.log(Math.round(1000 ** (1 / 3)));
// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;

// // console.log(`random integers within a range`);
// // for (let i = 0; i < 10; i++) {
// //   console.log(randomInt(5, 10));
// // }

// console.log(Math.trunc(76.3));
// console.log(Math.trunc(-76.3));
// console.log(Math.floor(76.3));
// console.log(Math.floor(-76.3));

// console.log(+(2.7587459834).toFixed(4));

// *******************************************
// Remnainder operator
// *******************************************

// const isEven = n => n % 2 === 0;

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (isEven(i)) row.style.backgroundColor = 'orange';
//     if (!isEven(i)) row.style.backgroundColor = 'blue';
//   });
// });

// // *******************************************
// // BigInt
// // *******************************************
// const x = 2 ** 53 - 1;

// console.log(`Biggest integer JS can represent: ${x}`);
// console.log(`Max safe integer: ${Number.MAX_SAFE_INTEGER}`);

// const y = 36498237659287569485769457394n;
// console.log(typeof y);

// console.log(BigInt(x) * y);

// const z = -5750493875029348755403875438754348n;
// console.log(z);

// *******************************************
// Dates
// *******************************************
// const now = new Date();
// console.log(now);

// const d1 = new Date('Dec 27 2020 17:59:01');
// console.log(d1);

// console.log(new Date('December 24, 2019'));

// console.log(new Date('07/08/00'));

// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(2019, 1, 29, 21));

// const dayTimestamp = 24 * 60 * 60 * 1000;

// console.log(new Date(10 * dayTimestamp));

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(`future: ${future}`);
// console.log(future.getFullYear());
// console.log(future.toISOString());
// console.log(future.getTime());
// console.log(Date.now());
// future.setFullYear(2040);
// future.setMonth(0);
// console.log(future);

// // *******************************************
// // Date arithmetics
// // *******************************************

// const first = new Date(2020, 0, 1);
// const second = new Date(2020, 6, 1, 4);
// console.log(first, second);
// const milisectodays = 1000 * 60 * 60 * 24;

// const calcDaysPassed = (date1, date2) =>
//   Math.round(Math.abs(date1 - date2) / milisectodays);

// console.log(calcDaysPassed(first, second));

// *******************************************
// Internationalizing API
// *******************************************
// const num = 43785093.12;

// const options = {
//   style: 'currency',
//   currency: 'USD',
//   useGrouping: false,
// };

// console.log(`US: ${new Intl.NumberFormat('en-US', options).format(num)}`);
// console.log(`UK: ${new Intl.NumberFormat('en-GB', options).format(num)}`);
// console.log(`DE: ${new Intl.NumberFormat('de-DE', options).format(num)}`);
// console.log(`JP: ${new Intl.NumberFormat('ja-JP', options).format(num)}`);
// console.log(`AR: ${new Intl.NumberFormat('es-AR', options).format(num)}`);

// *******************************************
// Timers
// *******************************************
// const pizzaOrder = {
//   ingredients: ['pepperoni', 'cheese', 'lettuce'],
//   size: 'large',
// };

// const pizzaTimer = setTimeout(
//   (size, ...ingredients) => {
//     console.log(
//       `Your ${size} pizza with ${ingredients.join(', ')} has arrived`
//     );
//   },
//   3000,
//   pizzaOrder.size,
//   ...pizzaOrder.ingredients
// );
// console.log('Waiting...');

// if (pizzaOrder.ingredients.includes('pineapple')) {
//   clearTimeout(pizzaTimer);
//   console.log(`Pinneaple containing pizza order cancelled successfully`);
// }

// //intervals
// setInterval(() => console.log('minecraft'), 1000);
