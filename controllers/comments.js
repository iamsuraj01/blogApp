const commentsRouter = require("express").Router();
const Comment = require("../models/comment");

commentsRouter.get("/:id/comments", async (request, response, next) => {
  try {
    const comments = await Comment.find({ blog_id: request.params.id });

    response.json(comments);
  } catch (error) {
    next(error);
  }
});

commentsRouter.post("/:id/comments", async (request, response, next) => {
  try {
    const comment = new Comment({
      comment: request.body.comment,
      blog_id: request.params.id,
    });
    const newComment = await comment.save();

    response.send(newComment);
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
