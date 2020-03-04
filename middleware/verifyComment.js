const Posts = require("../posts/post-model.js");

async function verifyComment(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({ message: "username and password fields required " });
  }
  const post = await Posts.findPostById(req.params.id);
  if (!post) {
    res.status(401).json({ message: "The specified post id does not exist" });
  } else {
    next();
  }
}

module.exports = {
  verifyComment
};
