/**
 * Jest global setup
 * Runs once before all tests
 */

const { MongoMemoryServer } = require('mongodb-memory-server');

module.exports = async () => {
  // Start in-memory MongoDB for testing
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  
  // Store the URI and server instance for cleanup
  process.env.MONGODB_TEST_URI = uri;
  global.__MONGOD__ = mongod;
  
  console.log('Test MongoDB started at:', uri);
};