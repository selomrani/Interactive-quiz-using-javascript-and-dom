// --- QUIZ TIMER ---
// We need timerId to be accessible by the quiz logic to stop it
let timerId; 

document.addEventListener('DOMContentLoaded', () => {
    const timerElement = document.getElementById('timer');
    
    if (timerElement) {
        let timeLeft = 600; // 10 minutes
        
        function countdown() {
            if (timeLeft <= 0) {
                clearInterval(timerId);
                timerElement.textContent = "0:00";
                showResults(); 
            } else {
                const minutes = Math.floor(timeLeft / 60);
                let seconds = timeLeft % 60;

                seconds = seconds < 10 ? '0' + seconds : seconds;
                timerElement.textContent = `${minutes}:${seconds}`;
                timeLeft--;
            }
        }
        timerId = setInterval(countdown, 1000);
    }
});


const quizContainer = document.getElementById('quiz-container');

if (quizContainer) {
    const questionNumber = document.getElementById('question-number');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const resultsContainer = document.getElementById('results-container');
    const scoreText = document.getElementById('score-text');

    const questions = [
        {
            question: "Who directed the 1994 film 'Pulp Fiction'?",
            options: ["Steven Spielberg", "Martin Scorsese", "Quentin Tarantino", "Christopher Nolan"],
            correct: "Quentin Tarantino"
        },
        {
            question: "In 'The Matrix', what color pill does Neo take?",
            options: ["Red", "Blue", "Green", "Yellow"],
            correct: "Red"
        },
        {
            question: "What is the highest-grossing film of all time (unadjusted for inflation)?",
            options: ["Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens", "Avatar"],
            correct: "Avatar"
        },
        {
            question: "Which movie features the line, \"Here's looking at you, kid.\"?",
            options: ["Gone with the Wind", "Casablanca", "The Maltese Falcon", "Citizen Kane"],
            correct: "Casablanca"
        },
        {
            question: "Who won the Best Actor Oscar for his role in 'Gladiator'?",
            options: ["Tom Hanks", "Denzel Washington", "Russell Crowe", "Joaquin Phoenix"],
            correct: "Russell Crowe"
        }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);

    function loadQuestion(index) {
        const q = questions[index];
        questionNumber.textContent = `QUESTION NUMBER ${index + 1}`;
        questionText.textContent = q.question;
        optionsContainer.innerHTML = "";

      
        q.options.forEach((option, i) => {
           

            optionsContainer.innerHTML += `
                <label class="form-check" for="option${i}">
                    <input class="form-check-input" type="radio" name="quizOption" id="option${i}" value="${option}">
                    <span class="form-check-label-text">
                        ${option}
                    </span>
                </label>
            `;
            
        });

       

      
        prevBtn.style.display = (index === 0) ? 'none' : 'inline-block';
        
        // If it's the last question, show Submit and hide Next
        if (index === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    function saveAnswer() {
        const selectedOption = document.querySelector('input[name="quizOption"]:checked');
        if (selectedOption) {
            userAnswers[currentQuestionIndex] = selectedOption.value;
        }
    }

    function showResults() {

        clearInterval(timerId);

        let score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === questions[index].correct) {
                score++;
            }
        });

        
        scoreText.textContent = `Your score: ${score} / ${questions.length}`;
        quizContainer.style.display = 'none';
        document.getElementById('timer').style.display = 'none';
        resultsContainer.style.display = 'block';
    }

    
    nextBtn.addEventListener('click', () => {
        saveAnswer();
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
    });

    prevBtn.addEventListener('click', () => {
        saveAnswer();
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });

    submitBtn.addEventListener('click', () => {
        saveAnswer();
        showResults();
    });

    
    loadQuestion(currentQuestionIndex);
}



let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
}


if(darkmode === "active") {
    enableDarkmode();
}

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode');
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});