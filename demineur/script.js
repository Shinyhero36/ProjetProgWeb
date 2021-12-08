let table = document.querySelector("#game")

let game = undefined;

let H = 0;
let L = 0;
let nbC = 0;

function action(i, j){
  if(i>=0 && j>=0){
    if(i<H && j<L){
      let button = table.querySelector("#B-"+i+"-"+j);
      if(!button.disabled){
        button.disabled = true;
        game[i][j].isShow = true;
        switch (game[i][j].value) {
          case 0:
            action(i+1, j+1);
            action(i+1, j);
            action(i+1, j-1);
            action(i, j-1);
            action(i-1, j-1);
            action(i-1, j);
            action(i-1, j+1);
            action(i, j+1);
            win();
            break;
          case 'B':
            button.classList.add("case-B-fail");
            button.innerHTML = "<span>B</span>"
            loose();
            break;
          default:
            button.innerHTML = "<span>"+game[i][j].value+"</span>"
            button.classList.add("case-"+game[i][j].value)
            win();
        }
      }
    }
  }
}

function flag(e, i, j){
  e.preventDefault();
  if(i>=0 && j>=0) {
    if (i < H && j < L) {
      if (!game[i][j].isShow){
        let button = table.querySelector("#B-" + i + "-" + j);
        if (button.disabled) {
          button.innerHTML = "<span></span>";
          button.disabled = false;
          button.classList.remove("case-F");
        } else {
          button.disabled = true;
          button.innerHTML = "<span>F</span>"
          button.classList.add("case-F")
        }
      }
    }
  }
}

function win(){
  nbC--;
  if(nbC === 0){
    table.querySelector("h1").textContent = "GAGNE !";
    showAll();
  }
}
function loose(){
  table.querySelector("h1").textContent = "Perdu :c";
  showAll();
}

function showAll(){
  for(let i=0; i<H; i++){
    for(let j=0; j<L; j++){
      let button = table.querySelector("#B-"+i+"-"+j);
      if(!game[i][j].isShow){
        button.disabled = true;
        game[i][j].isShow = true;
        button.classList.remove("case-F");
        if (game[i][j].value){
          button.innerHTML = "<span>"+game[i][j].value+"</span>"
          button.classList.add("case-"+game[i][j].value)
        }
      }

    }
  }
}

function addHint(i, j){
  if(i>=0 && j>=0){
    if(i<H && j<L){
      if(game[i][j].value !== 'B'){
        game[i][j].value += 1;
      }
    }
  }
}

document.querySelector("form").addEventListener('submit', function(e){
  e.preventDefault();
  let formData = new FormData(e.target);
  H = parseInt(formData.get("grid-H"))
  L = parseInt(formData.get("grid-L"))

  let nbB = Math.ceil(parseInt(formData.get("grid-D")) * H * L / 50)
  nbC = H * L - nbB

  game = Array(H)
    .fill(undefined)
    .map(()=>Array(L)
      .fill(undefined)
      .map(()=>{
        return {value: 0, isFag: false, isShow: false}
      }));

  for(let k=0; k<nbB; k++){
    let i = Math.floor(Math.random() * H);
    let j = Math.floor(Math.random() * L);
    if(game[i][j].value === 'B'){
      k--;
    }
    else {
      game[i][j].value = 'B';
      addHint(i+1, j+1);
      addHint(i+1, j);
      addHint(i+1, j-1);
      addHint(i, j-1);
      addHint(i-1, j-1);
      addHint(i-1, j);
      addHint(i-1, j+1);
      addHint(i, j+1);
    }
  }

  let html = "<header><span>Nombre de Bombe :</span><span id='nbB'>"+nbB+"</span></header>"
  html += "<main><table><tbody>";
  for(let i=0; i<H; i++){
    html += "<tr>";
    for(let j=0; j<L; j++){
      html += "<td oncontextmenu='flag(event, "+i+", "+j+")'>";
      html += "<button onclick='action("+i+", "+j+")' id='B-"+i+"-"+j+"'><span></span></button>";
      html += "</td>";
    }
    html += "</tr>";
  }
  html += "</main></tbody></table><footer><h1></h1></footer>";
  table.innerHTML = html;
})
