import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>SpendWise</Text>
            <Text style={styles.greeting}>Good morning!</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>VP</Text>
          </View>
        </View>

        {/* Monthly Summary */}
        <Text style={styles.sectionTitle}>Monthly Summary</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Spent this month</Text>
          <Text style={styles.summaryAmount}>$342.50</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Budget left</Text>
          <Text style={styles.summaryAmount}>$157.50</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Daily average</Text>
          <Text style={styles.summaryAmount}>$11.42</Text>
        </View>

        {/* Recent Expenses */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        <View style={styles.expenseItem}>
          <View>
            <Text style={styles.expenseName}>Lunch</Text>
            <Text style={styles.expenseCategory}>Food</Text>
          </View>

          <Text style={styles.expenseAmount}>-$4.50</Text>
        </View>

        <View style={styles.expenseItem}>
          <View>
            <Text style={styles.expenseName}>Grab</Text>
            <Text style={styles.expenseCategory}>Transport</Text>
          </View>

          <Text style={styles.expenseAmount}>-$3.25</Text>
        </View>

        <View style={styles.expenseItem}>
          <View>
            <Text style={styles.expenseName}>Coffee</Text>
            <Text style={styles.expenseCategory}>Food</Text>
          </View>

          <Text style={styles.expenseAmount}>-$2.00</Text>
        </View>

        <View style={styles.expenseItem}>
          <View>
            <Text style={styles.expenseName}>Mobile Data</Text>
            <Text style={styles.expenseCategory}>Utilities</Text>
          </View>

          <Text style={styles.expenseAmount}>-$5.00</Text>
        </View>

        {/* Quick Add Expense */}
        <Text style={styles.sectionTitle}>Quick Add Expense</Text>

        <Text style={styles.inputLabel}>Expense name</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Lunch"
        />

        <Text style={styles.inputLabel}>Amount</Text>

        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
        />

        <Pressable style={styles.addButton}>
          <Text style={styles.addButtonText}>
            + Add Expense
          </Text>
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  appName: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  greeting: {
    fontSize: 15,
    color: '#777',
    marginTop: 4,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e8eceb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    fontWeight: 'bold',
    fontSize: 14,
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

  summaryCard: {
    backgroundColor: '#f4f6f5',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },

  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },

  summaryAmount: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 6,
  },

  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },

  expenseName: {
    fontSize: 16,
    fontWeight: '600',
  },

  expenseCategory: {
    fontSize: 13,
    color: '#888',
    marginTop: 3,
  },

  expenseAmount: {
    fontSize: 16,
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
});