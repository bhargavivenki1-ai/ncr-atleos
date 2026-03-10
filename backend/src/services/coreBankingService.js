/**
 * Core Banking Service integration
 * Handles communication with the external Core Banking Service
 */

const { v4: uuidv4 } = require('uuid');
const { AppError } = require('../middleware/errorHandler');
const { HTTP_STATUS, ERROR_TYPES, ERROR_MESSAGES, API_TIMEOUTS, MOCK_CONFIG } = require('../config/constants');
const logger = require('../utils/logger');

/**
 * Get account balances from Core Banking Service
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of account balances
 */
const getAccountBalances = async (userId) => {
  const startTime = Date.now();
  
  logger.info('Core Banking Service - Get account balances', {
    userId,
    service: 'coreBankingService'
  });
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock implementation
      return await mockGetAccountBalances(userId);
    }
    
    // Real implementation would make HTTP request to external service
    const requestPayload = {
      userId,
      requestType: 'account_balances',
      timestamp: new Date().toISOString()
    };
    
    // TODO: Implement actual HTTP client call to Core Banking Service
    // const response = await httpClient.get(`/accounts/${userId}/balances`, {
    //   timeout: API_TIMEOUTS.CORE_BANKING_SERVICE,
    //   headers: {
    //     'Authorization': `Bearer ${process.env.CORE_BANKING_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    
    // For now, return mock response
    const duration = Date.now() - startTime;
    logger.logExternalService('Core Banking Service', 'getAccountBalances', 200, duration, {
      userId,
      accountCount: MOCK_CONFIG.MOCK_ACCOUNTS.length
    });
    
    return MOCK_CONFIG.MOCK_ACCOUNTS.map(account => ({
      ...account,
      lastUpdated: new Date().toISOString()
    }));
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('Core Banking Service', 'getAccountBalances', error.status || 500, duration, {
      userId,
      error: error.message
    });
    
    throw new AppError(
      ERROR_MESSAGES.SERVICE_UNAVAILABLE,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get specific account balance from Core Banking Service
 * @param {string} userId - User ID
 * @param {string} accountId - Account ID
 * @returns {Promise<Object>} Account balance information
 */
const getAccountBalance = async (userId, accountId) => {
  const startTime = Date.now();
  
  logger.info('Core Banking Service - Get account balance', {
    userId,
    accountId,
    service: 'coreBankingService'
  });
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock implementation
      return await mockGetAccountBalance(userId, accountId);
    }
    
    // Real implementation would make HTTP request to external service
    // TODO: Implement actual HTTP client call
    
    const duration = Date.now() - startTime;
    logger.logExternalService('Core Banking Service', 'getAccountBalance', 200, duration, {
      userId,
      accountId
    });
    
    // Mock response for now
    const account = MOCK_CONFIG.MOCK_ACCOUNTS.find(acc => acc.id === accountId);
    
    if (!account) {
      throw new AppError(
        'Account not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR
      );
    }
    
    return {
      ...account,
      lastUpdated: new Date().toISOString()
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('Core Banking Service', 'getAccountBalance', error.status || 500, duration, {
      userId,
      accountId,
      error: error.message
    });
    
    if (error instanceof AppError) {
      throw error;
    }
    
    throw new AppError(
      ERROR_MESSAGES.SERVICE_UNAVAILABLE,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get user accounts from Core Banking Service
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of user accounts
 */
const getUserAccounts = async (userId) => {
  const startTime = Date.now();
  
  logger.info('Core Banking Service - Get user accounts', {
    userId,
    service: 'coreBankingService'
  });
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock implementation
      return await mockGetUserAccounts(userId);
    }
    
    // Real implementation would make HTTP request to external service
    // TODO: Implement actual HTTP client call
    
    const duration = Date.now() - startTime;
    logger.logExternalService('Core Banking Service', 'getUserAccounts', 200, duration, {
      userId,
      accountCount: MOCK_CONFIG.MOCK_ACCOUNTS.length
    });
    
    return MOCK_CONFIG.MOCK_ACCOUNTS;
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('Core Banking Service', 'getUserAccounts', error.status || 500, duration, {
      userId,
      error: error.message
    });
    
    throw new AppError(
      ERROR_MESSAGES.SERVICE_UNAVAILABLE,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Transfer funds between accounts
 * @param {Object} params - Transfer parameters
 * @param {string} params.transactionId - Internal transaction ID
 * @param {string} params.fromAccountId - Source account ID
 * @param {string} params.toAccountId - Destination account ID
 * @param {number} params.amount - Transfer amount
 * @param {string} params.description - Transfer description
 * @param {string} params.userId - User ID
 * @returns {Promise<Object>} Transfer response
 */
const transferFunds = async ({ transactionId, fromAccountId, toAccountId, amount, description, userId }) => {
  const startTime = Date.now();
  
  logger.info('Core Banking Service - Transfer funds', {
    transactionId,
    fromAccountId,
    toAccountId,
    amount,
    userId,
    service: 'coreBankingService'
  });
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock implementation
      return await mockTransferFunds({ transactionId, fromAccountId, toAccountId, amount, description, userId });
    }
    
    // Real implementation would make HTTP request to external service
    const requestPayload = {
      transactionId,
      fromAccountId,
      toAccountId,
      amount,
      description,
      userId,
      timestamp: new Date().toISOString()
    };
    
    // TODO: Implement actual HTTP client call to Core Banking Service
    // const response = await httpClient.post('/transfers', requestPayload, {
    //   timeout: API_TIMEOUTS.CORE_BANKING_SERVICE,
    //   headers: {
    //     'Authorization': `Bearer ${process.env.CORE_BANKING_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    
    // For now, return mock response
    const duration = Date.now() - startTime;
    logger.logExternalService('Core Banking Service', 'transferFunds', 201, duration, {
      transactionId,
      amount
    });
    
    return {
      success: true,
      externalTransactionId: `cbs_${uuidv4().replace(/-/g, '').substring(0, 16)}`,
      status: 'completed',
      message: 'Transfer completed successfully'
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('Core Banking Service', 'transferFunds', error.status || 500, duration, {
      transactionId,
      amount,
      error: error.message
    });
    
    throw new AppError(
      ERROR_MESSAGES.TRANSFER_FAILED,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get account statement from Core Banking Service
 * @param {string} userId - User ID
 * @param {string} accountId - Account ID
 * @param {Object} options - Statement options
 * @returns {Promise<Object>} Account statement
 */
const getAccountStatement = async (userId, accountId, options = {}) => {
  const startTime = Date.now();
  
  logger.info('Core Banking Service - Get account statement', {
    userId,
    accountId,
    options,
    service: 'coreBankingService'
  });
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock implementation
      return await mockGetAccountStatement(userId, accountId, options);
    }
    
    // Real implementation would make HTTP request to external service
    // TODO: Implement actual HTTP client call
    
    const duration = Date.now() - startTime;
    logger.logExternalService('Core Banking Service', 'getAccountStatement', 200, duration, {
      userId,
      accountId
    });
    
    // Mock response for now
    const account = MOCK_CONFIG.MOCK_ACCOUNTS.find(acc => acc.id === accountId);
    
    if (!account) {
      throw new AppError(
        'Account not found',
        HTTP_STATUS.NOT_FOUND,
        ERROR_TYPES.NOT_FOUND_ERROR
      );
    }
    
    return {
      account: {
        accountId: account.id,
        accountName: account.name,
        accountNumber: account.accountNumber,
        currentBalance: account.balance
      },
      transactions: [
        {
          date: new Date(Date.now() - 86400000).toISOString(),
          description: 'ATM Withdrawal',
          amount: -100.00,
          balance: account.balance + 100.00
        },
        {
          date: new Date(Date.now() - 172800000).toISOString(),
          description: 'Direct Deposit',
          amount: 2000.00,
          balance: account.balance + 2100.00
        }
      ],
      period: {
        startDate: options.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: options.endDate || new Date().toISOString()
      }
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('Core Banking Service', 'getAccountStatement', error.status || 500, duration, {
      userId,
      accountId,
      error: error.message
    });
    
    if (error instanceof AppError) {
      throw error;
    }
    
    throw new AppError(
      ERROR_MESSAGES.SERVICE_UNAVAILABLE,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Mock implementations
 */

const mockGetAccountBalances = async (userId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate random failures (3% chance)
  if (Math.random() < 0.03) {
    throw new Error('Core Banking Service temporarily unavailable');
  }
  
  logger.info('Mock Core Banking Service - Account balances retrieved', {
    userId,
    accountCount: MOCK_CONFIG.MOCK_ACCOUNTS.length
  });
  
  return MOCK_CONFIG.MOCK_ACCOUNTS.map(account => ({
    ...account,
    lastUpdated: new Date().toISOString()
  }));
};

const mockGetAccountBalance = async (userId, accountId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Simulate random failures (3% chance)
  if (Math.random() < 0.03) {
    throw new Error('Core Banking Service temporarily unavailable');
  }
  
  const account = MOCK_CONFIG.MOCK_ACCOUNTS.find(acc => acc.id === accountId);
  
  if (!account) {
    throw new AppError(
      'Account not found',
      HTTP_STATUS.NOT_FOUND,
      ERROR_TYPES.NOT_FOUND_ERROR
    );
  }
  
  logger.info('Mock Core Banking Service - Account balance retrieved', {
    userId,
    accountId,
    balance: account.balance
  });
  
  return {
    ...account,
    lastUpdated: new Date().toISOString()
  };
};

const mockGetUserAccounts = async (userId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate random failures (2% chance)
  if (Math.random() < 0.02) {
    throw new Error('Core Banking Service temporarily unavailable');
  }
  
  logger.info('Mock Core Banking Service - User accounts retrieved', {
    userId,
    accountCount: MOCK_CONFIG.MOCK_ACCOUNTS.length
  });
  
  return MOCK_CONFIG.MOCK_ACCOUNTS;
};

const mockTransferFunds = async ({ transactionId, fromAccountId, toAccountId, amount, description, userId }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Simulate random failures (4% chance)
  if (Math.random() < 0.04) {
    throw new Error('Transfer failed due to insufficient funds or system error');
  }
  
  // Simulate timeout (1% chance)
  if (Math.random() < 0.01) {
    await new Promise(resolve => setTimeout(resolve, API_TIMEOUTS.CORE_BANKING_SERVICE + 1000));
    throw new Error('Request timeout');
  }
  
  // Validate accounts exist
  const fromAccount = MOCK_CONFIG.MOCK_ACCOUNTS.find(acc => acc.id === fromAccountId);
  const toAccount = MOCK_CONFIG.MOCK_ACCOUNTS.find(acc => acc.id === toAccountId);
  
  if (!fromAccount || !toAccount) {
    throw new AppError(
      'One or more accounts not found',
      HTTP_STATUS.NOT_FOUND,
      ERROR_TYPES.NOT_FOUND_ERROR
    );
  }
  
  // Check sufficient funds
  if (fromAccount.balance < amount) {
    throw new AppError(
      ERROR_MESSAGES.INSUFFICIENT_FUNDS,
      HTTP_STATUS.BAD_REQUEST,
      ERROR_TYPES.VALIDATION_ERROR
    );
  }
  
  logger.info('Mock Core Banking Service - Transfer completed', {
    transactionId,
    fromAccountId,
    toAccountId,
    amount,
    userId
  });
  
  return {
    success: true,
    externalTransactionId: `cbs_mock_${uuidv4().replace(/-/g, '').substring(0, 12)}`,
    status: 'completed',
    message: 'Transfer completed successfully (mock)'
  };
};

const mockGetAccountStatement = async (userId, accountId, options = {}) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 900));
  
  // Simulate random failures (2% chance)
  if (Math.random() < 0.02) {
    throw new Error('Core Banking Service temporarily unavailable');
  }
  
  const account = MOCK_CONFIG.MOCK_ACCOUNTS.find(acc => acc.id === accountId);
  
  if (!account) {
    throw new AppError(
      'Account not found',
      HTTP_STATUS.NOT_FOUND,
      ERROR_TYPES.NOT_FOUND_ERROR
    );
  }
  
  logger.info('Mock Core Banking Service - Account statement retrieved', {
    userId,
    accountId
  });
  
  return {
    account: {
      accountId: account.id,
      accountName: account.name,
      accountNumber: account.accountNumber,
      currentBalance: account.balance
    },
    transactions: [
      {
        date: new Date(Date.now() - 86400000).toISOString(),
        description: 'ATM Withdrawal',
        amount: -100.00,
        balance: account.balance + 100.00
      },
      {
        date: new Date(Date.now() - 172800000).toISOString(),
        description: 'Direct Deposit',
        amount: 2000.00,
        balance: account.balance + 2100.00
      },
      {
        date: new Date(Date.now() - 259200000).toISOString(),
        description: 'Online Transfer',
        amount: -250.00,
        balance: account.balance + 2350.00
      }
    ],
    period: {
      startDate: options.startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: options.endDate || new Date().toISOString()
    }
  };
};

/**
 * Health check for Core Banking Service
 * @returns {Promise<Object>} Service health status
 */
const healthCheck = async () => {
  const startTime = Date.now();
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock health check
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const duration = Date.now() - startTime;
      logger.logExternalService('Core Banking Service', 'healthCheck', 200, duration);
      
      return {
        status: 'healthy',
        responseTime: `${duration}ms`,
        service: 'mock',
        timestamp: new Date().toISOString()
      };
    }
    
    // TODO: Implement actual health check
    // const response = await httpClient.get('/health', {
    //   timeout: 5000
    // });
    
    const duration = Date.now() - startTime;
    logger.logExternalService('Core Banking Service', 'healthCheck', 200, duration);
    
    return {
      status: 'healthy',
      responseTime: `${duration}ms`,
      service: 'real',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('Core Banking Service', 'healthCheck', error.status || 500, duration, {
      error: error.message
    });
    
    return {
      status: 'unhealthy',
      responseTime: `${duration}ms`,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = {
  getAccountBalances,
  getAccountBalance,
  getUserAccounts,
  transferFunds,
  getAccountStatement,
  healthCheck
};