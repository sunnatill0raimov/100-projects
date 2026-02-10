const elements = {
	generateBtn: document.getElementById('generate-btn'),
	palletteContainer: document.querySelector('.pallete-container'),
	colorBoxes: document.querySelectorAll('.color-box'),
}

elements.generateBtn.addEventListener('click', generatePalette)

elements.palletteContainer.addEventListener('click', e => {
	if (e.target.classList.contains('copy-btn')) {
		const hexValue = e.target.previousElementSibling.textContent
		navigator.clipboard
			.writeText(hexValue)
			.then(() =>
				showCopySuccess(e.target.nextElementSibling.querySelector('.copy-btn')),
			)
			.catch(error => {
				console.error(error)
			})
	} else if (e.target.classList.contains('color')) {
		const hexValue =
			e.target.nextElementSibling.querySelector('.hex-value').textContent

		navigator.clipboard
			.writeText(hexValue)
			.then(() =>
				showCopySuccess(e.target.nextElementSibling.querySelector('.copy-btn')),
			)
			.catch(error => {
				console.error(error)
			})
	}
})

function generatePalette() {
	const colors = []
	for (let i = 0; i < 5; i++) {
		colors.push(generateRandomColor())
	}

	updatePaletteDisplay(colors)
}

generatePalette()

function showCopySuccess(copyBtn) {
	copyBtn.classList.remove('far', 'fa-copy')
	copyBtn.classList.add('fas', 'fa-check')

	copyBtn.style.color = '#48bb78'

	setTimeout(() => {
		copyBtn.classList.add('far', 'fa-copy')
		copyBtn.classList.remove('fas', 'fa-check')

		copyBtn.style.color = ''
	}, 1500)
}

function generateRandomColor() {
	const letters = '0123456789ABCDEF'
	let color = '#'

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}

	return color
}

function updatePaletteDisplay(colors) {
	elements.colorBoxes.forEach((box, i) => {
		const color = colors[i]
		const colorDiv = box.querySelector('.color')
		const hexValue = box.querySelector('.hex-value')

		colorDiv.style.backgroundColor = color
		hexValue.textContent = color
	})
}
