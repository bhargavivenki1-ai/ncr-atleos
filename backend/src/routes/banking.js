/**
 * Banking service routes
 * Handles core banking operations including balance inquiries and fund transfers
 */

const express = require('express');
const { catchAsync } = require('../middleware/errorHandler');
const { authenticate } = require('../middleware/auth');
const { 
  validateTransfer, 
  validateAccount,
  validatePagination,
  validateDateRange,
  sanitizeInput 
} = require('../middleware/validation');
const bankingController = require('../controllers/bankingController');

const router = express.Router();

// Apply authentication and sanitization to all routes
router.use(authenticate);
router.use(sanitizeInput);

/**
 * Get user account balances
 * GET /api/banking/accounts/balance
 */
router.get('/accounts/balance',
  catchAsync(bankingController.getAccountBalances)
);

/**
 * Get specific account balance
 * GET /api/banking/accounts/:accountId/balance
 */
router.get('/accounts/:accountId/balance',
  validateAccount,
  catchAsync(bankingController.getAccountBalance)
);

/**
 * Get user accounts list
 * GET /api/banking/accounts
 */
router.get('/accounts',
  catchAsync(bankingController.getUserAccounts)
);

/**
 * Transfer funds between accounts
 * POST /api/banking/transfers
 */
router.post('/transfers',
  validateTransfer,
  catchAsync(bankingController.transferFunds)
);

/**
 * Get transfer history
 * GET /api/banking/transfers
 */
router.get('/transfers',
  validatePagination,
  validateDateRange,
  catchAsync(bankingController.getTransferHistory)
);

/**
 * Get specific transfer details
 * GET /api/banking/transfers/:transferId
 */
router.get('/transfers/:transferId',
  catchAsync(bankingController.getTransferDetails)
);

/**
 * Get account statement
 * GET /api/banking/accounts/:accountId/statement
 */
router.get('/accounts/:accountId/statement',
  validateAccount,
  validateDateRange,
  validatePagination,
  catchAsync(bankingController.getAccountStatement)
);

/**
 * Get account transaction history
 * GET /api/banking/accounts/:accountId/transactions
 */
router.get('/accounts/:accountId/transactions',
  validateAccount,
  validatePagination,
  validateDateRange,
  catchAsync(bankingController.getAccountTransactions)
);

/**
 * Get banking service limits
 * GET /api/banking/limits
 */
router.get('/limits',
  catchAsync(bankingController.getServiceLimits)
);

/**
 * Update daily limits
 * PUT /api/banking/limits
 */
router.put('/limits',
  catchAsync(bankingController.updateServiceLimits)
);

module.exports = router;