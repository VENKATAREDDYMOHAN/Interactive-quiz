// script.js

const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
        correct: 0
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const feedbackElement = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('current-score');
const finalScoreElement = document.getElementById('final-score');
const finalScoreValueElement = document.getElementById('final-score-value');

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft === 0) {
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = '';
    question.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice');
        button.addEventListener('click', () => selectAnswer(index));
        choicesElement.appendChild(button);
    });
}

function selectAnswer(index) {
    const question = questions[currentQuestionIndex];
    if (index === question.correct) {
        score++;
        feedbackElement.textContent = 'Correct!';
    } else {
        feedbackElement.textContent = 'Wrong!';
    }
    scoreElement.textContent = score;
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        feedbackElement.textContent = '';
        nextButton.style.display = 'none';
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timerInterval);
    questionElement.style.display = 'none';
    choicesElement.style.display = 'none';
    nextButton.style.display = 'none';
    feedbackElement.style.display = 'none';
    finalScoreElement.style.display = 'block';
    finalScoreValueElement.textContent = score;
}

nextButton.addEventListener('click', nextQuestion);

startTimer();
showQuestion();
