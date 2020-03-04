const router = require("express").Router();

const Comments = require("./comment-model.js");
const { verifyCommentAuthor } = require("../middleware/verifyCommentAuthor.js");

// edit comment by comment id
router.put("/:id", verifyCommentAuthor, async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(400).json({ message: "text is a required field" });
    }

    const { id } = req.params;
    const payload = req.body;

    res.json(await Comments.updateComment(id, payload));
  } catch (err) {
    next(err);
  }
});

// delete comment by comment id
router.delete("/:id", verifyCommentAuthor, async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await Comments.removeComment(id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
