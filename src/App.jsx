import React, { useState } from '@lynx-js/react';
import './App.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <view style={{
      flex: 1,
      padding: 200,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {isLoggedIn ? (
        <view style={{
          width: '100%',
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          alignItems: 'center'
        }}>
          <text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 30}}>Welcome to Fleet Management</text>
          <text style={{fontSize: 16, marginBottom: 30}}>You are logged in!</text>
          <view 
            onClick={handleLogout} 
            style={{
              backgroundColor: '#4CAF50',
              padding: 10,
              borderRadius: 5,
              width: '80%',
              alignItems: 'center'
            }}
          >
            <text style={{fontSize:24,color: 'white', fontWeight: 'bold'}}>Logout</text>
          </view>
        </view>
      ) : (
        <view style={{
          width: '100%',
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10
        }}>
          <text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'}}>Fleet Management Login</text>
          <view style={{marginBottom: 20}}>
            <text style={{marginBottom: 5}}>Username</text>
            <input 
              style={{
                width: '100%',
                height: 40,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 5,
                padding: 10,
                marginBottom: 15
              }}
              placeholder="Enter your username" 
            />
            <text style={{marginBottom: 5}}>Password</text>
            <input 
              style={{
                width: '100%',
                height: 40,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 5,
                padding: 10,
                marginBottom: 20
              }}
              placeholder="Enter your password" 
              type="password"
            />
            <view 
              onClick={handleLogin} 
              style={{
                backgroundColor: '#4CAF50',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center'
              }}
            >
              <text style={{color: 'white', fontWeight: 'bold'}}>Login</text>
            </view>
          </view>
        </view>
      )}
    </view>
  );
}

