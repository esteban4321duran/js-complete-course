'use strict';

//******** Selecting and manipulating elements *******/
//This is literally DOM manipulation. we manipulated the content of the node
// document.querySelector('h1').textContent = 'Learning element node manipulation';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textcontent = 20;

// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

//******** Event handling fundamentals *******/
const init = function () {
    initStateVariables();
    initLabels();
    initStyles();
    generateSecretNumber(
        startingValues.minSecretNumber,
        startingValues.maxSecretNumber
    );
};
const initStateVariables = function () {
    score = startingValues.score;
    playerLost = startingValues.playerLost;
    playerWon = startingValues.playerWon;
};
const initLabels = function () {
    updateMessage(startingValues.msg);
    updateHeader(startingValues.header);
    updateNumber(startingValues.number);
    updateScore(startingValues.score);
};
const updateMessage = function (msg) {
    document.querySelector('.message').textContent = msg;
};
const updateHeader = function (msg) {
    document.querySelector('h1').textContent = msg;
};
const updateNumber = function (value) {
    document.querySelector('.number').textContent = value;
};
const updateScore = function (newScore) {
    document.querySelector('.score').textContent = newScore;
};
const updateHighScore = function (value) {
    document.querySelector('.highscore').textContent = value;
};
const initStyles = function () {
    setBackgroundColor(startingValues.backgroundColor);
    setNumberWidth(startingValues.numberWidth);
};
const setBackgroundColor = function (hexValue) {
    document.querySelector('body').style.backgroundColor = hexValue;
};
const setNumberWidth = function (hexValue) {
    document.querySelector('.number').style.width = hexValue;
};
const generateSecretNumber = function (min, max) {
    secretNumber = Math.trunc(Math.random() * max + min);
};
const checkGuess = function () {
    if (!playerLost) {
        const guess = getNumberInput();
        testGuessNumber(guess);
        updateScore(score);
        testScore();
    }
    if (score === 0) lose();
    if (playerWon) win();
};
const getNumberInput = function () {
    const inputNumber = Number(document.querySelector('.guess').value);
    if (!inputNumber) updateMessage('No Number!');
    //check if a number was entered
    else return inputNumber;
};
const testGuessNumber = function (guess) {
    if (guess === secretNumber) {
        playerWon = true;
    } else if (guess > secretNumber) {
        updateMessage('Too high!');
        score--;
    } else if (guess < secretNumber) {
        updateMessage('Too low!');
        score--;
    }
};
const testScore = function () {
    if (score > 0) return;
    else playerLost = true;
    return;
};
const lose = function () {
    setBackgroundColor('#C9332E');
    setNumberWidth('30rem');
    updateNumber(secretNumber);
    updateHeader('Game over');
    updateMessage('You lost :(');
};
const win = function () {
    setBackgroundColor('#60b347');
    setNumberWidth('30rem');
    updateNumber(secretNumber);
    updateHeader('Correct Number!');
    updateMessage('You won!');
    testForHighScore();
};
const testForHighScore = function () {
    if (score > highScore) {
        highScore = score;
        updateHighScore(highScore);
        updateMessage('New Record! :D');
    }
};

const startingValues = {
    score: 20,
    playerLost: false,
    playerWon: false,
    msg: 'Start guessing...',
    header: 'Guess My Number!',
    number: '?',
    backgroundColor: '#222222',
    numberWidth: '15rem',
    minSecretNumber: 1,
    maxSecretNumber: 20,
};
let score;
let playerLost;
let playerWon;
let secretNumber;
let highScore = 0; //this isn't affected by init() or else each time i retry it'll fuck up the highScore

//initialize variables
init();
const debugMode = false;

//init display info
updateScore(score);
updateHighScore(highScore);
//DEBUG
if (debugMode) updateNumber(secretNumber);

//initialize event listeners
document.querySelector('.check').addEventListener('click', checkGuess);

//****** coding challenge #1 ******/
// implement the 'play again' functionality

// 1)understand the problem
// must handle the 'click' event on the 'again' button
// the click event should reload the page

// 2)Divide in subproblems
// handle 'click' event in 'again' button
// reload the page

//The old solution that I came up with:

// const restart = function(){
//     location.restart();
// }

//I guess this is fine for small web apps, but no so much for large scale applications. i'm still proud of my solution. simple, clean, maybe a little resource waster but it doesnt really matter in this tiny app

const restart = function () {
    init();
};

document.querySelector('.again').addEventListener('click', restart);
