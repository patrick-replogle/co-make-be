const Posts = require("../posts/post-model.js");
const jwt = require("jsonwebtoken");

async function isAuthor(req, res, next) {
  const { id } = req.params;
  const post = await Posts.findPostById(id);
  let user = jwt.decode(req.headers.authorization);

  if (!post) {
    return res
      .status(401)
      .json({ message: "The specified post id does not exist" });
  } else if (post && user && user.id === post.user_id) {
    next();
  } else {
    res.status(403).json({
      message: "You don't have permission"
    });
  }
}

module.exports = {
  isAuthor
};
