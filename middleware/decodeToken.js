const jwt = require("jsonwebtoken");

function decodeToken(req, res, next) {
  let decoded = jwt.decode(req.headers.authorization);
  const { id } = decoded;
  if (Number(req.params.id) === Number(id)) {
    next();
  } else {
    res.status(403).json({ message: "Permission denied" });
  }
}

module.exports = {
  decodeToken
};
