const { log } = require('../support/logger');

module.exports = async (server) => {
  try {
    // close db connection and release other resources
    await server.stop();
    process.exit();
  } catch (error) {
    log.error(error.message);
    process.exit(1);
  }
};
