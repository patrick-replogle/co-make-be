const db = require("../database/dbConfig.js");

module.exports = {
  findVotesForPost,
  findVoteById,
  addVote,
  removeVote
};

function findVotesForPost(userId, postId) {
  return db("votes")
    .where("user_id", userId)
    .andWhere("post_id", postId);
}

function findVoteById(id) {
  return db("votes")
    .where({ id })
    .first();
}

async function addVote(vote) {
  const [id] = await db("votes").insert(vote, "id");

  return findVoteById(id);
}

function removeVote(userId, postId) {
  return db("votes")
    .where("user_id", userId)
    .andWhere("post_id", postId)
    .del();
}
