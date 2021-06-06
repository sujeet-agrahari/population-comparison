/* eslint-disable no-param-reassign */
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
const stubResponse = {
  total_population: {
    date: randomPastDate,
    population: randomPopulation,
  },
};
const doGetCountryPopulationByDate = sinon.stub(CountryService, 'doGetCountryPopulationByDate').resolves(stubResponse);

const app = require('../../../src/app');

test.before(async (t) => {
  t.context.stubs = {
    doGetCountryPopulationByDate,
  };
  t.context.baseUrl = '/api/v1/countries';
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../../src/app')]; // kills server
});

test('Get County Population By Date ', async (t) => {
  const { server, baseUrl, stubs } = t.context;
  const res = await server
    .get(`${baseUrl}/${randomCountryName}/population/${randomPastDate}`)
    .expect(200);
  t.true(stubs.doGetCountryPopulationByDate.calledOnce);
  t.true(typeof res.body === 'object');
  t.true(res.body.success);
  t.true(typeof res.body.data.total_population === 'object');
  t.true(Object.keys(res.body.data.total_population)
    .includes(...Object.keys(stubResponse.total_population)));
});

test('Throw validation error when date is invalid ', async (t) => {
  const { server, baseUrl } = t.context;
  const res = await server
    .get(`${baseUrl}/${randomCountryName}/population/2019-3`)
    .expect(400);
  t.true(typeof res.body === 'object');
  t.true(!res.body.success);
});
