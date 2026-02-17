const elements = {
	password: document.getElementById('password'),
	copyBtn: document.getElementById('copy-btn'),
	lengthInput: document.getElementById('length'),
	lengthValue: document.getElementById('length-value'),
	uppercase: document.getElementById('uppercase'),
	lowercase: document.getElementById('lowercase'),
	numbers: document.getElementById('numbers'),
	symbols: document.getElementById('symbols'),
	generateBtn: document.getElementById('generate-btn'),
	strength: document.getElementById('strength'),
	strengthBar: document.querySelector('.strength-bar'),
}

const {
	password,
	copyBtn,
	lengthInput,
	lengthValue,
	uppercase,
	lowercase,
	numbers,
	symbols,
	generateBtn,
	strength,
	strengthBar,
} = elements

// Character sets
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowercaseLatters = 'abcdefghijklmnopqrstuvwxyz'
const numbersLatters = '0123456789'
const symbolsLatters = '!@#$%^&*()_+{}[]<>?/|'

lengthInput.addEventListener('input', () => {
	lengthValue.textContent = lengthInput.value
})

generateBtn.addEventListener('click', makePassword)

function makePassword() {
	const length = Number(lengthInput.value)
	const includeUppercase = uppercase.checked
	const includeLowercase = lowercase.checked
	const includeNumbers = numbers.checked
	const includeSymbols = symbols.checked

	if (
		!includeUppercase &&
		!includeLowercase &&
		!includeNumbers &&
		!includeSymbols
	) {
		alert('Iltimos characterlardan birini tanlang!')
		return
	}

	const newPassword = crearteRandomPassword(
		length,
		includeUppercase,
		includeLowercase,
		includeNumbers,
		includeSymbols,
	)

	password.value = newPassword
	updateStrengthMeter(newPassword)
}

function crearteRandomPassword(
	length,
	includeUppercase,
	includeLowercase,
	includeNumbers,
	includeSymbols,
) {
	
	let allCharacter = ""

	if (includeUppercase) allCharacter += uppercaseLetters
	if (includeLowercase) allCharacter += lowercaseLatters
	if (includeNumbers) allCharacter += numbersLatters
	if (includeSymbols) allCharacter += symbolsLatters


	let password = ""

	 for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * allCharacter.length)
		
		password += allCharacter[randomIndex];
	 }


	 return password
}


function updateStrengthMeter(passwordStr) {
	const len = passwordStr.length

	const hasUpper = /[A-Z]/.test(passwordStr)
	const hasLower = /[a-z]/.test(passwordStr)
	const hasNum = /[0-9]/.test(passwordStr)
	const hasSym = /[^A-Za-z0-9]/.test(passwordStr)

	let score = 0

	// uzunlik bo'yicha ball
	if (len >= 8) score++
	if (len >= 12) score++
	if (len >= 16) score++

	// turli characterlar bo'yicha ball
	if (hasUpper) score++
	if (hasLower) score++
	if (hasNum) score++
	if (hasSym) score++

	// Natija: 0..7
	if (score <= 2) {
		strength.textContent = "Weak"
		strengthBar.style.width = "30%"
		strengthBar.style.background = "linear-gradient(90deg,#ff5252,#ff1744)"
	} else if (score <= 5) {
		strength.textContent = "Medium"
		strengthBar.style.width = "65%"
		strengthBar.style.background = "linear-gradient(90deg,#ffb300,#ff6f00)"
	} else {
		strength.textContent = "Strong"
		strengthBar.style.width = "100%"
		strengthBar.style.background = "linear-gradient(90deg,#00c853,#64dd17)"
	}
}

copyBtn.addEventListener("click", async () => {
	if (!password.value) return

	try {
		await navigator.clipboard.writeText(password.value)
		copyBtn.classList.remove("fa-copy")
		copyBtn.classList.add("fa-check")

		setTimeout(() => {
			copyBtn.classList.remove("far", "fa-check")
			copyBtn.classList.add("fas", "fa-copy")
		}, 900)
	} catch (err) {
		alert("Copy qilishda xatolik bo‘ldi!")
	}
})
