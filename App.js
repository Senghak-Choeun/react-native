import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useState } from 'react';

// Import custom components
import ScreenHeader from './components/ScreenHeader';
import TotalCard from './components/TotalCard';
import ExpenseItem from './components/ExpenseItem';
import ExpenseForm from './components/ExpenseForm'; 

export default function App() {
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([
    { id: '1', name: 'Lunch', category: 'Food', amount: -4.50 },
    { id: '2', name: 'Grab', category: 'Transport', amount: -3.25 },
    { id: '3', name: 'Coffee', category: 'Food', amount: -2.00 },
    { id: '4', name: 'Mobile Data', category: 'Utilities', amount: -5.00 },
    { id: '5', name: 'Books', category: 'Education', amount: -12.00 },
    { id: '6', name: 'Groceries', category: 'Food', amount: -24.80 },
    { id: '7', name: 'Cinema Ticket', category: 'Entertainment', amount: -10.50 },
    { id: '8', name: 'Subway Ride', category: 'Transport', amount: -2.75 },
    { id: '9', name: 'Gym Membership', category: 'Health', amount: -35.00 },
    { id: '10', name: 'Cloud Storage', category: 'Subscriptions', amount: -2.99 },
  ]);

  // Dynamic total calculation using numeric values
  const totalRaw = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const total = `-$${Math.abs(totalRaw).toFixed(2)}`;

  function addExpense(name, category, amount) {
    const numericAmount = Number(amount);

    if (title.trim() === '' || amount.trim() === '' || category.trim() === '') {
      setError('Please fill in all fields (title, category, amount).');
      return;
    }

    if (Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      name,
      category,
      amount: -numericAmount,
    };

    setExpenses([newExpense, ...expenses]);

    // Reset inputs
    setTitle('');
    setCategory('');
    setAmount('');
    setError('');
  }

  const deleteExpense = (idToDelete) => {
    setExpenses(expenses.filter((expense) => expense.id !== idToDelete));
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        {/* Header Component */}
        <ScreenHeader />

        {/* Monthly Summary */}
        <Text style={styles.sectionTitle}>Monthly Summary</Text>
        <TotalCard label="Spent this month" amount="$342.50" />
        <TotalCard label="Budget left" amount="$157.50" />
        <TotalCard label="Daily average" amount="$11.42" />

        {/* Recent Expenses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        {expenses.map((expense) => (
          <View key={expense.id} style={styles.expenseRow}>
            <ExpenseItem
              name={expense.name}
              category={expense.category}
              amount={`-$${Math.abs(expense.amount).toFixed(2)}`}
            />
            <Pressable
              onPress={() => deleteExpense(expense.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        ))}

        {/* Total Expense */}
        <TotalCard label="Total expense" amount={total} />

        {/* Quick Add Expense */}
        <Text style={styles.sectionTitle}>Quick Add Expense</Text>

        {/* Render ExpenseForm with props */}
        <ExpenseForm
          title={title}
          setTitle={setTitle}
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          styles={styles}
        />

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}

        <Pressable
          onPress={() => addExpense(title, category, amount)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+ Add Expense</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Track your spending. Build better habits.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: '#666',
  },
  expenseRow: {
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 12,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#222222',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 28,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
});