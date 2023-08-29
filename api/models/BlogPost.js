const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  checkBox: [String],
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", articleSchema);

module.exports = Blog;
