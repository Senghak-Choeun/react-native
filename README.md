# ICT 304 — Session 6 Lab Handout

## Apply One-Way Data Flow to SpendWise

**Duration:** 45 minutes  
**Work mode:** Individual  
**Starting point:** Your completed Session 5 SpendWise project

---

## Learning outcomes

By the end of this lab, you should be able to:

1. Identify which component should own shared state.
2. Keep temporary form state close to the form.
3. Pass a function from a parent to a child using a callback prop.
4. Send a user event from a child to the parent that owns the state.
5. Trace the cycle: **view → user action → state update → re-render**.
6. Explain how this cycle demonstrates the main idea behind Flux.

---

## The goal

In Session 5, SpendWise became interactive:

```text
Enter title and amount
        ↓
Press Add Expense
        ↓
Update expenses state
        ↓
Render the new list and total
```

However, one `App` component may currently handle both:

- temporary form input; and
- saved expense data.

In this lab, you will separate these responsibilities while keeping the application small.

You will create only one new component:

```text
App
├── owns the saved expenses
├── updates the expenses array
├── calculates and displays the total
├── renders the existing expense list
└── ExpenseForm
    ├── owns temporary input
    ├── validates input
    └── reports an Add event to App
```

### Keep the scope small

Do **not** add Redux, a dispatcher, a separate store file, action constants, or new components for the total and list.

The purpose is to understand the flow of data and events—not to make the application larger.

---

## Starting point from Session 5

Your project should already contain code similar to this inside `App`:

```jsx
const [expenses, setExpenses] = useState([
  { id: '1', title: 'Lunch', amount: 5 },
  { id: '2', title: 'Transport', amount: 3.5 },
  { id: '3', title: 'Coffee', amount: 2 },
]);

const [title, setTitle] = useState('');
const [amount, setAmount] = useState('');
const [error, setError] = useState('');
```

The form should use controlled inputs:

```jsx
<TextInput
  placeholder="Expense title"
  value={title}
  onChangeText={setTitle}
/>

<TextInput
  placeholder="Amount"
  value={amount}
  onChangeText={setAmount}
  keyboardType="decimal-pad"
/>
```

Your Session 5 `addExpense` function may look similar to this:

```jsx
function addExpense() {
  const numericAmount = Number(amount);

  if (
    title.trim() === '' ||
    amount.trim() === '' ||
    Number.isNaN(numericAmount) ||
    numericAmount <= 0
  ) {
    setError('Enter a valid title and amount.');
    return;
  }

  const newExpense = {
    id: Date.now().toString(),
    title: title.trim(),
    amount: numericAmount,
  };

  setExpenses((currentExpenses) => [
    newExpense,
    ...currentExpenses,
  ]);

  setTitle('');
  setAmount('');
  setError('');
}
```

The list and total should already use the saved `expenses` state:

```jsx
const total = expenses.reduce(
  (sum, expense) => sum + expense.amount,
  0
);
```

```jsx
{expenses.map((expense) => (
  <ExpenseItem
    key={expense.id}
    title={expense.title}
    amount={expense.amount}
  />
))}
```

Do not rebuild these working parts.

---

# Part 1 — Decide where state belongs

**Suggested time: 5 minutes**

Before changing code, copy and complete this table in your notes:

| Value | Owner after the change | Why? |
|---|---|---|
| `expenses` | `App` | The total and expense list both use it. |
| `title` | `ExpenseForm` | Only the form uses the temporary title. |
| `amount` | `ExpenseForm` | Only the form uses the temporary amount. |
| `error` | `ExpenseForm` | Only the form validates and displays it. |
| `total` | Not stored as state | It can be calculated from `expenses`. | 

### Why is this decision necessary?

The child form needs to control what the user is currently typing. The parent needs to control the saved data used by the rest of the screen.

If `ExpenseForm` owned `expenses`, then `App` would not have direct access to the data needed for the total and list.

### Checkpoint

Before continuing, you should be able to state:

> `ExpenseForm` owns temporary input. `App` owns saved expenses.

---

# Part 2 — Create only the `ExpenseForm` component

**Suggested time: 8 minutes**

Create:

```text
components/ExpenseForm.js
```

Add the imports and local state:

```jsx
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function ExpenseForm({ onAddExpense }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  return (
    <View>
      {/* Move the existing form UI here */}
    </View>
  );
}
```

Move the following existing UI from `App` into `ExpenseForm`:

- title `TextInput`;
- amount `TextInput`;
- validation message; and
- Add Expense button.

Do not move the total or expense list.

### Why is this change necessary?

The form UI and the state controlling that UI belong together. This gives `ExpenseForm` one clear responsibility: collect and validate an expense.

The prop in this line will be used later:

```jsx
function ExpenseForm({ onAddExpense })
```

`onAddExpense` will allow the form to report an event to `App` without owning or directly changing the `expenses` state.

### Checkpoint

At this stage:

- `ExpenseForm` contains the inputs and button.
- `ExpenseForm` owns `title`, `amount`, and `error`.
- The Add button may not work yet.
- `App` still owns `expenses`.

---

# Part 3 — Let the parent own the state update

**Suggested time: 7 minutes**

Remove `title`, `amount`, and `error` state from `App` after moving them to `ExpenseForm`.

Change the parent function so that it receives an already-created expense:

```jsx
function addExpense(newExpense) {
  setExpenses((currentExpenses) => [
    newExpense,
    ...currentExpenses,
  ]);
}
```

### What changed?

Before:

```jsx
function addExpense() {
  // App reads and validates title and amount
  // App creates newExpense
  // App updates expenses
}
```

After:

```jsx
function addExpense(newExpense) {
  // App only updates the state it owns
}
```

### Why is this change necessary?

`App` no longer owns the form input, so it should not try to read or validate that input.

Its responsibility is now simpler:

> Receive a valid expense and update the saved expenses state.

The functional update is important:

```jsx
setExpenses((currentExpenses) => [
  newExpense,
  ...currentExpenses,
]);
```

React provides the latest expense array, and the function returns a new array. Do not use `expenses.push(newExpense)` because that mutates the existing array.

### Checkpoint

`App` should now contain:

- `expenses` state;
- `addExpense(newExpense)`;
- the `.reduce()` total; and
- the existing `.map()` list.

---

# Part 4 — Pass the callback down to the form

**Suggested time: 5 minutes**

Import the form into `App`:

```jsx
import ExpenseForm from './components/ExpenseForm';
```

Render it where the old form UI was located:

```jsx
<ExpenseForm onAddExpense={addExpense} />
```

### What does this line mean?

| Name | Meaning |
|---|---|
| `addExpense` | The real function defined in `App`. |
| `onAddExpense` | The prop name used by `ExpenseForm`. |

The parent passes the function itself:

```jsx
onAddExpense={addExpense}
```

Do not add parentheses:

```jsx
// Incorrect
onAddExpense={addExpense()}
```

Parentheses would call the function immediately while the screen is rendering.

### Why is the callback necessary?

React state belongs to the component that created it. `ExpenseForm` should not reach into `App` and change `expenses` directly.

Instead, `App` provides a controlled way for the child to report what happened.

---

# Part 5 — Report the Add event from `ExpenseForm`

**Suggested time: 8 minutes**

Inside `ExpenseForm`, create `handleSubmit`:

```jsx
function handleSubmit() {
  const numericAmount = Number(amount);

  if (title.trim() === '' || amount.trim() === '') {
    setError('Complete both fields.');
    return;
  }

  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    setError('Enter an amount greater than zero.');
    return;
  }

  const newExpense = {
    id: Date.now().toString(),
    title: title.trim(),
    amount: numericAmount,
  };

  onAddExpense(newExpense);

  setTitle('');
  setAmount('');
  setError('');
}
```

Connect it to the existing button:

```jsx
<Pressable onPress={handleSubmit}>
  <Text>Add Expense</Text>
</Pressable>
```

### Why is `onAddExpense(newExpense)` necessary?

This line reports two things to the parent:

1. an Add event occurred; and
2. this is the new expense that should be saved.

The form does not decide how the saved array changes. It sends the event to the component that owns that array.

### Follow the event

```text
ExpenseForm creates newExpense
        ↓
ExpenseForm calls onAddExpense(newExpense)
        ↓
App's addExpense(newExpense) runs
        ↓
App updates expenses state
```

---

# Part 6 — Test and trace the complete flow

**Suggested time: 7 minutes**

Run the app and add:

```text
Title: Breakfast
Amount: 4.50
```

Confirm that:

- the expense is added;
- the newest expense appears first;
- the total increases by `$4.50`;
- both form inputs clear; and
- the error clears after a successful submission.

Then test:

| Input | Expected result |
|---|---|
| `Breakfast`, `4.50` | Added successfully |
| Empty title, `4.50` | Error; nothing added |
| `Breakfast`, empty amount | Error; nothing added |
| `Breakfast`, `-4.50` | Error; nothing added |

### Trace one successful Add event

Complete the missing parts:

```text
1. React renders ____________________________.
2. The user enters a title and amount.
3. The user presses _________________________.
4. ExpenseForm runs _________________________.
5. ExpenseForm calls ________________________.
6. App runs _________________________________ .
7. App updates the _____________________ state.
8. React renders the updated __________ and __________.
```

Suggested answers are at the end of the handout. Do not look until you have completed the trace yourself.

---

## Why this demonstrates the Flux idea

Flux is based on predictable, one-way data flow:

```text
View
  ↓ user action
Event
  ↓
State update
  ↓
New view
```

Your SpendWise implementation follows the same principle:

| One-way flow | SpendWise |
|---|---|
| View | `ExpenseForm`, total, and expense list |
| User event | The user presses Add Expense |
| Event report | `onAddExpense(newExpense)` |
| State owner | `App` |
| State update | `setExpenses(...)` |
| New view | React renders the new list and total |

You have not installed Flux or Redux. You have practised the architectural idea behind them:

> User events request state changes, and the interface is rendered from the resulting state.

---

## Required completion checklist

- [ ] `expenses` state remains in `App`.
- [ ] The total is still calculated using `.reduce()`.
- [ ] The list is still rendered using `.map()` and `ExpenseItem`.
- [ ] `ExpenseForm` owns `title`, `amount`, and `error`.
- [ ] `App` passes `addExpense` as the `onAddExpense` prop.
- [ ] `ExpenseForm` calls `onAddExpense(newExpense)`.
- [ ] `App` updates the array without mutating it.
- [ ] Valid input updates both the list and total.
- [ ] Invalid input does not update the saved expenses.
- [ ] You can verbally trace the complete one-way flow.

---

## Optional challenge — Apply the same flow to Delete

Attempt this only after completing all required work.

Add a Delete button to the existing `ExpenseItem`.

The required flow should be:

```text
User presses Delete in ExpenseItem
        ↓
ExpenseItem reports the selected id
        ↓
App removes that expense from state
        ↓
React renders the new list and total
```

Use:

```jsx
expenses.filter(...)
```

Do not move `expenses` state into `ExpenseItem`. The challenge is to reuse the same ownership and callback principle—not to create a second source of truth.

---

# Check your understanding

Answer these questions in your submission using one or two sentences each.

1. Why does `expenses` remain in `App`?
2. Why do `title`, `amount`, and `error` move into `ExpenseForm`?
3. What is passed by `<ExpenseForm onAddExpense={addExpense} />`?
4. What information travels upward when the form calls `onAddExpense(newExpense)`?
5. Why should `ExpenseForm` not call `setExpenses` directly?
6. Why do the expense list and total update after `setExpenses()`?
7. How does this implementation demonstrate one-way data flow?
8. Why would Redux or a separate store be unnecessary for this small screen?

---

# Submission to Canvas

Submit **one ZIP file** named:

```text
StudentID_Session6_SpendWise.zip
```

The ZIP file must contain:

1. Your updated SpendWise source code.
2. One screenshot showing:
   - both input fields;
   - the Add Expense button;
   - at least four expenses;
   - the updated total.
3. A short Markdown or text file named `answers.md` containing:
   - your completed eight-step event trace;
   - answers to all eight **Check your understanding** questions; and
   - whether you completed the optional Delete challenge.

Before submitting, run the application once more and confirm that valid and invalid inputs behave correctly.

---

## Suggested answers for the event trace

Review these only after completing Part 6.

```text
1. React renders ExpenseForm, the total, and the expense list.
2. The user enters a title and amount.
3. The user presses Add Expense.
4. ExpenseForm runs handleSubmit().
5. ExpenseForm calls onAddExpense(newExpense).
6. App runs addExpense(newExpense).
7. App updates the expenses state.
8. React renders the updated list and total.
```
