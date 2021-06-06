const populationApiRequest = require('../../support/axios/population-request');

const doGetCountries = async () => {
  const res = await populationApiRequest.get('/countries');
  return res;
};

const doGetCountryPopulationByDate = async (countryName, date) => {
  const res = await populationApiRequest.get(`/population/${countryName}/${date}`);
  return res;
};
module.exports = {
  doGetCountries,
  doGetCountryPopulationByDate,
};
