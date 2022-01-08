let tableu = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let croix = [];
let cercle = [];
let jouee = [];
let joueur = 0;
let gagnant = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7'],
];
let gagnantDanger = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7'],
];

let compteurcroix = 0;
let compteurcercle = 0;

let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let btnSolo = document.getElementById('ButtonSolo');

btnSolo.innerHTML = '<img src ="1pl.png">';

btnSolo.addEventListener('click', creationTableSolo);

btnMulti = document.getElementById('ButtonMulti');

btnMulti.innerHTML = '<img src ="2pl.png">';

btnMulti.addEventListener('click', creationTableMulti);

function player(pl) {
  if (pl % 2 == 0) {
    return croix;
  } else return cercle;
}

function creationTableSolo() {
  document.getElementById('croix').innerHTML = 'Score Croix: ' + compteurcroix;
  document.getElementById('cercle').innerHTML =
    'Score Cercle: ' + compteurcercle;
  document.getElementById('ButtonSolo').style.display = 'none';
  document.getElementById('ButtonMulti').style.display = 'none';

  const body = document.body,
    tbl = document.createElement('table');
  tbl.id = 'tiktak';
  tbl.style.width = '100 px';
  tbl.style.border = '1px solid black';
  for (let i = 0; i < 3; i++) {
    const tr = tbl.insertRow();
    tr.style.border = '1 px solid black';
    for (let j = 0; j < 3; j++) {
      const td = tr.insertCell();
      td.style.border = '10 px solid black';
      let btn = document.createElement('button');
      btn.id = (3 * i + j + 1).toString();
      btn.setAttribute('case', 3 * i + j + 1);
      btn.style.width = '307px';
      btn.style.height = '307px';
      btn.style.background = 'camel';

      btn.addEventListener('click', ajouterSolo);
      td.appendChild(btn);
    }
  }
  body.appendChild(tbl);
}

function creationTableMulti() {
  document.getElementById('ButtonSolo').style.display = 'none';
  document.getElementById('ButtonMulti').style.display = 'none';

  document.getElementById('croix').innerHTML = 'Score Croix: ' + compteurcroix;
  document.getElementById('cercle').innerHTML =
    'Score Cercle: ' + compteurcercle;
  const body = document.body,
    tbl = document.createElement('table');
  tbl.id = 'tiktak';
  tbl.style.width = '100 px';
  tbl.style.border = '1px solid black';
  for (let i = 0; i < 3; i++) {
    const tr = tbl.insertRow();
    tr.style.border = '1 px solid black';
    for (let j = 0; j < 3; j++) {
      const td = tr.insertCell();
      td.style.border = '10 px solid black';
      let btn = document.createElement('button');
      btn.id = (3 * i + j + 1).toString();
      btn.setAttribute('case', 3 * i + j + 1);
      btn.style.width = '307px';
      btn.style.height = '307px';
      btn.style.background = 'camel';
      //btn.textContent=(3*i+j+1);
      //btn.innerHTML='<img src ="fond.png">';
      btn.addEventListener('click', ajouterMulti);
      td.appendChild(btn);
    }
  }
  body.appendChild(tbl);
}

function gagne(pl) {
  if (pl == cercle) {
    return 'Cercle gagne';
  } else return 'Croix gagne';
}

function nouveaumatchSolo() {
  tbl = document.getElementById('tiktak');
  if (typeof tbl != 'undefined') tbl.parentNode.removeChild(tbl);
  creationTableSolo();
  jouee.length = 0;
  croix.length = 0;
  cercle.length = 0;
  joueur = 0;
  compIA = 0;
}

function nouveaumatchMulti() {
  tbl = document.getElementById('tiktak');
  if (typeof tbl != 'undefined') tbl.parentNode.removeChild(tbl);
  creationTableMulti();
  jouee.length = 0;
  croix.length = 0;
  cercle.length = 0;
  joueur = 0;
  compIA = 0;
}

function finmatchSolo() {
  if (veriffin()) {
    if (matchnul()) {
      if (
        confirm('Match Nul!\n Appuyer sur confirm pour une nouvelle partie')
      ) {
        nouveaumatchSolo();
      }
    } else if (verif(croix)) {
      if (
        confirm('Croix Gagne! \n Appuyer sur confirm pour une nouvelle partie')
      ) {
        compteurcroix = compteurcroix + 1;
        document.getElementById('croix').innerHTML =
          'Score Croix: ' + compteurcroix;

        nouveaumatchSolo();
      }
    } else if (verifIA((x = cercle))) {
      if (
        confirm('Cercle Gagne!\n Appuyer sur confirm pour une nouvelle partie')
      ) {
        nouveaumatchSolo();
        compteurcercle = compteurcercle + 1;
        document.getElementById('cercle').innerHTML =
          'Score Cercle: ' + compteurcercle;
      }
    }
  }
}

function finmatchMulti() {
  if (veriffin()) {
    if (matchnul()) {
      if (
        confirm('Match Nul!\n Appuyer sur confirm pour une nouvelle partie')
      ) {
        nouveaumatchMulti();
      }
    } else if (verif(croix)) {
      if (
        confirm('Croix Gagne! \n Appuyer sur confirm pour une nouvelle partie')
      ) {
        compteurcroix = compteurcroix + 1;
        document.getElementById('croix').innerHTML =
          'Score Croix: ' + compteurcroix;

        nouveaumatchMulti();
      }
    } else if (verifIA((x = cercle))) {
      if (
        confirm('Cercle Gagne!\n Appuyer sur confirm pour une nouvelle partie')
      ) {
        nouveaumatchMulti();
        compteurcercle = compteurcercle + 1;
        document.getElementById('cercle').innerHTML =
          'Score Cercle: ' + compteurcercle;
      }
    }
  }
}

function verif(pl) {
  t = [];
  for (let i = 0; i < 8; i++) {
    s = 0;
    for (let j = 0; j < 3; j++) {
      if (pl.includes(gagnant[i][j])) {
        s++;
      }
    }
    t.push(s);
  }
  if (t.includes(3)) return true;
  else return false;
}

function verifIA(pl) {
  let gagnant2 = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
  ];
  compIA = [0, 0, 0, 0, 0, 0, 0, 0];
  s = 0;
  t = [];
  aux = [];
  t.length = 8;
  aux.length = 8;
  for (let i = 0; i < 8; i++) {
    let s = 0;
    for (let j = 0; j < 3; j++) {
      if (pl.includes(gagnant2[i][j])) {
        s = s + 1;
      }
    }
    compIA[i] = s;
  }

  if (compIA.includes(3)) return true;
  else return false;
}

function veriffin() {
  if (matchnul() || verif(croix) || verifIA(cercle)) {
    return true;
  }
}

function matchnul() {
  if (jouee.length == 9 && !(verif(croix) || verifIA(cercle))) {
    return true;
  }
}

function dispo(num) {
  if (jouee.includes(num) || num == undefined) {
    return false;
  } else return true;
}

function ajouterSolo(event) {
  console.log(event);
  let btn = event.target;

  if (dispo(btn.getAttribute('case')) && btn.getAttribute('case') != null) {
    btn.innerHTML = '<img src ="croix.png">';

    croix.push(btn.getAttribute('case'));
    jouee.push(btn.getAttribute('case'));

    finmatchSolo();
    joueur = joueur + 1;

    if (croix.length < 3) {
      terminator();
    } else thinkening();
    verifIA(cercle);
    //console.log(verifIA());
    finmatchSolo();
    //console.log(croix);

    console.log(cercle);
  } else console.log('case non disponible');
  // pl=pl+1
}

function terminator() {
  let coins = ['1', '3', '7', '9'];
  if (croix.length == 1) {
    let first = coins[Math.floor(Math.random() * coins.length)];
    while (!dispo(first)) {
      let first = coins[Math.floor(Math.random() * coins.length)];
    }
    btn = document.getElementById(first);
    coins.splice(coins.indexOf(first), 1);
    jouee.push(first);
    cercle.push(first);
    console.log(coins);
    btn.setAttribute('case', first);
    btn.innerHTML = '<img src ="cercle.png">';
    joueur = joueur + 1;
  }
  if (croix.length == 2) {
    if (danger().length > 0) {
      console.log('DANGER');
      let stop = gagnant[danger()[0]];
      if (croix.length == 2) {
        indexOfFirst = stop.indexOf(croix[0]);
        console.log(stop);
        stop.splice(stop.indexOf(croix[0]), 1);
        console.log(stop);
        stop.splice(stop.indexOf(croix[1]), 1);
        console.log(stop);
        second = stop[0];
        if (dispo(second)) {
          btn = document.getElementById(second);
          coins.splice(coins.indexOf(second), 1);
          jouee.push(second);
          cercle.push(second);
          btn.setAttribute('case', second);
          btn.innerHTML = '<img src ="cercle.png">';
          joueur = joueur + 1;
        } else {
          let next = coins[Math.floor(Math.random() * coins.length)];

          while (!dispo(next)) {
            let next = coins[Math.floor(Math.random() * coins.length)];
          }
          btn = document.getElementById(next);
          coins.splice(coins.indexOf(next), 1);
          jouee.push(next);
          cercle.push(next);
          btn.setAttribute('case', next);
          btn.innerHTML = '<img src ="cercle.png">';
          joueur = joueur + 1;
        }
      }
    } else {
      let next = thinker();

      while (!dispo(next)) {
        let next = coins[Math.floor(Math.random() * coins.length)];
      }
      btn = document.getElementById(next);
      coins.splice(coins.indexOf(next), 1);
      jouee.push(next);
      cercle.push(next);
      btn.setAttribute('case', next);
      btn.innerHTML = '<img src ="cercle.png">';
      joueur = joueur + 1;
    }
  }

  if (croix.length == 3) {
    console.log('croix 3');
    console.log(potentiel());
    let pot2 = potentiel();

    if (potentiel().length > 0 && potentieldispo()) {
      let pot = potentiel();

      //if (potentieldispo()){
      console.log('JE DETECTE DU POTENTIEL');
      let stop = gagnant[pot2[0]];
      if (cercle.length == 2) {
        console.log(stop);
        // indexOfFirst=stop.indexOf(cercle[0]);
        //stop.splice(stop.indexOf(cercle[0]),1);
        //stop.splice(stop.indexOf(cercle[1]),1);
        second = stop[0];
        if (dispo(second)) {
          console.log(second);
          btn = document.getElementById(second);
          coins.splice(coins.indexOf(second), 1);
          jouee.push(second);
          cercle.push(second);
          btn.setAttribute('case', second);
          btn.innerHTML = '<img src ="cercle.png">';
          joueur = joueur + 1;
        }
      }

      // }
    } else {
      console.log('HERE COMES DANGER ');
      console.log(danger());

      if (danger().length == 2) {
        console.log('danger >1 3');

        if (croix.length == 3) {
          let stop = gagnant[danger()[0]];
          console.log('stop >1 3');
          if (stop.includes(croix[0])) {
            indexOfFirst = stop.indexOf(croix[0]);
            console.log(stop);
            stop.splice(stop.indexOf(croix[0]), 1);
            console.log(stop);
            stop.splice(stop.indexOf(croix[1]), 1);
            console.log(stop);
            second = stop[0];
            if (dispo(second)) {
              btn = document.getElementById(second);
              coins.splice(coins.indexOf(second), 1);
              jouee.push(second);
              cercle.push(second);
              btn.setAttribute('case', second);
              btn.innerHTML = '<img src ="cercle.png">';
              joueur = joueur + 1;
            }
          } else {
            indexOfFirst = stop.indexOf(croix[1]);
            console.log(stop);
            stop.splice(stop.indexOf(croix[1]), 1);
            console.log(stop);
            stop.splice(stop.indexOf(croix[2]), 1);
            console.log(stop);
            second = stop[0];
            if (dispo(second)) {
              btn = document.getElementById(second);
              coins.splice(coins.indexOf(second), 1);
              jouee.push(second);
              cercle.push(second);
              btn.setAttribute('case', second);
              btn.innerHTML = '<img src ="cercle.png">';
              joueur = joueur + 1;
            }
          }
        }
      } else if (danger.length == 1) {
        console.log('DANGER 3/1');

        let stop = gagnant[danger()[0]];
        if (croix.length == 3) {
          indexOfFirst = stop.indexOf(croix[0]);
          console.log(stop);
          stop.splice(stop.indexOf(croix[0]), 1);
          console.log(stop);
          stop.splice(stop.indexOf(croix[1]), 1);
          console.log(stop);
          second = stop[0];
          if (dispo(second)) {
            btn = document.getElementById(second);
            coins.splice(coins.indexOf(second), 1);
            jouee.push(second);
            cercle.push(second);
            btn.setAttribute('case', second);
            btn.innerHTML = '<img src ="cercle.png">';
            joueur = joueur + 1;
          } else {
            let next = thinker();

            while (!dispo(next)) {
              let next = coins[Math.floor(Math.random() * coins.length)];
            }
            btn = document.getElementById(next);
            coins.splice(coins.indexOf(next), 1);
            jouee.push(next);
            cercle.push(next);
            btn.setAttribute('case', next);
            btn.innerHTML = '<img src ="cercle.png">';
            joueur = joueur + 1;
          }
        }
      }
    }
  }
}

function compteurpts(pl) {
  t = [];
  for (let i = 0; i < 9; i++) {
    s = 0;
    for (let j = 0; j < 3; j++) {
      //sort(pl);
      if (pl.includes(gagnant[i][j])) {
        s++;
      }
    }
    t.push(s);

    return t;
  }
}

function danger() {
  liste = [];
  for (let i = 0; i < 8; i++) {
    s = 0;
    for (let j = 0; j < 3; j++) {
      //sort(pl);
      if (croix.includes(gagnant[i][j])) {
        s++;
      }
      if (s == 2) {
        liste.push(i);
      }
    }
  }
  return liste;
}

function potentiel() {
  liste = [];
  for (let i = 0; i < 8; i++) {
    s = 0;
    for (let j = 0; j < 3; j++) {
      //sort(pl);
      if (cercle.includes(gagnant[i][j])) {
        s++;
      }
      if (s == 2) {
        liste.push(i);
      }
    }
  }
  return liste;
}

function potentieldispo() {
  let ztop = gagnant[potentiel()[0]];
  if (cercle.length == 2) {
    indexOfFirst = ztop.indexOf(cercle[0]);
    ztop.splice(ztop.indexOf(cercle[0]), 1);
    ztop.splice(ztop.indexOf(cercle[1]), 1);
    second = ztop[0];
    if (dispo(second)) return true;
    else return false;
  }
}

function npzeros(a, b) {
  let tab = [];
  for (let i = 0; i < a; i++) {
    tab[i] = [];
    for (j = 0; j < b; j++) {
      tab[i][j] = 0;
    }
  }
  return tab;
}
function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  let max = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

function thinker() {
  tab = npzeros(restedispo().length, restedispo().length);
  tot = [];
  reste = restedispo();
  for (let step = 0; step < restedispo().length; step++) {
    comptI = 0;
    s = 0;
    IA = [...cercle];
    rival = [...croix];
    played = [...jouee];
    reste = restedispo();
    for (const j of reste) {
      comptJ = 0;
      s = 0;
      IA = [...cercle];
      rival = [...croix];
      played = [...jouee];
      reste = restedispo();
      IA.push(j.toString());
      reste.splice(reste.indexOf(j.toString), 1);
      played.push(j.toString);
      for (nextRiv of reste) {
        rival.push(nextRiv.toString());
        reste.splice(reste.indexOf(nextRiv.toString), 1);
        played.push(nextRiv.toString);

        if (verifIA(IA)) {
          // console.log("cercle gagne");

          s = s + 3 + 1 / (step / 5);
        }
        if (verif(rival)) {
          s = s - (3 + 1 / (step / 5));
          // console.log("le rival gagne");
        }
        if (matchnul()) {
          s = s + 1;
        }
        comptJ += 1;
      }
      console.log(s, 's');

      tab[comptI][comptJ] = s;
    }

    for (let i = 0; i < tab.length; i++) {
      for (let j = 0; j < tab[i].length; j++) {
        tot[j] = (tot[j] || 0) + tab[i][j];
      }
    }
    comptI++;
  }
  max = indexOfMax(tot);
  console.log(tot);
  return restedispo()[max].toString();
}

function restedispo() {
  tableu = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  jouee.sort();
  for (let i = 0; i < jouee.length; i++) {
    if (tableu.includes(jouee[i])) {
      tableu.splice(tableu.indexOf(jouee[i]), 1);
    }
  }
  return tableu;
}

function thinkening() {
  if (potentiel().length > 0) {
    console.log('POTENCIEL');

    let next = findWinner();
  } else if (danger().length > 0) {
    console.log('DANGER');
    let next = stopDanger2();
  } else {
    console.log('THINKER');

    let next = thinker();
  }

  while (!dispo(next)) {
    let next = restedispo()[Math.floor(Math.random() * restedispo().length)];
  }
  btn = document.getElementById(next);
  //coins.splice(coins.indexOf(next), 1);
  jouee.push(next);
  cercle.push(next);
  btn.setAttribute('case', next);
  btn.innerHTML = '<img src ="cercle.png">';
  joueur = joueur + 1;
}

function stopdanger() {
  let stop = gagnant[danger()[0]];
  let s = thinker();
  if (croix.length == 2) {
    indexOfFirst = stop.indexOf(croix[0]);
    console.log(stop);
    stop.splice(stop.indexOf(croix[0]), 1);
    console.log(stop);
    stop.splice(stop.indexOf(croix[1]), 1);
    console.log(stop);
    second = stop[0];
    s = second;
  }
  if (dispo(second)) {
    console.log('Stop Danger est un succes');
  } else s = thinker();
  console.log(s);
  return s;
}

function stopDanger2() {
  let s = thinker();
  let gagnant2 = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
  ];
  let combo = gagnant[danger()[0]];
  for (const j of combo) {
    if (dispo(j)) {
      s = j;
    }
  }
  return s;
}
function findWinner() {
  let s = thinker();
  let gagnant2 = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7'],
  ];
  let combo = gagnant[potentiel()[0]];
  for (const j of combo) {
    if (!cercle.includes(j) && dispo(j)) s = j;
  }
  return s;
}

function ajouterMulti(event) {
  console.log(event);
  var btn = event.target;
  console.log(jouee);
  console.log(cercle);
  if (dispo(btn.getAttribute('case')) && btn.getAttribute('case') != null) {
    if (joueur % 2 == 0) {
      btn.innerHTML = '<img src ="croix.png">';

      croix.push(btn.getAttribute('case'));
      jouee.push(btn.getAttribute('case'));

      finmatchMulti();
      joueur = joueur + 1;
    } else {
      btn.innerHTML = '<img src ="cercle.png">';
      cercle.push(btn.getAttribute('case'));
      jouee.push(btn.getAttribute('case'));
      finmatchMulti();
      joueur = joueur + 1;
      console.log(cercle);
      if (verif(cercle)) console.log('Cercle gagne');
    }
    //verif(player(joueur));
    //
  } else console.log('case non disponible');
  // pl=pl+1
}
