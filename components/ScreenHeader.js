import { View, Text, StyleSheet } from 'react-native';

export default function ScreenHeader() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.appName}>Walletly</Text>
        <Text style={styles.greeting}>Welcome back, User</Text>
      </View>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>U</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
});