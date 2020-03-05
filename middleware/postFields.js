function postFields(req, res, next) {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.city ||
    !req.body.zip_code
  ) {
    res.status(400).json({
      message: "title, description, city, and zip_code are all required fields"
    });
  } else {
    next();
  }
}

module.exports = {
  postFields
};
