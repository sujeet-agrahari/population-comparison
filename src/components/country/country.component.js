const router = require('express').Router();

// middlewares
const {
  makeExpressCallback,
  makeValidatorCallback,
} = require('../../middlewares');

// controller
const controller = require('./country.controller');

// validator
const CountryValidator = require('./country.validator');

// services
const CountryService = require('./country.service');

// inject dependencies in controller methods
const getCountries = controller.getCountries({ CountryService });
const getCountryPopulationByDate = controller.getCountryPopulationByDate({ CountryService });

const CountryController = {
  getCountries,
  getCountryPopulationByDate,
};

// routes
const routes = require('./country.routes')({
  router,
  CountryValidator,
  CountryController,
  makeExpressCallback,
  makeValidatorCallback,
});

module.exports = {
  CountryService,
  CountryRoutes: routes,
};
