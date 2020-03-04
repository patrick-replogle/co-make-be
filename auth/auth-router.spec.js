const supertest = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

const newUser = {
  username: "user5",
  first_name: "John",
  last_name: "Doe",
  email: "fakeuser5@gmail.com",
  password: "password",
  profile_image_url: "http://somethinggoeshere.com"
};

describe("register endpoint", () => {
  test("should return a status 201", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.status).toBe(201);
  });

  test("response type should be json", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.type).toBe("application/json");
  });

  test("should return a username", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send(newUser);
    expect(res.body.new_user.username).toBe("user5");
  });
});

describe("login endpoint", () => {
  test("should return a status 200", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "user1", password: "password" });
    expect(res.status).toBe(200);
  });

  test("response type should be json", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "user1", password: "password" });
    expect(res.type).toBe("application/json");
  });

  test("should return a message", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "user1", password: "password" });
    expect(res.body.message).toBe("Welcome user1!");
  });
});
