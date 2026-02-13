const elements = {
	cards: document.querySelectorAll('.card'),
	lists: document.querySelectorAll('.list'),
}

for (const card of elements.cards) {
	card.addEventListener('dragstart', dragStart)
	card.addEventListener('dragend', dragEnd)
}

for (const list of elements.lists) {
	list.addEventListener('dragover', dragOver)
	list.addEventListener('dragenter', dragEnter)
	list.addEventListener('dragleave', dragLeave)
	list.addEventListener('drop', dragDrop)
}

function dragStart(e) {
	e.dataTransfer.setData('text/plain', this.id)
}

function dragEnd() {
	console.log('Drag ended')
}

function dragOver(e) {
	e.preventDefault()
}

function dragEnter(e) {
	e.preventDefault()

	this.classList.add('over')
}

function dragLeave(e) {
	this.classList.remove('over')
}

function dragDrop(e) {
	const id = e.dataTransfer.getData('text/plain')
	const card = document.getElementById(id)

	this.appendChild(card)

	this.classList.remove('over')
}
