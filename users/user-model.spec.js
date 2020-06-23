const db = require("../database/dbConfig.js");
const userModel = require("./user-model.js");

const newUser = {
  username: "user5",
  first_name: "John",
  last_name: "Doe",
  email: "user5@gmail.com",
  password: "password",
  city: "Portland",
  zip_code: "97206",
};

describe("user model", () => {
  beforeEach(async () => {
    await db.seed.run();
  });

  afterAll(async () => {
    await db.destroy();
  });

  test("find", async () => {
    const res = await userModel.find();
    expect(res.length).toBe(4);
  });

  test("findById", async () => {
    const res = await userModel.findById(1);
    expect(res.username).toBe("user1");
  });

  test("add", async () => {
    await userModel.add(newUser);
    const users = await db("users").select();
    expect(users).toHaveLength(5);
  });

  test("update", async () => {
    await userModel.update(1, newUser);
    const user = await userModel.findById(1);
    expect(user.username).toBe("user5");
  });

  test("remove", async () => {
    await userModel.remove(1);
    const users = await userModel.find();
    expect(users).toHaveLength(3);
  });
});
