/**
 * Authentication service - Integrates with backend authentication API
 * Handles user login, logout, session validation, and token management
 */

import apiClient from './apiClient';

/**
 * Authenticate user with PIN
 * @param {string} pin - 4-digit PIN to authenticate
 * @returns {Promise<Object>} Authentication response
 */
export const authenticatePin = async (pin) => {
  try {
    // Validate PIN format
    if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      throw new Error('PIN must be 4 digits');
    }
    
    const response = await apiClient.post('/auth/login', {
      pin: pin
    });
    
    // Store tokens in localStorage
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      sessionStorage.setItem('authToken', response.token);
    }
    
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }
    
    if (response.user) {
      localStorage.setItem('userData', JSON.stringify(response.user));
    }
    
    return {
      success: true,
      sessionToken: response.token,
      refreshToken: response.refreshToken,
      user: response.user,
      expiresIn: response.expiresIn,
      message: response.message || 'Login successful'
    };
  } catch (error) {
    console.error('Authentication Error:', error);
    
    // Handle specific error cases
    if (error.status === 401) {
      throw new Error('The PIN you entered is incorrect');
    }
    
    if (error.status === 403) {
      throw new Error('Account is locked. Please contact customer service.');
    }
    
    if (error.status === 429) {
      throw new Error('Too many login attempts. Please try again later.');
    }
    
    if (error.status >= 500) {
      throw new Error('Authentication service is temporarily unavailable. Please try again later.');
    }
    
    throw new Error(error.message || 'Authentication failed');
  }
};

/**
 * Validates session token with backend
 * @param {string} [token] - Session token to validate (optional, will use stored token if not provided)
 * @returns {Promise<Object>} Validation response
 */
export const validateSession = async (token) => {
  try {
    // Use provided token or get from storage
    const authToken = token || localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
    if (!authToken) {
      return { valid: false, message: 'No authentication token found' };
    }
    
    const response = await apiClient.get('/auth/validate');
    
    return {
      valid: response.valid,
      user: response.user,
      message: 'Session is valid'
    };
  } catch (error) {
    console.error('Session Validation Error:', error);
    
    // Clear invalid tokens
    if (error.status === 401) {
      clearAuthData();
      return { valid: false, message: 'Session expired' };
    }
    
    return { valid: false, message: error.message || 'Session validation failed' };
  }
};

/**
 * Refresh authentication token
 * @returns {Promise<Object>} Refresh response
 */
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await apiClient.post('/auth/refresh', {
      refreshToken: refreshToken
    });
    
    // Update stored tokens
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      sessionStorage.setItem('authToken', response.token);
    }
    
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }
    
    return {
      success: true,
      token: response.token,
      refreshToken: response.refreshToken,
      expiresIn: response.expiresIn
    };
  } catch (error) {
    console.error('Token Refresh Error:', error);
    
    // Clear invalid tokens
    if (error.status === 401) {
      clearAuthData();
    }
    
    throw new Error(error.message || 'Failed to refresh token');
  }
};

/**
 * Logs out user by invalidating session with backend
 * @returns {Promise<Object>} Logout response
 */
export const logout = async () => {
  try {
    // Call backend logout endpoint
    await apiClient.post('/auth/logout');
    
    // Clear all stored authentication data
    clearAuthData();
    
    return {
      success: true,
      message: 'Logout successful'
    };
  } catch (error) {
    console.error('Logout Error:', error);
    
    // Clear local data even if backend call fails
    clearAuthData();
    
    return {
      success: true,
      message: 'Logged out locally'
    };
  }
};

/**
 * Clear all authentication data from storage
 */
const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userData');
  sessionStorage.removeItem('authToken');
};

/**
 * Get current user data from storage
 * @returns {Object|null} User data or null if not found
 */
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

/**
 * Check if user is currently authenticated
 * @returns {boolean} Whether user is authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  return !!token;
};

/**
 * Get current authentication token
 * @returns {string|null} Authentication token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

// Export the clearAuthData function for use by other services
export { clearAuthData };