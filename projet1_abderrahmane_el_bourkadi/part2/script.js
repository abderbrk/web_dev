

let correctAnswers = {}; 

function generer_quiz() {
    let numQuestions = document.getElementById("num_qst").value;
    let category = document.getElementById("category").value;
    let difficulty = document.getElementById("Difficulty").value.toLowerCase();
    let type = document.getElementById("Type").value.replace("_", "-"); // API uses "boolean" instead of "true_false"
    let encoding = document.getElementById("encoding").value;

    let apiUrl = `https://opentdb.com/api.php?amount=${numQuestions}`;

    if (category) apiUrl += `&category=${category}`;
    if (difficulty) apiUrl += `&difficulty=${difficulty}`;
    if (type) apiUrl += `&type=${type}`;
    if (encoding) apiUrl += `&encode=${encoding}`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayQuiz(data.results))
        .catch(error => console.error("Error fetching quiz:", error));
}


function displayQuiz(questions) {
    document.querySelector('.form_container').style.display='none';
    let quizContainer = document.querySelector(".container");
    quizContainer.style.display='block';
    quizContainer.innerHTML = "<h2>Quiz</h2>";
    quizContainer.innerHTML+="<p id='timer'></p>"
    correctAnswers = {}; 

    questions.forEach((q, index) => {
        let options = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
        correctAnswers[`q${index}`] = q.correct_answer; 

        let questionHTML = `<p>${index + 1}. ${q.question}</p>`;

        options.forEach(option => {
            questionHTML += `
                <input type="radio" name="q${index}" value="${option}">
                <label>${option}</label><br>
            `;
        });

        quizContainer.innerHTML += questionHTML + "<br>";
    });

    // Bouton pour soumettre le quiz
    quizContainer.innerHTML += `<button onclick="corrigerQuiz()">Soumettre le Quiz</button>`;
}

// Fonction pour corriger le quiz
function corrigerQuiz() {
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;

    for (let key in correctAnswers) {
        let selectedOption = document.querySelector(`input[name="${key}"]:checked`);
        if (selectedOption && selectedOption.value === correctAnswers[key]) {
            score++;
        }
    }

    // Affichage du score
    document.getElementById('timer').remove();
    document.getElementById("result").innerHTML = `<h3>Votre score est : ${score} / ${totalQuestions}</h3>`;
}

var minutes=5;
var seconds=59;
function timer(){
   if(seconds<10){
    document.getElementById('timer').innerText=minutes+" : 0"+seconds--;

   }
   else{
    document.getElementById('timer').innerText=minutes+" : "+seconds--;

   }

   if(minutes==0 && seconds==0){
    document.getElementById('timer').remove();
    par=document.createElement('p');
    document.querySelector('.container').innerHTML="";
    par.innerText="Votre temps est ecoulé !";
    par.className="mess";
    document.body.appendChild(par);

   }
   if (seconds==0){
    seconds+=59;
    minutes-=1;
   }
}
setInterval(timer,1000);

