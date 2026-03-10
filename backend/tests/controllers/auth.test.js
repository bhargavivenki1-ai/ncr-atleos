/**
 * Authentication controller tests
 */

const request = require('supertest');
const app = require('../../src/server');
const { HTTP_STATUS } = require('../../src/config/constants');

describe('Authentication Controller', () => {
  describe('POST /api/auth/login', () => {
    it('should login with valid PIN', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ pin: '1234' })
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
      expect(response.body.user).toBeDefined();
    });
    
    it('should reject invalid PIN', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ pin: '0000' })
        .expect(HTTP_STATUS.UNAUTHORIZED);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error.message).toContain('incorrect');
    });
    
    it('should reject malformed PIN', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ pin: '123' })
        .expect(HTTP_STATUS.BAD_REQUEST);
      
      expect(response.body.success).toBe(false);
    });
    
    it('should reject missing PIN', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({})
        .expect(HTTP_STATUS.BAD_REQUEST);
      
      expect(response.body.success).toBe(false);
    });
  });
  
  describe('POST /api/auth/logout', () => {
    let authToken;
    
    beforeEach(async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ pin: '1234' });
      
      authToken = loginResponse.body.token;
    });
    
    it('should logout successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.success).toBe(true);
    });
    
    it('should reject logout without token', async () => {
      await request(app)
        .post('/api/auth/logout')
        .expect(HTTP_STATUS.UNAUTHORIZED);
    });
  });
  
  describe('GET /api/auth/validate', () => {
    let authToken;
    
    beforeEach(async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({ pin: '1234' });
      
      authToken = loginResponse.body.token;
    });
    
    it('should validate valid token', async () => {
      const response = await request(app)
        .get('/api/auth/validate')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.success).toBe(true);
      expect(response.body.valid).toBe(true);
    });
    
    it('should reject invalid token', async () => {
      await request(app)
        .get('/api/auth/validate')
        .set('Authorization', 'Bearer invalid-token')
        .expect(HTTP_STATUS.UNAUTHORIZED);
    });
  });
});