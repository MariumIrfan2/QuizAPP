// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    set,
    push,
    onChildAdded
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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
const database = getDatabase();
const auth = getAuth();

// JS code
var quizData = [{
    question: "What does CSS stand for?",
    option1: "Central Style Sheets",
    option2: "Cascading Style Sheets",
    option3: "Cascading Simple Sheets",
    option4: "Cars SUVs Sailboats",
    correct: "option2",
},
{
    question: "What does HTML stand for?",
    option1: "Hypertext Markup Language",
    option2: "Hypertext Markdown Language",
    option3: "Hyperloop Machine Language",
    option4: "Helicopters Terminals Motorboats Lamborginis",
    correct: "option1",
},
{
    question: "What is the latet version of HTML?",
    option1: "HTML22",
    option2: "HTML5",
    option3: "HTML4",
    option4: "none of the above",
    correct: "option2",
},
{
    question: "Which language runs in a web browser?",
    option1: "Java",
    option2: "C",
    option3: "Python",
    option4: "javascript",
    correct: "option4",
},
{
    question: "How to declare a className in CSS?",
    option1: "#className",
    option2: ".className",
    option3: "className",
    option4: "declareClassName",
    correct: "option2",
},
{
    question: "What year was JavaScript launched?",
    option1: "1996",
    option2: "1995",
    option3: "1994",
    option3: "none of the above",
    correct: "option2",
},
];

var quiz = document.getElementById('quiz')
var answerElements = document.querySelectorAll('.answer')
var questionElement = document.getElementById('question')
var option1_value = document.getElementById('option1_value')
var option2_value = document.getElementById('option2_value')
var option3_value = document.getElementById('option3_value')
var option4_value = document.getElementById('option4_value')
var submitBtn = document.getElementById('submit')
var parent = document.getElementById("parent")
var startDiv = document.getElementById("startDiv")

var currentIndex = 0
var score = 0

var model = []

window.getData = function () {
    const taskrefrence = ref(database, "QuizData/");
    onChildAdded(taskrefrence, function (data) {
        model.push(data.val())
        console.log(model)

    })

}

getData()


function checkAuthentication() {
    onAuthStateChanged(auth, function (user) {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid);
            // ...
        } else {
            // User is signed out
            // ...
            window.location.href = "../index.html";
        }
    })


}

checkAuthentication();


function deselectAnswers() {

    answerElements.forEach(answerElements => answerElements.checked = false)
}


function startQuiz() {

    deselectAnswers()

    var currentQuizData = model[currentIndex]

    questionElement.innerHTML = currentQuizData.question;

    option1_value.innerHTML = currentQuizData.option1
    option2_value.innerHTML = currentQuizData.option2
    option3_value.innerHTML = currentQuizData.option3
    option4_value.innerHTML = currentQuizData.option4
}

window.startBtn = function(){
    startQuiz()

    parent.setAttribute('class','')
    startDiv.setAttribute('class','dispNone')
    
    submitBtn.disabled = false;
    

}
function getSelected() {
    var answer
    answerElements.forEach(answerElements => {
        if (answerElements.checked) {
            answer = answerElements.id
        }
    })
    return answer
}

window.logout = function () {
    signOut(auth)
        .then(function () {
            console.log("Logout Successfully");
            // window.location.href = "../index.html";
        })
        .catch(function (err) {
            console.log(err);
        });
}

submitBtn.addEventListener('click', () => {
    var answer = getSelected()
    if (answer) {
        if (answer === model[currentIndex].correct) {
            score++
        }
        currentIndex++
        if (currentIndex < model.length) {
            startQuiz()
        } else {
            quiz.innerHTML = `
           <h2>Your Result <br> ${score}/${model.length}</h2>
           <button class="btn" onclick="logout()">LogOut</button>`
            sendData()

        }
    }
})


function sendData() {
    var obj = {
        score: JSON.stringify(score)
    }

    console.log(score)
    const keyRef = ref(database, "QuizScore/");
    obj.id = push(keyRef).key
    console.log(obj.id)


    const taskrefrence = ref(database, `QuizScore/${obj.id}/`);

    set(taskrefrence, obj);

    console.log(obj);

}

