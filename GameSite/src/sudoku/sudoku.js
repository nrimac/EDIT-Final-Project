let selectedNum = null;
let selectedTile = null;

let board = [];
let solution = [];

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

window.onload = async function () {
  const sudoku = await getRandomSudoku();
  board = JSON.parse(sudoku.puzzle);
  solution = JSON.parse(sudoku.solution);
  startGame();
  setInterval(updateCountdown, 1000);
};
