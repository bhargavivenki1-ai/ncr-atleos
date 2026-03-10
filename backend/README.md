# NCR ATLEOS ATM Backend Services

A secure, scalable backend service for the NCR ATLEOS ATM Customer Journey Application. Built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with refresh tokens
- **ATM Transaction Services**: Cash withdrawal, deposit, and staging services
- **Banking Integration**: Account balance, fund transfers, and core banking services
- **Security First**: Helmet, CORS, rate limiting, input validation
- **Comprehensive Logging**: Winston-based structured logging
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Testing**: Unit and integration tests with Jest
- **Code Quality**: ESLint, Prettier, and comprehensive linting

## 📋 Prerequisites

- Node.js >= 16.0.0
- MongoDB >= 4.4
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or using local installation
   mongod
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/ncr-atleos-atm` |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | `1h` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |
| `USE_MOCK_SERVICES` | Use mock external services | `true` |

See `.env.example` for complete configuration options.

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/login
Authenticate user with PIN

**Request:**
```json
{
  "pin": "1234"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token",
  "refreshToken": "refresh-token",
  "user": {
    "id": "user-id",
    "name": "John Doe"
  }
}
```

#### POST /api/auth/refresh
Refresh authentication token

#### POST /api/auth/logout
Logout and invalidate tokens

### ATM Services Endpoints

#### POST /api/atm/transactions/withdrawal
Stage a cash withdrawal transaction

**Request:**
```json
{
  "cardToken": "tok_123abc...",
  "amount": 100.00
}
```

**Response:**
```json
{
  "success": true,
  "transactionId": "txn_xyz789...",
  "status": "staged"
}
```

#### POST /api/atm/transactions/deposit
Stage a cash deposit transaction

#### GET /api/atm/transactions/:id
Get transaction status

### Banking Services Endpoints

#### GET /api/banking/accounts/balance
Get account balance

#### POST /api/banking/transfers
Transfer funds between accounts

#### GET /api/banking/accounts
Get user accounts

### Health Check

#### GET /api/health
Health check endpoint

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔍 Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   ├── utils/           # Utility functions
│   ├── validators/      # Input validation schemas
│   └── server.js        # Main server file
├── tests/               # Test files
├── logs/               # Log files
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies and scripts
└── README.md         # This file
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing protection
- **Rate Limiting**: Prevent brute force attacks
- **Input Validation**: Joi-based request validation
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for PIN hashing
- **Environment Variables**: Secure configuration management

## 📊 Monitoring & Logging

- **Winston**: Structured logging
- **Request Logging**: HTTP request/response logging
- **Error Tracking**: Comprehensive error logging
- **Health Checks**: System health monitoring

## 🚀 Deployment

### Docker

```bash
# Build image
docker build -t ncr-atleos-backend .

# Run container
docker run -p 3001:3001 --env-file .env ncr-atleos-backend
```

### Production Considerations

1. **Environment Variables**: Use secure secret management
2. **Database**: Use MongoDB Atlas or managed MongoDB
3. **Logging**: Configure log aggregation (ELK stack, CloudWatch)
4. **Monitoring**: Set up application monitoring (New Relic, DataDog)
5. **Load Balancing**: Use nginx or cloud load balancers
6. **SSL/TLS**: Configure HTTPS certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions, please contact the NCR ATLEOS development team.
