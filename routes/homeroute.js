const { Router } = require("express");
const BlogModel = require("../models/blogModel");

const router = Router();

router.get("/", async (req, res) => {
  const page = req.query.page || 0
  const blogsPerPage = 20
  try {
    const blogs = await BlogModel.find(
      {state:"published"}
    ).sort({createdAt:-1}).skip(page*blogsPerPage).limit(blogsPerPage);
  
    res.status(200).render("home", {blogs});
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
