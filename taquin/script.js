let dom_jeu, dom_console, dom_aide, dom_controle, timer;
let taquinPiece, taquinNumero, liVide, coVide, melangeEnCours, horsJeu, score;

function afficherSurConsole(html, style) {
  if (style) {
    dom_console.className = style;
  } else {
    dom_console.className = null;
  }
  dom_console.innerHTML = html;
}

function actualiserPieces() {
  let li, co;
  for (li = 0; li < 4; li += 1) {
    for (co = 0; co < 4; co += 1) {
      taquinPiece[li][co].innerHTML = String(taquinNumero[li][co]);
      taquinPiece[li][co].className =
        'piece' + (taquinNumero[li][co] === 0 ? ' non' : ' oui');
    }
  }
}

function ajouterTDcaseA(noeud, li, co) {
  let element, bouton;
  element = document.createElement('td');
  bouton = document.createElement('button');
  bouton.setAttribute('onclick', 'clicPiece(' + li + ',' + co + ')');
  element.appendChild(bouton);
  noeud.appendChild(element);
  taquinPiece[li][co] = bouton;
}

function initJeu() {
  let li, co, dom_table, dom_tody, dom_tr;
  dom_table = document.createElement('table');
  dom_table.setAttribute('align', 'center');
  dom_table.setAttribute('cellspacing', '0');
  dom_table.setAttribute('border', '0');
  dom_table.setAttribute('cellpadding', '0');
  dom_jeu.appendChild(dom_table);
  dom_tody = document.createElement('tbody');
  dom_table.appendChild(dom_tody);
  taquinPiece = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  taquinNumero = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ];
  liVide = 3;
  coVide = 3;
  melangeEnCours = false;
  horsJeu = true;
  for (li = 0; li < 4; li += 1) {
    dom_tr = document.createElement('tr');
    dom_tody.appendChild(dom_tr);
    for (co = 0; co < 4; co += 1) {
      ajouterTDcaseA(dom_tr, li, co);
    }
  }
  actualiserPieces();
}

function bougerPiecesPour(li, co) {
  let k, s, dk;
  if (li === liVide && co === coVide) {
  } else if (li === liVide) {
    dk = co - coVide;
    s = dk < 0 ? -1 : 1;
    for (k = 0; k < s * dk; k += 1) {
      taquinNumero[li][coVide + s * k] = taquinNumero[li][coVide + s * (k + 1)];
    }
    taquinNumero[li][coVide + dk] = 0;
    coVide = co;
  } else if (co === coVide) {
    dk = li - liVide;
    s = dk < 0 ? -1 : 1;
    for (k = 0; k < s * dk; k += 1) {
      taquinNumero[liVide + s * k][co] = taquinNumero[liVide + s * (k + 1)][co];
    }
    taquinNumero[liVide + dk][co] = 0;
    liVide = li;
  }
}

function melanger() {
  bougerPiecesPour(
    Math.floor(Math.random() * 4),
    Math.floor(Math.random() * 4)
  );
  actualiserPieces();
}

function clicMelanger() {
  horsJeu = false;
  melangeEnCours = true;
  document.body.className = null;
  dom_controle.innerHTML =
    '<button onclick="clicStopMelange()" class="melange">Arrêter de mélanger</button>';
  afficherSurConsole('Mélange en cours...');
  timer = setInterval(melanger, 5);
}

function clicStopMelange() {
  document.body.className = null;
  dom_controle.innerHTML =
    '<button onclick="clicMelanger()" class="melange">Mélanger</button>';
  clearInterval(timer);
  afficherSurConsole('À vous de jouer ...');
  melangeEnCours = false;
  score = 0;
}

function init() {
  dom_aide = document.getElementById('aide');
  dom_console = document.getElementById('console');
  dom_controle = document.getElementById('controle');
  dom_jeu = document.getElementById('jeu');
  initJeu();
}

window.onload = init;
