/**
 * Banking controller tests
 */

const request = require('supertest');
const app = require('../../src/server');
const { HTTP_STATUS } = require('../../src/config/constants');

describe('Banking Controller', () => {
  let authToken;
  
  beforeEach(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ pin: '1234' });
    
    authToken = loginResponse.body.token;
  });
  
  describe('GET /api/banking/accounts/balance', () => {
    it('should get account balances', async () => {
      const response = await request(app)
        .get('/api/banking/accounts/balance')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.success).toBe(true);
      expect(response.body.accounts).toBeDefined();
      expect(Array.isArray(response.body.accounts)).toBe(true);
    });
  });
  
  describe('GET /api/banking/accounts', () => {
    it('should get user accounts', async () => {
      const response = await request(app)
        .get('/api/banking/accounts')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.success).toBe(true);
      expect(response.body.accounts).toBeDefined();
    });
  });
  
  describe('POST /api/banking/transfers', () => {
    it('should transfer funds successfully', async () => {
      const response = await request(app)
        .post('/api/banking/transfers')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          fromAccountId: 'acc-savings-001',
          toAccountId: 'acc-checking-001',
          amount: 100.00,
          description: 'Test transfer'
        })
        .expect(HTTP_STATUS.CREATED);
      
      expect(response.body.success).toBe(true);
      expect(response.body.transactionId).toBeDefined();
      expect(response.body.status).toBe('completed');
    });
    
    it('should reject transfer to same account', async () => {
      const response = await request(app)
        .post('/api/banking/transfers')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          fromAccountId: 'acc-savings-001',
          toAccountId: 'acc-savings-001',
          amount: 100.00
        })
        .expect(HTTP_STATUS.BAD_REQUEST);
      
      expect(response.body.success).toBe(false);
    });
    
    it('should reject transfer with invalid amount', async () => {
      const response = await request(app)
        .post('/api/banking/transfers')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          fromAccountId: 'acc-savings-001',
          toAccountId: 'acc-checking-001',
          amount: -100.00
        })
        .expect(HTTP_STATUS.BAD_REQUEST);
      
      expect(response.body.success).toBe(false);
    });
  });
  
  describe('GET /api/banking/transfers', () => {
    it('should get transfer history', async () => {
      const response = await request(app)
        .get('/api/banking/transfers')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.success).toBe(true);
      expect(response.body.transfers).toBeDefined();
      expect(response.body.pagination).toBeDefined();
    });
  });
  
  describe('GET /api/banking/limits', () => {
    it('should get service limits', async () => {
      const response = await request(app)
        .get('/api/banking/limits')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.success).toBe(true);
      expect(response.body.limits).toBeDefined();
      expect(response.body.limits.daily).toBeDefined();
      expect(response.body.limits.transaction).toBeDefined();
    });
  });
});