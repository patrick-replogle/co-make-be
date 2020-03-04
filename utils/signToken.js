const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/secrets.js");

function signToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = {
  signToken
};
