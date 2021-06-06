/* eslint-disable global-require */
function load(router) {
  require('./config');
  return {
    routes: require('./routes')(router),
  };
}

module.exports = load;
