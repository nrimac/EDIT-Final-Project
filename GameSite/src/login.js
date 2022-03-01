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
const name = document.getElementById("username");
const password = document.getElementById("password");
const errorElement = document.getElementById("error");

btnLogin.addEventListener("click", login);

btnRegister.addEventListener("click", register);

async function login() {
  let user = null;

  await database
    .collection("Users")
    .where("username", "==", `${name.value}`)
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => {
        user = doc.data();
      })
    );

  if (user != null && user.password === password.value) {
    console.log(user);
  } else {
    console.log("nah");
  }
}

async function register() {}
