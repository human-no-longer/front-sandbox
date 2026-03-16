"use strict";
const scoreOneEl = document.querySelector("#score--0");
const scoreTwoEl = document.querySelector("#score--1");
const currentScoreOneEl = document.querySelector("#current--0");
const currentScoreTwoEl = document.querySelector("#current--1");
const playerOneEl = document.querySelector(".player--0");
const playerTwoEl = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const newBtnEl = document.querySelector(".btn--new");
const rollBtnEl = document.querySelector(".btn--roll");
const holdBtnEl = document.querySelector(".btn--hold");

let winPoints, score, isGameOn, activePlayer, currentScore;

resetGame(30);

rollBtnEl.addEventListener("click", rollDice);
holdBtnEl.addEventListener("click", holdScore);
newBtnEl.addEventListener("click", () => resetGame(30));

function resetGame(points = 100) {
  winPoints = points;
  isGameOn = true;
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  scoreOneEl.textContent = 0;
  scoreTwoEl.textContent = 0;
  currentScoreOneEl.textContent = 0;
  currentScoreTwoEl.textContent = 0;
  playerOneEl.classList.remove("player--winner");
  playerTwoEl.classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
}

function rollDice() {
  if (!isGameOn) return;
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove("hidden");
  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
}

function holdScore() {
  if (!isGameOn) return;
  score[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    score[activePlayer];
  if (score[activePlayer] >= winPoints) {
    isGameOn = false;
    diceEl.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOneEl.classList.toggle("player--active");
  playerTwoEl.classList.toggle("player--active");
}
