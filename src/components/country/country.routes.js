module.exports = ({
  router,
  CountryController,
  CountryValidator,
  makeExpressCallback,
  makeValidatorCallback,
}) => {
  router.get(
    '/',
    makeExpressCallback(CountryController.getCountries),
  );

  router.get(
    '/:countryName/population/:date',
    makeValidatorCallback(CountryValidator.validateCountryNameAndDate),
    makeExpressCallback(CountryController.getCountryPopulationByDate),
  );
  return router;
};
