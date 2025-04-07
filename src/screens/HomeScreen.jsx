import React, { useContext } from '@lynx-js/react';
import { View, Text, StyleSheet, Button } from '@lynx-js/react';
import { AuthContext } from '../context/AuthContext';
import { logout } from '../utils/api';

export default function HomeScreen({ navigation }) {
  const { signOut, userInfo } = useContext(AuthContext);
  
  const handleLogout = async () => {
    // Call the logout API
    const result = await logout();
    
    // Regardless of the API result, sign out locally
    signOut();
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fleet Management Dashboard</Text>
      </View>
      
      <View style={styles.userInfoContainer}>
        <Text style={styles.welcomeText}>Welcome, {userInfo?.username || 'User'}!</Text>
        
        {userInfo && (
          <View style={styles.userDetails}>
            <Text style={styles.userDetailItem}>ID: {userInfo.id}</Text>
            <Text style={styles.userDetailItem}>Email: {userInfo.email}</Text>
            <Text style={styles.userDetailItem}>
              Name: {userInfo.first_name || '-'} {userInfo.last_name || '-'}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.navigationContainer}>
        <Button
          title="View Profile"
          onPress={() => navigation.navigate('Profile')}
        />
        
        <Button
          title="Test Connection"
          onPress={() => navigation.navigate('TestConnection')}
        />
        
        <Button
          title="Logout"
          onPress={handleLogout}
          color="#ff6347"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  userInfoContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  userDetails: {
    marginTop: 10,
  },
  userDetailItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  navigationContainer: {
    marginTop: 20,
  },
});