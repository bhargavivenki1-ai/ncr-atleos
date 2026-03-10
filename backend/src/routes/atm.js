/**
 * ATM service routes
 * Handles ATM transactions including withdrawals, deposits, and staging
 */

const express = require('express');
const { catchAsync } = require('../middleware/errorHandler');
const { authenticate } = require('../middleware/auth');
const { 
  validateWithdrawal, 
  validateDeposit, 
  validateTransactionId,
  validatePagination,
  validateDateRange,
  sanitizeInput 
} = require('../middleware/validation');
const atmController = require('../controllers/atmController');

const router = express.Router();

// Apply authentication and sanitization to all routes
router.use(authenticate);
router.use(sanitizeInput);

/**
 * Stage a cash withdrawal transaction
 * POST /api/atm/transactions/withdrawal
 */
router.post('/transactions/withdrawal',
  validateWithdrawal,
  catchAsync(atmController.stageWithdrawal)
);

/**
 * Stage a cash deposit transaction
 * POST /api/atm/transactions/deposit
 */
router.post('/transactions/deposit',
  validateDeposit,
  catchAsync(atmController.stageDeposit)
);

/**
 * Get transaction status by ID
 * GET /api/atm/transactions/:transactionId
 */
router.get('/transactions/:transactionId',
  validateTransactionId,
  catchAsync(atmController.getTransactionStatus)
);

/**
 * Get user transaction history
 * GET /api/atm/transactions
 */
router.get('/transactions',
  validatePagination,
  validateDateRange,
  catchAsync(atmController.getTransactionHistory)
);

/**
 * Cancel a pending transaction
 * DELETE /api/atm/transactions/:transactionId
 */
router.delete('/transactions/:transactionId',
  validateTransactionId,
  catchAsync(atmController.cancelTransaction)
);

/**
 * Retry a failed transaction
 * POST /api/atm/transactions/:transactionId/retry
 */
router.post('/transactions/:transactionId/retry',
  validateTransactionId,
  catchAsync(atmController.retryTransaction)
);

/**
 * Get transaction statistics
 * GET /api/atm/statistics
 */
router.get('/statistics',
  validateDateRange,
  catchAsync(atmController.getTransactionStatistics)
);

/**
 * Simulate card scanning (for testing)
 * POST /api/atm/scan-card
 */
router.post('/scan-card',
  catchAsync(atmController.simulateCardScan)
);

/**
 * Get ATM service status
 * GET /api/atm/status
 */
router.get('/status',
  catchAsync(atmController.getServiceStatus)
);

module.exports = router;