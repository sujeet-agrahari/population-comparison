const Joi = require('../../support/validator');

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateCountryNameAndDate = (httpRequest) => {
  const schema = Joi.object({
    countryName: Joi.string().required(),
    date: Joi.date()
      .format('YYYY-MM-DD')
      .messages({
        'date.format': 'Date must be in yyyy-mm-dd format!',
      }),
  });
  return schema.validate(httpRequest.params, options);
};

module.exports = {
  validateCountryNameAndDate,
};
