// ============ ВОПРОСЫ ============
var QUESTIONS = [
    { question: "Какая планета Солнечной системы самая большая?", answers: ["Земля", "Юпитер", "Сатурн", "Марс"], correct: 1, fact: "Юпитер больше Земли в 1300 раз!" },
    { question: "Сколько планет в Солнечной системе?", answers: ["7", "8", "9", "10"], correct: 1, fact: "С 2006 года Плутон — карликовая планета, поэтому планет 8." },
    { question: "Какая планета известна своими кольцами?", answers: ["Марс", "Венера", "Сатурн", "Нептун"], correct: 2, fact: "Кольца Сатурна состоят изо льда и камней." },
    { question: "Что такое Солнце?", answers: ["Планета", "Звезда", "Комета", "Спутник"], correct: 1, fact: "Солнце — звезда, температура на поверхности около 5500°C." },
    { question: "Какая планета ближе всего к Солнцу?", answers: ["Венера", "Земля", "Меркурий", "Марс"], correct: 2, fact: "Меркурий — самая быстрая планета, год там длится 88 дней." },
    { question: "Как называется спутник Земли?", answers: ["Титан", "Луна", "Европа", "Фобос"], correct: 1, fact: "Луна удаляется от Земли на 3,8 см в год." },
    { question: "Какая планета называется «красной»?", answers: ["Венера", "Юпитер", "Марс", "Уран"], correct: 2, fact: "Марс красный из-за оксида железа в почве." },
    { question: "Кто первым полетел в космос?", answers: ["Нил Армстронг", "Юрий Гагарин", "Джон Гленн", "Валентина Терешкова"], correct: 1, fact: "Юрий Гагарин совершил полёт 12 апреля 1961 года." },
    { question: "Что находится в центре Млечного Пути?", answers: ["Солнце", "Планета", "Чёрная дыра", "Комета"], correct: 2, fact: "В центре нашей Галактики — сверхмассивная чёрная дыра." },
    { question: "Сколько времени свет идёт от Солнца до Земли?", answers: ["8 секунд", "8 минут", "8 часов", "8 дней"], correct: 1, fact: "Свет преодолевает 150 млн км примерно за 8 минут 20 секунд." }
];

// ============ ПЕРЕМЕННЫЕ ============
var currentIndex = 0;
var score = 0;
var answered = false;

// ============ ЭЛЕМЕНТЫ ============
var startScreen = document.getElementById("startScreen");
var quizScreen = document.getElementById("quizScreen");
var resultScreen = document.getElementById("resultScreen");
var startBtn = document.getElementById("startBtn");
var restartBtn = document.getElementById("restartBtn");
var questionNumEl = document.getElementById("questionNum");
var totalNumEl = document.getElementById("totalNum");
var scoreEl = document.getElementById("score");
var questionText = document.getElementById("questionText");
var answersEl = document.getElementById("answers");
var feedback = document.getElementById("feedback");

// ============ ПОКАЗ ЭКРАНОВ ============
function showScreen(screen) {
    startScreen.classList.remove("active");
    quizScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    screen.classList.add("active");
}

// ============ СТАРТ И РЕСТАРТ ============
function startQuiz() {
    currentIndex = 0;
    score = 0;
    answered = false;
    scoreEl.textContent = "0";
    totalNumEl.textContent = QUESTIONS.length;
    showScreen(quizScreen);
    loadQuestion();
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);

// ============ ЗАГРУЗКА ВОПРОСА ============
function loadQuestion() {
    answered = false;
    feedback.textContent = "";
    feedback.className = "feedback";

    var q = QUESTIONS[currentIndex];

    questionNumEl.textContent = currentIndex + 1;
    questionText.textContent = q.question;

    // Очищаем и создаём кнопки ответов
    answersEl.innerHTML = "";

    for (var i = 0; i < q.answers.length; i++) {
        var btn = document.createElement("button");
        btn.className = "answer-btn";
        btn.textContent = String.fromCharCode(65 + i) + ". " + q.answers[i];
        btn.setAttribute("data-index", i);
        btn.addEventListener("click", handleAnswer);
        answersEl.appendChild(btn);
    }
}

// ============ ОБРАБОТКА ОТВЕТА ============
function handleAnswer(event) {
    if (answered) return;
    answered = true;

    var chosenIndex = parseInt(event.target.getAttribute("data-index"));
    var q = QUESTIONS[currentIndex];
    var buttons = answersEl.querySelectorAll(".answer-btn");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if (i === q.correct) {
            buttons[i].classList.add("correct");
        }
        if (i === chosenIndex && i !== q.correct) {
            buttons[i].classList.add("wrong");
        }
    }

    if (chosenIndex === q.correct) {
        score = score + 10;
        scoreEl.textContent = score;
        feedback.textContent = "✅ Верно! " + q.fact;
        feedback.className = "feedback correct-msg";
    } else {
        feedback.textContent = "❌ Неверно. " + q.fact;
        feedback.className = "feedback wrong-msg";
    }

    // Через 2 секунды — следующий вопрос
    setTimeout(function() {
        currentIndex = currentIndex + 1;
        if (currentIndex < QUESTIONS.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

// ============ РЕЗУЛЬТАТЫ ============
function showResults() {
    showScreen(resultScreen);

    document.getElementById("finalScore").textContent = score;

    var resultIcon = document.getElementById("resultIcon");
    var resultTitle = document.getElementById("resultTitle");
    var resultMessage = document.getElementById("resultMessage");

    var maxScore = QUESTIONS.length * 10;
    var percent = (score / maxScore) * 100;

    if (percent >= 90) {
        resultIcon.textContent = "🏆";
        resultTitle.textContent = "Космический гений!";
        resultMessage.textContent = "Ты знаешь космос как настоящий астронавт!";
    } else if (percent >= 70) {
        resultIcon.textContent = "🚀";
        resultTitle.textContent = "Отличный полёт!";
        resultMessage.textContent = "Ты отлично разбираешься в космосе!";
    } else if (percent >= 50) {
        resultIcon.textContent = "⭐";
        resultTitle.textContent = "Хорошая работа!";
        resultMessage.textContent = "Неплохой результат! Есть куда расти.";
    } else {
        resultIcon.textContent = "🌱";
        resultTitle.textContent = "Начало пути";
        resultMessage.textContent = "Каждый астронавт с чего-то начинал. Продолжай!";
    }
}