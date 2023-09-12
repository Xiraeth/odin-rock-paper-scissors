'use strict';

const result = document.querySelector('.result');

function getCompChoice() {
  const rnd = Math.floor(Math.random() * 3) + 1;
  let choice = '';
  switch (rnd) {
    case 1:
      choice = `Paper`;
      break;
    case 2:
      choice = 'Rock';
      break;
    case 3:
      choice = 'Scissors';
      break;
  }
  result.textContent = '';
  result.insertAdjacentText('beforeend', `The computer picks ${choice.toLowerCase()}. `);
  return choice;
}

function playRound(playerSelect, compSelect) {
  const player = playerSelect.toLowerCase();
  const comp = compSelect.toLowerCase();
  const validOptions = {
    rock: '',
    paper: '',
    scissors: '',
  }

  if(!(player in validOptions)) return `Please enter a valid option..`;

  if((player === 'rock' && comp === 'scissors') || (player === 'scissors' && comp === "paper") || (player === "paper" && comp === "rock")) return `You win! ${player.slice(0, 1).toUpperCase() + player.slice(1)} beats ${comp}.`
  else if (player === comp) return `It's a tie! You both got ${player}.`
  else return `You lose! ${comp.slice(0, 1).toUpperCase() + comp.slice(1)} beats ${player}.`
}

document.querySelector('.btn').addEventListener('click', function() {
  const playerInput = prompt("Rock paper or scissors?");
  const comp = getCompChoice();

  result.insertAdjacentText('beforeend', playRound(playerInput, comp));
})
