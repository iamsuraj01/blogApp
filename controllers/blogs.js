const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response, next) => {
  const blogs = Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.author,
    likes: body.likes,
  });
  const savedBlog = await blog.save();
  response.json(savedBlog);
});

module.exports = blogsRouter;
