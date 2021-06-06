const test = require('ava');
const request = require('supertest');
const sinon = require('sinon');
const faker = require('faker');

require('dotenv').config();

// dependency to be stubbed
const { CountryService } = require('../../../src/components/country/country.component');

// stubs
const doGetCountries = sinon.stub(CountryService, 'doGetCountries').resolves({});

const app = require('../../../src/app');

test.before(async (t) => {
  t.context.stubs = {
    doGetCountries,
  };
  t.context.baseUrl = '/api/v1/countries';
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../src/app')]; // kills server
});

test.skip('Get All Cities', async (t) => {
  const { server, baseUrl, stubs } = t.context;
  const res = await server
    .get(baseUrl)
    .expect(200);
  t.true(stubs.doGetCountries.calledOnce);
  t.true(typeof res.body === 'object');
  t.true(Array.isArray(res.body.data));
});
