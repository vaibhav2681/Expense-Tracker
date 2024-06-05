
document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const totalExpenseDisplay = document.getElementById('total-expense');
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    function renderExpenses() {
        expenseList.innerHTML = '';
        let totalExpense = 0;
        expenses.forEach((expense, index) => {
            totalExpense += parseFloat(expense.amount);
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.name} - $${expense.amount} - ${expense.date}
                <span class="edit" data-index="${index}">Edit</span>
                <span class="delete" data-index="${index}">Delete</span>
            `;
            expenseList.appendChild(li);
        });
        totalExpenseDisplay.textContent = `Total Expense: $${totalExpense.toFixed(2)}`;
    }

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('expense-name').value;
        const amount = document.getElementById('expense-amount').value;
        const date = document.getElementById('expense-date').value;
        expenses.push({ name, amount, date });
        saveExpenses();
        renderExpenses();
        expenseForm.reset();
    });

    expenseList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const index = event.target.getAttribute('data-index');
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        }
        if (event.target.classList.contains('edit')) {
            const index = event.target.getAttribute('data-index');
            const expense = expenses[index];
            document.getElementById('expense-name').value = expense.name;
            document.getElementById('expense-amount').value = expense.amount;
            document.getElementById('expense-date').value = expense.date;
            expenses.splice(index, 1);
            saveExpenses();
            renderExpenses();
        }
    });

    renderExpenses();
});
