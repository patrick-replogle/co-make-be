const db = require("../database/dbConfig.js");

module.exports = {
  findAllPosts,
  findPostById,
  findPostBy,
  findUserPosts,
  findByCity,
  addPost,
  updatePost,
  removePost,
  findVoteCount,
  incrementVotes,
  decrementVotes
};

function findAllPosts() {
  return db("posts")
    .select(
      "posts.*",
      "users.username as authorUsername",
      "users.email as authorEmail"
    )
    .join("users", "posts.user_id", "users.id");
}

function findPostById(id) {
  return db("posts")
    .select(
      "posts.*",
      "users.username as authorUsername",
      "users.email as authorEmail"
    )
    .join("users", "posts.user_id", "users.id")
    .where("posts.id", id)
    .first();
}

function findByCity(city) {
  return db("posts")
    .select(
      "posts.*",
      "users.username as authorUsername",
      "users.email as authorEmail"
    )
    .join("users", "posts.user_id", "users.id")
    .whereRaw('LOWER("city") LIKE ?', city);
}

function findPostBy(filter) {
  return db("posts")
    .select(
      "posts.*",
      "users.username as authorUsername",
      "users.email as authorEmail"
    )
    .join("users", "posts.user_id", "users.id")
    .where(filter);
}

function findUserPosts(id) {
  return db("posts")
    .select(
      "posts.*",
      "users.username as authorUsername",
      "users.email as authorEmail"
    )
    .join("users", "posts.user_id", "users.id")
    .where("user_id", id);
}

async function addPost(post) {
  const [id] = await db("posts").insert(post, "id");

  return findPostById(id);
}

function updatePost(id, changes) {
  return db("posts")
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? this.findPostById(id) : null));
}

function removePost(id) {
  return db("posts")
    .where({ id })
    .del();
}

function findVoteCount(id) {
  return db("posts")
    .select("votes")
    .where({ id })
    .first();
}

function incrementVotes(id) {
  return db("posts")
    .where({ id })
    .increment("votes", 1);
}

function decrementVotes(id) {
  return db("posts")
    .where({ id })
    .decrement("votes", 1);
}
