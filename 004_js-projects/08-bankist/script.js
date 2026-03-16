"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "standard",
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2025-03-10T17:01:17.194Z",
    "2025-03-12T23:36:17.929Z",
    "2025-03-13T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "ru-RU", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "premium",
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

let currentAccount;
let timer;
let sorted = false;

function updateUI() {
  displayCurrentTime();
  displayMovements(currentAccount);
  displayBalance(currentAccount);
  displaySummary(currentAccount);
}

function displayMovements(account) {
  containerMovements.innerHTML = "";
  const combinedMovements = account.movements.map((mov, i) => ({
    movement: mov,
    movementDate: account.movementsDates.at(i),
  }));
  if (sorted) combinedMovements.sort((a, b) => a.movement - b.movement);
  combinedMovements.forEach((obj, i) => {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? "deposit" : "withdrawal";
    const date = new Date(movementDate);
    const displayDate = formatMovementDate(date, account.locale);
    const displayMovement = formatCurrency(
      movement,
      account.locale,
      account.currency
    );
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1} ${type}
          </div>
          <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${displayMovement}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function displayBalance(account) {
  account.balance = account.movements.reduce(
    (previous, current) => previous + current,
    0
  );
  labelBalance.textContent = `${formatCurrency(
    account.balance,
    account.locale,
    account.currency
  )}`;
}

function displaySummary(account) {
  const incomes = account.movements
    .filter((item) => item > 0)
    .reduce((prev, cur) => prev + cur, 0);
  const outcomes = account.movements
    .filter((item) => item < 0)
    .reduce((prev, cur) => prev + cur, 0);
  const interest = account.movements
    .filter((item) => item > 0)
    .map((item) => (item * account.interestRate) / 100)
    .filter((item) => item >= 1)
    .reduce((prev, curr) => prev + curr, 0);
  const displayOptions = [account.locale, account.currency];
  labelSumIn.innerHTML = formatCurrency(incomes, ...displayOptions);
  labelSumOut.innerHTML = formatCurrency(Math.abs(outcomes), ...displayOptions);
  labelSumInterest.innerHTML = formatCurrency(interest, ...displayOptions);
}

/* function displayCurrentTimeCustom() {
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();
  const hours = `${now.getHours()}`.padStart(2, 0);
  const minutes = `${now.getMinutes()}`.padStart(2, 0);
  labelDate.textContent = `${day}/${month}/${year} ${hours}:${minutes}`;
} */

function startLogOutTimer() {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 120;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}

function displayCurrentTime() {
  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "long",
    year: "numeric",
    weekday: "long",
  };
  /* const locale = navigator.language; */ //locale from user's browser
  const locale = currentAccount?.locale ?? "en-Us";
  labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
}

function formatCurrency(num, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(num);
}

function formatMovementDate(date, locale) {
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days passed`;
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
  // custom
  /*  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`; */
}

function calcDaysPassed(date1, date2) {
  return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
}

function createUsernames(accs) {
  accs.forEach((acc) => {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentAccount = accounts.find(
    (item) => item.username === inputLoginUsername.value
  );
  if (currentAccount?.pin !== Number(inputLoginPin.value)) {
    alert("Incorrect login and password data!!!");
    return;
  }
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(" ")[0]
  }`;
  containerApp.style.opacity = 100;
  inputLoginUsername.value = "";
  inputLoginPin.value = "";
  inputLoginUsername.blur();
  inputLoginPin.blur();
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
  updateUI();
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const sumToTransfer = Number(inputTransferAmount.value);
  const accToTransfer = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (!accToTransfer) return;
  if (sumToTransfer <= 0) return;
  if (currentAccount.balance < sumToTransfer) return;
  if (accToTransfer?.username === currentAccount.username) return;
  currentAccount.movements.push(-sumToTransfer);
  accToTransfer.movements.push(sumToTransfer);
  currentAccount.movementsDates.push(new Date().toISOString());
  accToTransfer.movementsDates.push(new Date().toISOString());
  inputTransferTo.value = "";
  inputTransferAmount.value = "";
  clearInterval(timer);
  timer = startLogOutTimer();
  updateUI();
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const loanSum = Math.floor(inputLoanAmount.value);
  if (loanSum <= 0) return;
  if (!currentAccount.movements.some((mov) => mov >= loanSum * 0.1)) return;
  setTimeout(() => {
    //simulating bank checking process
    currentAccount.movements.push(loanSum);
    currentAccount.movementsDates.push(new Date().toISOString());
    inputLoanAmount.value = "";
    clearInterval(timer);
    timer = startLogOutTimer();
    updateUI();
  }, 1500);
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputCloseUsername.value !== currentAccount.username ||
    Number(inputClosePin.value) !== currentAccount.pin
  )
    return;
  const indexToDelete = accounts.findIndex(
    (acc) => acc.username === currentAccount.username
  );
  accounts.splice(indexToDelete, 1);
  inputCloseUsername.value = "";
  inputClosePin.value = "";
  containerApp.style.opacity = 0;
});

btnSort.addEventListener("click", () => {
  sorted = !sorted;
  updateUI();
});

createUsernames(accounts);

/* Practice */
console.log(
  `All acounts balance: ${accounts
    .flatMap((acc) => acc.movements)
    .reduce((prev, cur) => prev + cur)}`
);
console.log(Object.groupBy(accounts, ({ type }) => type));
