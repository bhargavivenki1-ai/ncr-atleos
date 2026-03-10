/**
 * User model for MongoDB
 * Defines user schema with authentication and session management
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { PIN_CONFIG, SESSION_CONFIG } = require('../config/constants');

const userSchema = new mongoose.Schema({
  // User identification
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  
  // User details
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  
  // Authentication
  pin: {
    type: String,
    required: true,
    validate: {
      validator: function(pin) {
        return PIN_CONFIG.PATTERN.test(pin);
      },
      message: 'PIN must be 4 digits'
    }
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  
  isLocked: {
    type: Boolean,
    default: false
  },
  
  // Failed login attempts
  failedLoginAttempts: {
    type: Number,
    default: 0,
    max: PIN_CONFIG.MAX_ATTEMPTS
  },
  
  lockUntil: {
    type: Date
  },
  
  // Session management
  currentSession: {
    token: String,
    createdAt: Date,
    expiresAt: Date,
    ipAddress: String,
    userAgent: String
  },
  
  // Refresh tokens
  refreshTokens: [{
    token: String,
    createdAt: Date,
    expiresAt: Date,
    ipAddress: String,
    userAgent: String
  }],
  
  // User accounts
  accounts: [{
    accountId: {
      type: String,
      required: true
    },
    accountType: {
      type: String,
      required: true,
      enum: ['savings', 'checking', 'credit', 'loan']
    },
    accountName: {
      type: String,
      required: true
    },
    accountNumber: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      required: true,
      min: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  
  // Transaction limits
  dailyLimits: {
    withdrawal: {
      type: Number,
      default: 1000.00
    },
    transfer: {
      type: Number,
      default: 5000.00
    }
  },
  
  // Usage tracking
  lastLogin: Date,
  lastActivity: Date,
  loginCount: {
    type: Number,
    default: 0
  },
  
  // Preferences
  preferences: {
    language: {
      type: String,
      default: 'en'
    },
    notifications: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.pin;
      delete ret.refreshTokens;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for performance
userSchema.index({ userId: 1 }, { unique: true });
userSchema.index({ 'currentSession.token': 1 });
userSchema.index({ 'refreshTokens.token': 1 });
userSchema.index({ isActive: 1, isLocked: 1 });

// Virtual for account lock status
userSchema.virtual('isAccountLocked').get(function() {
  return !!(this.isLocked && this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash PIN
userSchema.pre('save', async function(next) {
  // Only hash the PIN if it has been modified (or is new)
  if (!this.isModified('pin')) return next();
  
  try {
    // Hash PIN with cost of 12
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    this.pin = await bcrypt.hash(this.pin, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check PIN
userSchema.methods.checkPin = async function(candidatePin) {
  return bcrypt.compare(candidatePin, this.pin);
};

// Instance method to handle failed login
userSchema.methods.handleFailedLogin = async function() {
  this.failedLoginAttempts += 1;
  
  // Lock account if max attempts reached
  if (this.failedLoginAttempts >= PIN_CONFIG.MAX_ATTEMPTS) {
    this.isLocked = true;
    this.lockUntil = new Date(Date.now() + PIN_CONFIG.LOCKOUT_DURATION);
  }
  
  await this.save();
};

// Instance method to handle successful login
userSchema.methods.handleSuccessfulLogin = async function(sessionData) {
  this.failedLoginAttempts = 0;
  this.isLocked = false;
  this.lockUntil = undefined;
  this.lastLogin = new Date();
  this.lastActivity = new Date();
  this.loginCount += 1;
  
  // Set current session
  this.currentSession = {
    token: sessionData.token,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + SESSION_CONFIG.TIMEOUT),
    ipAddress: sessionData.ipAddress,
    userAgent: sessionData.userAgent
  };
  
  await this.save();
};

// Instance method to add refresh token
userSchema.methods.addRefreshToken = async function(tokenData) {
  // Remove old refresh tokens (keep only the most recent)
  this.refreshTokens = this.refreshTokens.filter(
    token => token.expiresAt > new Date()
  ).slice(-4); // Keep max 5 refresh tokens
  
  // Add new refresh token
  this.refreshTokens.push({
    token: tokenData.token,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)), // 7 days
    ipAddress: tokenData.ipAddress,
    userAgent: tokenData.userAgent
  });
  
  await this.save();
};

// Instance method to remove refresh token
userSchema.methods.removeRefreshToken = async function(token) {
  this.refreshTokens = this.refreshTokens.filter(
    refreshToken => refreshToken.token !== token
  );
  
  await this.save();
};

// Instance method to clear all sessions
userSchema.methods.clearAllSessions = async function() {
  this.currentSession = undefined;
  this.refreshTokens = [];
  
  await this.save();
};

// Instance method to update last activity
userSchema.methods.updateActivity = async function() {
  this.lastActivity = new Date();
  await this.save();
};

// Static method to find user by session token
userSchema.statics.findBySessionToken = function(token) {
  return this.findOne({
    'currentSession.token': token,
    'currentSession.expiresAt': { $gt: new Date() },
    isActive: true,
    $or: [
      { isLocked: false },
      { isLocked: true, lockUntil: { $lt: new Date() } }
    ]
  });
};

// Static method to find user by refresh token
userSchema.statics.findByRefreshToken = function(token) {
  return this.findOne({
    'refreshTokens.token': token,
    'refreshTokens.expiresAt': { $gt: new Date() },
    isActive: true
  });
};

// Static method to cleanup expired sessions
userSchema.statics.cleanupExpiredSessions = async function() {
  const now = new Date();
  
  await this.updateMany(
    {
      $or: [
        { 'currentSession.expiresAt': { $lt: now } },
        { 'refreshTokens.expiresAt': { $lt: now } }
      ]
    },
    {
      $unset: {
        'currentSession': 1
      },
      $pull: {
        'refreshTokens': {
          expiresAt: { $lt: now }
        }
      }
    }
  );
};

module.exports = mongoose.model('User', userSchema);