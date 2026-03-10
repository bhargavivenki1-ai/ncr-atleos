/**
 * ATM controller tests
 */

const request = require('supertest');
const app = require('../../src/server');
const { HTTP_STATUS } = require('../../src/config/constants');

describe('ATM Controller', () => {
  let authToken;
  
  beforeEach(async () => {
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({ pin: '1234' });
    
    authToken = loginResponse.body.token;
  });
  
  describe('POST /api/atm/transactions/withdrawal', () => {
    it('should stage withdrawal successfully', async () => {
      const response = await request(app)
        .post('/api/atm/transactions/withdrawal')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          cardToken: 'tok_test_card_token_12345',
          amount: 100.00
        })
        .expect(HTTP_STATUS.CREATED);
      
      expect(response.body.success).toBe(true);
      expect(response.body.transactionId).toBeDefined();
      expect(response.body.status).toBe('staged');
      expect(response.body.amount).toBe(100.00);
    });
    
    it('should reject withdrawal without card token', async () => {
      const response = await request(app)
        .post('/api/atm/transactions/withdrawal')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ amount: 100.00 })
        .expect(HTTP_STATUS.BAD_REQUEST);
      
      expect(response.body.success).toBe(false);
    });
    
    it('should reject withdrawal with invalid amount', async () => {
      const response = await request(app)
        .post('/api/atm/transactions/withdrawal')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          cardToken: 'tok_test_card_token_12345',
          amount: -50.00
        })
        .expect(HTTP_STATUS.BAD_REQUEST);
      
      expect(response.body.success).toBe(false);
    });
  });
  
  describe('POST /api/atm/transactions/deposit', () => {
    it('should stage deposit successfully', async () => {
      const response = await request(app)
        .post('/api/atm/transactions/deposit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          cardToken: 'tok_test_card_token_12345'
        })
        .expect(HTTP_STATUS.CREATED);
      
      expect(response.body.success).toBe(true);
      expect(response.body.transactionId).toBeDefined();
      expect(response.body.status).toBe('staged');
    });
    
    it('should stage deposit with amount', async () => {
      const response = await request(app)
        .post('/api/atm/transactions/deposit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          cardToken: 'tok_test_card_token_12345',
          amount: 200.00
        })
        .expect(HTTP_STATUS.CREATED);
      
      expect(response.body.success).toBe(true);
      expect(response.body.amount).toBe(200.00);
    });
  });
  
  describe('GET /api/atm/transactions', () => {
    it('should get transaction history', async () => {
      const response = await request(app)
        .get('/api/atm/transactions')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.success).toBe(true);
      expect(response.body.transactions).toBeDefined();
      expect(response.body.pagination).toBeDefined();
    });
    
    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/atm/transactions?page=1&limit=10')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
    });
  });
  
  describe('POST /api/atm/scan-card', () => {
    it('should simulate card scan successfully', async () => {
      const response = await request(app)
        .post('/api/atm/scan-card')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.success).toBe(true);
      expect(response.body.cardToken).toBeDefined();
      expect(response.body.cardDetails).toBeDefined();
    });
  });
});