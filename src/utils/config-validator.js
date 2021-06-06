const Joi = require('../support/validator');

function validateConfig(configs) {
  const schema = Joi.object({
    PORT: Joi.number().port().required(),
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    API_PREFIX: Joi.string().valid('/api/v1'),
  }).unknown(true);
  return schema.validate(configs);
}

module.exports = validateConfig;
