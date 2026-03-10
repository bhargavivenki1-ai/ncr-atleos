# NCR ATLEOS ATM Backend API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "type": "ERROR_TYPE",
    "message": "Error description"
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Authentication Endpoints

### Login
**POST** `/auth/login`

Authenticate user with PIN.

**Request Body:**
```json
{
  "pin": "1234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "mock-user-12345",
    "userId": "mock-user-12345",
    "name": "John Doe",
    "accounts": [...],
    "preferences": {...},
    "lastLogin": "2024-01-15T10:30:00.000Z"
  },
  "expiresIn": "1h"
}
```

**Error Codes:**
- `400` - Invalid PIN format
- `401` - Incorrect PIN
- `403` - Account locked
- `429` - Too many attempts

### Logout
**POST** `/auth/logout`

*Requires Authentication*

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### Refresh Token
**POST** `/auth/refresh`

Refresh authentication token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "1h"
}
```

### Validate Session
**GET** `/auth/validate`

*Requires Authentication*

**Response:**
```json
{
  "success": true,
  "valid": true,
  "user": {
    "id": "mock-user-12345",
    "name": "John Doe",
    "lastActivity": "2024-01-15T10:30:00.000Z"
  }
}
```

## ATM Transaction Endpoints

### Stage Withdrawal
**POST** `/atm/transactions/withdrawal`

*Requires Authentication*

Stage a cash withdrawal transaction.

**Request Body:**
```json
{
  "cardToken": "tok_abc123def456ghi789",
  "amount": 100.00
}
```

**Response:**
```json
{
  "success": true,
  "message": "Transaction staged successfully",
  "transactionId": "txn_xyz789abc123",
  "status": "staged",
  "amount": 100.00,
  "externalTransactionId": "atm_mock_def456ghi789",
  "estimatedCompletionTime": "2024-01-15T10:35:00.000Z"
}
```

**Validation Rules:**
- `cardToken`: Required, 10-64 characters, alphanumeric with hyphens/underscores
- `amount`: Required, 0.01-1000.00, max 2 decimal places

### Stage Deposit
**POST** `/atm/transactions/deposit`

*Requires Authentication*

Stage a cash deposit transaction.

**Request Body:**
```json
{
  "cardToken": "tok_abc123def456ghi789",
  "amount": 200.00  // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Transaction staged successfully",
  "transactionId": "txn_xyz789abc123",
  "status": "staged",
  "amount": 200.00,
  "externalTransactionId": "atm_mock_def456ghi789",
  "estimatedCompletionTime": "2024-01-15T10:35:00.000Z"
}
```

### Get Transaction Status
**GET** `/atm/transactions/{transactionId}`

*Requires Authentication*

**Response:**
```json
{
  "success": true,
  "transaction": {
    "transactionId": "txn_xyz789abc123",
    "userId": "mock-user-12345",
    "type": "withdrawal",
    "status": "staged",
    "amount": 100.00,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "processingTime": {
      "initiated": "2024-01-15T10:30:00.000Z",
      "staged": "2024-01-15T10:30:01.000Z"
    }
  }
}
```

### Get Transaction History
**GET** `/atm/transactions`

*Requires Authentication*

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 50)
- `type`: Filter by transaction type (withdrawal, deposit, transfer)
- `status`: Filter by status (pending, staged, completed, failed)
- `startDate`: Filter from date (ISO 8601)
- `endDate`: Filter to date (ISO 8601)

**Response:**
```json
{
  "success": true,
  "transactions": [
    {
      "transactionId": "txn_mock_001",
      "type": "withdrawal",
      "status": "completed",
      "amount": 100.00,
      "createdAt": "2024-01-14T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 2,
    "pages": 1
  }
}
```

### Cancel Transaction
**DELETE** `/atm/transactions/{transactionId}`

*Requires Authentication*

**Response:**
```json
{
  "success": true,
  "message": "Transaction cancelled successfully",
  "transactionId": "txn_xyz789abc123",
  "status": "cancelled"
}
```

### Simulate Card Scan
**POST** `/atm/scan-card`

*Requires Authentication*

Simulate card scanning for testing purposes.

**Response:**
```json
{
  "success": true,
  "message": "Card scanned successfully",
  "cardToken": "tok_abc123def456ghi789",
  "cardDetails": {
    "maskedNumber": "**** **** **** 1234",
    "type": "DEBIT",
    "bank": "NCR Bank"
  }
}
```

## Banking Endpoints

### Get Account Balances
**GET** `/banking/accounts/balance`

*Requires Authentication*

**Response:**
```json
{
  "success": true,
  "message": "Balance retrieved successfully",
  "accounts": [
    {
      "id": "acc-savings-001",
      "type": "savings",
      "name": "Savings Account",
      "balance": 5000.00,
      "accountNumber": "****1234",
      "lastUpdated": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": "acc-checking-001",
      "type": "checking",
      "name": "Checking Account",
      "balance": 2500.00,
      "accountNumber": "****5678",
      "lastUpdated": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Get User Accounts
**GET** `/banking/accounts`

*Requires Authentication*

**Response:**
```json
{
  "success": true,
  "accounts": [
    {
      "id": "acc-savings-001",
      "type": "savings",
      "name": "Savings Account",
      "balance": 5000.00,
      "accountNumber": "****1234"
    }
  ]
}
```

### Transfer Funds
**POST** `/banking/transfers`

*Requires Authentication*

**Request Body:**
```json
{
  "fromAccountId": "acc-savings-001",
  "toAccountId": "acc-checking-001",
  "amount": 500.00,
  "description": "Monthly transfer"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Transfer completed successfully",
  "transactionId": "txn_transfer_123",
  "status": "completed",
  "amount": 500.00,
  "fromAccountId": "acc-savings-001",
  "toAccountId": "acc-checking-001",
  "externalTransactionId": "cbs_mock_abc123",
  "completedAt": "2024-01-15T10:30:00.000Z"
}
```

**Validation Rules:**
- `fromAccountId`: Required, 5-50 characters
- `toAccountId`: Required, 5-50 characters, cannot be same as fromAccountId
- `amount`: Required, 0.01-5000.00
- `description`: Optional, max 255 characters

### Get Transfer History
**GET** `/banking/transfers`

*Requires Authentication*

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `startDate`: Filter from date
- `endDate`: Filter to date

**Response:**
```json
{
  "success": true,
  "transfers": [
    {
      "transactionId": "txn_transfer_001",
      "type": "transfer",
      "status": "completed",
      "amount": 500.00,
      "fromAccount": {
        "accountId": "acc-savings-001",
        "name": "Savings Account"
      },
      "toAccount": {
        "accountId": "acc-checking-001",
        "name": "Checking Account"
      },
      "description": "Monthly transfer",
      "createdAt": "2024-01-14T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  }
}
```

### Get Service Limits
**GET** `/banking/limits`

*Requires Authentication*

**Response:**
```json
{
  "success": true,
  "limits": {
    "daily": {
      "withdrawal": 1000.00,
      "transfer": 5000.00
    },
    "transaction": {
      "minAmount": 0.01,
      "maxAmount": 10000.00
    },
    "user": {
      "dailyWithdrawalUsed": 0,
      "dailyTransferUsed": 0,
      "lastReset": "2024-01-15"
    }
  }
}
```

## Health Check Endpoints

### Basic Health Check
**GET** `/health`

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600.5,
  "environment": "development",
  "version": "1.0.0",
  "services": {
    "api": "healthy",
    "database": "connected"
  }
}
```

### Detailed Health Check
**GET** `/health/detailed`

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": {
    "seconds": 3600.5,
    "formatted": "1h 0m 0s"
  },
  "environment": "development",
  "version": "1.0.0",
  "node": {
    "version": "v18.17.0",
    "platform": "darwin",
    "arch": "x64"
  },
  "memory": {
    "rss": "45 MB",
    "heapTotal": "20 MB",
    "heapUsed": "15 MB",
    "external": "2 MB"
  },
  "services": {
    "api": {
      "status": "healthy",
      "responseTime": "< 100ms"
    },
    "database": {
      "status": "connected",
      "type": "MongoDB"
    },
    "externalServices": {
      "atmStagingService": "mock",
      "coreBankingService": "mock",
      "visionService": "mock"
    }
  }
}
```

## Error Codes

### HTTP Status Codes
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Unprocessable Entity
- `429` - Too Many Requests
- `500` - Internal Server Error
- `503` - Service Unavailable

### Error Types
- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Authentication failed
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND_ERROR` - Resource not found
- `CONFLICT_ERROR` - Resource conflict
- `SERVICE_ERROR` - Internal service error
- `NETWORK_ERROR` - Network connectivity error
- `TIMEOUT_ERROR` - Request timeout

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- **General Endpoints**: 100 requests per 15 minutes per IP
- **Authentication Endpoints**: 5 requests per 15 minutes per IP

When rate limit is exceeded:
```json
{
  "success": false,
  "error": {
    "type": "AUTHENTICATION_ERROR",
    "message": "Too many requests from this IP, please try again later."
  },
  "retryAfter": 900
}
```

## Development Mode

When `USE_MOCK_SERVICES=true`, the API uses mock implementations:

- **Default PIN**: `1234`
- **Mock Accounts**: 2 accounts (Savings: $5000, Checking: $2500)
- **Network Delays**: 500ms-2s simulation
- **Failure Rate**: 2-5% random failures
- **Card Tokens**: Generated with `tok_` prefix

## Testing

Use the following test data for development:

```bash
# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"pin": "1234"}'

# Stage Withdrawal
curl -X POST http://localhost:3001/api/atm/transactions/withdrawal \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"cardToken": "tok_test_card_123", "amount": 100.00}'

# Transfer Funds
curl -X POST http://localhost:3001/api/banking/transfers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"fromAccountId": "acc-savings-001", "toAccountId": "acc-checking-001", "amount": 100.00}'
```

## Support

For API support:
1. Check the health endpoint: `/api/health`
2. Review server logs in `./logs/`
3. Validate request format against this documentation
4. Ensure proper authentication headers
5. Check rate limiting status