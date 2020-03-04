const Users = require("../users/user-model.js");

function isUsernameUnique(req, res, next) {
  const { username } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user) {
        res.status(422).json({ message: "username already taken" });
      } else {
        next();
      }
    });
}

function isEmailUnique(req, res, next) {
  const { email } = req.body;
  Users.findBy({ email })
    .first()
    .then(user => {
      if (user) {
        res.status(422).json({ message: "email already taken" });
      } else {
        next();
      }
    });
}

module.exports = {
  isUsernameUnique,
  isEmailUnique
};
