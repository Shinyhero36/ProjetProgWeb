let rounds = 1;
let winsMe = 0;
let winsBot = 0;

const roundsDOM = document.querySelector('#rounds');

const setup = () => {
  roundsDOM.innerText = `Round ${rounds}`;
};

window.onload = setup;
