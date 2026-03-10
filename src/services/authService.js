/**
 * Authentication service with mock implementation
 * In production, this would connect to real authentication APIs
 */

// Mock PIN for testing - in production this would be handled by backend
const MOCK_VALID_PIN = '1234';

/**
 * Simulates PIN authentication with backend service
 * @param {string} pin - 4-digit PIN to authenticate
 * @returns {Promise<Object>} Authentication response
 */
export const authenticatePin = async (pin) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate random network failures (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Network error');
  }
  
  // Validate PIN format
  if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    return {
      success: false,
      reason: 'invalid_format',
      message: 'PIN must be 4 digits'
    };
  }
  
  // Check if PIN is correct
  if (pin === MOCK_VALID_PIN) {
    return {
      success: true,
      sessionToken: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '12345',
        name: 'John Doe'
      }
    };
  } else {
    return {
      success: false,
      reason: 'invalid_pin',
      message: 'The PIN you entered is incorrect'
    };
  }
};

/**
 * Validates session token
 * @param {string} token - Session token to validate
 * @returns {Promise<boolean>} Whether token is valid
 */
export const validateSession = async (token) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple mock validation - check if token exists and is recent
  if (!token || !token.startsWith('mock-jwt-token-')) {
    return false;
  }
  
  const timestamp = parseInt(token.split('-').pop());
  const now = Date.now();
  const tokenAge = now - timestamp;
  
  // Token expires after 1 hour (3600000 ms)
  return tokenAge < 3600000;
};

/**
 * Logs out user by invalidating session
 * @returns {Promise<boolean>} Success status
 */
export const logout = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Clear any stored session data
  sessionStorage.removeItem('sessionToken');
  localStorage.removeItem('sessionToken');
  
  return true;
};