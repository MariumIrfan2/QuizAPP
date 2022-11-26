// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
    getAuth,
    signInWithEmailAndPassword 
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



var email = document.getElementById("email");
var password = document.getElementById("password");


window.login = function (e) {
  e.preventDefault()

  var obj = {
    email: email.value,
    password: password.value
  }

  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      if(email.value=="abcd@gmail.com"){
        window.location.replace('linked pages/quizInput.html')                         
      }else{
        window.location.replace('linked pages/quiz.html')
      }
      console.log(success.user.uid);
      
    })
    .catch(function (err) {
      console.log(err)      
      alert("Incorrect Email or Incorrect Password");
            
    })

  console.log(obj);

}