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
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
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
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
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
  const amount = +inputLoanAmount.value;
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
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// *******************************************
// numbers
// *******************************************
console.log(23 === 23.0);
console.log(0.1 + 0.2);
console.log(Number.);