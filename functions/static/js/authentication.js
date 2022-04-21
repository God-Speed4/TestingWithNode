import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCZ9kbsSse3GhBojutVCRvTZq2iVUK3xHA",
    authDomain: "testingwithnode.firebaseapp.com",
    projectId: "testingwithnode",
    storageBucket: "testingwithnode.appspot.com",
    messagingSenderId: "1028278565411",
    appId: "1:1028278565411:web:a242ad515deb3ec276cf96"
};

initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

//signing users up (Automatically logs user in as soon as he/she signs in)
if (document.querySelector(".sign-up")) {
    const signupForm = document.querySelector(".sign-up");
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = signupForm.email.value;
        const password = signupForm.password.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                alert("user created and signed in");
                console.log("user created:", cred.user);
                signupForm.reset();
                window.location.href = "./index.html";
            })
            .catch((err) => {
                alert(err.message);
            });
    });
} else {
    //console.log("This page does not contain sing-up class, or not in sign up page") ;
}

//logging out
setTimeout(() => {
    const logoutButton = document.querySelector(".sign-out");
    logoutButton.addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                alert("signed out");
                console.log("user signed out");
                //redirect back to home
                window.location.href = "./index.html";
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
}, 2000);

// logging in
if (document.querySelector(".log-in")) {
    const loginForm = document.querySelector(".log-in");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                alert("logged in");
                console.log("user logged in:", cred.user);
                loginForm.reset();
                window.location.href = "./index.html";
            })
            .catch((err) => {
                console.log(err.message);
            });
    });
} else {
    //console.log("This page does not contain login class, or not in sign in page");

}

// Tracks whether user is logged in or not (tracks state).
setTimeout(() => {
    onAuthStateChanged(auth, (user) => {
        console.log("user status changed:, ", user);
        if (user) {
            // Will set up the menu bar options.
            setupUserUI(user);
        } else {
            setupUserUI(null);
        }
    });
}, 150);

// Hide menu options depending if user is logged out or in.
const setupUserUI = (user) => {
    const loggedOutLinks = document.querySelectorAll(".logged-out"); // selects the menu options when logged out.
    const loggedInLinks = document.querySelectorAll(".logged-in"); // selects the menu options when logged in.
    const defaultLinks = document.querySelectorAll(".default"); // selects the menu options outside of logged in/out.

    if (user) {
        // displaying menu options for menu bar.
        console.log("setupUserUI, logged in.");
        // toggle UI elements
        defaultLinks.forEach((item) => (item.style.display = "block"));
        loggedInLinks.forEach((item) => (item.style.display = "block"));
        loggedOutLinks.forEach((item) => (item.style.display = "none"));
    } else {
        console.log("setupUserUI, not logged in.");
        // toggle UI elements
        if (document.querySelector("#main-menu")) {
            defaultLinks.forEach((item) => (item.style.display = "block"));
            loggedInLinks.forEach((item) => (item.style.display = "none"));
            loggedOutLinks.forEach((item) => (item.style.display = "block"));
        }
    }
};

// // END OF FIREBASE SECTION