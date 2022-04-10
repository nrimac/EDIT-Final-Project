const user = JSON.parse(localStorage.getItem("user"));
// localStorage.clear();

const welcome = document.getElementById("user");
welcome.innerText = `Welcome ${user.username}!`;

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

const allUsers = [];
getUsers();

async function getUsers() {
  await database
    .collection("Users")
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        let tempUser = doc.data();
        allUsers.push(tempUser);
      })
    );

  setup();
}

function setup() {
  const leaderboard = document.getElementById("leaderboard");
  leaderboard.innerHTML = "";
  allUsers.sort((a, b) => (a.sudokuPB < b.sudokuPB ? 1 : -1));

  let index = 1;
  allUsers.forEach((u) => {
    let newRow = document.createElement("tr");

    let rowNumber = document.createElement("th");
    rowNumber.scope = "row";
    rowNumber.innerText = index;
    newRow.appendChild(rowNumber);

    let name = document.createElement("td");
    name.innerText = u.username;
    newRow.appendChild(name);

    let sudokuPB = document.createElement("td");
    sudokuPB.innerText = u.sudokuPB;
    sudokuPB.innerText == "" ? (sudokuPB.innerText = "/") : null;
    newRow.appendChild(sudokuPB);

    let wordlePB = document.createElement("td");
    wordlePB.innerText = "/";
    newRow.appendChild(wordlePB);

    let snakePB = document.createElement("td");
    snakePB.innerText = "/";
    newRow.appendChild(snakePB);

    leaderboard.appendChild(newRow);
    index++;
  });
}
