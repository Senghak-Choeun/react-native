import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';

// Import your custom components
import ScreenHeader from './components/ScreenHeader';
import TotalCard from './components/TotalCard';
import ExpenseItem from './components/ExpenseItem';

export default function App() {
  const expenses = [
    {
      id: '1',
      name: 'Lunch',
      category: 'Food',
      amount: '-$4.50',
    },
    {
      id: '2',
      name: 'Grab',
      category: 'Transport',
      amount: '-$3.25',
    },
    {
      id: '3',
      name: 'Coffee',
      category: 'Food',
      amount: '-$2.00',
    },
    {
      id: '4',
      name: 'Mobile Data',
      category: 'Utilities',
      amount: '-$5.00',
    },
    {
      id: '5',
      name: 'Books',
      category: 'Education',
      amount: '-$12.00',
    },
    {
      id: '6',
      name: 'Groceries',
      category: 'Food',
      amount: '-$24.80',
    },
    {
      id: '7',
      name: 'Cinema Ticket',
      category: 'Entertainment',
      amount: '-$10.50',
    },
    {
      id: '8',
      name: 'Subway Ride',
      category: 'Transport',
      amount: '-$2.75',
    },
    {
      id: '9',
      name: 'Gym Membership',
      category: 'Health',
      amount: '-$35.00',
    },
    {
      id: '10',
      name: 'Cloud Storage',
      category: 'Subscriptions',
      amount: '-$2.99',
    },
  ];
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
          <ExpenseItem
            key={expense.id}
            name={expense.name}
            category={expense.category}
            amount={expense.amount}
          />
        ))}

        {/* Quick Add Expense */}
        <Text style={styles.sectionTitle}>Quick Add Expense</Text>

        <Text style={styles.inputLabel}>Expense name</Text>
        <TextInput style={styles.input} placeholder="e.g. Lunch" />

        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
        />

        <Pressable style={styles.addButton}>
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
});