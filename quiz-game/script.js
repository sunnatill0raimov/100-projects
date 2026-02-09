import quizQuestions from './db.js'

const elements = {
	startScreen: document.getElementById('start-screen'),
	quizScreen: document.getElementById('quiz-screen'),
	resultScreen: document.getElementById('result-screen'),
	startBtn: document.getElementById('start-btn'),
	questionText: document.getElementById('question-text'),
	answerContainer: document.getElementById('answer-container'),
	currentQuestionSpan: document.getElementById('current-questions'),
	totalQuestionSpan: document.getElementById('total-question'),
	scoreSpan: document.getElementById('score'),
	finalScoreSpan: document.getElementById('final-score'),
	maxScoreSpan: document.getElementById('max-score'),
	resultMessage: document.getElementById('result-message'),
	restartBtn: document.getElementById('restart-btn'),
	progressBar: document.getElementById('progress'),
}

// QUIZ STATE VARS
let currentQuestionIndex = 0
let score = 0
let answerDisabled = false

elements.totalQuestionSpan.textContent = quizQuestions.length

elements.maxScoreSpan.textContent = quizQuestions.length

// event listeners

elements.startBtn.addEventListener('click', startQuiz)

elements.restartBtn.addEventListener('click', restartQuiz)

function startQuiz() {
	currentQuestionIndex = 0
	score = 0
	elements.scoreSpan.textContent = score

	elements.startScreen.classList.remove('active')
	elements.quizScreen.classList.add('active')

	showQuestion()
}

function showQuestion() {
	// reset state
	answerDisabled = false

	const currentQuestion = quizQuestions[currentQuestionIndex]

	elements.currentQuestionSpan.textContent = currentQuestionIndex + 1

	const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100
	elements.progressBar.style.width = progressPercent + '%'

	elements.questionText.textContent = currentQuestion.question

	//  explain this in a second
	elements.answerContainer.innerHTML = ''

	currentQuestion.answers.forEach(answer => {
		const button = document.createElement('button')
		button.textContent = answer.text
		button.classList.add('answer-btn')

		// dateset
		button.dataset.correct = answer.correct

		button.addEventListener('click', selectAnswer)

		elements.answerContainer.appendChild(button)
	})
}

function selectAnswer(event) {
	if (answerDisabled) return

	answerDisabled = true

	const selectedBtn = event.target
	const isCorrect = selectedBtn.dataset.correct === 'true'

	Array.from(elements.answerContainer.children).forEach(button => {
		if (button.dataset.correct === 'true') {
			button.classList.add('correct')
		} else if (button === selectedBtn) {
			button.classList.add('incorrect')
		}
	})

	if (isCorrect) {
		score++
		elements.scoreSpan.textContent = score
	}

	setTimeout(() => {
		currentQuestionIndex++

		if (currentQuestionIndex < quizQuestions.length) {
			showQuestion()
		} else {
			showResults()
		}
	}, 1000)
}

function showResults() {
	elements.quizScreen.classList.remove('active')
	elements.resultScreen.classList.add('active')

	elements.finalScoreSpan.textContent = score

	const percentage = (score / quizQuestions.length) * 100

	if (percentage === 100) {
		elements.resultMessage.textContent = 'Ajoyib! Siz juda aqllisiz 🧠'
	} else if (percentage >= 80) {
		elements.resultMessage.textContent = 'Juda yaxshi! Natija zo‘r 👏'
	} else if (percentage >= 60) {
		elements.resultMessage.textContent =
			'Yaxshi, lekin yanada harakat qiling 🙂'
	} else if (percentage >= 40) {
		elements.resultMessage.textContent = 'Qoniqarli, ko‘proq mashq kerak 😐'
	} else {
		elements.resultMessage.textContent = 'Afsus, yana urinib ko‘ring 😔'
	}
}

function restartQuiz() {
	elements.resultScreen.classList.remove('active')

	startQuiz()
}
