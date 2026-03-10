/**
 * API Client for NCR ATLEOS ATM Application
 * Handles all HTTP requests to the backend services
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

/**
 * HTTP request wrapper with error handling and authentication
 * @param {string} endpoint - API endpoint path
 * @param {Object} options - Request options (method, body, headers)
 * @returns {Promise<Object>} Response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get auth token from localStorage or sessionStorage
  const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  // Add authorization header if token exists
  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }
  
  const config = {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };
  
  // Convert body to JSON if it's an object
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }
  
  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    // Handle HTTP errors
    if (!response.ok) {
      const error = new Error(data?.error?.message || data?.message || `HTTP ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }
    
    return data;
  } catch (error) {
    // Network or parsing errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server');
    }
    throw error;
  }
};

/**
 * API client methods
 */
const apiClient = {
  // GET request
  get: (endpoint, options = {}) => {
    return apiRequest(endpoint, { method: 'GET', ...options });
  },
  
  // POST request
  post: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      method: 'POST',
      body: data,
      ...options,
    });
  },
  
  // PUT request
  put: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      method: 'PUT',
      body: data,
      ...options,
    });
  },
  
  // DELETE request
  delete: (endpoint, options = {}) => {
    return apiRequest(endpoint, { method: 'DELETE', ...options });
  },
  
  // PATCH request
  patch: (endpoint, data, options = {}) => {
    return apiRequest(endpoint, {
      method: 'PATCH',
      body: data,
      ...options,
    });
  },
};

export default apiClient;
export { API_BASE_URL };