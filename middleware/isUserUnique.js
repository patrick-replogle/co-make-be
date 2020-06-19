const Users = require("../users/user-model.js");

function isUsernameUnique(req, res, next) {
  if (req.body.username) {
    const { username } = req.body;
    Users.findBy({ username })
      .first()
      .then((user) => {
        if (user) {
          res.status(422).json({ message: "username already taken" });
        } else {
          next();
        }
      });
  } else {
    next();
  }
}

function isEmailUnique(req, res, next) {
  if (req.body.email) {
    const { email } = req.body;
    Users.findBy({ email })
      .first()
      .then((user) => {
        if (user) {
          res.status(422).json({ message: "email already taken" });
        } else {
          next();
        }
      });
  } else {
    next();
  }
}

module.exports = {
  isUsernameUnique,
  isEmailUnique,
};
