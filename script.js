'use strict';

const startBtn = document.querySelector('.start');
const welcomeMsg = document.querySelector('.welcome-msg');
const choiceEl = document.querySelector('.choice');
const optionButtons = document.querySelector('.option-buttons');
const result = document.querySelector('#result');
const scoreboard = document.querySelector('.scoreboard');
const restartBtn = document.querySelector('.restart');
let scoreEl = document.createElement('div');;
let playerScoreEl = document.createElement('span');;
let computerScoreEl = document.createElement('span');;
let playerScore;
let compScore;
let gameOver = false;

function restartGame() {
  [choiceEl, optionButtons].forEach(el => el.classList.remove('hidden'));
  [playerScore, compScore] = [0, 0];
  choiceEl.classList.remove('hidden');
  restartBtn.classList.add('hidden');
  result.textContent = '';
  gameOver = false;
  playerScoreEl.textContent = `Your score: `;
  computerScoreEl.textContent = `Computer score: `;
}

function updateScoreboard(player, comp) {
  playerScoreEl.textContent = `Your score: ${player}`;
  computerScoreEl.textContent = `Computer score: ${comp}`;
}

function createScoreboard() {
  scoreEl.classList.add('scoreboard');

  playerScoreEl.textContent = `Your score: `;
  playerScoreEl.classList.add('blue');

  computerScoreEl.textContent = `Computer score: `;
  computerScoreEl.classList.add('red');

  [playerScoreEl, computerScoreEl].forEach(sc => scoreEl.appendChild(sc));

  result.after(scoreEl);
}

function capitalise(string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1);
}

function getCompChoice() {
  const rnd = Math.floor(Math.random() * 3) + 1;
  let choice = '';
  switch (rnd) {
    case 1:
      choice = `paper`;
      break;
    case 2:
      choice = 'rock';
      break;
    case 3:
      choice = 'scissors';
      break;
  }
  return choice;
}

function playerWins(player, comp) {
  if((player === 'rock' && comp === 'scissors') || (player === 'scissors' && comp === "paper") || (player === "paper" && comp === "rock")) return true;
}

function gameEnd() {
  gameOver = true;
  [choiceEl, optionButtons].forEach(el => el.classList.add('hidden'));
  restartBtn.classList.remove('hidden');
}

function playRound(playerSelect) {
  const player = playerSelect;
  const comp = getCompChoice();
  let markup = '';
  result.innerHTML = '';
  
  if(playerScore < 4 && compScore < 4) {
    if(playerWins(player, comp)) {
      markup = `The computer picks ${comp}. You win this round! ${capitalise(player)} beats ${comp}.`
      playerScore++;
    }
    else if (player === comp) {
      markup = `The computer picks ${comp}. It's a tie! You both got ${comp}.`;
    }
    else {
      markup = `The computer picks ${comp}. You lose this round! ${capitalise(comp)} beats ${player}.`
      compScore++;
    }
  }
  else if(playerScore == 4 && compScore < 4){
    if(playerWins(player, comp)) {
      markup = `You win!`
      playerScore++;
      gameEnd();
    } else if (player == comp){
      markup = `The computer picks ${comp}. It's a tie! You both got ${comp}.`;
    } else {
      markup = `The computer picks ${comp}. You lose this round! ${capitalise(comp)} beats ${player}.`
      compScore++;
    }
  } else if(compScore == 4 && playerScore < 4) {
      if(playerWins(player, comp)) {
        markup = `The computer picks ${comp}. You win this round! ${capitalise(player)} beats ${comp}.`
        playerScore++;
      } else if (player == comp){
        markup = `The computer picks ${comp}. It's a tie! You both got ${comp}.`;
      } else {
        markup = `You lose! Better luck next time.`
        compScore++;
        gameEnd();
      }
    } else if(playerScore == 4 && compScore == 4) {
      if(playerWins(player, comp)) {
        markup = `You win!`
        playerScore++;
        gameEnd();
      } else if (player == comp){
        markup = `The computer picks ${comp}. It's a tie! You both got ${comp}.`;
      } else {
        markup = `You lose! Better luck next time.`
        compScore++;
        gameEnd();
      }
    }
  result.textContent = markup;
  updateScoreboard(playerScore, compScore);
}

startBtn.addEventListener('click', e => {
  // Initialize game by hiding/showing the proper elements
  [startBtn, welcomeMsg].forEach(el => el.classList.toggle('hidden'));  
  [choiceEl, optionButtons].forEach(el => el.classList.toggle('hidden'));
  [playerScore, compScore] = [0, 0];

  createScoreboard();
});


function playGame() {
  optionButtons.addEventListener('click', e => {
    // Guard clause
    const btn = e.target.closest('.option');
    if(!btn) return;
  
    let playerChoice = '';

    // Set player's choice to a string accordingly
    if(e.target.classList.contains('rock')) playerChoice = 'rock';
    else if (e.target.classList.contains('paper')) playerChoice = 'paper';
    else if (e.target.classList.contains('scissors')) playerChoice = 'scissors';
  
    playRound(playerChoice);
  });
}

restartBtn.addEventListener('click', restartGame);

playGame();