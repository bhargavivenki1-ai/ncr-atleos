/**
 * Banking controller
 * Handles core banking operations including balance inquiries and fund transfers
 */

const { v4: uuidv4 } = require('uuid');
const { AppError } = require('../middleware/errorHandler');
const { HTTP_STATUS, ERROR_TYPES, ERROR_MESSAGES, SUCCESS_MESSAGES, TRANSACTION_TYPES, TRANSACTION_STATUS, MOCK_CONFIG, VALIDATION_LIMITS } = require('../config/constants');
const logger = require('../utils/logger');
const Transaction = require('../models/Transaction');
const coreBankingService = require('../services/coreBankingService');

/**
 * Get user account balances
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAccountBalances = async (req, res) => {
  const user = req.user;
  
  logger.info('Account balances request', {
    userId: user.id,
    ip: req.ip
  });
  
  try {
    let accounts;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock account balances
      accounts = MOCK_CONFIG.MOCK_ACCOUNTS.map(account => ({
        ...account,
        lastUpdated: new Date().toISOString()
      }));
    } else {
      // Get account balances from core banking service
      accounts = await coreBankingService.getAccountBalances(user.id);
    }
    
    logger.info('Account balances retrieved', {
      userId: user.id,
      accountCount: accounts.length
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.BALANCE_RETRIEVED,
      accounts
    });
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Get account balances error', {
      error: error.message,
      stack: error.stack,
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
 * Get specific account balance
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAccountBalance = async (req, res) => {
  const { accountId } = req.params;
  const user = req.user;
  
  logger.info('Specific account balance request', {
    userId: user.id,
    accountId,
    ip: req.ip
  });
  
  try {
    let account;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock specific account balance
      account = MOCK_CONFIG.MOCK_ACCOUNTS.find(acc => acc.id === accountId);
      
      if (!account) {
        throw new AppError(
          'Account not found',
          HTTP_STATUS.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR
        );
      }
      
      account = {
        ...account,
        lastUpdated: new Date().toISOString()
      };
    } else {
      // Get specific account balance from core banking service
      account = await coreBankingService.getAccountBalance(user.id, accountId);
    }
    
    logger.info('Account balance retrieved', {
      userId: user.id,
      accountId,
      balance: account.balance
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.BALANCE_RETRIEVED,
      account
    });
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Get account balance error', {
      error: error.message,
      userId: user.id,
      accountId
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get user accounts list
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUserAccounts = async (req, res) => {
  const user = req.user;
  
  logger.info('User accounts request', {
    userId: user.id,
    ip: req.ip
  });
  
  try {
    let accounts;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock user accounts
      accounts = MOCK_CONFIG.MOCK_ACCOUNTS;
    } else {
      // Get user accounts from core banking service
      accounts = await coreBankingService.getUserAccounts(user.id);
    }
    
    logger.info('User accounts retrieved', {
      userId: user.id,
      accountCount: accounts.length
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      accounts
    });
    
  } catch (error) {
    logger.error('Get user accounts error', {
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
 * Transfer funds between accounts
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const transferFunds = async (req, res) => {
  const { fromAccountId, toAccountId, amount, description } = req.body;
  const user = req.user;
  const ipAddress = req.ip;
  const userAgent = req.get('User-Agent');
  
  logger.info('Fund transfer request', {
    userId: user.id,
    fromAccountId,
    toAccountId,
    amount,
    ip: ipAddress
  });
  
  try {
    // Generate transaction ID
    const transactionId = `txn_${uuidv4().replace(/-/g, '').substring(0, 16)}`;
    
    // Create transaction record
    const transactionData = {
      transactionId,
      userId: user.id,
      type: TRANSACTION_TYPES.TRANSFER,
      status: TRANSACTION_STATUS.PENDING,
      amount: parseFloat(amount),
      fromAccount: {
        accountId: fromAccountId
      },
      toAccount: {
        accountId: toAccountId
      },
      description,
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
      // Call core banking service
      const transferResponse = await coreBankingService.transferFunds({
        transactionId,
        fromAccountId,
        toAccountId,
        amount,
        description,
        userId: user.id
      });
      
      // Update transaction status
      const updatedTransactionData = {
        ...transactionData,
        status: TRANSACTION_STATUS.COMPLETED,
        externalReferences: {
          coreBankingServiceId: transferResponse.externalTransactionId
        },
        processingTime: {
          ...transactionData.processingTime,
          completed: new Date()
        }
      };
      
      if (process.env.USE_MOCK_SERVICES !== 'true' && transaction) {
        await transaction.updateStatus(TRANSACTION_STATUS.COMPLETED, 'core_banking_service', {
          externalTransactionId: transferResponse.externalTransactionId
        });
        transaction.externalReferences = updatedTransactionData.externalReferences;
        await transaction.save();
      }
      
      logger.info('Fund transfer completed', {
        transactionId,
        userId: user.id,
        fromAccountId,
        toAccountId,
        amount,
        externalTransactionId: transferResponse.externalTransactionId
      });
      
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: SUCCESS_MESSAGES.TRANSFER_COMPLETED,
        transactionId,
        status: TRANSACTION_STATUS.COMPLETED,
        amount,
        fromAccountId,
        toAccountId,
        externalTransactionId: transferResponse.externalTransactionId,
        completedAt: new Date().toISOString()
      });
      
    } catch (transferError) {
      // Update transaction status to failed
      const errorData = {
        code: transferError.code || 'TRANSFER_FAILED',
        message: transferError.message,
        details: transferError.details || {}
      };
      
      if (process.env.USE_MOCK_SERVICES !== 'true' && transaction) {
        transaction.status = TRANSACTION_STATUS.FAILED;
        transaction.error = errorData;
        transaction.processingTime.failed = new Date();
        await transaction.save();
      }
      
      logger.error('Fund transfer failed', {
        transactionId,
        userId: user.id,
        fromAccountId,
        toAccountId,
        amount,
        error: transferError.message,
        ip: ipAddress
      });
      
      throw new AppError(
        ERROR_MESSAGES.TRANSFER_FAILED,
        HTTP_STATUS.SERVICE_UNAVAILABLE,
        ERROR_TYPES.SERVICE_ERROR
      );
    }
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Transfer funds error', {
      error: error.message,
      stack: error.stack,
      userId: user.id,
      fromAccountId,
      toAccountId,
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
 * Get transfer history
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTransferHistory = async (req, res) => {
  const user = req.user;
  const { page = 1, limit = 20, startDate, endDate } = req.query;
  
  try {
    let transfers;
    let total = 0;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock transfer history
      transfers = [
        {
          transactionId: 'txn_transfer_001',
          type: TRANSACTION_TYPES.TRANSFER,
          status: TRANSACTION_STATUS.COMPLETED,
          amount: 500.00,
          fromAccount: { accountId: 'acc-savings-001', name: 'Savings Account' },
          toAccount: { accountId: 'acc-checking-001', name: 'Checking Account' },
          description: 'Monthly transfer',
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        }
      ];
      total = transfers.length;
    } else {
      // Get transfers from database
      const options = {
        type: TRANSACTION_TYPES.TRANSFER,
        limit: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit)
      };
      
      if (startDate && endDate) {
        options.dateRange = {
          start: new Date(startDate),
          end: new Date(endDate)
        };
      }
      
      transfers = await Transaction.findByUser(user.id, options);
      total = await Transaction.countDocuments({ 
        userId: user.id, 
        type: TRANSACTION_TYPES.TRANSFER 
      });
    }
    
    logger.info('Transfer history retrieved', {
      userId: user.id,
      count: transfers.length,
      page,
      limit
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      transfers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
    
  } catch (error) {
    logger.error('Get transfer history error', {
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
 * Get specific transfer details
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getTransferDetails = async (req, res) => {
  const { transferId } = req.params;
  const user = req.user;
  
  try {
    let transfer;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock transfer details
      transfer = {
        transactionId: transferId,
        userId: user.id,
        type: TRANSACTION_TYPES.TRANSFER,
        status: TRANSACTION_STATUS.COMPLETED,
        amount: 500.00,
        fromAccount: { 
          accountId: 'acc-savings-001', 
          name: 'Savings Account',
          accountNumber: '****1234'
        },
        toAccount: { 
          accountId: 'acc-checking-001', 
          name: 'Checking Account',
          accountNumber: '****5678'
        },
        description: 'Monthly transfer',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      };
    } else {
      // Get transfer from database
      transfer = await Transaction.findOne({
        transactionId: transferId,
        userId: user.id,
        type: TRANSACTION_TYPES.TRANSFER
      });
      
      if (!transfer) {
        throw new AppError(
          'Transfer not found',
          HTTP_STATUS.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR
        );
      }
    }
    
    logger.info('Transfer details retrieved', {
      transferId,
      userId: user.id
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      transfer
    });
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Get transfer details error', {
      error: error.message,
      transferId,
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
 * Get account statement
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAccountStatement = async (req, res) => {
  const { accountId } = req.params;
  const user = req.user;
  const { page = 1, limit = 50, startDate, endDate } = req.query;
  
  try {
    let statement;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock account statement
      const account = MOCK_CONFIG.MOCK_ACCOUNTS.find(acc => acc.id === accountId);
      
      if (!account) {
        throw new AppError(
          'Account not found',
          HTTP_STATUS.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR
        );
      }
      
      statement = {
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
          startDate: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: endDate || new Date().toISOString()
        }
      };
    } else {
      // Get account statement from core banking service
      statement = await coreBankingService.getAccountStatement(user.id, accountId, {
        startDate,
        endDate,
        page: parseInt(page),
        limit: parseInt(limit)
      });
    }
    
    logger.info('Account statement retrieved', {
      userId: user.id,
      accountId,
      transactionCount: statement.transactions?.length || 0
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      statement
    });
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Get account statement error', {
      error: error.message,
      userId: user.id,
      accountId
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get account transactions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAccountTransactions = async (req, res) => {
  const { accountId } = req.params;
  const user = req.user;
  const { page = 1, limit = 20, startDate, endDate } = req.query;
  
  try {
    let transactions;
    let total = 0;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock account transactions
      transactions = [
        {
          transactionId: 'txn_acc_001',
          type: TRANSACTION_TYPES.WITHDRAWAL,
          status: TRANSACTION_STATUS.COMPLETED,
          amount: -100.00,
          description: 'ATM Withdrawal',
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      total = transactions.length;
    } else {
      // Get transactions from database
      const query = {
        userId: user.id,
        $or: [
          { 'fromAccount.accountId': accountId },
          { 'toAccount.accountId': accountId }
        ]
      };
      
      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        };
      }
      
      transactions = await Transaction.find(query)
        .sort({ createdAt: -1 })
        .limit(parseInt(limit))
        .skip((parseInt(page) - 1) * parseInt(limit));
        
      total = await Transaction.countDocuments(query);
    }
    
    logger.info('Account transactions retrieved', {
      userId: user.id,
      accountId,
      count: transactions.length
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
    logger.error('Get account transactions error', {
      error: error.message,
      userId: user.id,
      accountId
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * Get service limits
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getServiceLimits = async (req, res) => {
  const user = req.user;
  
  try {
    const limits = {
      daily: {
        withdrawal: VALIDATION_LIMITS.MAX_DAILY_WITHDRAWAL,
        transfer: VALIDATION_LIMITS.MAX_DAILY_TRANSFER
      },
      transaction: {
        minAmount: VALIDATION_LIMITS.MIN_AMOUNT,
        maxAmount: VALIDATION_LIMITS.MAX_AMOUNT
      },
      user: {
        dailyWithdrawalUsed: 0,
        dailyTransferUsed: 0,
        lastReset: new Date().toISOString().split('T')[0] // Today's date
      }
    };
    
    // TODO: Get actual usage from database or external service
    
    logger.info('Service limits retrieved', {
      userId: user.id
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      limits
    });
    
  } catch (error) {
    logger.error('Get service limits error', {
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
 * Update service limits
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateServiceLimits = async (req, res) => {
  const user = req.user;
  const { dailyWithdrawal, dailyTransfer } = req.body;
  
  try {
    // Validate limits
    if (dailyWithdrawal && (dailyWithdrawal < 0 || dailyWithdrawal > 10000)) {
      throw new AppError(
        'Daily withdrawal limit must be between 0 and 10000',
        HTTP_STATUS.BAD_REQUEST,
        ERROR_TYPES.VALIDATION_ERROR
      );
    }
    
    if (dailyTransfer && (dailyTransfer < 0 || dailyTransfer > 50000)) {
      throw new AppError(
        'Daily transfer limit must be between 0 and 50000',
        HTTP_STATUS.BAD_REQUEST,
        ERROR_TYPES.VALIDATION_ERROR
      );
    }
    
    // TODO: Update limits in database or external service
    
    const updatedLimits = {
      dailyWithdrawal: dailyWithdrawal || VALIDATION_LIMITS.MAX_DAILY_WITHDRAWAL,
      dailyTransfer: dailyTransfer || VALIDATION_LIMITS.MAX_DAILY_TRANSFER,
      updatedAt: new Date().toISOString()
    };
    
    logger.info('Service limits updated', {
      userId: user.id,
      limits: updatedLimits
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Service limits updated successfully',
      limits: updatedLimits
    });
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Update service limits error', {
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

module.exports = {
  getAccountBalances,
  getAccountBalance,
  getUserAccounts,
  transferFunds,
  getTransferHistory,
  getTransferDetails,
  getAccountStatement,
  getAccountTransactions,
  getServiceLimits,
  updateServiceLimits
};