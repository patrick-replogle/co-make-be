const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/user-model.js");

const {
  isUsernameUnique,
  isEmailUnique,
} = require("../middleware/isUserUnique.js");
const { loginFields } = require("../middleware/loginFields.js");
const { registerFields } = require("../middleware/registerFields.js");
const { signToken } = require("../utils/signToken.js");

// register a new user
router.post(
  "/register",
  registerFields,
  isUsernameUnique,
  isEmailUnique,
  async (req, res, next) => {
    try {
      let user = req.body;
      const hash = bcrypt.hashSync(user.password, 10);
      user.password = hash;

      const newUser = await Users.add(user);
      stringifyPhoto(newUser);
      const token = signToken(newUser);

      res.status(201).json({ new_user: newUser, token: token });
    } catch (err) {
      next(err);
    }
  }
);

// user login route
router.post("/login", loginFields, async (req, res, next) => {
  try {
    let { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = signToken(user);

      res.status(200).json({
        id: user.id,
        username: user.username,
        message: `Welcome ${user.username}!`,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
