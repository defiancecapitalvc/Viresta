const asyncHandler = require("../middleware/asyncHandler");
const postService = require("../services/postService");

exports.list = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    categories: postService.categories(),
    posts: postService.list(req.query),
  });
});

exports.getOne = asyncHandler(async (req, res) => {
  const post = postService.getBySlug(req.params.slug);
  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }
  res.json({ success: true, post });
});
