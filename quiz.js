// QUIZ DATA
const quizzes = {
    math: [
        {
            question: "How many apples did the prince have left?",
            answers: [
                { text: "5", correct: true },
                { text: "2", correct: false },
                { text: "10", correct: false }
            ]
        },
        {
            question: "What happened when the dragon gave 3 gems?",
            answers: [
                { text: "They disappeared", correct: false },
                { text: "It became 2 + 3 = 5", correct: true },
                { text: "It became 10", correct: false }
            ]
        }
    ],
    shapes: [
        {
            question: "What shape was the shield?",
            answers: [
                { text: "Circle", correct: true },
                { text: "Square", correct: false },
                { text: "Triangle", correct: false }
            ]
        },
        {
            question: "Which item was a square?",
            answers: [
                { text: "The Ball", correct: false },
                { text: "The Magic Box", correct: true },
                { text: "The Pyramid", correct: false }
            ]
        }
    ],
    colors: [
        {
            question: "What color did Red and Blue make?",
            answers: [
                { text: "Green", correct: false },
                { text: "Purple", correct: true },
                { text: "Yellow", correct: false }
            ]
        },
        {
            question: "What was the pattern on the wall?",
            answers: [
                { text: "Red, Blue, Red, Blue", correct: true },
                { text: "Red, Red, Blue", correct: false },
                { text: "Yellow, Green, Pink", correct: false }
            ]
        }
    ]
};

// Get Quiz ID from URL (e.g., quiz.html?id=math)
const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get("id") || "math"; // Default to math if missing

const quiz = quizzes[quizId] || quizzes["math"];

let currentIndex = 0;
let score = parseInt(localStorage.getItem("points")) || 0;

const questionText = document.getElementById("questionText");
const answerButtons = document.getElementById("answerButtons");
const nextBtn = document.getElementById("nextBtn");
const titleText = document.querySelector(".quiz-title");

// Set Title
if (titleText) {
    titleText.innerText = "📝 " + quizId.charAt(0).toUpperCase() + quizId.slice(1) + " Quiz";
}

// Load the first question
loadQuestion();

function loadQuestion() {
    nextBtn.style.display = "none";
    answerButtons.innerHTML = "";

    const currentQ = quiz[currentIndex];
    questionText.innerText = currentQ.question;

    currentQ.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.innerText = answer.text;
        btn.onclick = () => selectAnswer(btn, answer.correct);
        answerButtons.appendChild(btn);
    });
}

function selectAnswer(button, correct) {
    if (correct) {
        button.classList.add("correct");
        score += 10;
        localStorage.setItem("points", score);
    } else {
        button.classList.add("wrong");
    }

    // Disable all answer buttons after selection
    Array.from(answerButtons.children).forEach(btn => btn.disabled = true);

    nextBtn.style.display = "block";
}

function nextQuestion() {
    currentIndex++;

    if (currentIndex < quiz.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    const questionText = document.getElementById("questionText");
    const answerButtons = document.getElementById("answerButtons");
    const nextBtn = document.getElementById("nextBtn");

    if (!questionText || !answerButtons || !nextBtn) {
        console.error("Quiz elements not found in DOM");
        return; 
    }

    // Update DOM safely
    questionText.innerHTML = `Story Complete! <br> You earned points! <br> Total Score: <b>${score}</b>`;
    answerButtons.innerHTML = `<a href="lessons.html" class="start-btn" style="text-align:center; display:block; margin:auto;">Back to Stories</a>`;
    nextBtn.style.display = "none"; 
}