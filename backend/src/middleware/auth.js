/**
 * Authentication and authorization middleware
 * Handles JWT token validation and user authentication
 */

const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const { HTTP_STATUS, ERROR_TYPES, ERROR_MESSAGES } = require('../config/constants');
const logger = require('../utils/logger');
const User = require('../models/User');

/**
 * Generate JWT token
 * @param {string} userId - User ID to encode in token
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

/**
 * Generate refresh token
 * @param {string} userId - User ID to encode in token
 * @returns {string} Refresh token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Verify refresh token
 * @param {string} token - Refresh token to verify
 * @returns {Object} Decoded token payload
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

/**
 * Extract token from request headers
 * @param {Object} req - Express request object
 * @returns {string|null} Extracted token or null
 */
const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return null;
};

/**
 * Authentication middleware
 * Validates JWT token and attaches user to request
 */
const authenticate = async (req, res, next) => {
  try {
    const token = extractToken(req);
    
    if (!token) {
      logger.logSecurity('Missing authentication token', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        url: req.originalUrl
      });
      
      return next(new AppError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_TYPES.AUTHENTICATION_ERROR
      ));
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    // Check if user still exists (in a real app, you'd query the database)
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock user validation
      req.user = {
        id: decoded.userId,
        name: 'John Doe',
        sessionToken: token
      };
    } else {
      // Real user validation
      const user = await User.findById(decoded.userId).select('-pin');
      
      if (!user) {
        logger.logSecurity('Token for non-existent user', {
          userId: decoded.userId,
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });
        
        return next(new AppError(
          ERROR_MESSAGES.INVALID_TOKEN,
          HTTP_STATUS.UNAUTHORIZED,
          ERROR_TYPES.AUTHENTICATION_ERROR
        ));
      }
      
      req.user = user;
    }
    
    logger.info('User authenticated', {
      userId: req.user.id,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.originalUrl
    });
    
    next();
    
  } catch (error) {
    logger.logSecurity('Authentication failed', {
      error: error.message,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      url: req.originalUrl
    });
    
    if (error.name === 'JsonWebTokenError') {
      return next(new AppError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_TYPES.AUTHENTICATION_ERROR
      ));
    }
    
    if (error.name === 'TokenExpiredError') {
      return next(new AppError(
        ERROR_MESSAGES.SESSION_EXPIRED,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_TYPES.AUTHENTICATION_ERROR
      ));
    }
    
    return next(new AppError(
      ERROR_MESSAGES.INVALID_TOKEN,
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_TYPES.AUTHENTICATION_ERROR
    ));
  }
};

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = extractToken(req);
    
    if (token) {
      const decoded = verifyToken(token);
      
      if (process.env.USE_MOCK_SERVICES === 'true') {
        req.user = {
          id: decoded.userId,
          name: 'John Doe',
          sessionToken: token
        };
      } else {
        const user = await User.findById(decoded.userId).select('-pin');
        if (user) {
          req.user = user;
        }
      }
    }
    
    next();
    
  } catch (error) {
    // Ignore authentication errors for optional auth
    next();
  }
};

/**
 * Rate limiting for authentication attempts
 */
const authRateLimit = {};

const checkAuthRateLimit = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;
  
  if (!authRateLimit[ip]) {
    authRateLimit[ip] = {
      attempts: 1,
      firstAttempt: now
    };
    return next();
  }
  
  const timeWindow = now - authRateLimit[ip].firstAttempt;
  
  if (timeWindow > windowMs) {
    // Reset window
    authRateLimit[ip] = {
      attempts: 1,
      firstAttempt: now
    };
    return next();
  }
  
  if (authRateLimit[ip].attempts >= maxAttempts) {
    logger.logSecurity('Authentication rate limit exceeded', {
      ip,
      attempts: authRateLimit[ip].attempts,
      timeWindow
    });
    
    return next(new AppError(
      'Too many authentication attempts. Please try again later.',
      HTTP_STATUS.TOO_MANY_REQUESTS,
      ERROR_TYPES.AUTHENTICATION_ERROR
    ));
  }
  
  authRateLimit[ip].attempts++;
  next();
};

/**
 * Clean up expired rate limit entries
 */
setInterval(() => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  
  Object.keys(authRateLimit).forEach(ip => {
    if (now - authRateLimit[ip].firstAttempt > windowMs) {
      delete authRateLimit[ip];
    }
  });
}, 5 * 60 * 1000); // Clean up every 5 minutes

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  extractToken,
  authenticate,
  optionalAuth,
  checkAuthRateLimit
};