/* eslint-disable no-console */
const stoppable = require('stoppable');

const { PORT } = process.env;

const app = require('./app');

const normalizePort = require('./utils/normalize-port');

const gracefulShutdown = require('./utils/graceful-shutdown');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(PORT || '3000');

/**
 * Create HTTP server.
 */

const server = stoppable(app.listen(port));

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(
    `Listening on ${bind} in ${process.env.NODE_ENV} environment...`,
  );
}

// quit on ctrl+c when running docker in terminal
process.on('SIGINT', async () => {
  console.info(
    'Got SIGINT (aka ctrl+c in docker). Graceful shutdown initiated!',
    new Date().toISOString(),
  );
  await gracefulShutdown(server);
});

// quit properly on docker stop
process.on('SIGTERM', async () => {
  console.log(
    'Got SIGTERM (docker container stop). \n Graceful shutdown initiated!',
    new Date().toISOString(),
  );
  await gracefulShutdown(server);
});
