const axios = require('axios');
const { POPULATION_API_BASE_URL } = require('config');

const instance = axios.create({
  baseURL: POPULATION_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response.data,
  (error) => error.response.data,
);

module.exports = instance;
