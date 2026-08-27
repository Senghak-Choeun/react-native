import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseItem({ name, category, amount }) {
    
  return (
    <View style={styles.expenseItem}>
      <View>
        <Text style={styles.expenseName}>{name}</Text>
        <Text style={styles.expenseCategory}>{category}</Text>
      </View>
      <Text style={styles.expenseAmount}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});