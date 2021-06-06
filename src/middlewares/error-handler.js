const { APIError } = require('../utils/api-errors');
const { log, logToFile } = require('../support/logger');

module.exports = async (err, req, res, next) => {
  // log any kind of error
  const errorData = {
    date: new Date().toISOString(),
    env: process.env.NODE_ENV,
    level: 'error',
    name: err.name,
    message: err.message,
    api: req.url,
    method: req.method,
    stack: err.stack,
    body: req.body,
    client: req.ip,
  };
  if (process.env.NODE_ENV === 'production') {
    logToFile.log(errorData);
  } else {
    console.log(err);
    log.error(err);
  }

  // catch all else api errors
  if (err instanceof APIError) {
    return res
      .status(err.status)
      .send({
        success: false,
        message: err.message,
      });
  }
  // connect all errors
  return res.status(500).send({
    success: false,
    message: 'Something went wrong!',
  });
};
