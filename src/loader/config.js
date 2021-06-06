const config = require('config');
const validateConfig = require('../utils/config-validator');

if (process.env.NODE_ENV) {
  const { error } = validateConfig(config);
  if (error) {
    throw new Error(error.message);
  }
  console.log('Configs loaded successfully!');
}
