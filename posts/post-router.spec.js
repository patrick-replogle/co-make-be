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

const newPost = {
  title: "title",
  description: "test post",
  city: "Portland",
  zip_code: "97219",
  user_id: 1
};

const newComment = {
  text: "new comment",
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

describe("get all posts", () => {
  test("should return a 200 status", async () => {
    const res = await supertest(server)
      .get("/api/posts")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .get("/api/posts")
      .set("Authorization", `${token}`);
    expect(res.type).toBe("application/json");
  });

  test("res length should 4", async () => {
    const res = await supertest(server)
      .get("/api/posts")
      .set("Authorization", `${token}`);
    expect(res.body).toHaveLength(4);
  });
});

describe("get all posts with comments", () => {
  test("should return a 200 status", async () => {
    const res = await supertest(server)
      .get("/api/posts/comments")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("res length should 4", async () => {
    const res = await supertest(server)
      .get("/api/posts/comments")
      .set("Authorization", `${token}`);
    expect(res.body).toHaveLength(4);
  });
});

describe("get post by id", () => {
  test("should return a 200 status", async () => {
    const res = await supertest(server)
      .get("/api/posts/1")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .get("/api/posts/1")
      .set("Authorization", `${token}`);
    expect(res.type).toBe("application/json");
  });

  test("city should be Portland", async () => {
    const res = await supertest(server)
      .get("/api/posts/1")
      .set("Authorization", `${token}`);
    expect(res.body.city).toBe("Portland");
  });
});

describe("get posts by logged in user", () => {
  test("should return a 200 status", async () => {
    const res = await supertest(server)
      .get("/api/posts/by/user")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .get("/api/posts/by/user")
      .set("Authorization", `${token}`);
    expect(res.type).toBe("application/json");
  });

  test("city should be Portland", async () => {
    const res = await supertest(server)
      .get("/api/posts/by/user")
      .set("Authorization", `${token}`);
    expect(res.body).toHaveLength(1);
  });
});

describe("add post", () => {
  test("should return a 201 status", async () => {
    const res = await supertest(server)
      .post("/api/posts")
      .set("Authorization", `${token}`)
      .send(newPost);
    expect(res.status).toBe(201);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .post("/api/posts")
      .set("Authorization", `${token}`)
      .send(newPost);
    expect(res.type).toBe("application/json");
  });

  test("returned id should be 5", async () => {
    const res = await supertest(server)
      .post("/api/posts")
      .set("Authorization", `${token}`)
      .send(newPost);
    expect(res.body.id).toBe(5);
  });
});

describe("update a post", () => {
  test("should return a 201 status", async () => {
    const res = await supertest(server)
      .put("/api/posts/1")
      .set("Authorization", `${token}`)
      .send(newPost);
    expect(res.status).toBe(201);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .put("/api/posts/1")
      .set("Authorization", `${token}`)
      .send(newPost);
    expect(res.type).toBe("application/json");
  });

  test("returned id should be 5", async () => {
    const res = await supertest(server)
      .put("/api/posts/1")
      .set("Authorization", `${token}`)
      .send(newPost);
    expect(res.body.id).toBe(1);
  });
});

describe("delete post", () => {
  test("should return a 200 status", async () => {
    const res = await supertest(server)
      .delete("/api/posts/1")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .delete("/api/posts/1")
      .set("Authorization", `${token}`);
    expect(res.type).toBe("application/json");
  });

  test("should delete one row", async () => {
    const res = await supertest(server)
      .delete("/api/posts/1")
      .set("Authorization", `${token}`);
    expect(res.body.deleted).toBe(1);
  });
});

describe("decrement votes", () => {
  test("should return a 200 status", async () => {
    const res = await supertest(server)
      .put("/api/posts/1/decrement/votes")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .put("/api/posts/1/decrement/votes")
      .set("Authorization", `${token}`);
    expect(res.type).toBe("application/json");
  });

  test("votes should be 4", async () => {
    const res = await supertest(server)
      .put("/api/posts/1/decrement/votes")
      .set("Authorization", `${token}`);
    expect(res.body.votes).toBe(4);
  });
});

describe("add comment to post", () => {
  test("should return a 200 status", async () => {
    const res = await supertest(server)
      .post("/api/posts/1/comments")
      .set("Authorization", `${token}`)
      .send(newComment);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .post("/api/posts/1/comments")
      .set("Authorization", `${token}`)
      .send(newComment);
    expect(res.type).toBe("application/json");
  });

  test("should return a new comment", async () => {
    const res = await supertest(server)
      .post("/api/posts/1/comments")
      .set("Authorization", `${token}`)
      .send(newComment);
    expect(res.body.text).toBe("new comment");
  });
});

describe("get all comments for a post", () => {
  test("should return a 200 status", async () => {
    const res = await supertest(server)
      .get("/api/posts/1/comments")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .get("/api/posts/1/comments")
      .set("Authorization", `${token}`);
    expect(res.type).toBe("application/json");
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .get("/api/posts/1/comments")
      .set("Authorization", `${token}`);
    expect(res.body).toHaveLength(1);
  });
});
