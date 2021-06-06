/* eslint-disable no-param-reassign */

const test = require('ava');
const faker = require('faker');
const request = require('supertest');

require('dotenv').config();

// dependency to be stubbed

// stubs

const app = require('../../src/app');

test.before(async (t) => {
  t.context.apiUrl = `/api/v1/${faker.random.word()}`;
  t.context.server = request(app);
});

test.after.always((t) => {
  delete require.cache[require.resolve('../../src/app')]; // kills server
});

test('Test Bad Json Handler', async (t) => {
  const { server, apiUrl } = t.context;
  const res = await server
    .get(apiUrl)
    .expect(404);
  t.true(res.status === 404);
});
