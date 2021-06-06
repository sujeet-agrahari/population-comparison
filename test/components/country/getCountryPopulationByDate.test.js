const test = require('ava');
const request = require('supertest');
const sinon = require('sinon');
const faker = require('faker');

require('dotenv').config();

// dependency to be stubbed
const { CountryService } = require('../../../src/components/country/country.component');

const randomCountryName = faker.address.country();
const randomPopulation = faker.datatype.number(99999999999);
const randomPastDate = faker.date.past().toISOString().split('T')[0];

const doGetCountryPopulationByDate = sinon.stub(CountryService, 'doGetCountryPopulationByDate').resolves({
  total_population: {
    date: randomPastDate,
    population: randomPopulation,
  },
});

const app = require('../../../src/app');

test.before(async (t) => {
  t.context.stubs = {
    doGetCountryPopulationByDate,
  };
  t.context.apiUrl = `/api/v1/countries/${randomCountryName}/population/${randomPastDate}`;
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../../src/app')]; // kills server
});

test('Get ', async (t) => {
  const { server, apiUrl, stubs } = t.context;
  const res = await server
    .get(apiUrl)
    .expect(200);
  t.true(stubs.doGetCountryPopulationByDate.calledOnce);
  t.true(typeof res.body === 'object');
  t.true(res.body.success);
  t.true(typeof res.body.data.total_population === 'object');
});
