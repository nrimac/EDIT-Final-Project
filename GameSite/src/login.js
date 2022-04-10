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

const btnLogin = document.getElementById("btn-login");
const btnRegister = document.getElementById("btn-register");
const form = document.getElementsByTagName("form")[0];
const nameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const errorElement = document.getElementById("error");

btnLogin.addEventListener("click", login);

btnRegister.addEventListener("click", register);

async function login() {
  let user = null;

  await database
    .collection("Users")
    .where("username", "==", `${nameInput.value}`)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        user = doc.data();
      })
    );

  if (user != null && user.password === passwordInput.value) {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "../pages/main.html";
  } else {
    alert("Wrong password or username!");
  }
}

async function register() {
  let user = null;

  if (nameInput.value === "" || nameInput === "") {
    alert("Invalid username or password!");
    return;
  }

  await database
    .collection("Users")
    .where("username", "==", `${nameInput.value}`)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        user = doc.data();
      })
    );

  if (user !== null) {
    alert("Username exists!");
    return;
  }

  user = {
    username: nameInput.value,
    password: passwordInput.value,
    sudokuPB: null,
  };

  await database.collection("Users").add(user);

  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "../pages/main.html";
}
