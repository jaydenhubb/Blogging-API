const { Router } = require("express");
const blogModel = require("../models/blogModel");

const router = Router();

router.get("/:author", async (req, res) => {
  const { author } = req.params;

  const { state } = req.query;
  // console.log(state);
  try {
    const blogs = await blogModel.find({ $and: [{ author }, { state }] });
    res.status(200).render("blogs", { blogs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const blog = await blogModel.find({ author });
    res.render("singleblog", blog);
  } catch (err) {
    res.status(500).send("server error");
  }
});

module.exports = router;

//   $and: [{ author }, { state }]
