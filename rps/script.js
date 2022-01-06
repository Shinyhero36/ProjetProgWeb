// Scores
let winsMe;
let winsBot;

// DOM elements
const winsMeDOM = document.querySelector('#me');
const winsBotDOM = document.querySelector('#bot');
const resultDOM = document.querySelector('#result');
const resultSpanDOM = document.querySelector('#result>span:first-child');
const choicesSpanDOM = document.querySelector('#result>span:last-child');

const PIERRE = '👊';
const FEUILLE = '✋';
const CISEAUX = '✌';

const CHOIX = [PIERRE, FEUILLE, CISEAUX];

let choixJoueur = null;
let choixBot = null;

/**
 * Render scores in the DOM
 */
function renderScores() {
  winsMeDOM.innerText = winsMe;
  winsBotDOM.innerText = winsBot;

  // Hide game results after 1 sec
  setTimeout(() => {
    resultDOM.style.display = 'none';
  }, 1000);
  resultDOM.style.display = 'block';
}

/**
 * Randomly choose between rock, paper, scissors
 * @returns {string}
 */
function randomSelection() {
  return CHOIX[Math.floor(Math.random() * CHOIX.length)];
}

function onSelection(choix) {
  choixJoueur = CHOIX[choix];
  choixBot = randomSelection();
  processGame();
  renderScores();
}

function processGame() {
  choicesSpanDOM.innerText = `${choixJoueur} VS ${choixBot}`;
  if (choixJoueur === choixBot) {
    resultSpanDOM.innerText = 'Egalité\n';
    resultSpanDOM.style.color = 'black';
  } else if (
    (choixJoueur === PIERRE && choixBot === CISEAUX) ||
    (choixJoueur === CISEAUX && choixBot === FEUILLE) ||
    (choixJoueur === FEUILLE && choixBot === PIERRE)
  ) {
    resultSpanDOM.innerText = 'Gagné\n';
    resultSpanDOM.style.color = 'green';
    winsMe += 1;
  } else {
    resultSpanDOM.innerText = 'Perdu\n';
    resultSpanDOM.style.color = 'red';
    winsBot += 1;
  }
}

const setup = () => {
  // Init scores
  winsMe = 0;
  winsBot = 0;

  renderScores();
};

window.onload = setup;
