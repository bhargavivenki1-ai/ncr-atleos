/**
 * Jest setup file
 * Configures test environment and global test utilities
 */

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.USE_MOCK_SERVICES = 'true';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.MONGODB_TEST_URI = 'mongodb://localhost:27017/ncr-atleos-atm-test';
process.env.LOG_LEVEL = 'error'; // Reduce log noise during tests

// Global test timeout
jest.setTimeout(10000);

// Mock external services
jest.mock('../src/services/atmStagingService');
jest.mock('../src/services/coreBankingService');

// Global test utilities
global.testUtils = {
  // Mock user for testing
  mockUser: {
    id: 'test-user-123',
    name: 'Test User',
    sessionToken: 'mock-session-token'
  },
  
  // Mock request object
  mockRequest: (overrides = {}) => ({
    ip: '127.0.0.1',
    get: jest.fn().mockReturnValue('test-user-agent'),
    user: global.testUtils.mockUser,
    body: {},
    params: {},
    query: {},
    ...overrides
  }),
  
  // Mock response object
  mockResponse: () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis()
    };
    return res;
  },
  
  // Mock next function
  mockNext: () => jest.fn(),
  
  // Wait utility for async tests
  wait: (ms = 100) => new Promise(resolve => setTimeout(resolve, ms))
};

// Suppress console output during tests unless explicitly needed
const originalConsole = { ...console };
beforeEach(() => {
  console.log = jest.fn();
  console.info = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterEach(() => {
  Object.assign(console, originalConsole);
});

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});