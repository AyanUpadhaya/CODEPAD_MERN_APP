const {
  create,
  findByEmail,
  find,
  findById,
  updateByIdAndSecret,
  deleteByIdAndSecret,
} = require("../querys/querys");
const asyncHandler = require("../utils/asyncHandler");
const generateUnixTimestamp = require("../utils/generateUnixTimestamp");
const generateUniqueId = require("../utils/generateUniqueId ");

const createPost = asyncHandler(async (req, res, next) => {
  const reqBody = req.body;
  reqBody.timestamp = generateUnixTimestamp();
  reqBody.secret = generateUniqueId();
  // Call create function
  const newPost = await create(reqBody);

  // Respond with the new post
  res
    .status(201)
    .json({ message: "Post created successfully.", data: newPost });
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

const updatePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const { secret } = req.body; //  `secret` from the request body
  const updateData = req.body; // Extract fields to update
  const post = await findById(postId)
  if (!secret || !post) {
    return res
      .status(404)
      .json({ message: "Post not found or invalid secret !!" });
  }

  const result = await updateByIdAndSecret(updateData, postId, secret);

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
  updatePost,
  deletePost,
};
