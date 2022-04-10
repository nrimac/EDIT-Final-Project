// [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

const firebaseConfig = {
  apiKey: "AIzaSyCtBDNUyK65-t5NCRWILtfCI4FLBMKZ4U4",
  authDomain: "gamesite-1e06c.firebaseapp.com",
  projectId: "gamesite-1e06c",
  storageBucket: "gamesite-1e06c.appspot.com",
  messagingSenderId: "935364107500",
  appId: "1:935364107500:web:d12d10813e5444730ad9c9",
};

const app = firebase.initializeApp(firebaseConfig);

const database = app.firestore();

//uzima jednu od sudokua iz firebasea i vraca objekt sa igrom, rjesenjem i tezinom
async function getRandomSudoku() {
  let sudokuPuzzles = [];

  await database
    .collection("SudokuPuzzles")
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        sudokuPuzzle = doc.data();
        sudokuPuzzles.push(sudokuPuzzle);
      })
    );

  const sudoku =
    sudokuPuzzles[Math.floor(Math.random() * sudokuPuzzles.length)];

  return sudoku;
}
