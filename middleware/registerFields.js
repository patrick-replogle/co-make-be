function registerFields(req, res, next) {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email
  ) {
    res.status(400).json({
      message:
        "username, password, first_name, last_name, and email are all required fields"
    });
  } else {
    next();
  }
}

module.exports = {
  registerFields
};
