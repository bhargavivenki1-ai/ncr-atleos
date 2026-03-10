/**
 * Services Index - Central export for all API services
 * Provides a single import point for all service modules
 */

// Import all services
import * as authService from './authService';
import * as atmService from './atmService';
import * as bankingService from './bankingService';
import apiClient from './apiClient';

// Re-export all services
export {
  authService,
  atmService,
  bankingService,
  apiClient,
};

// Export individual service functions for convenience
export {
  // Auth service
  authenticatePin,
  validateSession,
  logout,
  refreshToken,
  getCurrentUser,
  isAuthenticated,
  getAuthToken,
} from './authService';

export {
  // ATM service
  stageWithdrawal,
  stageDeposit,
  simulateCardScan,
} from './atmService';

export {
  // Banking service
  getAccountBalances,
  getUserAccounts,
  transferFunds,
  formatCurrency,
} from './bankingService';

// Default export with all services grouped
const services = {
  auth: authService,
  atm: atmService,
  banking: bankingService,
  client: apiClient,
};

export default services;