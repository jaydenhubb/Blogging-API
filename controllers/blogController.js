const Blog = require("../models/blogModel");
const BlogModel = require("../models/blogModel");

const getAllBlogs = async (req, res) => {
  const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
  res.status(200).render("blogs", blogs);
};

const getSingleBlog = async(req, res)=>{
  const {id} = req.params
  try{
    const blog = await BlogModel.findById(id);
    blog.read_count++
    await blog.save()

    res.status(200).render('singleBlog', {blog})
  }
  catch(err){
    res.status(500).send('server Errorssss')
  }
}

const getSingleAuthorBlogs = async (req, res) => {
  const { author } = req.params;
  try{
    const blogs = await BlogModel.find({author}).sort({ createdAt: -1 });
    if (!blogs) {
      res.status(404).render("error", err);
    }
    res.render("blogs", {blogs});
  }
  catch(err){
    res.status(500).send('server error')
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, desc, author, tag, body, state } = req.body;
    const reading_time = (body.trim().split(" ").length / 225).toFixed(1);
    const blogdets = {
      title,
      desc,
      author,
      tag,
      body,
      reading_time,
      state,
    };
    const blog = await BlogModel.create(blogdets);
    res.status(200).json({ blog });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await BlogModel.findByIdAndUpdate({ _id: id }, { ...req.body });
  if (!blog) {
    res.status(404).json({ err: err.message });
  }
  res.status(200).render("blogs", blog);
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await BlogModel.findOneAndDelete({ _id: id });
  if (!blog) {
    res.status(404).json({ err: err.message });
  }
  res.status(200).render("blogs");
};

module.exports = {
  getAllBlogs,
  getSingleAuthorBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
