/**
 * Authentication routes
 * Handles user login, logout, token refresh, and session management
 */

const express = require('express');
const { catchAsync } = require('../middleware/errorHandler');
const { authenticate, checkAuthRateLimit } = require('../middleware/auth');
const { validatePin, validateRefreshToken, sanitizeInput } = require('../middleware/validation');
const authController = require('../controllers/authController');

const router = express.Router();

// Apply sanitization to all routes
router.use(sanitizeInput);

/**
 * User login with PIN
 * POST /api/auth/login
 */
router.post('/login', 
  checkAuthRateLimit,
  validatePin,
  catchAsync(authController.login)
);

/**
 * User logout
 * POST /api/auth/logout
 */
router.post('/logout',
  authenticate,
  catchAsync(authController.logout)
);

/**
 * Refresh authentication token
 * POST /api/auth/refresh
 */
router.post('/refresh',
  validateRefreshToken,
  catchAsync(authController.refreshToken)
);

/**
 * Validate current session
 * GET /api/auth/validate
 */
router.get('/validate',
  authenticate,
  catchAsync(authController.validateSession)
);

/**
 * Get current user profile
 * GET /api/auth/profile
 */
router.get('/profile',
  authenticate,
  catchAsync(authController.getProfile)
);

/**
 * Update user preferences
 * PUT /api/auth/preferences
 */
router.put('/preferences',
  authenticate,
  catchAsync(authController.updatePreferences)
);

/**
 * Change PIN
 * PUT /api/auth/change-pin
 */
router.put('/change-pin',
  authenticate,
  validatePin,
  catchAsync(authController.changePin)
);

/**
 * Get user session information
 * GET /api/auth/session
 */
router.get('/session',
  authenticate,
  catchAsync(authController.getSessionInfo)
);

/**
 * Terminate all sessions
 * POST /api/auth/logout-all
 */
router.post('/logout-all',
  authenticate,
  catchAsync(authController.logoutAll)
);

module.exports = router;