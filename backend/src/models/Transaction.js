/**
 * Transaction model for MongoDB
 * Defines transaction schema for ATM operations
 */

const mongoose = require('mongoose');
const { TRANSACTION_TYPES, TRANSACTION_STATUS } = require('../config/constants');

const transactionSchema = new mongoose.Schema({
  // Transaction identification
  transactionId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  // User reference
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  
  // Transaction details
  type: {
    type: String,
    required: true,
    enum: Object.values(TRANSACTION_TYPES)
  },
  
  status: {
    type: String,
    required: true,
    enum: Object.values(TRANSACTION_STATUS),
    default: TRANSACTION_STATUS.PENDING
  },
  
  // Amount details
  amount: {
    type: Number,
    required: function() {
      return this.type !== TRANSACTION_TYPES.BALANCE_INQUIRY;
    },
    min: 0
  },
  
  currency: {
    type: String,
    default: 'USD',
    uppercase: true
  },
  
  // Account information
  fromAccount: {
    accountId: String,
    accountType: String,
    accountNumber: String
  },
  
  toAccount: {
    accountId: String,
    accountType: String,
    accountNumber: String
  },
  
  // Card information (tokenized)
  cardToken: {
    type: String,
    required: function() {
      return [TRANSACTION_TYPES.WITHDRAWAL, TRANSACTION_TYPES.DEPOSIT].includes(this.type);
    }
  },
  
  // ATM/Location information
  atmId: String,
  atmLocation: String,
  
  // Processing details
  processingTime: {
    initiated: Date,
    staged: Date,
    processing: Date,
    completed: Date,
    failed: Date
  },
  
  // External service references
  externalReferences: {
    atmStagingServiceId: String,
    coreBankingServiceId: String,
    authorizationCode: String
  },
  
  // Error information
  error: {
    code: String,
    message: String,
    details: mongoose.Schema.Types.Mixed
  },
  
  // Fees
  fees: {
    amount: {
      type: Number,
      default: 0,
      min: 0
    },
    type: String,
    description: String
  },
  
  // Balance information (for balance inquiries)
  balanceInfo: {
    availableBalance: Number,
    currentBalance: Number,
    accountType: String
  },
  
  // Description/Notes
  description: {
    type: String,
    maxlength: 255,
    trim: true
  },
  
  // Metadata
  metadata: {
    ipAddress: String,
    userAgent: String,
    sessionId: String,
    channel: {
      type: String,
      default: 'mobile_app'
    },
    deviceInfo: mongoose.Schema.Types.Mixed
  },
  
  // Audit trail
  auditTrail: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    action: String,
    previousStatus: String,
    newStatus: String,
    performedBy: String,
    details: mongoose.Schema.Types.Mixed
  }],
  
  // Retry information
  retryInfo: {
    attempts: {
      type: Number,
      default: 0
    },
    lastRetry: Date,
    maxRetries: {
      type: Number,
      default: 3
    }
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      // Remove sensitive information from JSON output
      delete ret.__v;
      if (ret.cardToken) {
        ret.cardToken = ret.cardToken.substring(0, 8) + '****';
      }
      return ret;
    }
  }
});

// Indexes for performance
transactionSchema.index({ transactionId: 1 }, { unique: true });
transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ type: 1, status: 1 });
transactionSchema.index({ status: 1, createdAt: -1 });
transactionSchema.index({ 'externalReferences.atmStagingServiceId': 1 });
transactionSchema.index({ 'externalReferences.coreBankingServiceId': 1 });
transactionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // 30 days TTL

// Virtual for transaction duration
transactionSchema.virtual('duration').get(function() {
  if (this.processingTime.completed && this.processingTime.initiated) {
    return this.processingTime.completed - this.processingTime.initiated;
  }
  return null;
});

// Virtual for formatted amount
transactionSchema.virtual('formattedAmount').get(function() {
  if (this.amount) {
    return `${this.currency} ${this.amount.toFixed(2)}`;
  }
  return null;
});

// Pre-save middleware to update processing times
transactionSchema.pre('save', function(next) {
  const now = new Date();
  
  // Set processing time based on status changes
  if (this.isModified('status')) {
    switch (this.status) {
      case TRANSACTION_STATUS.STAGED:
        if (!this.processingTime.staged) {
          this.processingTime.staged = now;
        }
        break;
      case TRANSACTION_STATUS.PROCESSING:
        if (!this.processingTime.processing) {
          this.processingTime.processing = now;
        }
        break;
      case TRANSACTION_STATUS.COMPLETED:
        if (!this.processingTime.completed) {
          this.processingTime.completed = now;
        }
        break;
      case TRANSACTION_STATUS.FAILED:
        if (!this.processingTime.failed) {
          this.processingTime.failed = now;
        }
        break;
    }
  }
  
  next();
});

// Instance method to add audit entry
transactionSchema.methods.addAuditEntry = function(action, previousStatus, newStatus, performedBy, details = {}) {
  this.auditTrail.push({
    timestamp: new Date(),
    action,
    previousStatus,
    newStatus,
    performedBy,
    details
  });
};

// Instance method to update status with audit
transactionSchema.methods.updateStatus = async function(newStatus, performedBy = 'system', details = {}) {
  const previousStatus = this.status;
  
  this.addAuditEntry(
    `Status changed from ${previousStatus} to ${newStatus}`,
    previousStatus,
    newStatus,
    performedBy,
    details
  );
  
  this.status = newStatus;
  await this.save();
};

// Instance method to increment retry count
transactionSchema.methods.incrementRetry = async function() {
  this.retryInfo.attempts += 1;
  this.retryInfo.lastRetry = new Date();
  await this.save();
};

// Instance method to check if max retries reached
transactionSchema.methods.hasMaxRetriesReached = function() {
  return this.retryInfo.attempts >= this.retryInfo.maxRetries;
};

// Static method to find transactions by user
transactionSchema.statics.findByUser = function(userId, options = {}) {
  const query = { userId };
  
  if (options.type) {
    query.type = options.type;
  }
  
  if (options.status) {
    query.status = options.status;
  }
  
  if (options.dateRange) {
    query.createdAt = {
      $gte: options.dateRange.start,
      $lte: options.dateRange.end
    };
  }
  
  return this.find(query)
    .sort({ createdAt: -1 })
    .limit(options.limit || 50)
    .skip(options.skip || 0);
};

// Static method to find pending transactions
transactionSchema.statics.findPendingTransactions = function(olderThanMinutes = 30) {
  const cutoffTime = new Date(Date.now() - (olderThanMinutes * 60 * 1000));
  
  return this.find({
    status: { $in: [TRANSACTION_STATUS.PENDING, TRANSACTION_STATUS.PROCESSING] },
    createdAt: { $lt: cutoffTime }
  });
};

// Static method to get transaction statistics
transactionSchema.statics.getStatistics = async function(userId, dateRange) {
  const matchStage = { userId };
  
  if (dateRange) {
    matchStage.createdAt = {
      $gte: dateRange.start,
      $lte: dateRange.end
    };
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          type: '$type',
          status: '$status'
        },
        count: { $sum: 1 },
        totalAmount: { $sum: '$amount' },
        avgAmount: { $avg: '$amount' }
      }
    },
    {
      $group: {
        _id: '$_id.type',
        statuses: {
          $push: {
            status: '$_id.status',
            count: '$count',
            totalAmount: '$totalAmount',
            avgAmount: '$avgAmount'
          }
        },
        totalTransactions: { $sum: '$count' },
        totalAmount: { $sum: '$totalAmount' }
      }
    }
  ]);
};

module.exports = mongoose.model('Transaction', transactionSchema);