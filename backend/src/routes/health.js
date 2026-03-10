/**
 * Health check routes
 * Provides system health and status endpoints
 */

const express = require('express');
const { getConnectionStatus } = require('../config/database');
const logger = require('../utils/logger');
const { HTTP_STATUS } = require('../config/constants');

const router = express.Router();

/**
 * Basic health check
 * GET /api/health
 */
router.get('/', (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    services: {
      api: 'healthy',
      database: getConnectionStatus()
    }
  };
  
  logger.info('Health check requested', {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  res.status(HTTP_STATUS.OK).json(healthCheck);
});

/**
 * Detailed health check
 * GET /api/health/detailed
 */
router.get('/detailed', (req, res) => {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();
  
  const detailedHealth = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: process.uptime(),
      formatted: formatUptime(process.uptime())
    },
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    node: {
      version: process.version,
      platform: process.platform,
      arch: process.arch
    },
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
    },
    cpu: {
      user: cpuUsage.user,
      system: cpuUsage.system
    },
    services: {
      api: {
        status: 'healthy',
        responseTime: '< 100ms'
      },
      database: {
        status: getConnectionStatus(),
        type: 'MongoDB'
      },
      externalServices: {
        atmStagingService: process.env.USE_MOCK_SERVICES === 'true' ? 'mock' : 'unknown',
        coreBankingService: process.env.USE_MOCK_SERVICES === 'true' ? 'mock' : 'unknown',
        visionService: process.env.USE_MOCK_SERVICES === 'true' ? 'mock' : 'unknown'
      }
    },
    configuration: {
      port: process.env.PORT || 3001,
      logLevel: process.env.LOG_LEVEL || 'info',
      useMockServices: process.env.USE_MOCK_SERVICES === 'true',
      jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
    }
  };
  
  logger.info('Detailed health check requested', {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  res.status(HTTP_STATUS.OK).json(detailedHealth);
});

/**
 * Readiness check
 * GET /api/health/ready
 */
router.get('/ready', (req, res) => {
  const dbStatus = getConnectionStatus();
  const isReady = dbStatus === 'connected';
  
  const readinessCheck = {
    status: isReady ? 'READY' : 'NOT_READY',
    timestamp: new Date().toISOString(),
    checks: {
      database: {
        status: dbStatus,
        required: true,
        passed: dbStatus === 'connected'
      },
      environment: {
        status: 'OK',
        required: true,
        passed: true
      }
    }
  };
  
  const statusCode = isReady ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE;
  
  logger.info('Readiness check requested', {
    ready: isReady,
    dbStatus,
    ip: req.ip
  });
  
  res.status(statusCode).json(readinessCheck);
});

/**
 * Liveness check
 * GET /api/health/live
 */
router.get('/live', (req, res) => {
  const livenessCheck = {
    status: 'ALIVE',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    pid: process.pid
  };
  
  res.status(HTTP_STATUS.OK).json(livenessCheck);
});

/**
 * Service status check
 * GET /api/health/services
 */
router.get('/services', async (req, res) => {
  const services = {
    database: {
      name: 'MongoDB',
      status: getConnectionStatus(),
      lastChecked: new Date().toISOString()
    },
    atmStagingService: {
      name: 'ATM Staging Service',
      status: process.env.USE_MOCK_SERVICES === 'true' ? 'mock' : 'unknown',
      url: process.env.ATM_STAGING_SERVICE_URL || 'not configured',
      lastChecked: new Date().toISOString()
    },
    coreBankingService: {
      name: 'Core Banking Service',
      status: process.env.USE_MOCK_SERVICES === 'true' ? 'mock' : 'unknown',
      url: process.env.CORE_BANKING_SERVICE_URL || 'not configured',
      lastChecked: new Date().toISOString()
    },
    visionService: {
      name: 'On-Device Vision Service',
      status: process.env.USE_MOCK_SERVICES === 'true' ? 'mock' : 'unknown',
      url: process.env.ON_DEVICE_VISION_SERVICE_URL || 'not configured',
      lastChecked: new Date().toISOString()
    }
  };
  
  // TODO: Add actual service health checks for external services
  // This would involve making HTTP requests to each service's health endpoint
  
  const allServicesHealthy = Object.values(services).every(
    service => ['connected', 'mock', 'healthy'].includes(service.status)
  );
  
  const response = {
    status: allServicesHealthy ? 'HEALTHY' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    services
  };
  
  const statusCode = allServicesHealthy ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE;
  
  logger.info('Services health check requested', {
    allHealthy: allServicesHealthy,
    services: Object.keys(services),
    ip: req.ip
  });
  
  res.status(statusCode).json(response);
});

/**
 * Format uptime in human readable format
 * @param {number} seconds - Uptime in seconds
 * @returns {string} Formatted uptime
 */
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);
  
  return parts.join(' ') || '0s';
}

module.exports = router;