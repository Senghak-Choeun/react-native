import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function ExpenseItem({ name, category, amount, onDelete }) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.amount}>{amount}</Text>
        <Pressable onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  category: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  deleteButtonText: {
    color: '#dc2626',
    fontSize: 11,
    fontWeight: '600',
  },
});