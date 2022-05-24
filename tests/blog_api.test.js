const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./helping_test");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blogs");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("the blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});
afterAll(() => {
  mongoose.connection.close();
});
