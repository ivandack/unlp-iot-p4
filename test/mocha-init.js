/**
 * Global initialization for Mocha tests.
 */
const logger = require('../src/lib/logger');

// Silences the logger for the tests.
logger.transports.forEach((transport) => {
  transport.silent = true;
});
