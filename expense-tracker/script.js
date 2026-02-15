const elements = {
	balance_id: document.getElementById('balance_id'),
	income_id: document.getElementById('income_id'),
	expenses_id: document.getElementById('expenses_id'),
	transactionsContainer: document.getElementById('transactions'),
	transactionForm: document.getElementById('transactionForm'),
	transactions: JSON.parse(localStorage.getItem('transactions')) || [],
}

elements.transactionForm.addEventListener('submit', addTransaction)

function addTransaction(e) {
	e.preventDefault()

	const transactionObject = {
		id: Date.now(),
	}
	const formData = new FormData(elements.transactionForm)

	formData.forEach((value, key) => {
		if (key === 'amount') {
			transactionObject[key] = parseFloat(value)
		} else {
			transactionObject[key] = value
		}
	})

	elements.transactions.push(transactionObject)

	localStorage.setItem('transactions', JSON.stringify(elements.transactions))

	renderTransactionsList()
	renderAllBalance()

	elements.transactionForm.reset()
}

function renderTransactionsList() {
	elements.transactionsContainer.innerHTML = ''

	const transactions = [...elements.transactions].reverse()

	transactions.forEach(transaction => {
		const check = document.createElement('div')
		check.classList.add('check')
		check.innerHTML = `
			<p>${transaction.descr}</p>
			<span>${formatCurrency(transaction.amount)}</span>
		`

		if (transaction.amount > 0) {
			check.style.borderLeft = ' 5px solid #6bc76b'
		} else {
			check.style.borderLeft = ' 5px solid #ce6c6c'
		}

		elements.transactionsContainer.appendChild(check)
	})
}

function renderAllBalance() {
	const balance = elements.transactions.reduce(
		(acc, transaction) => acc + transaction.amount,
		0,
	)

	const income = elements.transactions
		.filter(transaction => transaction.amount > 0)
		.reduce((acc, transaction) => acc + transaction.amount, 0)

	const expenses = elements.transactions
		.filter(transaction => transaction.amount < 0)
		.reduce((acc, transaction) => acc + transaction.amount, 0)

	elements.balance_id.textContent = formatCurrency(balance)
	elements.income_id.textContent = formatCurrency(income)
	elements.expenses_id.textContent = formatCurrency(expenses)
}

function formatCurrency(number) {
	return new Intl.NumberFormat('en-UZ', {
		style: 'currency',
		currency: 'UZB',
	}).format(number)
}

renderAllBalance()
renderTransactionsList()
