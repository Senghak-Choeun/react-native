import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  Modal, 
  TextInput,
  StatusBar
} from 'react-native';

export default function App() {
  const [transactions, setTransactions] = useState([
    { id: '1', title: 'Groceries & Supplies', category: 'Food', amount: 46.67, date: 'Today', type: 'expense' },
    { id: '2', title: 'Freelance Payout', category: 'Income', amount: 450.00, date: 'Yesterday', type: 'income' },
    { id: '3', title: 'Morning Coffee', category: 'Food', amount: 3.75, date: 'May 14', type: 'expense' },
    { id: '4', title: 'Electric Bill', category: 'Utilities', amount: 45.00, date: 'May 12', type: 'expense' }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [type, setType] = useState('expense');

  // Calculations
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  // Monthly Budget Limit Example
  const monthlyBudget = 600.00;
  const budgetProgress = Math.min((totalExpense / monthlyBudget) * 100, 100);

  const handleAddTransaction = () => {
    if (!title || !amount) return;
    
    const newTx = {
      id: Date.now().toString(),
      title,
      category,
      amount: parseFloat(amount),
      date: 'Just now',
      type,
    };

    setTransactions([newTx, ...transactions]);
    setTitle('');
    setAmount('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.username}>Senghak CHOEUN</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>SC</Text>
          </View>
        </View>

        {/* Financial Overview Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.cardLabel}>Total Balance</Text>
          <Text style={styles.cardAmount}>${totalBalance.toFixed(2)}</Text>
          
          <View style={styles.cardDivider} />
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={[styles.statAmount, styles.incomeText]}>+${totalIncome.toFixed(2)}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Expense</Text>
              <Text style={[styles.statAmount, styles.expenseText]}>-${totalExpense.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* --- MONTHLY SUMMARY SECTION --- */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Monthly Summary</Text>
            <Text style={styles.monthBadge}>May 2026</Text>
          </View>
          
          <View style={styles.summaryBox}>
            <View style={styles.summaryDetails}>
              <Text style={styles.summarySubtitle}>Budget Used</Text>
              <Text style={styles.summaryValue}>${totalExpense.toFixed(2)} <Text style={styles.summaryLimit}>/ ${monthlyBudget.toFixed(2)}</Text></Text>
            </View>
            <Text style={styles.summaryPercent}>{budgetProgress.toFixed(0)}%</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${budgetProgress}%` }]} />
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => setModalVisible(true)} 
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>+ Add New Transaction</Text>
        </TouchableOpacity>

        {/* --- RECENT EXPENSES SECTION --- */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Transaction List */}
          <View style={styles.listContainer}>
            {transactions.map((item) => {
              const isIncome = item.type === 'income';
              return (
                <View key={item.id} style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                    <View style={[styles.iconContainer, { backgroundColor: isIncome ? '#dcfce7' : '#fee2e2' }]}>
                      <Text style={[styles.iconText, { color: isIncome ? '#16a34a' : '#dc2626' }]}>
                        {isIncome ? '↓' : '↑'}
                      </Text>
                    </View>
                    <View style={styles.transactionTextContainer}>
                      <Text style={styles.transactionTitle}>{item.title}</Text>
                      <Text style={styles.transactionCategory}>{item.category} • {item.date}</Text>
                    </View>
                  </View>
                  <Text style={[styles.transactionAmount, { color: isIncome ? '#10b981' : '#f43f5e' }]}>
                    {isIncome ? '+' : '-'}${Math.abs(item.amount).toFixed(2)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

      </ScrollView>

      {/* Add Transaction Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Transaction</Text>
            
            <View style={styles.typeSelector}>
              <TouchableOpacity 
                style={[styles.typeBtn, type === 'expense' && styles.activeExpense]}
                onPress={() => setType('expense')}
              >
                <Text style={[styles.typeText, type === 'expense' && styles.activeTypeText]}>Expense</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.typeBtn, type === 'income' && styles.activeIncome]}
                onPress={() => setType('income')}
              >
                <Text style={[styles.typeText, type === 'income' && styles.activeTypeText]}>Income</Text>
              </TouchableOpacity>
            </View>

            <TextInput 
              style={styles.input}
              placeholder="Title (e.g., Lunch, Salary)"
              placeholderTextColor="#94a3b8"
              value={title}
              onChangeText={setTitle}
            />

            <TextInput 
              style={styles.input}
              placeholder="Amount ($)"
              placeholderTextColor="#94a3b8"
              keyboardValue="numeric"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />

            <TextInput 
              style={styles.input}
              placeholder="Category (e.g., Food, Utilities)"
              placeholderTextColor="#94a3b8"
              value={category}
              onChangeText={setCategory}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.cancelBtn]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.saveBtn]} 
                onPress={handleAddTransaction}
              >
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// --- Stylesheet ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4f46e5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  balanceCard: {
    backgroundColor: '#4f46e5',
    padding: 24,
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  cardLabel: {
    fontSize: 14,
    color: '#c7d2fe',
    fontWeight: '500',
  },
  cardAmount: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    marginTop: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 16,
  },
  statLabel: {
    fontSize: 12,
    color: '#c7d2fe',
    marginBottom: 2,
  },
  statAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  incomeText: {
    color: '#6ee7b7',
  },
  expenseText: {
    color: '#fda4af',
  },
  sectionContainer: {
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  monthBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4f46e5',
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '600',
  },
  summaryBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  summarySubtitle: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },
  summaryLimit: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  summaryPercent: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4f46e5',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4f46e5',
    borderRadius: 4,
  },
  primaryButton: {
    backgroundColor: '#0f172a',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    marginTop: 4,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 6,
    borderRadius: 16,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionTextContainer: {
    justifyContent: 'center',
  },
  transactionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  transactionCategory: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 3,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeExpense: {
    backgroundColor: '#f43f5e',
  },
  activeIncome: {
    backgroundColor: '#10b981',
  },
  typeText: {
    fontWeight: '600',
    color: '#64748b',
  },
  activeTypeText: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0f172a',
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#f1f5f9',
  },
  cancelBtnText: {
    color: '#475569',
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: '#4f46e5',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});