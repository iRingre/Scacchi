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
    // Solo pedoni
    if (this.tipo === PEDONE) {
    let dir = this.colore === "bianco" ? -1 : 1;
    let startRow = this.colore === "bianco" ? 6 : 1;

    let nuovaR = this.r + dir;
    
    if (nuovaR >= 0 && nuovaR < DIM && !board[nuovaR][this.c]) {
      mosse.push([nuovaR, this.c]);

      let doppiaR = this.r + dir * 2;
      if (this.r === startRow && !board[doppiaR][this.c]) {
        mosse.push([doppiaR, this.c]);
      }
    }
    for (let dc of [-1, 1]) {
      let nuovaC = this.c + dc;

      if (
        nuovaR >= 0 && nuovaR < DIM &&
        nuovaC >= 0 && nuovaC < DIM
      ) {
        let vittima = board[nuovaR][nuovaC];
        if (vittima && vittima.colore !== this.colore) {
          mosse.push([nuovaR, nuovaC]);
        }
      }
    }

    console.log("mosse valide", mosse);
    }
    if(this.tipo === CAVALLO) {
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
          }
        }
      }
    }

    if(this.tipo === TORRE || this.tipo === REGINA) {
      //mosse verticali torre e regina
      let nuovaR = this.r;
      for (let i = 1; i < (DIM-this.r); i++) {
        nuovaR = this.r+i;
        if(board[nuovaR][this.c]==null || board[nuovaR][this.c].colore!=this.colore) {
          mosse.push([nuovaR, this.c]);
          
        }
        if(board[nuovaR][this.c]!= null) {
          break
        }
      }
      for (let i = 1; i < this.r+1; i++) {
        nuovaR = this.r-i;
        if(board[nuovaR][this.c]==null || board[nuovaR][this.c].colore!=this.colore) {
          mosse.push([nuovaR, this.c]);
          
        }
        if(board[nuovaR][this.c]!= null) {
          break
        }
      }
      // mosse verticali torre e regina
      let nuovaC = this.c;
      for (let i = 1; i < (DIM-this.c); i++) {
        nuovaC = this.c+i;
        if(board[this.r][nuovaC]==null || board[this.r][nuovaC].colore!=this.colore) {
          mosse.push([this.r, nuovaC]);
          
        }
        if(board[this.r][nuovaC]!= null) {
          break
        }
      }
      for (let i = 1; i < this.c+1; i++) {
        nuovaC = this.c-i;
        if(board[this.r][nuovaC]==null || board[this.r][nuovaC].colore!=this.colore) {
          mosse.push([this.r, nuovaC]);
          
        }
        if(board[this.r][nuovaC]!= null) {
          break
        }
      }
    }

    //mosse diagonali alfiere e regina
    if(this.tipo === ALFIERE || this.tipo === REGINA) {
      let nuovaR = this.r;
      let nuovaC = this.c;
      for (let i = 1; i < (DIM-this.r); i++) {
        nuovaR = this.r+i;
        nuovaC = this.c+i;
        if(board[nuovaR][nuovaC]==null || board[nuovaR][nuovaC].colore!=this.colore) {
          mosse.push([nuovaR, nuovaC]);
          
        }
        if(board[nuovaR][nuovaC]!= null) {
          break
        }
      }
      for (let i = 1; i < (DIM-this.r); i++) {
        nuovaR = this.r+i;
        nuovaC = this.c-i;
        if(board[nuovaR][nuovaC]==null || board[nuovaR][nuovaC].colore!=this.colore) {
          mosse.push([nuovaR, nuovaC]);
          
        }
        if(board[nuovaR][nuovaC]!= null) {
          break
        }
      }
      for (let i = 1; i < this.r+1; i++) {
        nuovaR = this.r-i;
        nuovaC = this.c+i;
        if(board[nuovaR][nuovaC]==null || board[nuovaR][nuovaC].colore!=this.colore) {
          mosse.push([nuovaR, nuovaC]);
          
        }
        if(board[nuovaR][nuovaC]!= null) {
          break
        }
      }
      for (let i = 1; i < this.r+1; i++) {
        nuovaR = this.r-i;
        nuovaC = this.c-i;
        if(board[nuovaR][nuovaC]==null || board[nuovaR][nuovaC].colore!=this.colore) {
          mosse.push([nuovaR, nuovaC]);
          
        }
        if(board[nuovaR][nuovaC]!= null) {
          break
        }
      }

    }

    //mosse del re
    if(this.tipo === RE) {
      let mosseV = [[this.r+1, this.c],[this.r-1, this.c],
                    [this.r, this.c+1],[this.r, this.c-1],
                    [this.r+1, this.c+1],[this.r-1, this.c-1],
                    [this.r+1, this.c-1],[this.r-1, this.c+1]];
      for (let [x,y] of mosseV) {
        if ((x >= 0 && x < DIM) && (y >= 0 && y < DIM)) {
          let vittima = board[x][y];
          if (vittima==null || vittima.colore!=this.colore) {
            mosse.push([x, y]);
          }
        }
      }
    }
    return mosse;
  }
}