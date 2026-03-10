import { authenticatePin, validateSession, logout } from '../authService';

// Mock setTimeout for testing
jest.useFakeTimers();

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    // Clear any stored session data
    sessionStorage.clear();
    localStorage.clear();
  });
  
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  
  describe('authenticatePin', () => {
    it('returns success for correct PIN', async () => {
      const promise = authenticatePin('1234');
      
      // Fast-forward time to resolve the promise
      jest.advanceTimersByTime(1000);
      
      const result = await promise;
      
      expect(result.success).toBe(true);
      expect(result.sessionToken).toMatch(/^mock-jwt-token-\d+$/);
      expect(result.user).toEqual({
        id: '12345',
        name: 'John Doe'
      });
    });
    
    it('returns failure for incorrect PIN', async () => {
      const promise = authenticatePin('9999');
      
      jest.advanceTimersByTime(1000);
      
      const result = await promise;
      
      expect(result.success).toBe(false);
      expect(result.reason).toBe('invalid_pin');
      expect(result.message).toBe('The PIN you entered is incorrect');
    });
    
    it('validates PIN format', async () => {
      // Test empty PIN
      let promise = authenticatePin('');
      jest.advanceTimersByTime(1000);
      let result = await promise;
      
      expect(result.success).toBe(false);
      expect(result.reason).toBe('invalid_format');
      expect(result.message).toBe('PIN must be 4 digits');
      
      // Test PIN with wrong length
      promise = authenticatePin('123');
      jest.advanceTimersByTime(1000);
      result = await promise;
      
      expect(result.success).toBe(false);
      expect(result.reason).toBe('invalid_format');
      
      // Test PIN with non-digits
      promise = authenticatePin('12ab');
      jest.advanceTimersByTime(1000);
      result = await promise;
      
      expect(result.success).toBe(false);
      expect(result.reason).toBe('invalid_format');
    });
    
    it('simulates network delay', async () => {
      const startTime = Date.now();
      const promise = authenticatePin('1234');
      
      // Should not resolve immediately
      expect(promise).toBeInstanceOf(Promise);
      
      jest.advanceTimersByTime(500);
      // Promise should still be pending
      
      jest.advanceTimersByTime(500);
      const result = await promise;
      
      expect(result.success).toBe(true);
    });
    
    it('simulates random network failures', async () => {
      // Mock Math.random to always return a value that triggers network error
      const originalRandom = Math.random;
      Math.random = jest.fn(() => 0.01); // Less than 0.05, should trigger error
      
      const promise = authenticatePin('1234');
      jest.advanceTimersByTime(1000);
      
      await expect(promise).rejects.toThrow('Network error');
      
      // Restore original Math.random
      Math.random = originalRandom;
    });
  });
  
  describe('validateSession', () => {
    it('returns false for invalid token', async () => {
      const promise = validateSession('invalid-token');
      jest.advanceTimersByTime(500);
      
      const result = await promise;
      expect(result).toBe(false);
    });
    
    it('returns false for empty token', async () => {
      const promise = validateSession('');
      jest.advanceTimersByTime(500);
      
      const result = await promise;
      expect(result).toBe(false);
    });
    
    it('returns true for valid recent token', async () => {
      const recentTimestamp = Date.now() - 1000; // 1 second ago
      const token = `mock-jwt-token-${recentTimestamp}`;
      
      const promise = validateSession(token);
      jest.advanceTimersByTime(500);
      
      const result = await promise;
      expect(result).toBe(true);
    });
    
    it('returns false for expired token', async () => {
      const oldTimestamp = Date.now() - 3700000; // More than 1 hour ago
      const token = `mock-jwt-token-${oldTimestamp}`;
      
      const promise = validateSession(token);
      jest.advanceTimersByTime(500);
      
      const result = await promise;
      expect(result).toBe(false);
    });
  });
  
  describe('logout', () => {
    it('clears session storage and returns true', async () => {
      // Set some session data
      sessionStorage.setItem('sessionToken', 'test-token');
      localStorage.setItem('sessionToken', 'test-token');
      
      const promise = logout();
      jest.advanceTimersByTime(300);
      
      const result = await promise;
      
      expect(result).toBe(true);
      expect(sessionStorage.getItem('sessionToken')).toBeNull();
      expect(localStorage.getItem('sessionToken')).toBeNull();
    });
    
    it('handles logout when no session data exists', async () => {
      const promise = logout();
      jest.advanceTimersByTime(300);
      
      const result = await promise;
      expect(result).toBe(true);
    });
  });
});