let board = [];
const DIM = 8;
const TILE_SIZE = 80;
let selected = null;

class Pezzo {
  constructor(tipo, colore, r, c) {
    this.tipo = tipo; // "P", "T", "C", "A", "D", "R"
    this.colore = colore; // "bianco" o "nero"
    this.r = r;
    this.c = c;
  }

  disegna() {
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(this.colore === "bianco" ? 250 : 0);
    text(this.tipo, this.c * TILE_SIZE + TILE_SIZE/2, this.r * TILE_SIZE + TILE_SIZE/2);
  }

  mosseValide() {
    let mosse = [];
    // Solo pedoni per ora
    if (this.tipo === "♟" || this.tipo === "♙") {
      let dir = this.colore === "bianco" ? -1 : 1;
      let nuovaR = this.r + dir;
      if (nuovaR >= 0 && nuovaR < DIM && !board[nuovaR][this.c]) {
        mosse.push([nuovaR, this.c]);
        if(this.r === 1)mosse.push([nuovaR+1, this.c]);
        if(this.r === 6)mosse.push([nuovaR-1, this.c]);
      }
    }
    if(this.tipo === "♘" || this.tipo === "♞") {
      let dirX = 2;
      let dirY = 1;
      let nuovaR = this.r + dirX;
      let nuovaC = this.c + dirY;
      let mosseV = [[nuovaR, nuovaC],[nuovaR, nuovaC-2],
                  [nuovaR-1, nuovaC-3],[nuovaR-1, nuovaC+1],
                  [nuovaR-4, nuovaC],[nuovaR-4, nuovaC-2],
                  [nuovaR-3, nuovaC-3],[nuovaR-3, nuovaC+1]];
      for (let [x,y] of mosseV) {
        if ((x >= 0 && x < DIM) && (y >= 0 && y < DIM)) {
          let vittima = board[x][y];
          if (vittima==null || vittima.colore!=this.colore) {
            mosse.push([x, y]);
            console.log("mosse valide", mosse);
          }
        }
      }
    }
    return mosse;
  }
}