import React, { useState, useEffect } from '@lynx-js/react';
import { View, Text, Button, StyleSheet, ScrollView } from '@lynx-js/react';

export default function TestConnectionScreen({ navigation }) {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const addResult = (endpoint, success, message) => {
    setTestResults(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        endpoint,
        success,
        message,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };
  
  const testEndpoint = async (endpoint, options = {}) => {
    try {
      setIsLoading(true);
      const response = await fetch(endpoint, options);
      const data = await response.json();
      
      if (response.ok) {
        addResult(endpoint, true, JSON.stringify(data, null, 2));
      } else {
        addResult(endpoint, false, JSON.stringify(data, null, 2));
      }
    } catch (error) {
      addResult(endpoint, false, `Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const testLoginEndpoint = async () => {
    const endpoint = 'http://10.0.2.2:8000/api/auth/login/';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        password: 'wrongpassword',
      }),
    };
    
    await testEndpoint(endpoint, options);
  };
  
  const testRegisterEndpoint = async () => {
    const endpoint = 'http://10.0.2.2:8000/api/auth/register/';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser' + Math.floor(Math.random() * 1000),
        email: 'test' + Math.floor(Math.random() * 1000) + '@example.com',
        password: 'testpassword123',
        password2: 'testpassword123',
      }),
    };
    
    await testEndpoint(endpoint, options);
  };
  
  const testValidateTokenEndpoint = async () => {
    const endpoint = 'http://10.0.2.2:8000/api/auth/validate-token/';
    const options = {
      headers: {
        'Authorization': 'Token invalidtoken',
      },
    };
    
    await testEndpoint(endpoint, options);
  };
  
  const clearResults = () => {
    setTestResults([]);
  };
  
  const renderTestResult = (item) => (
    <View key={item.id} style={[styles.resultItem, item.success ? styles.successResult : styles.errorResult]}>
      <Text style={styles.resultEndpoint}>{item.endpoint}</Text>
      <Text style={styles.resultTimestamp}>{item.timestamp}</Text>
      <Text style={styles.resultStatus}>{item.success ? 'SUCCESS' : 'FAILED'}</Text>
      <Text style={styles.resultMessage}>{item.message}</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Connection Test</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Test Login API"
          onPress={testLoginEndpoint}
          disabled={isLoading}
        />
        <Button
          title="Test Register API"
          onPress={testRegisterEndpoint}
          disabled={isLoading}
        />
        <Button
          title="Test Token Validation"
          onPress={testValidateTokenEndpoint}
          disabled={isLoading}
        />
        <Button
          title="Clear Results"
          onPress={clearResults}
          color="#ff6347"
        />
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          color="#999"
        />
      </View>
      
      <Text style={styles.resultsTitle}>Test Results:</Text>
      
      <ScrollView style={styles.resultsContainer}>
        {testResults.length === 0 ? (
          <Text style={styles.noResultsText}>No tests run yet</Text>
        ) : (
          testResults.map(renderTestResult)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  noResultsText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  resultItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  successResult: {
    backgroundColor: '#e6ffe6',
    borderLeftWidth: 4,
    borderLeftColor: '#00cc00',
  },
  errorResult: {
    backgroundColor: '#ffe6e6',
    borderLeftWidth: 4,
    borderLeftColor: '#cc0000',
  },
  resultEndpoint: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultTimestamp: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  resultStatus: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultMessage: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
});