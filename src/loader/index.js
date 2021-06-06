/* eslint-disable global-require */
function load(router) {
  require('./config');
  return {
    routes: require('./routes')(router),
  };
}

export default load;
