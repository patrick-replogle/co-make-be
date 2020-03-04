const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// const authRouter = require("../auth/auth-router.js");
// const userRouter = require("../users/user-router.js");
// const postRouter = require("../posts/post-router.js");
// const commentRouter = require("../comments/comment-router.js");
// const restricted = require("../middleware/restricted-middleware.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use("/api/auth", authRouter);
// server.use("/api/users", restricted, userRouter);
// server.use("/api/posts", restricted, postRouter);
// server.use("/api/comments", restricted, commentRouter);

server.use((err, req, res, next) => {
  console.log("Error:", err.message);
  res.status(500).json({
    message: "Something went wrong. Try again later"
  });
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "It's alive" });
});

module.exports = server;
