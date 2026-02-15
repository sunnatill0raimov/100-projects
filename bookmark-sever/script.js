const bookmarkForm = document.getElementById('bookmarkForm')
const bookmarkContainer = document.getElementById('bookmark-container')
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []

bookmarkForm.addEventListener('submit', addBookmarkData)

function addBookmarkData(e) {
	e.preventDefault()

	const bookmarkObject = {
		id: Date.now(),
	}

	const formData = new FormData(bookmarkForm)

	formData.forEach((value, key) => {

		if (!value) {
			alert("Iltimos barcha maydonni to'ldiring")
			return
		}else if (
			(key === 'url' && !value.startsWith('http://')) &&
			!value.startsWith('https://')
		) {
			alert('URL http:// yoki https:// bilan boshlanishi kerak')
			return
		}
		
		bookmarkObject[key] = value
	})

	bookmarks.push(bookmarkObject)

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
	bookmarkForm.reset()

	renderBookmark()
}

function renderBookmark() {
	bookmarkContainer.innerHTML = ''
	bookmarks.forEach(bookmark => {
		const bookmarkCon = document.createElement('div')
		bookmarkCon.classList.add('bookmark')
		bookmarkCon.innerHTML = `
			<a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
			<div class="delete-btn" onclick="deleteBookmark(${bookmark.id})">Remove</div>
		`
		bookmarkContainer.appendChild(bookmarkCon)
	})
}

renderBookmark()

function deleteBookmark(id) {
	bookmarks = bookmarks.filter(bookmark => bookmark.id !== id)

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
	renderBookmark()
}
