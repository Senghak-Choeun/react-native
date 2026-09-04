import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

const ExpenseForm = ({ onAddExpense, styles }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    const numericAmount = Number(amount);

    if (name.trim() === '' || amount.trim() === '' || category.trim() === '') {
      setError('Please fill in all fields (name, category, amount).');
      return;
    }

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      name: name.trim(),
      category: category.trim(),
      amount: -numericAmount,
    };

    onAddExpense(newExpense);

    setName('');
    setAmount('');
    setCategory('');
    setError('');
  }

  return (
    <View>
      <Text style={styles.inputLabel}>Expense name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Lunch"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.inputLabel}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.inputLabel}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Food"
        value={category}
        onChangeText={setCategory}
      />

      {error !== '' && <Text style={styles.errorText}>{error}</Text>}

      <Pressable onPress={handleSubmit} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </Pressable>
    </View>
  );
};

export default ExpenseForm;