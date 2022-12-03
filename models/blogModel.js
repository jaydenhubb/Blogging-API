const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    desc: String,
    author: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: "draft",
      enum: ["draft", "published"],
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: Number,
    tag: [],
    body: {
      type: String,
      required: true,
    },
    created_At: Date
    
  },
  { timestamps: true },
);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
