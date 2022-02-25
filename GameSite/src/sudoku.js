let selectedNum = null;
let selectedTile = null;

let errors = 0;

let board = [
  [0, 0, 7, 4, 9, 1, 6, 0, 5],
  [2, 0, 0, 0, 6, 0, 3, 0, 9],
  [0, 0, 0, 0, 0, 7, 0, 1, 0],
  [0, 5, 8, 6, 0, 0, 0, 0, 4],
  [0, 0, 3, 0, 0, 0, 0, 9, 0],
  [0, 0, 6, 2, 0, 0, 1, 8, 7],
  [9, 0, 4, 0, 7, 0, 0, 0, 2],
  [6, 7, 0, 8, 3, 0, 0, 0, 0],
  [8, 1, 0, 0, 4, 5, 0, 0, 0],
];

const solution = [
  [3, 8, 7, 4, 9, 1, 6, 2, 5],
  [2, 4, 1, 5, 6, 8, 3, 7, 9],
  [5, 6, 9, 3, 2, 7, 4, 1, 8],
  [7, 5, 8, 6, 1, 9, 2, 3, 4],
  [1, 2, 3, 7, 8, 4, 5, 9, 6],
  [4, 9, 6, 2, 5, 3, 1, 8, 7],
  [9, 3, 4, 1, 7, 6, 8, 5, 2],
  [6, 7, 5, 8, 3, 2, 9, 4, 1],
  [8, 1, 2, 9, 4, 5, 7, 6, 3],
];

function startGame() {
  for (let i = 1; i <= 9; i++) {
    const number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.classList.add("number");
    number.addEventListener("click", selectNum);

    document.getElementById("digits").appendChild(number);
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const tile = document.createElement("div");
      tile.id = i + "-" + j;
      tile.classList.add("tile");
      tile.addEventListener("click", selectTile);
      if (board[i][j] != 0) {
        tile.innerText = board[i][j];
        tile.classList.add("tile-start");
      }

      if (i === 2 || i === 5) {
        tile.classList.add("horizontal-border");
      }
      if (j === 2 || j === 5) {
        tile.classList.add("vertical-border");
      }

      document.getElementById("board").appendChild(tile);
    }
  }
}

function selectNum() {
  if (selectedNum != null) {
    selectedNum.classList.remove("selected-number");
  }

  selectedNum = this;
  selectedNum.classList.add("selected-number");

  highlightTiles(parseInt(selectedNum.innerText));
}

function selectTile() {
  selectedTile = this;
  let tileCoords = selectedTile.id.split("-").map((el) => (el = parseInt(el)));

  if (selectedNum) {
    if (board[tileCoords[0]][tileCoords[1]] != 0) {
      return;
    }
    selectedTile.innerText = selectedNum.id;
  }
}

function highlightTiles(numberToHighlight) {
  const allTiles = document.querySelectorAll(".tile");

  allTiles.forEach((tile) => {
    if (parseInt(tile.innerText) == numberToHighlight) {
      tile.classList.add("highlighted-tile");
    } else {
      tile.classList.remove("highlighted-tile");
    }
  });
}

window.onload = function () {
  startGame();
};
