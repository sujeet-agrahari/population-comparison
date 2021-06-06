module.exports = (controller) => async (req, res) => {
  const httpRequest = {
    ip: req.ip,
    user: req.user,
    path: req.path,
    body: req.body,
    query: req.query,
    params: req.params,
    method: req.method,
    headers: {
      Referer: req.get('referer'),
      'User-Agent': req.get('User-Agent'),
      'Content-Type': req.get('Content-Type'),
      Authorization: req.get('Authorization'),
    },
  };

  const httpResponse = await controller(httpRequest);

  if (httpResponse.headers) res.set(httpResponse.headers);

  return res.status(httpResponse.statusCode).send(httpResponse.body);
};
