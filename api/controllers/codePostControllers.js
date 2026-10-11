const {
  create,
  findByEmail,
  find,
  findById,
  findBySlug,
  updateByIdAndSecret,
  deleteByIdAndSecret,
} = require("../querys/querys");
const asyncHandler = require("../utils/asyncHandler");
const generateUnixTimestamp = require("../utils/generateUnixTimestamp");
const generateUniqueId = require("../utils/generateUniqueId ");
const generateSlug = require("../utils/generateSlug");

const createPost = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ message: "A title is required." });
  }

  try {
    const newPost = await create({
      ...req.body,
      title: title.trim(),
      slug: generateSlug(title),
      timestamp: generateUnixTimestamp(),
      secret: generateUniqueId(),
    });

    res
      .status(201)
      .json({ message: "Post created successfully.", data: newPost });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Title already exists." });
    }
    next(error);
  }
});

const getPosts = asyncHandler(async (req, res, next) => {
  const result = await find();
  res.status(200).json(result);
});

const getPostById = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const result = await findById(postId);
  if (!result) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json(result);
});

const getPostBySlug = asyncHandler(async (req, res) => {
  const result = await findBySlug(req.params.slug);
  if (!result) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json(result);
});

const updatePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { secret } = req.body; // `secret` from the request body
  const updateData = { ...req.body };
  if (typeof updateData.title === "string") {
    updateData.title = updateData.title.trim();
    updateData.slug = generateSlug(updateData.title);
  }

  const post = await findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found!" });
  }

  let result;
  try {
    result = await updateByIdAndSecret(updateData, postId, secret);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Title already exists." });
    }
    next(error);
    return;
  }

  if (!result) {
    return res
      .status(400)
      .json({ message: "Invalid secret or no changes were made." });
  }

  res.status(200).json({ message: "Post updated successfully.", data: result });
});

const deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { secret } = req.body; //  `secret` from the request body

  const result = await deleteByIdAndSecret(postId, secret);

  if (result.affectedRows === 0) {
    return res
      .status(404)
      .json({ message: "Post not found or invalid secret." });
  }

  res.status(200).json({ message: "Post deleted successfully." });
});

module.exports = {
  getPosts,
  createPost,
  getPostById,
  getPostBySlug,
  updatePost,
  deletePost,
};
