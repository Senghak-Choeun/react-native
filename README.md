# ICT 304 — Session 5 Practice Handout

## Make SpendWise Interactive with User Input

**Duration:** 45 minutes  
**Application:** SpendWise  
**Work mode:** Individual practice

---

## Learning goals

By the end of this practice, you should be able to:

1. Store changing text with `useState`.
2. Connect a `TextInput` to state.
3. Read the values entered by a user.
4. Add a new expense object to an array stored in state.
5. Render the updated expense list with `.map()`.
6. Recalculate the total automatically with `.reduce()`.
7. Perform basic input validation.

---

## The problem

During the lecture, the **Add Sample Expense** button added a fixed expense:

```jsx
const newExpense = {
  id: Date.now().toString(),
  title: 'Snack',
  amount: 2.5,
};
```

This proves that state can update the screen, but a real user should be able to choose the expense title and amount.

Your task is to create this interaction:

```text
Enter title + enter amount → press Add Expense → update list and total
```

---

## Expected starting point

Continue from your existing SpendWise project. Your screen should already have:

- An `expenses` array or expenses state.
- An `ExpenseItem` component that receives props.
- A list rendered using `.map()`.
- A total calculated using `.reduce()`.

Example state:

```jsx
const [expenses, setExpenses] = useState([
  { id: '1', title: 'Lunch', amount: 5 },
  { id: '2', title: 'Transport', amount: 3.5 },
  { id: '3', title: 'Coffee', amount: 2 },
]);
```

If your previous screen is incomplete, first create a simple screen containing a total, two inputs, an Add button, and the expense list. Visual polish is not the main goal today.

---

# Part 1 — Create state for both inputs

**Suggested time: 5 minutes**

The component needs to remember what the user types into each field.

Inside your `App` component, create two additional state variables:

```jsx
const [title, setTitle] = useState('');
const [amount, setAmount] = useState('');
```

Why is the initial amount an empty string instead of `0`?

> `TextInput` works with text. We will convert the amount into a number when the user submits the form.

### Checkpoint

Your component should now have three pieces of state:

```jsx
expenses
title
amount
```

---

# Part 2 — Connect state to `TextInput`

**Suggested time: 8 minutes**

Import `TextInput` if it is not already imported:

```jsx
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
```

Add an input for the expense title:

```jsx
<TextInput
  style={styles.input}
  placeholder="Expense title"
  value={title}
  onChangeText={setTitle}
/>
```

Add another input for the amount:

```jsx
<TextInput
  style={styles.input}
  placeholder="Amount"
  value={amount}
  onChangeText={setAmount}
  keyboardType="decimal-pad"
/>
```

The important connection is:

```text
TextInput displays state → user types → onChangeText updates state
```

### Checkpoint

Temporarily display the input values:

```jsx
<Text>{title}</Text>
<Text>{amount}</Text>
```

Run the app and type into both inputs. The displayed values should change immediately. Remove these temporary `<Text>` elements after testing.

---

# Part 3 — Create the Add Expense button

**Suggested time: 5 minutes**

Create a button with `Pressable`:

```jsx
<Pressable style={styles.addButton} onPress={addExpense}>
  <Text style={styles.addButtonText}>Add Expense</Text>
</Pressable>
```

Add basic styles if your project does not already have them:

```jsx
input: {
  borderWidth: 1,
  borderColor: '#d1d5db',
  borderRadius: 10,
  padding: 12,
  marginBottom: 10,
  backgroundColor: '#ffffff',
},
addButton: {
  backgroundColor: '#2563eb',
  borderRadius: 10,
  padding: 14,
  alignItems: 'center',
  marginBottom: 16,
},
addButtonText: {
  color: '#ffffff',
  fontWeight: '600',
},
```

The application will show an error until you create the `addExpense` function.

---

# Part 4 — Build an expense from the input values

**Suggested time: 10 minutes**

Create the function inside your component:

```jsx
function addExpense() {
  const numericAmount = Number(amount);

  const newExpense = {
    id: Date.now().toString(),
    title: title,
    amount: numericAmount,
  };

  setExpenses([...expenses, newExpense]);
}
```

Test the application:

1. Enter an expense title.
2. Enter an amount.
3. Press **Add Expense**.
4. Confirm that the new expense appears.
5. Confirm that the total changes.

### Think before continuing

Why do we write this?

```jsx
const numericAmount = Number(amount);
```

`TextInput` gives us text. Without conversion, JavaScript may treat the amount as a string instead of a number.

For example:

```jsx
5 + '2.5' // produces '52.5', not 7.5
```

---

# Part 5 — Validate and reset the form

**Suggested time: 7 minutes**

Your current function may accept:

- An empty title.
- An empty amount.
- Letters instead of a number.
- A negative or zero amount.

Add this validation before creating `newExpense`:

```jsx
if (
  title.trim() === '' ||
  amount.trim() === '' ||
  Number.isNaN(numericAmount) ||
  numericAmount <= 0
) {
  return;
}
```

After successfully adding an expense, clear both inputs:

```jsx
setTitle('');
setAmount('');
```

Your function should follow this order:

```text
1. Convert the amount
2. Validate the input
3. Create the expense object
4. Update the expenses state
5. Clear both inputs
```

### Required testing

Test all four cases:

| Test | Expected result |
|---|---|
| `Lunch` and `5` | Expense is added |
| Empty title and `5` | Nothing is added |
| `Lunch` and empty amount | Nothing is added |
| `Lunch` and `-5` | Nothing is added |

---

# Required completion checklist

Before starting the challenges, confirm that:

- [ ] The screen has a title input.
- [ ] The screen has an amount input.
- [ ] Both inputs are connected to state.
- [ ] The Add Expense button runs `addExpense`.
- [ ] A new expense uses the user's input.
- [ ] The amount is stored as a number.
- [ ] Invalid expenses are not added.
- [ ] Both inputs clear after a successful submission.
- [ ] The list updates without restarting the app.
- [ ] The total updates automatically.

---

# Challenges

Complete as many as you can after finishing the required work. Do not skip validation to reach the challenges.

## Challenge 1 — Show a useful validation message

The current validation silently returns. Create an error state:

```jsx
const [error, setError] = useState('');
```

Show an appropriate message when the input is invalid:

```jsx
{error !== '' && (
  <Text style={styles.errorText}>{error}</Text>
)}
```

Requirements:

- Display a message for missing fields.
- Display a different message for an invalid amount.
- Clear the error after a valid expense is added.

Do not copy one generic message for every problem. Decide which message will help the user correct the input.

---

## Challenge 2 — Display the newest expense first

Currently, the new expense is added at the end:

```jsx
setExpenses([...expenses, newExpense]);
```

Change the array update so that the newest expense appears at the top of the list.

**Hint:** Think about where `newExpense` should be placed in the new array.

---

## Challenge 3 — Add an expense category

Add another `TextInput` for a category such as:

- Food
- Transport
- Education
- Shopping

Requirements:

1. Create category state.
2. Connect it to a new input.
3. Include the category in `newExpense`.
4. Pass it to `ExpenseItem` as a prop.
5. Display it inside the expense row.
6. Clear it after submission.

Decide whether category should be required or optional, and be prepared to explain your choice.

---

## Challenge 4 — Delete an expense

Add a Delete button to each `ExpenseItem`.

When the button is pressed, remove only the selected expense from the state array.

**Hints:**

```jsx
array.filter(...)
```

```jsx
expense.id
```

Questions to consider:

- Which component owns the `expenses` state?
- Which component knows which Delete button was pressed?
- How can the child component ask its parent to delete an item?

This challenge previews callback props and “events up,” which will be studied more closely in the next session.

---

## Challenge 5 — Extract an `ExpenseForm` component

Move the input interface into:

```text
components/ExpenseForm.js
```

The component should receive a function prop:

```jsx
<ExpenseForm onAddExpense={addExpense} />
```

Decide which state should remain in `App` and which state could move into `ExpenseForm`.

Be prepared to explain:

> Why should the expenses array remain in the parent component?

This is an advanced challenge. Complete it only after the required functionality works correctly.

---

# Exit questions

Answer these questions before leaving:

1. Why does each `TextInput` need both `value` and `onChangeText`?
2. Why must the amount be converted with `Number()`?
3. Why do we call `setExpenses()` instead of using `expenses.push()`?
4. Why does the total update even though we do not call `setTotal()`?
5. What happens after `setTitle('')` and `setAmount('')` are called?

---

# Submission

Submit the following to Canvas if requested by your instructor:

1. Your updated project source code.
2. One screenshot showing:
   - The completed input form.
   - At least four expenses in the list.
   - The updated total.
3. A short note stating which optional challenge you completed, if any.

---

## Final expected behavior

Your application should support this complete flow:

```text
User enters title and amount
        ↓
User presses Add Expense
        ↓
Input is validated
        ↓
New object is added to expenses state
        ↓
React renders the screen again
        ↓
Expense list and total both update
        ↓
Input fields are cleared
```
