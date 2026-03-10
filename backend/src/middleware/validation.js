/**
 * Input validation middleware using express-validator
 * Provides comprehensive validation for all API endpoints
 */

const { body, param, query, validationResult } = require('express-validator');
const { AppError } = require('./errorHandler');
const { HTTP_STATUS, ERROR_TYPES, PIN_CONFIG, VALIDATION_LIMITS } = require('../config/constants');
const logger = require('../utils/logger');

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value
    }));
    
    logger.warn('Validation failed', {
      url: req.originalUrl,
      method: req.method,
      errors: errorMessages,
      ip: req.ip
    });
    
    return next(new AppError(
      'Invalid input provided',
      HTTP_STATUS.BAD_REQUEST,
      ERROR_TYPES.VALIDATION_ERROR
    ));
  }
  
  next();
};

/**
 * PIN validation rules
 */
const validatePin = [
  body('pin')
    .notEmpty()
    .withMessage('PIN is required')
    .isLength({ min: PIN_CONFIG.LENGTH, max: PIN_CONFIG.LENGTH })
    .withMessage(`PIN must be exactly ${PIN_CONFIG.LENGTH} digits`)
    .matches(PIN_CONFIG.PATTERN)
    .withMessage('PIN must contain only digits'),
  handleValidationErrors
];

/**
 * Amount validation rules
 */
const validateAmount = [
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: VALIDATION_LIMITS.MIN_AMOUNT, max: VALIDATION_LIMITS.MAX_AMOUNT })
    .withMessage(`Amount must be between ${VALIDATION_LIMITS.MIN_AMOUNT} and ${VALIDATION_LIMITS.MAX_AMOUNT}`)
    .custom((value) => {
      // Check for reasonable decimal places (max 2)
      const decimalPlaces = (value.toString().split('.')[1] || '').length;
      if (decimalPlaces > 2) {
        throw new Error('Amount cannot have more than 2 decimal places');
      }
      return true;
    }),
  handleValidationErrors
];

/**
 * Card token validation rules
 */
const validateCardToken = [
  body('cardToken')
    .notEmpty()
    .withMessage('Card token is required')
    .isLength({ min: 10, max: VALIDATION_LIMITS.CARD_TOKEN_LENGTH })
    .withMessage('Invalid card token format')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Card token contains invalid characters'),
  handleValidationErrors
];

/**
 * Transaction ID validation rules
 */
const validateTransactionId = [
  param('transactionId')
    .notEmpty()
    .withMessage('Transaction ID is required')
    .isLength({ min: 10, max: VALIDATION_LIMITS.TRANSACTION_ID_LENGTH })
    .withMessage('Invalid transaction ID format')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Transaction ID contains invalid characters'),
  handleValidationErrors
];

/**
 * Account validation rules
 */
const validateAccount = [
  body('accountId')
    .notEmpty()
    .withMessage('Account ID is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('Invalid account ID format')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Account ID contains invalid characters'),
  handleValidationErrors
];

/**
 * Transfer validation rules
 */
const validateTransfer = [
  body('fromAccountId')
    .notEmpty()
    .withMessage('From account ID is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('Invalid from account ID format'),
  body('toAccountId')
    .notEmpty()
    .withMessage('To account ID is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('Invalid to account ID format')
    .custom((value, { req }) => {
      if (value === req.body.fromAccountId) {
        throw new Error('Cannot transfer to the same account');
      }
      return true;
    }),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: VALIDATION_LIMITS.MIN_AMOUNT, max: VALIDATION_LIMITS.MAX_DAILY_TRANSFER })
    .withMessage(`Transfer amount must be between ${VALIDATION_LIMITS.MIN_AMOUNT} and ${VALIDATION_LIMITS.MAX_DAILY_TRANSFER}`),
  body('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Description cannot exceed 255 characters')
    .trim()
    .escape(),
  handleValidationErrors
];

/**
 * Withdrawal validation rules
 */
const validateWithdrawal = [
  ...validateCardToken,
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: VALIDATION_LIMITS.MIN_AMOUNT, max: VALIDATION_LIMITS.MAX_DAILY_WITHDRAWAL })
    .withMessage(`Withdrawal amount must be between ${VALIDATION_LIMITS.MIN_AMOUNT} and ${VALIDATION_LIMITS.MAX_DAILY_WITHDRAWAL}`)
    .custom((value) => {
      // Common withdrawal amounts validation
      const commonAmounts = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 250, 300, 400, 500];
      if (!commonAmounts.includes(parseFloat(value))) {
        // Allow any amount but log unusual ones
        logger.info('Unusual withdrawal amount', { amount: value });
      }
      return true;
    }),
  handleValidationErrors
];

/**
 * Deposit validation rules
 */
const validateDeposit = [
  ...validateCardToken,
  body('amount')
    .optional()
    .isFloat({ min: VALIDATION_LIMITS.MIN_AMOUNT, max: VALIDATION_LIMITS.MAX_AMOUNT })
    .withMessage(`Deposit amount must be between ${VALIDATION_LIMITS.MIN_AMOUNT} and ${VALIDATION_LIMITS.MAX_AMOUNT}`),
  handleValidationErrors
];

/**
 * Pagination validation rules
 */
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];

/**
 * Date range validation rules
 */
const validateDateRange = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date')
    .custom((value, { req }) => {
      if (req.query.startDate && value) {
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(value);
        if (endDate <= startDate) {
          throw new Error('End date must be after start date');
        }
      }
      return true;
    }),
  handleValidationErrors
];

/**
 * Refresh token validation rules
 */
const validateRefreshToken = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
    .isJWT()
    .withMessage('Invalid refresh token format'),
  handleValidationErrors
];

/**
 * Generic sanitization middleware
 */
const sanitizeInput = (req, res, next) => {
  // Remove any potential XSS attempts
  const sanitizeObject = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        // Basic XSS prevention
        obj[key] = obj[key]
          .replace(/<script[^>]*>.*?<\/script>/gi, '')
          .replace(/<[^>]+>/g, '')
          .trim();
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitizeObject(obj[key]);
      }
    }
  };
  
  if (req.body) sanitizeObject(req.body);
  if (req.query) sanitizeObject(req.query);
  if (req.params) sanitizeObject(req.params);
  
  next();
};

module.exports = {
  handleValidationErrors,
  validatePin,
  validateAmount,
  validateCardToken,
  validateTransactionId,
  validateAccount,
  validateTransfer,
  validateWithdrawal,
  validateDeposit,
  validatePagination,
  validateDateRange,
  validateRefreshToken,
  sanitizeInput
};