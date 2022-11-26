// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    set,
    push,
    onChildAdded,
    remove
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

var model = []

var parent = document.getElementById('parent')

var ques_inp = document.getElementById("ques_inp")
var opt_1 = document.getElementById("opt_1")
var opt_2 = document.getElementById("opt_2")
var opt_3 = document.getElementById("opt_3")
var opt_4 = document.getElementById("opt_4")
var answer = document.getElementById("correct")

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


function renderData() {
    parent.innerHTML = "";
    for (var i = 0; i < model.length; i++) {
        parent.innerHTML += `<li><b>Question:</b> ${model[i].question}
        <br><span class="label"><b>Option1:</b> ${model[i].option1}</span>
        <br><span class="label"><b>Option2:</b> ${model[i].option2}</span>
        <br><span class="label"><b>Option3:</b> ${model[i].option3}</span>
        <br><span class="label"><b>Option4:</b> ${model[i].option4}</span>
        <br><span class="label"><b>Correct Option:</b> ${model[i].correct}</span>
        <br><button class="remove" onclick="delQuestion('${model[i].id}')"><span><i class="fa-solid fa-xmark"></i></span> Remove</button>
        <button class="edit" onclick="editQues('${model[i].question}','${model[i].option1}','${model[i].option2}','${model[i].option3}','${model[i].option4}','${model[i].correct}','${model[i].id}',)"><span><i class="fa-regular fa-pen-to-square"></i></span> Edit</button></li>`;
    }
}


var editId = model.id;
var obj;
var taskrefrence;

window.sendData = function () {
    if (editId) {
        obj = {
            question: ques_inp.value,
            option1: opt_1.value,
            option2: opt_2.value,
            option3: opt_3.value,
            option4: opt_4.value,
            correct: answer.value,
            id: editId
        }

        taskrefrence = ref(database, `QuizData/${editId}/`);
        set(taskrefrence, obj);

        editId = "";

        getData()
        renderData()

    } else {
        obj = {
            question: ques_inp.value,
            option1: opt_1.value,
            option2: opt_2.value,
            option3: opt_3.value,
            option4: opt_4.value,
            correct: answer.value
        }

        const keyRef = ref(database, "QuizData/");
        obj.id = push(keyRef).key
        console.log(obj.id)


        taskrefrence = ref(database, `QuizData/${obj.id}/`);
        console.log(obj);


    }

    set(taskrefrence, obj);

    ques_inp.value = "";
    opt_1.value = "";
    opt_2.value = "";
    opt_3.value = "";
    opt_4.value = "";
    answer.value = "";

}



window.getData = function () {

    model = [];

    const taskrefrence = ref(database, "QuizData/");
    onChildAdded(taskrefrence, function (data) {
        model.push(data.val())
        renderData()
    })


}


window.delQuestion = function (e) {

    console.log(e)
    const taskrefrence = ref(database, `QuizData/${e}/`);

    remove(taskrefrence).then(function (success) {
        getData()
        renderData()
    })
        .catch(function (err) {
            console.log(err)

        })
}


window.editQues = function (question, option1, option2, option3, option4, correct, id) {

    console.log(question, option1, option2, option3, option4, correct, id)

    ques_inp.value = question;
    opt_1.value = option1;
    opt_2.value = option2;
    opt_3.value = option3;
    opt_4.value = option4;
    answer.value = correct;
    editId = id;


}

window.logout = function (e) {
    signOut(auth)
        .then(function () {
            console.log("Logout Successfully");
            // window.location.href = "../index.html";
        })
        .catch(function (err) {
            console.log(err);
        });
}
