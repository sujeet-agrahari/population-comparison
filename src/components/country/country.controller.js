const getCountries = ({
  CountryService,
}) => async (httpRequest) => {
  const filters = httpRequest.query;
  const response = await CountryService.doGetCountries(filters);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched countries successfully!',
      data: response,
    },
  };
};

const getCountryPopulationByDate = ({
  CountryService,
}) => async (httpRequest) => {
  const { countryName, date } = httpRequest.params;
  const response = await CountryService.doGetCountryPopulationByDate(countryName, date);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: `Fetched ${countryName}'s population successfully`,
      data: response,
    },
  };
};

module.exports = {
  getCountries,
  getCountryPopulationByDate,
};
