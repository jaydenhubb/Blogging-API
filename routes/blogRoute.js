const express = require("express");
const {requireAuth} = require("../middlewares/requireAuth");

const {
  getAllBlogs,
  getSingleBlog,
  getSingleAuthorBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// Get all blogs
router.get("/", getAllBlogs);

// Get All blog for single Author
router.get("/:author", getSingleAuthorBlogs);

// Get a single blog for any author

router.get('/single/:id', getSingleBlog)


// auth

// Create blog
router.use(requireAuth)
router.post("/", createBlog);

// Update blog
router.patch("/:id", updateBlog);

// Delete blog
router.delete("/:id", deleteBlog);

module.exports = router;
