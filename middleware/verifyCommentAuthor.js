const Comments = require("../comments/comment-model.js");
const jwt = require("jsonwebtoken");

async function verifyCommentAuthor(req, res, next) {
  const { id } = req.params;
  const user = jwt.decode(req.headers.authorization);
  const comment = await Comments.findCommentById(id);

  if (!comment) {
    res
      .status(401)
      .json({ message: "The specified comment id does not exist" });
  } else if (user.id !== comment.user_id) {
    res.status(403).json({ message: "Permission denied" });
  } else {
    next();
  }
}

module.exports = {
  verifyCommentAuthor
};
