const signUp = document.getElementById("signUp");
const login = document.getElementById("login");
const loginToggle = document.getElementById("login-toggle");
const signUpToggle = document.getElementById("signup-toggle");
const signUpButton = document.getElementById("button-sign-up");
const signInButton = document.getElementById("button-sign-in");
var userData = {};
signUpButton.addEventListener("click", function () {
  const signUpForm = document.getElementById("form-sign-up");
  const formData = new FormData(signUpForm);
  var email, password;
  var data = [];
  var incomplete = false;
  formData.forEach((value, key) => {
    data.push(value);
  });
  data.forEach((value) => {
    if (value == "") {
      incomplete = true;
    }
  });
  if (data[2] != data[3]) {
    alert("Password and Confirm Password do not match");
    return;
  }
  if (incomplete) {
    alert("Sign Up Form not filled, Please fill the complete form");
    return;
  }
  email = data[1];
  password = data[2];

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      userData["username"] = data[0];
      userData["email_id"] = user.email;
      userData["credits"] = "100";
      console.log(userData);
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      fetch("http://127.0.0.1:8000/saveUserDetails", options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data["success"]) {
            alert("User Created - Proceed to Sign In");
            window.location.href = "login.html";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          console.log(error.message);
        });
    })
    .catch((error) => {
      alert(error.message);
    });
});

signInButton.addEventListener("click", function () {
  const signInForm = document.getElementById("form-sign-in");
  const formData = new FormData(signInForm);
  var email, password;
  formData.forEach((value, key) => {
    if (key == "email") email = value;
    if (key == "password") password = value;
  });
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_id: user.email }),
      };
      fetch("http://127.0.0.1:8000/getUserDetails", options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data["email_id"] == user.email) {
            window.sessionStorage.setItem(
              "userEmail",
              JSON.stringify(user.email)
            );
            alert("Sign In Successful");
            window.location.href = "index.html";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      alert(error.message);
    });
});
loginToggle.addEventListener("click", function getLogin() {
  console.log("hello");
  signUp.classList.add("d-none");
  login.classList.remove("d-none");
});

signUpToggle.addEventListener("click", function getSignup() {
  console.log("hello2");
  login.classList.add("d-none");
  signUp.classList.remove("d-none");
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCSFAtGywBl4Zdbt-4-pN4HPspTRBMOkvM",
  authDomain: "stockprices-6b80e.firebaseapp.com",
  projectId: "stockprices-6b80e",
  storageBucket: "stockprices-6b80e.appspot.com",
  messagingSenderId: "31582619612",
  appId: "1:31582619612:web:9b10236e34903b810a3119",
  measurementId: "G-G7NV5WNCTS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "en";
const provider = new GoogleAuthProvider();

const button1 = document.getElementById("google-button-1");
const button2 = document.getElementById("google-button-2");
button1.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      userData["username"] = user.displayName;
      userData["email_id"] = user.email;
      userData["credits"] = "100";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_id: user.email }),
      };
      const options2 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      fetch("http://127.0.0.1:8000/getUserDetails", options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data["none"]) {
            fetch("http://127.0.0.1:8000/saveUserDetails", options2)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    "Network response was not ok " + response.statusText
                  );
                }
                return response.json();
              })
              .then((data) => {
                if (data["success"]) {
                  window.sessionStorage.setItem(
                    "userEmail",
                    JSON.stringify(user.email)
                  );
                  alert("Google Sign in successfull");
                  window.location.href = "index.html";
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else if (data["email_id"] == user.email) {
            window.sessionStorage.setItem(
              "userEmail",
              JSON.stringify(user.email)
            );
            alert("Google Sign in successfull");
            window.location.href = "index.html";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      alert(error.message);
    });
});
button2.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      userData["username"] = user.displayName;
      userData["email_id"] = user.email;
      userData["credits"] = "100";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_id: user.email }),
      };
      const options2 = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
      fetch("http://127.0.0.1:8000/getUserDetails", options)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data["none"]) {
            fetch("http://127.0.0.1:8000/saveUserDetails", options2)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(
                    "Network response was not ok " + response.statusText
                  );
                }
                return response.json();
              })
              .then((data) => {
                if (data["success"]) {
                  window.sessionStorage.setItem(
                    "userEmail",
                    JSON.stringify(user.email)
                  );
                  alert("Google Sign in successfull");
                  window.location.href = "index.html";
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } else if (data["email_id"] == user.email) {
            window.sessionStorage.setItem(
              "userEmail",
              JSON.stringify(user.email)
            );
            alert("Google Sign in successfull");
            window.location.href = "index.html";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((error) => {
      alert(error.message);
    });
});
