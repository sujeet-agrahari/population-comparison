// load components
const countryComponent = require('../components/country/country.component');

function loadRoutes(router) {
  router.use(
    '/countries',
    countryComponent.CountryRoutes,
  );
  return router;
}

module.exports = loadRoutes;
