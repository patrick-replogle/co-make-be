const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./user-model.js");
const { updateUser } = require("../middleware/updateUser.js");
const { decodeToken } = require("../middleware/decodeToken.js");
const {
  isUsernameUnique,
  isEmailUnique,
} = require("../middleware/isUserUnique.js");

// find user by id
router.get("/:id", decodeToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "The specified user id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

// update user
router.put(
  "/:id",
  decodeToken,
  isUsernameUnique,
  isEmailUnique,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const user = await Users.findById(id);

      if (user) {
        res.json(await Users.update(id, payload));
      } else {
        res
          .status(404)
          .json({ message: "The specified user id does not exist" });
      }
    } catch (err) {
      next(err);
    }
  }
);

// delete user
router.delete("/:id", decodeToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await Users.remove(id);
    if (removed) {
      res.json({
        message: "User account successfully deleted",
        removed: removed,
      });
    } else {
      res.status(404).json({ message: "The specified user id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
