const router = require("express").Router();
const {
  getPosts,
  createPost,
  getPostById,
  getPostBySlug,
  updatePost,
  deletePost,
} = require("../controllers/codePostControllers");

router.route("/posts").get(getPosts);
router.route("/posts/add").post(createPost);
router.route("/posts/slug/:slug").get(getPostBySlug);
router.route("/posts/:postId").get(getPostById);
router.route("/posts/:postId").put(updatePost);
router.route("/posts/:postId").delete(deletePost);

module.exports = router;
