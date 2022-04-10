M.AutoInit();

let selectedNum = null;
let selectedTile = null;

let board = [];
let playerBoard = [];
let solution = [];
let difficulty = 0;

//postavlja sve tileove i brojeve u html-u sa svojim funkcijama
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

//selecta broj koji se moze postaviti na tileove sudokua
function selectNum() {
  if (selectedNum != null) {
    selectedNum.classList.remove("selected-number");
  }

  selectedNum = this;
  selectedNum.classList.add("selected-number");

  highlightTiles(parseInt(selectedNum.innerText));
}

//postavi broj na sudoku board
function selectTile() {
  selectedTile = this;
  let tileCoords = selectedTile.id.split("-").map((el) => (el = parseInt(el)));

  if (selectedNum) {
    if (board[tileCoords[0]][tileCoords[1]] != 0) {
      return;
    }
    if (selectedTile.innerText === selectedNum.id) {
      selectedTile.innerText = "";
      playerBoard[tileCoords[0]][tileCoords[1]] = 0;
    } else {
      selectedTile.innerText = selectedNum.id;
      playerBoard[tileCoords[0]][tileCoords[1]] = parseInt(selectedNum.id);
    }
  }

  checkGameState();
  highlightTiles(parseInt(selectedNum.innerText));
}

//klikom na broj highlighta sve brojeve iste vrijednosti radi boljeg iskustva
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

//svakim klikom na tile provjerava stanje igre, ako je igrac gotov racuna bodove i vraca se u main.html
function checkGameState() {
  let gameComplete = true;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (playerBoard[i][j] !== solution[i][j]) gameComplete = false;
    }
  }

  if (gameComplete === false) return;

  //kalkuliraj bodove, spremi u bazu i resi onu tablicu na main pageu
  let points = parseInt(timer.innerText.replace(":", "")) + difficulty;
  endGame(points);
}

async function endGame(points) {
  const user = JSON.parse(localStorage.getItem("user"));
  user.sudokuPB < points ? (user.sudokuPB = points) : null;
  localStorage.setItem("user", JSON.stringify(user));

  let userdoc = "";

  await database
    .collection("Users")
    .where("username", "==", `${user.username}`)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        if (user.username === doc.data().username) {
          userdoc = doc.id;
        }
      })
    );

  await database.collection("Users").doc(userdoc).update(user);

  alert(`YOU SCORED ${points} POINTS!`);
  window.location.href = "../../pages/main.html";
}

//setupa board i starta igru
window.onload = async function () {
  const sudoku = await getRandomSudoku();

  board = JSON.parse(sudoku.puzzle);
  playerBoard = JSON.parse(sudoku.puzzle);
  solution = JSON.parse(sudoku.solution);
  difficulty = sudoku.difficulty;

  startGame();
  setInterval(updateCountdown, 1000);
};
