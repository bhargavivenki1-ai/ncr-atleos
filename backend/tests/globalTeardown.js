/**
 * Jest global teardown
 * Runs once after all tests
 */

module.exports = async () => {
  // Stop in-memory MongoDB
  if (global.__MONGOD__) {
    await global.__MONGOD__.stop();
    console.log('Test MongoDB stopped');
  }
};