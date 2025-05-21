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
    board[1][c] = new Pezzo("♙", "nero", 1, c);
    board[6][c] = new Pezzo("♟", "bianco", 6, c);
  }
  // Inserimento cavalli
  board[0][1] = new Pezzo("♘", "nero", 0, 1);
  board[0][6] = new Pezzo("♘", "nero", 0, 6);
  board[7][1] = new Pezzo("♞", "bianco", 7, 1);
  board[7][6] = new Pezzo("♞", "bianco", 7, 6);
}

function draw() {
  background(255);
  for (let r = 0; r < DIM; r++) {
    for (let c = 0; c < DIM; c++) {
      if ((r + c) % 2 === 0) fill(200);
      else fill(100);
      rect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);

      let pezzo = board[r][c];
      if (pezzo) pezzo.disegna();
    }
  }

  if (selected) {
    fill(0, 255, 0, 100);
    for (let [r , c] of selected.mosseValide()) {
      rect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }
  }
}

function mousePressed() {
  let c = floor(mouseX / TILE_SIZE);
  let r = floor(mouseY / TILE_SIZE);
  if (c < 0 || c >= DIM || r < 0 || r >= DIM) return;

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