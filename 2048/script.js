const Tab = document.getElementById('Main');
const TextTaille = document.getElementById('taille');
const StartBtn = document.getElementById('StartBTN');
const nbtourTXT = document.getElementById('nbTourTXT');
const scoreTXT = document.getElementById('scoreTXT');

let ActualTab;
let nbtour = 0;
let score = 0;
let N;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function updateTab(TabARecop) {
  N = TabARecop.length;
  Tab.innerText = '';
  for (let i = 0; i < N; i++) {
    const Row = document.createElement('TR');
    for (let j = 0; j < N; j++) {
      const Cell = document.createElement('TD');
      if (TabARecop[i][j] !== 0) {
        Cell.innerText = TabARecop[i][j];
      }
      Row.appendChild(Cell);
    }
    Tab.appendChild(Row);
  }
  nbtourTXT.innerText = nbtour;
  scoreTXT.innerText = score;
}

function createEmptyTab(Taille) {
  let tab = [];
  for (let i = 0; i < Taille; i++) {
    tab[i] = [];
    for (let j = 0; j < Taille; j++) {
      tab[i][j] = 0;
    }
  }
  return tab;
}

ActualTab = createEmptyTab(TextTaille.value);
updateTab(ActualTab);

function get2or4() {
  const tirage = getRandomInt(3);
  if (tirage < 2) return 2;
  else return 4;
}

function movePossible(tab) {
  let possible = false;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      let actuCase = tab[i][j];
      try {
        if (actuCase === tab[i + 1][j]) {
          possible = true;
          break;
        }
      } catch (e) {}
      try {
        if (actuCase === tab[i - 1][j]) {
          possible = true;
          break;
        }
      } catch (e) {}
      try {
        if (actuCase === tab[i][j + 1]) {
          possible = true;
          break;
        }
      } catch (e) {}
      try {
        if (actuCase === tab[i][j - 1]) {
          possible = true;
          break;
        }
      } catch (e) {}
    }
  }
  return possible;
}

function countLibre(tab) {
  let N = tab.length;
  let nbLibre = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (tab[i][j] === 0) nbLibre++;
    }
  }
  return nbLibre;
}

function addToEmpty(tab) {
  const N = tab.length;
  let nbLibre = countLibre(tab);
  // console.log('il y a ' + nbLibre + ' case vide!');
  if (nbLibre === 0) {
    finDePartie(tab);
  } else {
    let trouve = false;
    while (!trouve) {
      let col = getRandomInt(N);
      let lin = getRandomInt(N);
      if (tab[lin][col] === 0) {
        tab[lin][col] = get2or4();
        trouve = true;
      }
    }
  }
  return tab;
}

function finDePartie(tab) {
  if (countLibre(tab) === 0) {
    let moveposs = movePossible(tab);
    /*
    console.log('on est plein donc on teste si ya un move possible : ' + moveposs
    );
    */

    if (!moveposs) {
      let replay = confirm('voulez vous recommencer ?');
      if (replay) start();
    }
  }
}

function initTab() {
  const N = TextTaille.value;
  let TabStart = createEmptyTab(N);
  let debCol1 = getRandomInt(N);
  let debLin1 = getRandomInt(N);
  let debCol2 = getRandomInt(N);
  let debLin2 = getRandomInt(N);
  TabStart[debLin1][debCol1] = get2or4();
  TabStart[debLin2][debCol2] = get2or4();
  updateTab(TabStart);
  return TabStart;
}

function tabMoveUp(ActuTab) {
  let N = ActuTab.length;
  let newtab = Array.from(ActuTab);
  let movetot = 0;
  for (let i = 1; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (newtab[i][j] !== 0) {
        let CasePresent = newtab[i][j];
        let move = 0;
        // console.log(`On bouge la case d'indice ${i} ${j} qui est ${CasePresent} vers le haut.`);

        while (i - (move + 1) >= 0 && newtab[i - (move + 1)][j] === 0) {
          //pas de dépassement
          move++;
          // console.log(`${newtab[i - move][j]} lin=${i}+${-move} col=${j}`);
        }
        // console.log(`on arrete après ${move} vers le haut`);
        if (i - move > 0) {
          //pas en haut du tab
          if (newtab[i - move - 1][j] === CasePresent) {
            move++;
            // console.log(`On multiple par 2 car ${newtab[i- move][j]} = ${CasePresent}`);

            newtab[i - move][j] *= 2;
            score += newtab[i - move][j];
          } else {
            // console.log(`On remplace ${newtab[i - move][j]} d'indice ${i} - ${move} = ${i-move} col=${j} par ${CasePresent}`)

            newtab[i - move][j] = CasePresent;
          }
        } else {
          // console.log(`On remplace ${newtab[i - move][j]} d'indice ${i}-${move}=${i - move} col=${j} par ${CasePresent}.`);
          newtab[i - move][j] = CasePresent;
        }

        if (move > 0) {
          newtab[i][j] = 0;
          // console.log(`on a bouger une case donc on remplace la case d'indice ${i} ${j} par 0`);
        }
        movetot += move;
      }
    }
  }
  if (movetot !== 0) newtab = addToEmpty(newtab);
  return [newtab, movetot];
}

function tabMoveLeft(ActuTab) {
  let N = ActuTab.length;
  let newtab = Array.from(ActuTab);
  let movetot = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 1; j < N; j++) {
      if (newtab[i][j] !== 0) {
        let CasePresent = newtab[i][j];
        let move = 0;
        // console.log(`On bouge la case d'indice ${i} ${j} qui est ${CasePresent} vers la gauche.`);
        while (j - (move + 1) >= 0 && newtab[i][j - (move + 1)] === 0) {
          //pas de dépassement
          move++;
        }
        // console.log(`On arrete après ${move} vers la gauche`);
        if (j - move > 0) {
          //pas en haut du tab
          if (newtab[i][j - move - 1] === CasePresent) {
            move++;
            // console.log(`On multiplie par 2 car ${newtab[i][j - move]} = ${CasePresent}`);
            newtab[i][j - move] *= 2;
            score += newtab[i][j - move];
          } else {
            newtab[i][j - move] = CasePresent;
          }
        } else {
          newtab[i][j - move] = CasePresent;
        }

        if (move > 0) {
          newtab[i][j] = 0;
          // console.log(`On a bougé une case donc on remplace la case d'indice ${i} ${j} par 0`);
        }
        movetot += move;
        // console.log(newtab);
      }
    }
  }
  if (movetot !== 0) newtab = addToEmpty(newtab);
  return [newtab, movetot];
}

function tabMoveRight(ActuTab) {
  let N = ActuTab.length;
  let newtab = Array.from(ActuTab);
  let movetot = 0;
  for (let i = 0; i < N; i++) {
    for (let j = N - 1; j >= 0; j--) {
      if (newtab[i][j] !== 0) {
        let CasePresent = newtab[i][j];
        let move = 0;
        // console.log(`On bouge la case d'indice ${i} ${j} qui est ${CasePresent} vers la droite.`);
        while (j + (move + 1) >= 0 && newtab[i][j + (move + 1)] === 0) {
          //pas de dépassement
          move++;
        }
        // console.log(`On arrete après ${move} vers la droite`);

        if (j + move < N - 1) {
          //pas en haut du tab
          if (newtab[i][j + move + 1] === CasePresent) {
            move++;
            // console.log(`On multiplie par 2 car ${newtab[i][j + move]}`);
            newtab[i][j + move] *= 2;
            score += newtab[i][j + move];
          } else {
            newtab[i][j + move] = CasePresent;
          }
        } else {
          newtab[i][j + move] = CasePresent;
        }

        if (move > 0) {
          newtab[i][j] = 0;
          // console.log(`On a bougé une case donc on remplace la case d'indice ${i} ${j} par 0`);
        }
        movetot += move;
        // console.log(newtab);
      }
    }
  }
  if (movetot !== 0) newtab = addToEmpty(newtab);
  return [newtab, movetot];
}

function tabMoveDown(ActuTab) {
  let N = ActuTab.length;
  let newtab = Array.from(ActuTab);
  let movetot = 0;
  for (let i = N - 2; i >= 0; i--) {
    for (let j = 0; j < N; j++) {
      if (newtab[i][j] !== 0) {
        let CasePresent = newtab[i][j];
        let move = 0;
        // console.log(`On bouge la case d'indice ${i} ${j} qui est ${CasePresent} vers le bas.`);
        while (i + (move + 1) < N && newtab[i + (move + 1)][j] === 0) {
          //pas de dépassement
          move++;
        }
        // console.log(`On arrete après ${move} vers le bas`);
        if (i + move < N - 1) {
          if (newtab[i + (move + 1)][j] === CasePresent) {
            move++;
            // console.log(`On multiple par 2 car ${newtab[i + move][j]} = ${CasePresent}`);
            newtab[i + move][j] *= 2;
            score += newtab[i + move][j];
          } else {
            newtab[i + move][j] = CasePresent;
          }
        } else {
          newtab[i + move][j] = CasePresent;
        }

        if (move > 0) {
          newtab[i][j] = 0;
          // console.log(`On a bougé une case donc on remplace la case d'indice ${i} ${j} par 0.`);
        }
        movetot += move;
        // console.log(newtab);
      }
    }
  }
  if (movetot !== 0) newtab = addToEmpty(newtab);
  return [newtab, movetot];
}

function keyDownHandler(event) {
  let newtab = Array.from(ActualTab);
  let moves;
  let res;
  switch (event.keyCode) {
    case 39: //direction="right";
      // console.log('on part a droite');
      res = tabMoveRight(ActualTab);
      newtab = res[0];
      moves = res[1];
      break;
    case 37: //direction="left";
      // console.log('on part a gauche');
      res = tabMoveLeft(ActualTab);
      newtab = res[0];
      moves = res[1];
      break;
    case 40: //direction="down";
      // console.log('on part en bas');
      res = tabMoveDown(ActualTab);
      newtab = res[0];
      moves = res[1];
      break;
    case 38: //direction="up";
      // console.log('on part en haut');
      res = tabMoveUp(ActualTab);
      newtab = res[0];
      moves = res[1];
      break;
    default:
      moves = 0;
  }
  if (moves !== 0) {
    nbtour++;
    updateTab(newtab);
    finDePartie(newtab);
  }
  return newtab;
}

function start() {
  nbtour = 0;
  score = 0;
  return initTab();
}

StartBtn.addEventListener('click', function () {
  ActualTab = start();
});

document.body.addEventListener('keydown', function (event) {
  ActualTab = keyDownHandler(event);
});
