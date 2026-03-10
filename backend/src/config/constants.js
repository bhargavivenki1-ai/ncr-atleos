/**
 * Application constants and configuration values
 */

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Error Types
const ERROR_TYPES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  CONFLICT_ERROR: 'CONFLICT_ERROR',
  SERVICE_ERROR: 'SERVICE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR'
};

// Transaction Types
const TRANSACTION_TYPES = {
  WITHDRAWAL: 'withdrawal',
  DEPOSIT: 'deposit',
  TRANSFER: 'transfer',
  BALANCE_INQUIRY: 'balance_inquiry'
};

// Transaction Status
const TRANSACTION_STATUS = {
  PENDING: 'pending',
  STAGED: 'staged',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  TIMEOUT: 'timeout'
};

// Account Types
const ACCOUNT_TYPES = {
  SAVINGS: 'savings',
  CHECKING: 'checking',
  CREDIT: 'credit',
  LOAN: 'loan'
};

// PIN Validation
const PIN_CONFIG = {
  LENGTH: 4,
  PATTERN: /^\d{4}$/,
  MAX_ATTEMPTS: 3,
  LOCKOUT_DURATION: 30 * 60 * 1000 // 30 minutes in milliseconds
};

// Session Configuration
const SESSION_CONFIG = {
  TIMEOUT: 60 * 60 * 1000, // 1 hour in milliseconds
  REFRESH_THRESHOLD: 15 * 60 * 1000, // 15 minutes in milliseconds
  MAX_CONCURRENT_SESSIONS: 1
};

// API Timeouts
const API_TIMEOUTS = {
  ATM_STAGING_SERVICE: 10000, // 10 seconds
  CORE_BANKING_SERVICE: 15000, // 15 seconds
  VISION_SERVICE: 5000, // 5 seconds
  DEFAULT: 30000 // 30 seconds
};

// Validation Limits
const VALIDATION_LIMITS = {
  MIN_AMOUNT: 0.01,
  MAX_AMOUNT: 10000.00,
  MAX_DAILY_WITHDRAWAL: 1000.00,
  MAX_DAILY_TRANSFER: 5000.00,
  CARD_TOKEN_LENGTH: 64,
  TRANSACTION_ID_LENGTH: 32
};

// Error Messages
const ERROR_MESSAGES = {
  // Authentication
  INVALID_PIN: 'The PIN you entered is incorrect',
  PIN_REQUIRED: 'PIN is required',
  INVALID_PIN_FORMAT: 'PIN must be 4 digits',
  ACCOUNT_LOCKED: 'Account is temporarily locked due to multiple failed attempts',
  SESSION_EXPIRED: 'Your session has expired. Please log in again',
  INVALID_TOKEN: 'Invalid or expired token',
  
  // Transactions
  INVALID_AMOUNT: 'Please enter a valid amount',
  INSUFFICIENT_FUNDS: 'Insufficient funds in your account',
  AMOUNT_REQUIRED: 'Amount is required',
  CARD_DETAILS_REQUIRED: 'Please enter your card details before confirming',
  SAME_ACCOUNT_TRANSFER: 'Cannot transfer to the same account',
  
  // Service Errors
  SERVICE_UNAVAILABLE: 'Service is temporarily unavailable. Please try again later',
  STAGING_FAILED: 'We were unable to stage your transaction at this time. Please try again later',
  TRANSFER_FAILED: 'We were unable to process your transfer at this time. No funds have been moved. Please try again later',
  NETWORK_ERROR: 'Network error occurred. Please check your connection',
  TIMEOUT_ERROR: 'Request timed out. Please try again',
  
  // Validation
  VALIDATION_ERROR: 'Invalid input provided',
  REQUIRED_FIELD: 'This field is required',
  INVALID_FORMAT: 'Invalid format provided',
  
  // General
  INTERNAL_ERROR: 'An internal error occurred. Please try again later',
  NOT_FOUND: 'Requested resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden'
};

// Success Messages
const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  TRANSACTION_STAGED: 'Transaction staged successfully',
  TRANSFER_COMPLETED: 'Transfer completed successfully',
  BALANCE_RETRIEVED: 'Balance retrieved successfully'
};

// Mock Data Configuration
const MOCK_CONFIG = {
  VALID_PIN: process.env.MOCK_PIN || '1234',
  MOCK_USER_ID: 'mock-user-12345',
  MOCK_USER_NAME: 'John Doe',
  MOCK_ACCOUNTS: [
    {
      id: 'acc-savings-001',
      type: 'savings',
      name: 'Savings Account',
      balance: 5000.00,
      accountNumber: '****1234'
    },
    {
      id: 'acc-checking-001',
      type: 'checking',
      name: 'Checking Account',
      balance: 2500.00,
      accountNumber: '****5678'
    }
  ],
  NETWORK_FAILURE_RATE: 0.05 // 5% chance of network failure
};

module.exports = {
  HTTP_STATUS,
  ERROR_TYPES,
  TRANSACTION_TYPES,
  TRANSACTION_STATUS,
  ACCOUNT_TYPES,
  PIN_CONFIG,
  SESSION_CONFIG,
  API_TIMEOUTS,
  VALIDATION_LIMITS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  MOCK_CONFIG
};