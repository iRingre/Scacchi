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
    fill(this.colore === "bianco" ? 255 : 0);
    text(this.tipo, this.c * TILE_SIZE + TILE_SIZE/2, this.r * TILE_SIZE + TILE_SIZE/2);
  }

  mosseValide() {
    let mosse = [];
    // Solo pedoni per ora
    if (this.tipo === "P") {
      let dir = this.colore === "bianco" ? -1 : 1;
      let nuovaR = this.r + dir;
      if (nuovaR >= 0 && nuovaR < DIM && !board[nuovaR][this.c]) {
        mosse.push([nuovaR, this.c]);
      }
    }
    if(this.tipo === "C"){
      let dirX = 2;
      let dirY = 1;
      let nuovaR = this.r + dirX;
      let nuovaC = this.c + dirY;
      //if ((nuovaR >= 0 && nuovaR < DIM) && (nuovaC >= 0 && nuovaC < DIM) && !board[nuovaR][nuovaC]) {
        mosse.push([nuovaR, nuovaC],[nuovaR, nuovaC-2],
                  [nuovaR, nuovaC-2],[nuovaR, nuovaC-2],
                  [nuovaR, nuovaC-2],[nuovaR, nuovaC-2],
                  [nuovaR, nuovaC-2],[nuovaR, nuovaC-2]);
      //}
    }
    return mosse;
  }
}