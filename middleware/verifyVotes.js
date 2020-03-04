const Posts = require("../posts/post-model.js");

async function verifyVotes(req, res, next) {
  const { id } = req.params;
  const post = await Posts.findPostById(id);
  if (post) {
    next();
  } else {
    res.status(401).json({
      message: "The specified post id does not exist"
    });
  }
}

module.exports = {
  verifyVotes
};
