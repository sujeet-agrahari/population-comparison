/* eslint-disable no-param-reassign */

const test = require('ava');
const sinon = require('sinon');
const faker = require('faker');
const request = require('supertest');

require('dotenv').config();

// dependency to be stubbed
const { CountryService } = require('../../../src/components/country/country.component');

// stubs
const doGetCountries = sinon.stub(CountryService, 'doGetCountries').resolves({ countries: [faker.address.country()] });

const app = require('../../../src/app');

test.before(async (t) => {
  t.context.stubs = {
    doGetCountries,
  };
  t.context.apiUrl = '/api/v1/countries';
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../../src/app')]; // kills server
});

test('Fetch All Countries', async (t) => {
  const { server, apiUrl, stubs } = t.context;
  const res = await server
    .get(apiUrl)
    .expect(200);
  t.true(stubs.doGetCountries.calledOnce);
  t.true(typeof res.body === 'object');
  t.true(Array.isArray(res.body.data.countries));
  t.true(res.body.data.countries.length > 0);
});
