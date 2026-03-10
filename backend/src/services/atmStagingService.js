/**
 * ATM Staging Service integration
 * Handles communication with the external ATM Staging Service
 */

const { v4: uuidv4 } = require('uuid');
const { AppError } = require('../middleware/errorHandler');
const { HTTP_STATUS, ERROR_TYPES, ERROR_MESSAGES, API_TIMEOUTS, MOCK_CONFIG } = require('../config/constants');
const logger = require('../utils/logger');

/**
 * Stage a withdrawal transaction with ATM Staging Service
 * @param {Object} params - Transaction parameters
 * @param {string} params.transactionId - Internal transaction ID
 * @param {string} params.cardToken - Tokenized card data
 * @param {number} params.amount - Withdrawal amount
 * @param {string} params.userId - User ID
 * @returns {Promise<Object>} Staging response
 */
const stageWithdrawal = async ({ transactionId, cardToken, amount, userId }) => {
  const startTime = Date.now();
  
  logger.info('ATM Staging Service - Withdrawal request', {
    transactionId,
    amount,
    userId,
    service: 'atmStagingService'
  });
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock implementation
      return await mockStageWithdrawal({ transactionId, cardToken, amount, userId });
    }
    
    // Real implementation would make HTTP request to external service
    const requestPayload = {
      transactionType: 'withdrawal',
      transactionId,
      cardToken,
      amount,
      userId,
      timestamp: new Date().toISOString()
    };
    
    // TODO: Implement actual HTTP client call to ATM Staging Service
    // const response = await httpClient.post('/transactions/withdrawal', requestPayload, {
    //   timeout: API_TIMEOUTS.ATM_STAGING_SERVICE,
    //   headers: {
    //     'Authorization': `Bearer ${process.env.ATM_STAGING_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    
    // For now, return mock response
    const duration = Date.now() - startTime;
    logger.logExternalService('ATM Staging Service', 'stageWithdrawal', 201, duration, {
      transactionId,
      amount
    });
    
    return {
      success: true,
      externalTransactionId: `atm_${uuidv4().replace(/-/g, '').substring(0, 16)}`,
      status: 'staged',
      message: 'Withdrawal staged successfully'
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('ATM Staging Service', 'stageWithdrawal', error.status || 500, duration, {
      transactionId,
      amount,
      error: error.message
    });
    
    throw new AppError(
      ERROR_MESSAGES.STAGING_FAILED,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Stage a deposit transaction with ATM Staging Service
 * @param {Object} params - Transaction parameters
 * @param {string} params.transactionId - Internal transaction ID
 * @param {string} params.cardToken - Tokenized card data
 * @param {number} [params.amount] - Deposit amount (optional for deposits)
 * @param {string} params.userId - User ID
 * @returns {Promise<Object>} Staging response
 */
const stageDeposit = async ({ transactionId, cardToken, amount, userId }) => {
  const startTime = Date.now();
  
  logger.info('ATM Staging Service - Deposit request', {
    transactionId,
    amount: amount || 'not specified',
    userId,
    service: 'atmStagingService'
  });
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock implementation
      return await mockStageDeposit({ transactionId, cardToken, amount, userId });
    }
    
    // Real implementation would make HTTP request to external service
    const requestPayload = {
      transactionType: 'deposit',
      transactionId,
      cardToken,
      amount: amount || null,
      userId,
      timestamp: new Date().toISOString()
    };
    
    // TODO: Implement actual HTTP client call to ATM Staging Service
    // const response = await httpClient.post('/transactions/deposit', requestPayload, {
    //   timeout: API_TIMEOUTS.ATM_STAGING_SERVICE,
    //   headers: {
    //     'Authorization': `Bearer ${process.env.ATM_STAGING_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    
    // For now, return mock response
    const duration = Date.now() - startTime;
    logger.logExternalService('ATM Staging Service', 'stageDeposit', 201, duration, {
      transactionId,
      amount: amount || 'not specified'
    });
    
    return {
      success: true,
      externalTransactionId: `atm_${uuidv4().replace(/-/g, '').substring(0, 16)}`,
      status: 'staged',
      message: 'Deposit staged successfully'
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('ATM Staging Service', 'stageDeposit', error.status || 500, duration, {
      transactionId,
      amount: amount || 'not specified',
      error: error.message
    });
    
    throw new AppError(
      ERROR_MESSAGES.STAGING_FAILED,
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get transaction status from ATM Staging Service
 * @param {string} externalTransactionId - External transaction ID
 * @returns {Promise<Object>} Transaction status
 */
const getTransactionStatus = async (externalTransactionId) => {
  const startTime = Date.now();
  
  logger.info('ATM Staging Service - Get transaction status', {
    externalTransactionId,
    service: 'atmStagingService'
  });
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      
      const duration = Date.now() - startTime;
      logger.logExternalService('ATM Staging Service', 'getTransactionStatus', 200, duration, {
        externalTransactionId
      });
      
      return {
        externalTransactionId,
        status: 'completed',
        completedAt: new Date().toISOString(),
        message: 'Transaction completed successfully'
      };
    }
    
    // TODO: Implement actual HTTP client call to ATM Staging Service
    // const response = await httpClient.get(`/transactions/${externalTransactionId}`, {
    //   timeout: API_TIMEOUTS.ATM_STAGING_SERVICE,
    //   headers: {
    //     'Authorization': `Bearer ${process.env.ATM_STAGING_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    
    // For now, return mock response
    const duration = Date.now() - startTime;
    logger.logExternalService('ATM Staging Service', 'getTransactionStatus', 200, duration, {
      externalTransactionId
    });
    
    return {
      externalTransactionId,
      status: 'completed',
      completedAt: new Date().toISOString(),
      message: 'Transaction completed successfully'
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('ATM Staging Service', 'getTransactionStatus', error.status || 500, duration, {
      externalTransactionId,
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
 * Cancel a staged transaction
 * @param {string} externalTransactionId - External transaction ID
 * @returns {Promise<Object>} Cancellation response
 */
const cancelTransaction = async (externalTransactionId) => {
  const startTime = Date.now();
  
  logger.info('ATM Staging Service - Cancel transaction', {
    externalTransactionId,
    service: 'atmStagingService'
  });
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
      
      const duration = Date.now() - startTime;
      logger.logExternalService('ATM Staging Service', 'cancelTransaction', 200, duration, {
        externalTransactionId
      });
      
      return {
        success: true,
        externalTransactionId,
        status: 'cancelled',
        message: 'Transaction cancelled successfully'
      };
    }
    
    // TODO: Implement actual HTTP client call to ATM Staging Service
    // const response = await httpClient.delete(`/transactions/${externalTransactionId}`, {
    //   timeout: API_TIMEOUTS.ATM_STAGING_SERVICE,
    //   headers: {
    //     'Authorization': `Bearer ${process.env.ATM_STAGING_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   }
    // });
    
    // For now, return mock response
    const duration = Date.now() - startTime;
    logger.logExternalService('ATM Staging Service', 'cancelTransaction', 200, duration, {
      externalTransactionId
    });
    
    return {
      success: true,
      externalTransactionId,
      status: 'cancelled',
      message: 'Transaction cancelled successfully'
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('ATM Staging Service', 'cancelTransaction', error.status || 500, duration, {
      externalTransactionId,
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
 * Mock withdrawal staging implementation
 */
const mockStageWithdrawal = async ({ transactionId, cardToken, amount, userId }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate random failures (5% chance)
  if (Math.random() < MOCK_CONFIG.NETWORK_FAILURE_RATE) {
    throw new Error('ATM Staging Service temporarily unavailable');
  }
  
  // Simulate timeout (1% chance)
  if (Math.random() < 0.01) {
    await new Promise(resolve => setTimeout(resolve, API_TIMEOUTS.ATM_STAGING_SERVICE + 1000));
    throw new Error('Request timeout');
  }
  
  logger.info('Mock ATM Staging Service - Withdrawal staged', {
    transactionId,
    amount,
    userId
  });
  
  return {
    success: true,
    externalTransactionId: `atm_mock_${uuidv4().replace(/-/g, '').substring(0, 12)}`,
    status: 'staged',
    message: 'Withdrawal staged successfully (mock)'
  };
};

/**
 * Mock deposit staging implementation
 */
const mockStageDeposit = async ({ transactionId, cardToken, amount, userId }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate random failures (5% chance)
  if (Math.random() < MOCK_CONFIG.NETWORK_FAILURE_RATE) {
    throw new Error('ATM Staging Service temporarily unavailable');
  }
  
  // Simulate timeout (1% chance)
  if (Math.random() < 0.01) {
    await new Promise(resolve => setTimeout(resolve, API_TIMEOUTS.ATM_STAGING_SERVICE + 1000));
    throw new Error('Request timeout');
  }
  
  logger.info('Mock ATM Staging Service - Deposit staged', {
    transactionId,
    amount: amount || 'not specified',
    userId
  });
  
  return {
    success: true,
    externalTransactionId: `atm_mock_${uuidv4().replace(/-/g, '').substring(0, 12)}`,
    status: 'staged',
    message: 'Deposit staged successfully (mock)'
  };
};

/**
 * Health check for ATM Staging Service
 * @returns {Promise<Object>} Service health status
 */
const healthCheck = async () => {
  const startTime = Date.now();
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock health check
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const duration = Date.now() - startTime;
      logger.logExternalService('ATM Staging Service', 'healthCheck', 200, duration);
      
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
    logger.logExternalService('ATM Staging Service', 'healthCheck', 200, duration);
    
    return {
      status: 'healthy',
      responseTime: `${duration}ms`,
      service: 'real',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    const duration = Date.now() - startTime;
    
    logger.logExternalService('ATM Staging Service', 'healthCheck', error.status || 500, duration, {
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
  stageWithdrawal,
  stageDeposit,
  getTransactionStatus,
  cancelTransaction,
  healthCheck
};