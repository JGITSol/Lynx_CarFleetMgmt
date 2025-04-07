import React, { useState, useContext } from '@lynx-js/react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from '@lynx-js/react';
import { AuthContext } from '../context/AuthContext';
import { login } from '../utils/api';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useContext(AuthContext);
  
  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const result = await login(username, password);
    
    setIsLoading(false);
    
    if (result.success) {
      signIn(result.token, result.user);
    } else {
      setError(result.error);
    }
  };
  
  const handleTestConnection = () => {
    navigation.navigate('TestConnection');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fleet Management Login</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button
        title={isLoading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={isLoading}
      />
      
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={styles.registerLink}
      >
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={handleTestConnection}
        style={styles.testConnectionButton}
      >
        <Text style={styles.testConnectionText}>Test Connection</Text>
      </TouchableOpacity>
      
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    textAlign: 'center',
    color: '#007bff',
  },
  testConnectionButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  testConnectionText: {
    textAlign: 'center',
    color: '#555',
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});