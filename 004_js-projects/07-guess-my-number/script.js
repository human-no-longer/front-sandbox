"use strict";

const btnEl = document.querySelector(".check");
const resetBtnEl = document.querySelector(".again");
const inputEl = document.querySelector(".guess");
const messageEl = document.querySelector(".message");
const userScoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".highscore");
const secretNumberEl = document.querySelector(".number");

let score = 20;
let highscore = 0;
let secretNumber = Math.floor(Math.random() * 20) + 1;
let gameIsOn = true;

btnEl.addEventListener("click", playGame);
resetBtnEl.addEventListener("click", resetGame);

function updateScore() {
  userScoreEl.textContent = --score;
  if (score === 0) {
    updateMessage("U lost the Game 😥");
  }
}

function updateMessage(message) {
  messageEl.textContent = message;
}

function updateHighscore() {
  if (score > highscore) {
    highscore = score;
    highscoreEl.textContent = highscore;
  }
}

function playGame() {
  if (!gameIsOn) return;

  const guess = Number(inputEl.value);

  if (guess === secretNumber) {
    gameIsOn = false;
    updateMessage("OMG U won 😎");
    secretNumberEl.textContent = secretNumber;
    document.body.style.backgroundColor = "lawngreen";
    secretNumberEl.style.width = "30rem";
    updateHighscore();
  }
  if (guess !== secretNumber) {
    updateMessage(guess < secretNumber ? "Too low 🤔" : "Too high 🤔");
    updateScore();
  }
  if (!guess) {
    updateMessage("No correct numbers was guessed 😕");
  }
}

function resetGame() {
  gameIsOn = true;
  secretNumber = Math.floor(Math.random() * 20) + 1;
  score = 20;
  userScoreEl.textContent = score;
  updateMessage("Start guessing...");
  secretNumberEl.textContent = "?";
  inputEl.value = "";
  document.body.style.backgroundColor = "";
  secretNumberEl.style.width = "";
}
