import React, { useState, useEffect, useContext } from '@lynx-js/react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from '@lynx-js/react';
import { AuthContext } from '../context/AuthContext';
import { getUserProfile } from '../utils/api';

export default function ProfileScreen({ navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError('');
      
      const result = await getUserProfile();
      
      setIsLoading(false);
      
      if (result.success) {
        setProfile(result.profile);
      } else {
        setError(result.error);
      }
    };
    
    fetchProfile();
  }, []);
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <View style={styles.profileCard}>
        <Text style={styles.profileLabel}>Username:</Text>
        <Text style={styles.profileValue}>{userInfo?.username || 'N/A'}</Text>
        
        <Text style={styles.profileLabel}>Email:</Text>
        <Text style={styles.profileValue}>{userInfo?.email || 'N/A'}</Text>
        
        <Text style={styles.profileLabel}>First Name:</Text>
        <Text style={styles.profileValue}>{userInfo?.first_name || 'Not set'}</Text>
        
        <Text style={styles.profileLabel}>Last Name:</Text>
        <Text style={styles.profileValue}>{userInfo?.last_name || 'Not set'}</Text>
      </View>
      
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
        color="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  profileCard: {
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
  profileLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  profileValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    fontWeight: '500',
  },
});