module.exports = (req, res) => res.status(404).send({
  success: false,
  message: `Sorry, requested URL ${req.method} ${req.url} not found!`,
});
