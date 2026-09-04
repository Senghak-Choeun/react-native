# SpendWise — Session 6 Answers

## Event trace (Part 6)

1. React renders ExpenseForm, the total, and the expense list.
2. The user enters a name, category, and amount.
3. The user presses the Add Expense button.
4. ExpenseForm runs handleSubmit().
5. ExpenseForm calls onAddExpense(newExpense).
6. App runs addExpense(newExpense).
7. App updates the expenses state.
8. React renders the updated list and total.

## Check your understanding

**1. Why does `expenses` remain in `App`?**
Because App is the part of the screen that needs the expenses to show the list and work out the total. Other pieces of the screen use this data too, so it makes sense for App to be the one place that holds it and changes it.

**2. Why do `title`, `amount`, and `error` move into `ExpenseForm`?**
Because only the form needs them while the user is typing. Once an expense is saved, these values are not needed anymore, so it makes more sense to keep them close to the form instead of storing them in App.

**3. What is passed by `<ExpenseForm onAddExpense={addExpense} />`?**
The real 'addExpense' function from App is passed down as a prop. Inside ExpenseForm this function is called 'onAddExpense', and ExpenseForm calls it whenever the user successfully adds a new expense.

**4. What information travels upward when the form calls `onAddExpense(newExpense)`?**
The new expense object travels upward. It carries the name, category, and amount the user typed in, along with a unique id. This tells App that a new expense has been created and is ready to be saved.

**5. Why should `ExpenseForm` not call `setExpenses` directly?**
Because 'setExpenses' belongs to App, not to ExpenseForm. If ExpenseForm changed the expenses state directly, two components would be trying to control the same data at once, which makes bugs more likely and breaks the one-way flow of data.

**6. Why do the expense list and total update after `setExpenses()`?**
Because the list and the total are both worked out from the expenses state every time App renders. When 'setExpenses()' runs, React re-renders App, and the list and total are calculated again using the new array.

**7. How does this implementation show one-way data flow?**
Data only flows down from App to ExpenseForm through props, and events only flow up from ExpenseForm to App through the 'onAddExpense' callback. ExpenseForm never changes App's state directly — it just reports what happened, and App decides how the state should change.

**8. Why would Redux or a separate store be unnecessary for this small screen?**
Because there are only two components sharing state, and normal React state and props are enough to send data down and send events up. Redux is built for bigger apps where many components far apart need the same data, which is not the case here.

## Optional Delete challenge



Completed. The Delete button is located inside 'ExpenseItem'. When pressed, 'ExpenseItem' triggers an 'onDelete' callback prop passed down from 'App'. 'App' then runs 'deleteExpense(id)' using 'expenses.filter(...)' to update state without mutating the array, properly demonstrating the one-way data flow pattern.