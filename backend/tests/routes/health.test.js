/**
 * Health routes tests
 */

const request = require('supertest');
const app = require('../../src/server');
const { HTTP_STATUS } = require('../../src/config/constants');

describe('Health Routes', () => {
  describe('GET /api/health', () => {
    it('should return basic health check', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.status).toBe('OK');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.uptime).toBeDefined();
      expect(response.body.services).toBeDefined();
    });
  });
  
  describe('GET /api/health/detailed', () => {
    it('should return detailed health information', async () => {
      const response = await request(app)
        .get('/api/health/detailed')
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.status).toBe('OK');
      expect(response.body.memory).toBeDefined();
      expect(response.body.cpu).toBeDefined();
      expect(response.body.services).toBeDefined();
      expect(response.body.configuration).toBeDefined();
    });
  });
  
  describe('GET /api/health/ready', () => {
    it('should return readiness status', async () => {
      const response = await request(app)
        .get('/api/health/ready')
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.status).toBeDefined();
      expect(response.body.checks).toBeDefined();
    });
  });
  
  describe('GET /api/health/live', () => {
    it('should return liveness status', async () => {
      const response = await request(app)
        .get('/api/health/live')
        .expect(HTTP_STATUS.OK);
      
      expect(response.body.status).toBe('ALIVE');
      expect(response.body.uptime).toBeDefined();
      expect(response.body.pid).toBeDefined();
    });
  });
});
