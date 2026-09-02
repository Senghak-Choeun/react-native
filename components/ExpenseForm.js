import { View, Text, TextInput } from 'react-native';

const ExpenseForm = ({
  title,
  setTitle,
  amount,
  setAmount,
  category,
  setCategory,
  styles,
}) => {
  return (
    <View>
      <Text style={styles.inputLabel}>Expense name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Lunch"
        value={title}
        onChangeText={setTitle}
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
    </View>
  );
};

export default ExpenseForm;