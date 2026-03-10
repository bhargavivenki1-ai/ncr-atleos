# API Integration Layer Documentation

## Overview

This directory contains the complete API integration layer that connects the React frontend components with the comprehensive backend services. The integration layer provides a clean, consistent interface for all API communications.

## Architecture

### Core Components

1. **apiClient.js** - Central HTTP client with authentication and error handling
2. **authService.js** - Authentication and session management
3. **atmService.js** - ATM transaction operations (withdrawal, deposit, card scanning)
4. **bankingService.js** - Banking operations (balance, accounts, transfers)
5. **index.js** - Central export point for all services

### Service Structure

```
src/services/
├── apiClient.js          # HTTP client with auth & error handling
├── authService.js        # Authentication service
├── atmService.js         # ATM operations service
├── bankingService.js     # Banking operations service
├── index.js              # Central exports
└── API_INTEGRATION_README.md
```

## API Client Features

### Authentication
- Automatic JWT token handling
- Token storage in localStorage/sessionStorage
- Automatic token refresh
- Session validation

### Error Handling
- Consistent error formatting
- HTTP status code handling
- Network error detection
- User-friendly error messages

### Request/Response
- JSON content type handling
- Automatic request/response parsing
- Authorization header injection
- Base URL configuration

## Service APIs

### Authentication Service

```javascript
import { authenticatePin, validateSession, logout } from '../services/authService';

// Login with PIN
const response = await authenticatePin('1234');

// Validate current session
const validation = await validateSession();

// Logout user
const result = await logout();
```

### ATM Service

```javascript
import { stageWithdrawal, stageDeposit, simulateCardScan } from '../services/atmService';

// Stage withdrawal
const withdrawal = await stageWithdrawal({
  cardToken: 'tok_abc123',
  amount: 100.00
});

// Stage deposit
const deposit = await stageDeposit({
  cardToken: 'tok_abc123',
  amount: 200.00  // Optional
});

// Simulate card scan
const cardData = await simulateCardScan();
```

### Banking Service

```javascript
import { getAccountBalances, transferFunds, getUserAccounts } from '../services/bankingService';

// Get account balances
const balances = await getAccountBalances();

// Transfer funds
const transfer = await transferFunds({
  fromAccountId: 'acc-savings-001',
  toAccountId: 'acc-checking-001',
  amount: 500.00,
  description: 'Monthly transfer'
});

// Get user accounts
const accounts = await getUserAccounts();
```

## Integration with Frontend Components

### Updated Pages

The following integrated page components have been created that use the real API services:

1. **IntegratedATMCashWithdrawal.jsx** - ATM withdrawal with real API
2. **IntegratedCashDepositPage.jsx** - Cash deposit with real API
3. **IntegratedBalanceEnquiryPage.jsx** - Balance inquiry with real API
4. **IntegratedFundsTransferPage.jsx** - Funds transfer with real API

### Usage Example

```javascript
// In your React component
import { stageWithdrawal } from '../services/atmService';

const handleWithdrawal = async () => {
  try {
    const response = await stageWithdrawal({
      cardToken: 'tok_abc123',
      amount: 100.00
    });
    
    console.log('Success:', response.message);
    alert(`Transaction ID: ${response.transactionId}`);
  } catch (error) {
    console.error('Error:', error.message);
    setError(error.message);
  }
};
```

## Configuration

### Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_API_TIMEOUT=10000
REACT_APP_API_RETRY_ATTEMPTS=3
REACT_APP_API_RETRY_DELAY=1000

# Feature Flags
REACT_APP_USE_MOCK_SERVICES=false
REACT_APP_ENABLE_RETRY=true
REACT_APP_ENABLE_HEALTH_MONITORING=false

# Security
REACT_APP_ENABLE_LOGGING=false
REACT_APP_LOG_LEVEL=info

# Development
REACT_APP_ENVIRONMENT=development
REACT_APP_VERSION=1.0.0
```

### Backend Connection

Ensure the backend server is running on `http://localhost:3001` (or update the `REACT_APP_API_BASE_URL` accordingly).

## Error Handling

### Common Error Scenarios

1. **Network Errors** - Connection issues, server unavailable
2. **Authentication Errors** - Invalid credentials, expired sessions
3. **Validation Errors** - Invalid input data
4. **Service Errors** - Backend service failures

### Error Response Format

```javascript
{
  success: false,
  error: {
    type: 'AUTHENTICATION_ERROR',
    message: 'Session expired. Please log in again.'
  },
  timestamp: '2024-01-15T10:30:00.000Z'
}
```

## Security Features

### Token Management
- JWT tokens stored securely
- Automatic token refresh
- Token expiration handling
- Secure logout with token cleanup

### Request Security
- HTTPS enforcement
- CORS handling
- Request validation
- Sensitive data masking in logs

## Testing

### Manual Testing

1. Start the backend server: `cd backend && npm start`
2. Start the frontend: `npm start`
3. Test authentication with PIN: `1234`
4. Test various operations through the UI

### API Testing

```bash
# Test authentication
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"pin": "1234"}'

# Test withdrawal (with auth token)
curl -X POST http://localhost:3001/api/atm/transactions/withdrawal \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"cardToken": "tok_test_123", "amount": 100.00}'
```

## Migration from Mock Services

### Steps to Replace Mock Components

1. **Replace imports** in existing components:
   ```javascript
   // Old
   import { authenticatePin } from '../services/authService';
   
   // New (same import, but now uses real API)
   import { authenticatePin } from '../services/authService';
   ```

2. **Update error handling** to use new error format
3. **Test thoroughly** with backend services
4. **Update environment variables** for production

### Backward Compatibility

The new services maintain the same interface as the mock services, so existing components should work with minimal changes.

## Performance Considerations

### Optimization Features
- Request/response caching where appropriate
- Automatic retry logic for failed requests
- Connection pooling
- Request timeout handling

### Monitoring
- Request timing logs
- Error rate tracking
- Service availability monitoring

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend CORS is configured for frontend URL
   - Check `Access-Control-Allow-Origin` headers

2. **Authentication Failures**
   - Verify backend is running
   - Check PIN is correct (default: `1234`)
   - Ensure tokens are being stored/retrieved correctly

3. **Network Errors**
   - Verify backend URL in environment variables
   - Check network connectivity
   - Ensure backend services are healthy

### Debug Mode

Enable debug logging by setting:
```bash
REACT_APP_ENABLE_LOGGING=true
REACT_APP_LOG_LEVEL=debug
```

## Future Enhancements

### Planned Features
- Request/response caching
- Offline support
- Real-time notifications
- Advanced error recovery
- Performance monitoring
- Automated testing suite

### Integration Roadmap
1. Complete integration testing
2. Performance optimization
3. Security audit
4. Production deployment
5. Monitoring setup

---

**Note**: This integration layer provides a complete bridge between the React frontend and Node.js backend services, enabling full-stack functionality for the NCR ATLEOS ATM application.