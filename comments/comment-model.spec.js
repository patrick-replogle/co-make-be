const db = require("../database/dbConfig.js");
const commentModel = require("./comment-model.js");

const newComment = {
  text: "new comment",
  username: "user1",
  user_id: 1,
  post_id: 1
};

describe("comment model", () => {
  beforeEach(async () => {
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

  test("find comments", async () => {
    const res = await commentModel.findComments(1);
    expect(res.length).toBe(1);
  });

  test("find comment by id", async () => {
    const res = await commentModel.findCommentById(1);
    expect(res.username).toBe("user2");
  });

  test("add comment", async () => {
    const res = await commentModel.addComment(newComment);
    expect(res.id).toBe(5);
  });

  test("update comment", async () => {
    await commentModel.updateComment(1, newComment);
    const comment = await commentModel.findCommentById(1);
    expect(comment.username).toBe("user1");
  });

  test("remove comment", async () => {
    await commentModel.removeComment(1);
    const comments = await commentModel.findComments(1);
    expect(comments).toHaveLength(0);
  });
});
