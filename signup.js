// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCIy4Z9JKG_wOl5IMphxAulu90ql42hLy4",
    authDomain: "saims-project-faaa0.firebaseapp.com",
    projectId: "saims-project-faaa0",
    storageBucket: "saims-project-faaa0.appspot.com",
    messagingSenderId: "569058612154",
    appId: "1:569058612154:web:9a7dba2ae9af15d2158383",
    measurementId: "G-Y67150SF5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);


// JS code strat form here...
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var password = document.getElementById("password");

window.signup = function (e) {
    e.preventDefault()
    var obj = {
        firstname: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }

    createUserWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (success) {
            console.log(success.user.uid)
            window.location.replace('linked pages/quiz.html')
        }).catch(function (err) {

            console.log(err)
      

        })

    console.log(obj);

};