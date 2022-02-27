let selectedNum = null;
let selectedTile = null;

const board = [
  [6, 8, 0, 0, 0, 7, 0, 0, 0],
  [0, 1, 5, 0, 4, 2, 8, 0, 0],
  [4, 0, 0, 0, 6, 0, 1, 3, 0],
  [1, 3, 2, 6, 8, 0, 7, 0, 0],
  [5, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 6, 0, 2, 0, 0, 3, 0, 5],
  [8, 7, 1, 0, 2, 0, 0, 5, 0],
  [0, 0, 9, 0, 5, 1, 2, 6, 7],
  [2, 0, 0, 0, 0, 3, 9, 0, 0],
];

const solution = [
  [6, 8, 3, 1, 9, 7, 5, 4, 2],
  [9, 1, 5, 3, 4, 2, 8, 7, 6],
  [4, 2, 7, 5, 6, 8, 1, 3, 9],
  [1, 3, 2, 6, 8, 5, 7, 9, 4],
  [5, 9, 8, 7, 3, 4, 6, 2, 1],
  [7, 6, 4, 2, 1, 9, 3, 8, 5],
  [8, 7, 1, 9, 2, 6, 4, 5, 3],
  [3, 4, 9, 8, 5, 1, 2, 6, 7],
  [2, 5, 6, 4, 7, 3, 9, 1, 8],
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
    if (selectedTile.innerText === selectedNum.id) {
      selectedTile.innerText = "";
    } else {
      selectedTile.innerText = selectedNum.id;
    }
  }

  highlightTiles(parseInt(selectedNum.innerText));
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
  setInterval(updateCountdown, 1000);
};
