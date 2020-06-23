const db = require("../database/dbConfig.js");
const postModel = require("./post-model.js");

const payload = {
  title: "title",
  description: "new post goes here",
  city: "Portland",
  zip_code: "97219",
  user_id: 1,
};

describe("post model", () => {
  beforeEach(async () => {
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

  test("findAllPosts", async () => {
    const res = await postModel.findAllPosts();
    expect(res.length).toBe(4);
  });

  test("findPostById", async () => {
    const res = await postModel.findPostById(1);
    expect(res.city).toBe("Portland");
  });

  test("findUserPosts", async () => {
    const res = await postModel.findUserPosts(1);
    expect(res.length).toBe(1);
  });

  test("addPost", async () => {
    await postModel.addPost(payload);
    const posts = await db("posts").select();
    expect(posts).toHaveLength(5);
  });

  test("updatePost", async () => {
    await postModel.updatePost(1, payload);
    const post = await postModel.findPostById(1);
    expect(post.zip_code).toBe("97219");
  });

  test("removePost", async () => {
    await postModel.removePost(1);
    const posts = await postModel.findAllPosts();
    expect(posts).toHaveLength(3);
  });

  test("findVoteCounts", async () => {
    const res = await postModel.findVoteCount(1);
    expect(res.votes).toBe(5);
  });

  test("incrementVotes", async () => {
    await postModel.incrementVotes(1);
    const res = await postModel.findVoteCount(1);
    expect(res.votes).toBe(6);
  });

  test("decrementVotes", async () => {
    await postModel.decrementVotes(1);
    const res = await postModel.findVoteCount(1);
    expect(res.votes).toBe(4);
  });
});
