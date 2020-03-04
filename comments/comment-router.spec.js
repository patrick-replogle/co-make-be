const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

let token;

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

const editedComment = {
  text: "edited comment",
  username: "user1",
  user_id: 1,
  post_id: 1
};

// grab a token to test auth endpoint
test("should return a status 200", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({ username: "user1", password: "password" });
  token = res.body.token;
  expect(res.status).toBe(200);
});

describe("edit comment by id", () => {
  test("should return a 200 status", async () => {
    const res = await supertest(server)
      .put("/api/comments/2")
      .set("Authorization", `${token}`)
      .send(editedComment);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .put("/api/comments/2")
      .set("Authorization", `${token}`)
      .send(editedComment);
    expect(res.type).toBe("application/json");
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .put("/api/comments/2")
      .set("Authorization", `${token}`)
      .send(editedComment);
    expect(res.body.username).toBe("user1");
  });
});

describe("delete comment", () => {
  test("should return a 200 status", async () => {
    const res = await supertest(server)
      .delete("/api/comments/2")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .delete("/api/comments/2")
      .set("Authorization", `${token}`);
    expect(res.type).toBe("application/json");
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .delete("/api/comments/2")
      .set("Authorization", `${token}`);
    expect(res.body).toBe(1);
  });
});
