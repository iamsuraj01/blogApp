const supertest = require("supertest");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./helping_test");
const app = require("../app");
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("user should have atleast 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "su",
      name: "Superuser",
      password: "password",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      `is shorter than the minimum allowed length (3).`
    );
    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("password should be more than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "suraj",
      name: "Superuser",
      password: "su",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain(
      `is shorter than the minimum allowed length (3).`
    );
    const usersAtEnd = await helper.usersInDb();

    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("duplicate username not allowed", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);
    expect(result.body.error).toContain("username must be unique");
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
