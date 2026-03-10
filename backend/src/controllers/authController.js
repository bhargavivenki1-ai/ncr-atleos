/**
 * Authentication controller
 * Handles user authentication, session management, and user profile operations
 */

const { AppError } = require('../middleware/errorHandler');
const { generateToken, generateRefreshToken, verifyRefreshToken } = require('../middleware/auth');
const { HTTP_STATUS, ERROR_TYPES, ERROR_MESSAGES, SUCCESS_MESSAGES, MOCK_CONFIG } = require('../config/constants');
const logger = require('../utils/logger');
const User = require('../models/User');

/**
 * User login with PIN
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = async (req, res) => {
  const { pin } = req.body;
  const ipAddress = req.ip;
  const userAgent = req.get('User-Agent');
  
  logger.info('Login attempt', {
    ip: ipAddress,
    userAgent,
    timestamp: new Date().toISOString()
  });
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock authentication
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Simulate random network failures (5% chance)
      if (Math.random() < MOCK_CONFIG.NETWORK_FAILURE_RATE) {
        throw new AppError(
          ERROR_MESSAGES.NETWORK_ERROR,
          HTTP_STATUS.SERVICE_UNAVAILABLE,
          ERROR_TYPES.NETWORK_ERROR
        );
      }
      
      // Validate PIN
      if (pin !== MOCK_CONFIG.VALID_PIN) {
        logger.logSecurity('Failed login attempt - Invalid PIN', {
          ip: ipAddress,
          userAgent,
          pin: '****'
        });
        
        throw new AppError(
          ERROR_MESSAGES.INVALID_PIN,
          HTTP_STATUS.UNAUTHORIZED,
          ERROR_TYPES.AUTHENTICATION_ERROR
        );
      }
      
      // Generate tokens
      const token = generateToken(MOCK_CONFIG.MOCK_USER_ID);
      const refreshToken = generateRefreshToken(MOCK_CONFIG.MOCK_USER_ID);
      
      // Mock user data
      const user = {
        id: MOCK_CONFIG.MOCK_USER_ID,
        userId: MOCK_CONFIG.MOCK_USER_ID,
        name: MOCK_CONFIG.MOCK_USER_NAME,
        accounts: MOCK_CONFIG.MOCK_ACCOUNTS,
        preferences: {
          language: 'en',
          notifications: true,
          theme: 'dark'
        },
        lastLogin: new Date().toISOString()
      };
      
      logger.info('Successful login (mock)', {
        userId: user.id,
        ip: ipAddress,
        userAgent
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        token,
        refreshToken,
        user,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      });
      
    } else {
      // Real authentication with database
      const user = await User.findOne({ 
        userId: pin, // In real implementation, you'd have a proper user lookup
        isActive: true 
      });
      
      if (!user) {
        logger.logSecurity('Failed login attempt - User not found', {
          ip: ipAddress,
          userAgent
        });
        
        throw new AppError(
          ERROR_MESSAGES.INVALID_PIN,
          HTTP_STATUS.UNAUTHORIZED,
          ERROR_TYPES.AUTHENTICATION_ERROR
        );
      }
      
      // Check if account is locked
      if (user.isAccountLocked) {
        logger.logSecurity('Login attempt on locked account', {
          userId: user.userId,
          ip: ipAddress,
          userAgent,
          lockUntil: user.lockUntil
        });
        
        throw new AppError(
          ERROR_MESSAGES.ACCOUNT_LOCKED,
          HTTP_STATUS.FORBIDDEN,
          ERROR_TYPES.AUTHENTICATION_ERROR
        );
      }
      
      // Verify PIN
      const isPinValid = await user.checkPin(pin);
      
      if (!isPinValid) {
        await user.handleFailedLogin();
        
        logger.logSecurity('Failed login attempt - Invalid PIN', {
          userId: user.userId,
          ip: ipAddress,
          userAgent,
          failedAttempts: user.failedLoginAttempts
        });
        
        throw new AppError(
          ERROR_MESSAGES.INVALID_PIN,
          HTTP_STATUS.UNAUTHORIZED,
          ERROR_TYPES.AUTHENTICATION_ERROR
        );
      }
      
      // Generate tokens
      const token = generateToken(user._id.toString());
      const refreshToken = generateRefreshToken(user._id.toString());
      
      // Update user session
      await user.handleSuccessfulLogin({
        token,
        ipAddress,
        userAgent
      });
      
      // Add refresh token
      await user.addRefreshToken({
        token: refreshToken,
        ipAddress,
        userAgent
      });
      
      logger.info('Successful login', {
        userId: user.userId,
        ip: ipAddress,
        userAgent
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        token,
        refreshToken,
        user: {
          id: user._id,
          userId: user.userId,
          name: user.name,
          accounts: user.accounts,
          preferences: user.preferences,
          lastLogin: user.lastLogin
        },
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      });
    }
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Login error', {
      error: error.message,
      stack: error.stack,
      ip: ipAddress,
      userAgent
    });
    
    throw new AppError(
      ERROR_MESSAGES.INTERNAL_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_TYPES.SERVICE_ERROR
    );
  }
};

/**
 * User logout
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logout = async (req, res) => {
  const user = req.user;
  const ipAddress = req.ip;
  
  try {
    if (process.env.USE_MOCK_SERVICES !== 'true') {
      // Clear current session in database
      const dbUser = await User.findById(user.id);
      if (dbUser) {
        dbUser.currentSession = undefined;
        await dbUser.save();
      }
    }
    
    logger.info('User logout', {
      userId: user.id,
      ip: ipAddress,
      userAgent: req.get('User-Agent')
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: SUCCESS_MESSAGES.LOGOUT_SUCCESS
    });
    
  } catch (error) {
    logger.error('Logout error', {
      error: error.message,
      userId: user.id,
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
 * Refresh authentication token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;
  const ipAddress = req.ip;
  const userAgent = req.get('User-Agent');
  
  try {
    // Verify refresh token
    const decoded = verifyRefreshToken(token);
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock token refresh
      const newToken = generateToken(decoded.userId);
      const newRefreshToken = generateRefreshToken(decoded.userId);
      
      logger.info('Token refreshed (mock)', {
        userId: decoded.userId,
        ip: ipAddress,
        userAgent
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        token: newToken,
        refreshToken: newRefreshToken,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      });
      
    } else {
      // Real token refresh with database
      const user = await User.findByRefreshToken(token);
      
      if (!user) {
        logger.logSecurity('Invalid refresh token used', {
          ip: ipAddress,
          userAgent,
          token: token.substring(0, 10) + '...'
        });
        
        throw new AppError(
          ERROR_MESSAGES.INVALID_TOKEN,
          HTTP_STATUS.UNAUTHORIZED,
          ERROR_TYPES.AUTHENTICATION_ERROR
        );
      }
      
      // Generate new tokens
      const newToken = generateToken(user._id.toString());
      const newRefreshToken = generateRefreshToken(user._id.toString());
      
      // Remove old refresh token and add new one
      await user.removeRefreshToken(token);
      await user.addRefreshToken({
        token: newRefreshToken,
        ipAddress,
        userAgent
      });
      
      logger.info('Token refreshed', {
        userId: user.userId,
        ip: ipAddress,
        userAgent
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        token: newToken,
        refreshToken: newRefreshToken,
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
      });
    }
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      logger.logSecurity('Invalid refresh token', {
        error: error.message,
        ip: ipAddress,
        userAgent
      });
      
      throw new AppError(
        ERROR_MESSAGES.INVALID_TOKEN,
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_TYPES.AUTHENTICATION_ERROR
      );
    }
    
    logger.error('Token refresh error', {
      error: error.message,
      stack: error.stack,
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
 * Validate current session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const validateSession = async (req, res) => {
  const user = req.user;
  
  try {
    if (process.env.USE_MOCK_SERVICES !== 'true') {
      // Update last activity
      const dbUser = await User.findById(user.id);
      if (dbUser) {
        await dbUser.updateActivity();
      }
    }
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      valid: true,
      user: {
        id: user.id,
        name: user.name,
        lastActivity: new Date().toISOString()
      }
    });
    
  } catch (error) {
    logger.error('Session validation error', {
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
 * Get current user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getProfile = async (req, res) => {
  const user = req.user;
  
  try {
    let userProfile;
    
    if (process.env.USE_MOCK_SERVICES === 'true') {
      userProfile = {
        id: user.id,
        userId: user.id,
        name: user.name,
        accounts: MOCK_CONFIG.MOCK_ACCOUNTS,
        preferences: {
          language: 'en',
          notifications: true,
          theme: 'dark'
        },
        lastLogin: new Date().toISOString(),
        loginCount: 1
      };
    } else {
      const dbUser = await User.findById(user.id).select('-pin -refreshTokens');
      
      if (!dbUser) {
        throw new AppError(
          ERROR_MESSAGES.NOT_FOUND,
          HTTP_STATUS.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR
        );
      }
      
      userProfile = dbUser.toJSON();
    }
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      user: userProfile
    });
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Get profile error', {
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
 * Update user preferences
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updatePreferences = async (req, res) => {
  const user = req.user;
  const { preferences } = req.body;
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock preference update
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Preferences updated successfully',
        preferences
      });
    } else {
      const dbUser = await User.findById(user.id);
      
      if (!dbUser) {
        throw new AppError(
          ERROR_MESSAGES.NOT_FOUND,
          HTTP_STATUS.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR
        );
      }
      
      // Update preferences
      dbUser.preferences = { ...dbUser.preferences, ...preferences };
      await dbUser.save();
      
      logger.info('User preferences updated', {
        userId: user.id,
        preferences
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'Preferences updated successfully',
        preferences: dbUser.preferences
      });
    }
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Update preferences error', {
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
 * Change user PIN
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const changePin = async (req, res) => {
  const user = req.user;
  const { currentPin, newPin } = req.body;
  
  try {
    if (process.env.USE_MOCK_SERVICES === 'true') {
      // Mock PIN change
      if (currentPin !== MOCK_CONFIG.VALID_PIN) {
        throw new AppError(
          'Current PIN is incorrect',
          HTTP_STATUS.BAD_REQUEST,
          ERROR_TYPES.VALIDATION_ERROR
        );
      }
      
      logger.logSecurity('PIN changed (mock)', {
        userId: user.id,
        ip: req.ip
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'PIN changed successfully'
      });
    } else {
      const dbUser = await User.findById(user.id);
      
      if (!dbUser) {
        throw new AppError(
          ERROR_MESSAGES.NOT_FOUND,
          HTTP_STATUS.NOT_FOUND,
          ERROR_TYPES.NOT_FOUND_ERROR
        );
      }
      
      // Verify current PIN
      const isCurrentPinValid = await dbUser.checkPin(currentPin);
      
      if (!isCurrentPinValid) {
        logger.logSecurity('Failed PIN change attempt - Invalid current PIN', {
          userId: user.id,
          ip: req.ip
        });
        
        throw new AppError(
          'Current PIN is incorrect',
          HTTP_STATUS.BAD_REQUEST,
          ERROR_TYPES.VALIDATION_ERROR
        );
      }
      
      // Update PIN
      dbUser.pin = newPin;
      await dbUser.save();
      
      logger.logSecurity('PIN changed successfully', {
        userId: user.id,
        ip: req.ip
      });
      
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: 'PIN changed successfully'
      });
    }
    
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    logger.error('Change PIN error', {
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
 * Get session information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getSessionInfo = async (req, res) => {
  const user = req.user;
  
  try {
    const sessionInfo = {
      userId: user.id,
      sessionStart: new Date().toISOString(),
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    };
    
    if (process.env.USE_MOCK_SERVICES !== 'true') {
      const dbUser = await User.findById(user.id).select('currentSession lastActivity');
      if (dbUser && dbUser.currentSession) {
        sessionInfo.sessionStart = dbUser.currentSession.createdAt;
        sessionInfo.lastActivity = dbUser.lastActivity;
      }
    }
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      session: sessionInfo
    });
    
  } catch (error) {
    logger.error('Get session info error', {
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
 * Logout from all sessions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logoutAll = async (req, res) => {
  const user = req.user;
  
  try {
    if (process.env.USE_MOCK_SERVICES !== 'true') {
      const dbUser = await User.findById(user.id);
      if (dbUser) {
        await dbUser.clearAllSessions();
      }
    }
    
    logger.info('User logged out from all sessions', {
      userId: user.id,
      ip: req.ip
    });
    
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: 'Logged out from all sessions successfully'
    });
    
  } catch (error) {
    logger.error('Logout all error', {
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
  login,
  logout,
  refreshToken,
  validateSession,
  getProfile,
  updatePreferences,
  changePin,
  getSessionInfo,
  logoutAll
};