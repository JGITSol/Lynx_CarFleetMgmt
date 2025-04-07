const API_URL = 'http://10.0.2.2:8000/api/';  // For Android emulator
// const API_URL = 'http://localhost:8000/api/';  // For iOS simulator or web

export const fetchWithToken = async (endpoint, options = {}) => {
  const token = await localStorage.getItem('userToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }
  
  const config = {
    ...options,
    headers,
  };
  
  return fetch(`${API_URL}${endpoint}`, config);
};

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, token: data.token, user: data.user };
    } else {
      return { success: false, error: data.non_field_errors?.[0] || 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await fetch(`${API_URL}auth/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        password2: password,
      }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return { success: true, token: data.token, user: data.user };
    } else {
      const errors = Object.values(data).flat().join(' ');
      return { success: false, error: errors || 'Registration failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export const validateToken = async () => {
  try {
    const response = await fetchWithToken('auth/validate-token/');
    
    if (response.ok) {
      const data = await response.json();
      return { success: true, isValid: data.is_valid, user: data.user };
    } else {
      return { success: false, isValid: false, error: 'Invalid token' };
    }
  } catch (error) {
    return { success: false, isValid: false, error: 'Network error' };
  }
};

export const logout = async () => {
  try {
    const response = await fetchWithToken('auth/logout/', {
      method: 'POST'
    });
    
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, error: 'Logout failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export const getUserProfile = async () => {
  try {
    const response = await fetchWithToken('auth/profile/');
    
    if (response.ok) {
      const data = await response.json();
      return { success: true, profile: data };
    } else {
      return { success: false, error: 'Failed to fetch profile' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

// Other API functions can remain the same