/**
 * MongoDB initialization script
 * Creates initial database structure and indexes
 */

// Switch to the application database
db = db.getSiblingDB('ncr-atleos-atm');

// Create collections
db.createCollection('users');
db.createCollection('transactions');

// Create indexes for users collection
db.users.createIndex({ userId: 1 }, { unique: true });
db.users.createIndex({ 'currentSession.token': 1 });
db.users.createIndex({ 'refreshTokens.token': 1 });
db.users.createIndex({ isActive: 1, isLocked: 1 });

// Create indexes for transactions collection
db.transactions.createIndex({ transactionId: 1 }, { unique: true });
db.transactions.createIndex({ userId: 1, createdAt: -1 });
db.transactions.createIndex({ type: 1, status: 1 });
db.transactions.createIndex({ status: 1, createdAt: -1 });
db.transactions.createIndex({ 'externalReferences.atmStagingServiceId': 1 });
db.transactions.createIndex({ 'externalReferences.coreBankingServiceId': 1 });

// Create TTL index for transactions (30 days)
db.transactions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

// Create a test user (for development/testing)
db.users.insertOne({
  userId: 'test-user-001',
  name: 'Test User',
  pin: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukXLrfy4K', // hashed '1234'
  isActive: true,
  isLocked: false,
  failedLoginAttempts: 0,
  accounts: [
    {
      accountId: 'acc-savings-001',
      accountType: 'savings',
      accountName: 'Savings Account',
      accountNumber: '****1234',
      balance: 5000.00,
      isActive: true
    },
    {
      accountId: 'acc-checking-001',
      accountType: 'checking',
      accountName: 'Checking Account',
      accountNumber: '****5678',
      balance: 2500.00,
      isActive: true
    }
  ],
  dailyLimits: {
    withdrawal: 1000.00,
    transfer: 5000.00
  },
  preferences: {
    language: 'en',
    notifications: true,
    theme: 'dark'
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

print('Database initialization completed successfully!');
print('Created collections: users, transactions');
print('Created indexes for performance optimization');
print('Inserted test user with PIN: 1234');