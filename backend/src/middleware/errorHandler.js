/**
 * Global error handling middleware
 * Provides centralized error handling with proper logging and response formatting
 */

const logger = require('../utils/logger');
const { HTTP_STATUS, ERROR_TYPES } = require('../config/constants');

/**
 * Custom application error class
 */
class AppError extends Error {
  constructor(message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, type = ERROR_TYPES.SERVICE_ERROR) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Handle different types of errors and convert them to AppError
 */
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, HTTP_STATUS.BAD_REQUEST, ERROR_TYPES.VALIDATION_ERROR);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])((?:(?!\1)[^\\]|\\.)*)\1/)[2];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, HTTP_STATUS.CONFLICT, ERROR_TYPES.CONFLICT_ERROR);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, HTTP_STATUS.BAD_REQUEST, ERROR_TYPES.VALIDATION_ERROR);
};

const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again!', HTTP_STATUS.UNAUTHORIZED, ERROR_TYPES.AUTHENTICATION_ERROR);
};

const handleJWTExpiredError = () => {
  return new AppError('Your token has expired! Please log in again.', HTTP_STATUS.UNAUTHORIZED, ERROR_TYPES.AUTHENTICATION_ERROR);
};

/**
 * Send error response for development environment
 */
const sendErrorDev = (err, req, res) => {
  // Log error details
  logger.error('Development Error', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      type: err.type || ERROR_TYPES.SERVICE_ERROR,
      message: err.message,
      stack: err.stack,
      details: err.details || null
    },
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
    method: req.method
  });
};

/**
 * Send error response for production environment
 */
const sendErrorProd = (err, req, res) => {
  // Log error for monitoring
  logger.error('Production Error', {
    error: err.message,
    type: err.type,
    statusCode: err.statusCode,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userId: req.user?.id || 'anonymous'
  });
  
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        type: err.type,
        message: err.message
      },
      timestamp: new Date().toISOString()
    });
  } else {
    // Programming or other unknown error: don't leak error details
    logger.error('Unknown Error', {
      error: err,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method
    });
    
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: {
        type: ERROR_TYPES.SERVICE_ERROR,
        message: 'Something went wrong! Please try again later.'
      },
      timestamp: new Date().toISOString()
    });
  }
};

/**
 * Global error handling middleware
 */
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  err.type = err.type || ERROR_TYPES.SERVICE_ERROR;
  
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else {
    let error = { ...err };
    error.message = err.message;
    
    // Handle specific error types
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    
    sendErrorProd(error, req, res);
  }
};

/**
 * Async error wrapper to catch async errors
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

/**
 * Handle 404 errors
 */
const notFound = (req, res, next) => {
  const err = new AppError(
    `Cannot ${req.method} ${req.originalUrl}`,
    HTTP_STATUS.NOT_FOUND,
    ERROR_TYPES.NOT_FOUND_ERROR
  );
  next(err);
};

module.exports = {
  AppError,
  globalErrorHandler,
  catchAsync,
  notFound
};