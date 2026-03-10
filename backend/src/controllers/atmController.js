/**
 * ATM controller
 * Handles ATM transaction operations including withdrawals, deposits, and staging
 */

const { v4: uuidv4 } = require('uuid');
const { AppError } = require('../middleware/errorHandler');
const { HTTP_STATUS, ERROR_TYPES, ERROR_MESSAGES, SUCCESS_MESSAGES, TRANSACTION_TYPES, TRANSACTION_STATUS, MOCK_CONFIG, API_TIMEOUTS } = require('../config/constants');
const logger = require('../utils/logger');
const Transaction = require('../models/Transaction');
const atmStagingService = require('../services/atmStagingService');

/**
 * Stage a cash withdrawal transaction
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const stageWithdrawal = async (req, res) => {
  const { cardToken, amount } = req.body;
  const user = req.user;
  const ipAddress = req.ip;
  const userAgent = req.get('User-Agent');
  
  logger.info('Withdrawal staging request', {
    userId: user.id,
    amount,
    ip: ipAddress,
    userAgent
  });
  
  try {
    // Generate transaction ID
    const transactionId = `txn_${uuidv4().replace(/-/g, '').substring(0, 16)}`;
    
    // Create transaction record
    const transactionData = {
      transactionId,
      userId: user.id,
      type: TRANSACTION_TYPES.WITHDRAWAL,
      status: TRANSACTION_STATUS.PENDING,
      amount: parseFloat(amount),
      cardToken,
      processingTime: {
        initiated: new Date()
      },
      metadata: {
        ipAddress,
        userAgent,
        sessionId: user.sessionToken || 'unknown',
        channel: 'mobile_app'
      }
    };
    
    let transaction;
    
    if (process.env.USE_MOCK_SERVICES !== 'true') {
      // Create transaction in database
      transaction = new Transaction(transactionData);
      await transaction.save();
    }
    
    try {
      // Call ATM staging service
      const stagingResponse = await atmStagingService.stageWithdrawal({
        transactionId,
        cardToken,
        amount,
        userId: user.id
      });
      
      // Update transaction status
      const updatedTransactionData = {
        ...transactionData,
        status: TRANSACTION_STATUS.STAGED,
        externalReferences: {
          atmStagingServiceId: stagingResponse.externalTransactionId
        },
        processingTime: {
          ...transactionData.processingTime,
          staged: new Date()
        }
      };
      
      if (process.env.USE_MOCK_SERVICES !== 'true' && transaction) {
        await transaction.updateStatus(TRANSACTION_STATUS.STAGED, 'atm_staging_service', {
          externalTransactionId: stagingResponse.externalTransactionId
        });
        transaction.externalReferences = updatedTransactionData.externalReferences;
        await transaction.save();
      }
      
      logger.info('Withdrawal staged successfully', {
        transactionId,
        userId: user.id,
        amount,
        externalTransactionId: stagingResponse.externalTransactionId
      });
      
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.TRANSACTION_STAGED,
        transactionId,
        status: TRANSACTION_STATUS.STAGED,
        amount,
        externalTransactionId: stagingResponse.externalTransactionId,
        estimatedCompletionTime: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
      });
      
    } catch (stagingError) {
      // Update transaction status to failed
      const errorData = {
        code: stagingError.code || 'STAGING_FAILED',
        message: stagingError.message,
        details: stagingError.details || {}
      };
      
      if (process.env.USE_MOCK_SERVICES !== 'true' && transaction) {
        transaction.status = TRANSACTION_STATUS.FAILED;
        transaction.error = errorData;
        transaction.processingTime.failed = new Date();
        await transaction.save();
      }
      
      logger.error('Withdrawal staging failed', {
        transactionId,
        userId: user.id,
        amount,
        error: stagingError.message,
        ip: ipAddress
      });
      
      throw new AppError(
        ERROR_MESSAGES.STAGING_FAILED,
        HTTP_STATUS.SERVICE_UNAVAILABLE,
        ERROR_TYPES.SERVICE_ERROR
      );
    }
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Withdrawal staging error', {
      error: error.message,
      stack: error.stack,
      userId: user.id,
      amount,
      ip: ipAddress
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Stage a cash deposit transaction
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const stageDeposit = async (req, res) => {
  const { cardToken, amount } = req.body;
  const user = req.user;
  const ipAddress = req.ip;
  const userAgent = req.get('User-Agent');
  
  logger.info('Deposit staging request', {
    userId: user.id,
    amount: amount || 'not specified',
    ip: ipAddress,
    userAgent
  });
  
  try {
    // Generate transaction ID
    const transactionId = `txn_${uuidv4().replace(/-/g, '').substring(0, 16)}`;
    
    // Create transaction record
    const transactionData = {
      transactionId,
      userId: user.id,
      type: TRANSACTION_TYPES.DEPOSIT,
      status: TRANSACTION_STATUS.PENDING,
      amount: amount ? parseFloat(amount) : undefined,
      cardToken,
      processingTime: {
        initiated: new Date()
      },
      metadata: {
        ipAddress,
        userAgent,
        sessionId: user.sessionToken || 'unknown',
        channel: 'mobile_app'
      }
    };
    
    let transaction;
    
    if (process.env.USE_MOCK_SERVICES !== 'true') {
      // Create transaction in database
      transaction = new Transaction(transactionData);
      await transaction.save();
    }
    
    try {
      // Call ATM staging service
      const stagingResponse = await atmStagingService.stageDeposit({
        transactionId,
        cardToken,
        amount,
        userId: user.id
      });
      
      // Update transaction status
      const updatedTransactionData = {
        ...transactionData,
        status: TRANSACTION_STATUS.STAGED,
        externalReferences: {
          atmStagingServiceId: stagingResponse.externalTransactionId
        },
        processingTime: {
          ...transactionData.processingTime,
          staged: new Date()
        }
      };
      
      if (process.env.USE_MOCK_SERVICES !== 'true' && transaction) {
        await transaction.updateStatus(TRANSACTION_STATUS.STAGED, 'atm_staging_service', {
          externalTransactionId: stagingResponse.externalTransactionId
        });
        transaction.externalReferences = updatedTransactionData.externalReferences;
        await transaction.save();
      }
      
      logger.info('Deposit staged successfully', {
        transactionId,
        userId: user.id,
        amount: amount || 'not specified',
        externalTransactionId: stagingResponse.externalTransactionId
      });
      
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.TRANSACTION_STAGED,
        transactionId,
        status: TRANSACTION_STATUS.STAGED,
        amount: amount || null,
        externalTransactionId: stagingResponse.externalTransactionId,
        estimatedCompletionTime: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 minutes
      });
      
    } catch (stagingError) {
      // Update transaction status to failed
      const errorData = {
        code: stagingError.code || 'STAGING_FAILED',
        message: stagingError.message,
        details: stagingError.details || {}
      };
      
      if (process.env.USE_MOCK_SERVICES !== 'true' && transaction) {
        transaction.status = TRANSACTION_STATUS.FAILED;
        transaction.error = errorData;
        transaction.processingTime.failed = new Date();
        await transaction.save();
      }
      
      logger.error('Deposit staging failed', {
        transactionId,
        userId: user.id,
        amount: amount || 'not specified',
        error: stagingError.message,
        ip: ipAddress
      });
      
      throw new AppError(
        ERROR_MESSAGES.STAGING_FAILED,
        HTTP_STATUS.SERVICE_UNAVAILABLE,
        ERROR_TYPES.SERVICE_ERROR
      );
    }
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Deposit staging error', {
      error: error.message,
      stack: error.stack,
      userId: user.id,
      amount: amount || 'not specified',
      ip: ipAddress
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get transaction status by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTransactionStatus = async (req, res) => {
  const { transactionId } = req.params;
  const user = req.user;
  
  try {
    let transaction;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock transaction status
      transaction = {
        transactionId,
        userId: user.id,
        type: TRANSACTION_TYPES.WITHDRAWAL,
        status: TRANSACTION_STATUS.STAGED,
        amount: 100.00,
        createdAt: new Date().toISOString(),
        processingTime: {
          initiated: new Date(Date.now() - 60000).toISOString(),
          staged: new Date().toISOString()
        }
      };
    } else {
      // Get transaction from database
      transaction = await Transaction.findOne({
        transactionId,
        userId: user.id
      });
      
      if (!transaction) {
        throw new AppError(
          'Transaction not found',
          HTTP_STATUS.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR
        );
      }
    }
    
    logger.info('Transaction status retrieved', {
      transactionId,
      userId: user.id,
      status: transaction.status
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      transaction
    });
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Get transaction status error', {
      error: error.message,
      transactionId,
      userId: user.id
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get user transaction history
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTransactionHistory = async (req, res) => {
  const user = req.user;
  const { page = 1, limit = 20, type, status, startDate, endDate } = req.query;
  
  try {
    let transactions;
    let total = 0;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock transaction history
      transactions = [
        {
          transactionId: 'txn_mock_001',
          type: TRANSACTION_TYPES.WITHDRAWAL,
          status: TRANSACTION_STATUS.COMPLETED,
          amount: 100.00,
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          transactionId: 'txn_mock_002',
          type: TRANSACTION_TYPES.DEPOSIT,
          status: TRANSACTION_STATUS.STAGED,
          amount: 200.00,
          createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        }
      ];
      total = transactions.length;
    } else {
      // Get transactions from database
      const options = {
        type,
        status,
        limit: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit)
      };
      
      if (startDate && endDate) {
        options.dateRange = {
          start: new Date(startDate),
          end: new Date(endDate)
        };
      }
      
      transactions = await Transaction.findByUser(user.id, options);
      total = await Transaction.countDocuments({ userId: user.id });
    }
    
    logger.info('Transaction history retrieved', {
      userId: user.id,
      count: transactions.length,
      page,
      limit
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      transactions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
    
  } catch (error) {
    logger.error('Get transaction history error', {
      error: error.message,
      userId: user.id
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Cancel a pending transaction
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const cancelTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const user = req.user;
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock transaction cancellation
      logger.info('Transaction cancelled (mock)', {
        transactionId,
        userId: user.id
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Transaction cancelled successfully',
        transactionId,
        status: TRANSACTION_STATUS.CANCELLED
      });
    } else {
      // Cancel transaction in database
      const transaction = await Transaction.findOne({
        transactionId,
        userId: user.id,
        status: { $in: [TRANSACTION_STATUS.PENDING, TRANSACTION_STATUS.STAGED] }
      });
      
      if (!transaction) {
        throw new AppError(
          'Transaction not found or cannot be cancelled',
          HTTP_STATUS.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR
        );
      }
      
      await transaction.updateStatus(TRANSACTION_STATUS.CANCELLED, user.id);
      
      logger.info('Transaction cancelled', {
        transactionId,
        userId: user.id
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Transaction cancelled successfully',
        transactionId,
        status: TRANSACTION_STATUS.CANCELLED
      });
    }
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Cancel transaction error', {
      error: error.message,
      transactionId,
      userId: user.id
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Retry a failed transaction
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const retryTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const user = req.user;
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock transaction retry
      logger.info('Transaction retry (mock)', {
        transactionId,
        userId: user.id
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Transaction retry initiated',
        transactionId,
        status: TRANSACTION_STATUS.PENDING
      });
    } else {
      // Retry transaction in database
      const transaction = await Transaction.findOne({
        transactionId,
        userId: user.id,
        status: TRANSACTION_STATUS.FAILED
      });
      
      if (!transaction) {
        throw new AppError(
          'Transaction not found or cannot be retried',
          HTTP_STATUS.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR
        );
      }
      
      if (transaction.hasMaxRetriesReached()) {
        throw new AppError(
          'Maximum retry attempts reached',
          HTTP_STATUS.BAD_REQUEST,
          ERROR_TYPES.VALIDATION_ERROR
        );
      }
      
      await transaction.incrementRetry();
      await transaction.updateStatus(TRANSACTION_STATUS.PENDING, user.id);
      
      logger.info('Transaction retry initiated', {
        transactionId,
        userId: user.id,
        retryAttempt: transaction.retryInfo.attempts
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Transaction retry initiated',
        transactionId,
        status: TRANSACTION_STATUS.PENDING,
        retryAttempt: transaction.retryInfo.attempts
      });
    }
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Retry transaction error', {
      error: error.message,
      transactionId,
      userId: user.id
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get transaction statistics
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTransactionStatistics = async (req, res) => {
  const user = req.user;
  const { startDate, endDate } = req.query;
  
  try {
    let statistics;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock statistics
      statistics = {
        totalTransactions: 15,
        successfulTransactions: 13,
        failedTransactions: 2,
        totalAmount: 1500.00,
        averageAmount: 100.00,
        transactionTypes: {
          withdrawal: { count: 8, totalAmount: 800.00 },
          deposit: { count: 5, totalAmount: 500.00 },
          transfer: { count: 2, totalAmount: 200.00 }
        }
      };
    } else {
      // Get statistics from database
      const dateRange = startDate && endDate ? {
        start: new Date(startDate),
        end: new Date(endDate)
      } : null;
      
      statistics = await Transaction.getStatistics(user.id, dateRange);
    }
    
    logger.info('Transaction statistics retrieved', {
      userId: user.id,
      dateRange: { startDate, endDate }
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      statistics
    });
    
  } catch (error) {
    logger.error('Get transaction statistics error', {
      error: error.message,
      userId: user.id
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Simulate card scanning (for testing)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const simulateCardScan = async (req, res) => {
  const user = req.user;
  
  try {
    // Simulate card scan delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock card token
    const cardToken = `tok_${uuidv4().replace(/-/g, '').substring(0, 32)}`;
    
    logger.info('Card scan simulated', {
      userId: user.id,
      cardToken: cardToken.substring(0, 8) + '****'
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Card scanned successfully',
      cardToken,
      cardDetails: {
        maskedNumber: '**** **** **** 1234',
        type: 'DEBIT',
        bank: 'NCR Bank'
      }
    });
    
  } catch (error) {
    logger.error('Card scan simulation error', {
      error: error.message,
      userId: user.id
    });
    
    throw new AppError(
      'Card scan failed. Please try again in a well-lit area or enter details manually.',
      HTTP_STATUS.BAD_REQUEST,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get ATM service status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getServiceStatus = async (req, res) => {
  try {
    const serviceStatus = {
      atmStagingService: {
        status: process.env.USE_MOCK_SERVICES === 'true' ? 'mock' : 'unknown',
        responseTime: '< 100ms',
        lastChecked: new Date().toISOString()
      },
      visionService: {
        status: process.env.USE_MOCK_SERVICES === 'true' ? 'mock' : 'unknown',
        responseTime: '< 200ms',
        lastChecked: new Date().toISOString()
      },
      database: {
        status: 'connected',
        responseTime: '< 50ms',
        lastChecked: new Date().toISOString()
      }
    };
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      services: serviceStatus,
      overall: 'healthy'
    });
    
  } catch (error) {
    logger.error('Get service status error', {
      error: error.message
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

module.exports = {
  stageWithdrawal,
  stageDeposit,
  getTransactionStatus,
  getTransactionHistory,
  cancelTransaction,
  retryTransaction,
  getTransactionStatistics,
  simulateCardScan,
  getServiceStatus
};