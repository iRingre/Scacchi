const PEDONE = "♟";
const CAVALLO = "♞";
const TORRE = "♜";
const ALFIERE = "♝";
const REGINA = "♛"; 
const RE = "♚";
let board = [];
const DIM = 8;
const TILE_SIZE = 80;
let selected = null;
let trasforma = [CAVALLO, TORRE, ALFIERE, REGINA];
let inPromozione = false;
let pedoneDaPromuovere = null;
let colorPezzoMenu = null;

function setup() {
  createCanvas(DIM * TILE_SIZE, DIM * TILE_SIZE);
  for (let r = 0; r < DIM; r++) {
    board[r] = [];
    for (let c = 0; c < DIM; c++) {
      board[r][c] = null;
    }
  }

  // Inserimento pedoni
  for (let c = 0; c < DIM; c++) {
    board[1][c] = new Pezzo(PEDONE, "nero", 1, c);
    board[6][c] = new Pezzo(PEDONE, "bianco", 6, c);
  }
  // Inserimento cavalli
  board[0][1] = new Pezzo(CAVALLO, "nero", 0, 1);
  board[0][6] = new Pezzo(CAVALLO, "nero", 0, 6);
  board[7][1] = new Pezzo(CAVALLO, "bianco", 7, 1);
  board[7][6] = new Pezzo(CAVALLO, "bianco", 7, 6);

  //inserimento torri
  board[0][0] = new Pezzo(TORRE, "nero", 0, 0);
  board[0][7] = new Pezzo(TORRE, "nero", 0, 7);
  board[7][0] = new Pezzo(TORRE, "bianco", 7, 0);
  board[7][7] = new Pezzo(TORRE, "bianco", 7, 7);

  // Inserimento alfieri
  board[0][2] = new Pezzo(ALFIERE, "nero", 0, 2);
  board[0][5] = new Pezzo(ALFIERE, "nero", 0, 5);
  board[7][2] = new Pezzo(ALFIERE, "bianco", 7, 2);
  board[7][5] = new Pezzo(ALFIERE, "bianco", 7, 5);

  // Inserimento regina
  board[0][3] = new Pezzo(REGINA, "nero", 0, 3);
  board[7][3] = new Pezzo(REGINA, "bianco", 7, 3);

  // Inserimento re
  board[0][4] = new Pezzo(RE, "nero", 0, 4);
  board[7][4] = new Pezzo(RE, "bianco", 7, 4);
}

function draw() {
  background(255);
  for (let r = 0; r < DIM; r++) {
    for (let c = 0; c < DIM; c++) {
      if ((r + c) % 2 === 0) fill(200);
      else fill(100);
      rect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);

      let pezzo = board[r][c];
      if (pezzo){
        pezzo.disegna();
        if(pezzo.getTipo() == PEDONE){
          if (pezzo.getY() == 0 && pezzo.getColore() == "bianco"){
            colorPezzoMenu ="bianco";
            pezzo.trasforma();
          }
          if (pezzo.getY() == 7 && pezzo.getColore() == "nero"){
            colorPezzoMenu = "nero";
            pezzo.trasforma();
          }
        }
      }
      if (inPromozione && pedoneDaPromuovere) drawPromozioneMenu();
    }
  }

  if (selected) {
    for (let [r , c] of selected.mosseValide()) {
      if(board[r][c]==null){
        fill(0, 255, 0, 100);
      }else{
        fill("#dc143c");
      }
      circle(c * TILE_SIZE + TILE_SIZE/2, r * TILE_SIZE + TILE_SIZE/2, TILE_SIZE/4);
      
    }
  }
}

function mousePressed() {
  if (inPromozione && pedoneDaPromuovere) {

    for (let i = 0; i < trasforma.length; i++) {
      let x = 150 + i * 100;
      let y = 275;

      if (dist(mouseX, mouseY, x, y) < 40) {
        let p = pedoneDaPromuovere;
        board[p.r][p.c] = new Pezzo(trasforma[i], p.colore, p.r, p.c);

        inPromozione = false;
        pedoneDaPromuovere = null;
        return;
      }
    }

    return;
  }

  let c = floor(mouseX / TILE_SIZE);
  let r = floor(mouseY / TILE_SIZE);
  if (c < 0 || c >= DIM || r < 0 || r >= DIM) return;
  console.log("pos x e y del mouse:"+c+", "+r);
  if (selected) {
    let mosse = selected.mosseValide();
    for (let [mr, mc] of mosse) {
      console.log("madonna imboficiata ladra"+mr,mc)
      if (mr === r && mc === c) {
        board[selected.r][selected.c] = null;
        selected.r = r;
        selected.c = c;
        board[r][c] = selected;
        selected = null;
        return;
      }
    }
    selected = null;
  } else if (board[r][c]) {
    selected = board[r][c];
  }
}

function drawPromozioneMenu() {
  fill(200);
  stroke(0);
  strokeWeight(2);
  rect(100, 200, 400, 150, 10);

  textAlign(CENTER, CENTER);
  textSize(48);


  for (let i = 0; i < trasforma.length; i++) {
    fill(colorPezzoMenu == "bianco" ? 255 : 0);
    text(
      trasforma[i],
      150 + i * 100,
      275
    );
  }
}
