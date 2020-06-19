function updateUser(req, res, next) {
  if (
    !req.body.username ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email
  ) {
    res.status(400).json({
      message:
        "username, first name, last name, and email are all required fields",
    });
  } else {
    next();
  }
}

module.exports = {
  updateUser,
};
