const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
	const body = request.body;

	const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	});

	const savedBlogs = await blog.save();
	response.json(savedBlogs);
});
module.exports = blogsRouter;
