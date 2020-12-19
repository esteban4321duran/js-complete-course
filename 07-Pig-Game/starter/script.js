'use strict';

const getElements = function () {
  const elements = {
    score0: document.getElementById('score--0'),
    score1: document.getElementById('score--1'),
    current0: document.getElementById('current--0'),
    current1: document.getElementById('current--1'),
    dice: document.querySelector('.dice'),
    btns: document.querySelectorAll('.btn'),
    players: document.querySelectorAll('.player'),
    gameOver: document.querySelector('.modal--game-over'),
    overlay: document.querySelector('.overlay'),
    winnerName: document.querySelector('.modal--game-over h2'),
  };
  return elements;
};

const init = function () {
  resetScores();
  hideDice();
  resetActivePlayer();
  subscribeEventListeners();
  resetCurrentPlayer();
};

const resetScores = function () {
  scores[0] = 0;
  scores[1] = 0;
  currentScores[0] = 0;
  currentScores[1] = 0;
  updateTextContent(el.score0, 0);
  updateTextContent(el.score1, 0);
  updateTextContent(el.current0, 0);
  updateTextContent(el.current1, 0);
};

const hideDice = function () {
  el.dice.classList.add('hidden');
};

const subscribeEventListeners = function () {
  el.btns[0].addEventListener('click', restartGame);
  el.btns[1].addEventListener('click', rollDice);
  el.btns[2].addEventListener('click', holdScore);
};

//EVENT_HANDLER
const restartGame = function () {
  resetScores();
  hideDice();
  resetActivePlayer();
  resetCurrentPlayer();
  resetGameOver();
};

const resetActivePlayer = function () {
  if (!el.players[0].classList.contains('player--active'))
    el.players[0].classList.toggle('player--active');
  if (el.players[1].classList.contains('player--active'))
    el.players[1].classList.toggle('player--active');
};

const resetCurrentPlayer = function () {
  currentPlayer = 0;
};

//EVENT_HANDLER
const rollDice = function () {
  if (!gameOver) {
    const dice = randomNumber();
    updateDice(dice);
    testForRoll1(dice);
  }
};

const randomNumber = function () {
  return Math.trunc(Math.random() * 6) + 1;
};

const updateDice = function (value) {
  //if the dice is hidden after a restart, make it visible
  if (el.dice.classList.contains('hidden')) el.dice.classList.remove('hidden');
  el.dice.src = `dice-${value}.png`;
};

const testForRoll1 = function (value) {
  if (value !== 1) addCurrentScore(value);
  else {
    resetCurrentScore();
    changePlayer();
  }
};

const addCurrentScore = function (value) {
  currentScores[currentPlayer] += value;
  updateCurrentScore();
};

const resetCurrentScore = function () {
  currentScores[currentPlayer] = 0;
  updateCurrentScore();
};

const updateCurrentScore = function () {
  currentPlayer === 0
    ? updateTextContent(el.current0, currentScores[currentPlayer])
    : updateTextContent(el.current1, currentScores[currentPlayer]);
};

//EVENT_HANDLER
const holdScore = function () {
  if (!gameOver) {
    addHoldScore();
    updateHoldScore();
    resetCurrentScore();
    updateCurrentScore();
    testForWin();
  }
};

const addHoldScore = function () {
  scores[currentPlayer] += currentScores[currentPlayer];
};

const updateHoldScore = function () {
  currentPlayer === 0
    ? updateTextContent(el.score0, scores[currentPlayer])
    : updateTextContent(el.score1, scores[currentPlayer]);
};

const testForWin = function () {
  if (scores[currentPlayer] >= victoryScore) win(currentPlayer);
  else changePlayer();
};

const currentScoreIs0 = function () {
  return currentScores[currentPlayer] === 0 ? true : false;
};

const changePlayer = function () {
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  toggleActivePlayer();
};

// const win = function (winner) {
//   toggleWinnerPlayer(winner);
//   gameOver = true;
// };

const win = function () {
  gameOver = true;
  //toggleWinnerPlayer(currentPlayer);
  toggleGameOver();
};

const toggleActivePlayer = function () {
  el.players[0].classList.toggle('player--active');
  el.players[1].classList.toggle('player--active');
};

const toggleWinnerPlayer = function (winner) {
  el.players[winner].classList.toggle('player--active');
  el.players[winner].classList.toggle('player--winner');
};

const toggleGameOver = function () {
  toggleGameOverModal();
  toggleOverlay();
  updateWinnerName();
};

const toggleGameOverModal = function () {
  el.gameOver.classList.toggle('hidden');
};

const toggleOverlay = function () {
  el.overlay.classList.toggle('hidden');
};

const resetGameOver = function () {
  hideGameOverModal();
  hideOverlay();
  gameOver = false;
};

const hideGameOverModal = function () {
  if (!el.gameOver.classList.contains('hidden'))
    el.gameOver.classList.add('hidden');
};

const hideOverlay = function () {
  if (!el.overlay.classList.contains('hidden'))
    el.overlay.classList.add('hidden');
};

const updateWinnerName = function () {
  const winner = currentPlayer === 0 ? 'player 1' : 'player 2';
  updateTextContent(el.winnerName, winner);
};

// const raiseRestartBtn=function(){
//   el.
// }

const updateTextContent = function (element, value) {
  element.textContent = value;
};

let currentPlayer = 0;
const scores = [0, 0];
const currentScores = [0, 0];
const victoryScore = 50;
let gameOver = false;

//Retrieve elements
const el = getElements();

//initialization
init();
