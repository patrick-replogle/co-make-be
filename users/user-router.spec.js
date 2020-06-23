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

const editedUser = {
  username: "editeduser",
  first_name: "John",
  last_name: "Doe",
  email: "editeduser@gmail.com",
  password: "password",
  city: "Portland",
  zip_code: "97206",
};

// grab a token to test auth endpoint
test("should return a status 200", async () => {
  const res = await supertest(server)
    .post("/api/auth/login")
    .send({ username: "user1", password: "password" });
  token = res.body.token;
  expect(res.status).toBe(200);
});

describe("get user by id endpoint", () => {
  test("should return a status 200", async () => {
    const res = await supertest(server)
      .get("/api/users/1")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .get("/api/users/1")
      .set("Authorization", `${token}`);
    expect(res.type).toBe("application/json");
  });

  test("should return a username", async () => {
    const res = await supertest(server)
      .get("/api/users/1")
      .set("Authorization", `${token}`);
    expect(res.body.username).toBe("user1");
  });
});

describe("edit user endpoint", () => {
  test("should return a status 200", async () => {
    const res = await supertest(server)
      .put("/api/users/1")
      .send(editedUser)
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .put("/api/users/1")
      .send(editedUser)
      .set("Authorization", `${token}`);
    expect(res.type).toBe("application/json");
  });

  test("should return updated username", async () => {
    const res = await supertest(server)
      .put("/api/users/1")
      .send(editedUser)
      .set("Authorization", `${token}`);
    expect(res.body.username).toBe("editeduser");
  });
});

describe("delete user endpoint", () => {
  test("should return a status 200", async () => {
    const res = await supertest(server)
      .delete("/api/users/1")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
  });

  test("should return json", async () => {
    const res = await supertest(server)
      .delete("/api/users/1")
      .set("Authorization", `${token}`);
    expect(res.type).toBe("application/json");
  });

  test("should return a message", async () => {
    const res = await supertest(server)
      .delete("/api/users/1")
      .set("Authorization", `${token}`);
    expect(res.body.message).toBe("User account successfully deleted");
  });
});
