const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Posts = require("./post-model.js");
const Comments = require("../comments/comment-model.js");

const { postFields } = require("../middleware/postFields.js");
const { verifyVotes } = require("../middleware/verifyVotes.js");
const { isAuthor } = require("../middleware/isAuthor.js");
const { verifyComment } = require("../middleware/verifyComment.js");

// get all posts without comments
router.get("/", async (req, res, next) => {
  try {
    res.json(await Posts.findAllPosts());
  } catch (err) {
    next(err);
  }
});

// get all posts with comments
router.get("/comments", async (req, res, next) => {
  try {
    const posts = await Posts.findAllPosts();
    const result = posts.map(async post => {
      const comments = await Comments.findComments(post.id);
      return {
        ...post,
        comments: [...comments]
      };
    });
    const newRes = await Promise.all(result);
    res.json(newRes);
  } catch (err) {
    next(err);
  }
});

// search posts by city
router.post("/city", async (req, res, next) => {
  try {
    if (!req.body.city) {
      return res.status(400).json({ message: "City field must by included" });
    }
    const { city } = req.body;
    const posts = await Posts.findByCity(city.toLowerCase());
    if (posts.length > 0) {
      res.json(posts);
    } else {
      res.status(401).json({
        message: "There are currently no posts with the specified city"
      });
    }
  } catch (err) {
    next(err);
  }
});

// search posts by zip code
router.post("/zipcode", async (req, res, next) => {
  try {
    if (!req.body.zip_code) {
      return res
        .status(400)
        .json({ message: "zip_code field must be included" });
    }
    const { zip_code } = req.body;
    const posts = await Posts.findPostBy({ zip_code });
    if (posts.length > 0) {
      res.json(posts);
    } else {
      res.status(401).json({
        message: "There are currently no posts with specified zip_cod"
      });
    }
  } catch (err) {
    next(err);
  }
});

// get post by post id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Posts.findPostById(id);
    const comments = await Comments.findComments(id);

    if (post) {
      res.status(200).json({
        ...post,
        comments: [...comments]
      });
    } else {
      res.status(401).json({ message: "The specified post id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

// get posts created by user that is logged in
router.get("/by/user", async (req, res, next) => {
  try {
    let decoded = jwt.decode(req.headers.authorization);
    const { id } = decoded;

    const posts = await Posts.findUserPosts(id);
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(401).json({ message: "This user has no posts" });
    }
  } catch (err) {
    next(err);
  }
});

// add post
router.post("/", postFields, async (req, res, next) => {
  try {
    let decoded = jwt.decode(req.headers.authorization);
    const { id } = decoded;

    const payload = {
      title: req.body.title,
      description: req.body.description,
      city: req.body.city,
      zip_code: req.body.zip_code,
      user_id: id,
      post_image_url: req.body.post_image_url
    };

    res.status(201).json(await Posts.addPost(payload));
  } catch (err) {
    next(err);
  }
});

// update a post
router.put("/:id", postFields, isAuthor, async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = {
      title: req.body.title,
      description: req.body.description,
      city: req.body.city,
      zip_code: req.body.zip_code,
      post_image_url: req.body.post_image_url
    };

    res.status(201).json(await Posts.updatePost(id, payload));
  } catch (err) {
    next(err);
  }
});

// delete a post
router.delete("/:id", isAuthor, async (req, res, next) => {
  try {
    const { id } = req.params;
    const removed = await Posts.removePost(id);
    if (removed) {
      res.json({ message: "Post successfully removed", deleted: removed });
    } else {
      res.status(401).json({ message: "The specified post id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

// increment votes on a post
router.put("/:id/increment/votes", verifyVotes, async (req, res, next) => {
  try {
    const { id } = req.params;
    const increment = await Posts.incrementVotes(id);
    if (increment) {
      res.json(await Posts.findPostById(id));
    } else {
      res
        .status(401)
        .json({ message: "The specfified Post id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

// decrement votes on a post
router.put("/:id/decrement/votes", verifyVotes, async (req, res, next) => {
  try {
    const { id } = req.params;
    const count = await Posts.findVoteCount(id);
    if (count.votes > 0) {
      await Posts.decrementVotes(id);
      res.json(await Posts.findPostById(id));
    } else {
      res.json(await Posts.findPostById(id));
    }
  } catch (err) {
    next(err);
  }
});

// add a comment to a post
router.post("/:id/comments", verifyComment, async (req, res, next) => {
  try {
    const user = jwt.decode(req.headers.authorization);
    const payload = {
      text: req.body.text,
      username: user.username,
      user_id: user.id,
      post_id: req.params.id
    };
    res.json(await Comments.addComment(payload));
  } catch (err) {
    next(err);
  }
});

// get all comments for a post
router.get("/:id/comments", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findPostById(id);
    if (post) {
      res.json(await Comments.findComments(id));
    } else {
      res.status(401).json({ message: "The specified post id does not exist" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
