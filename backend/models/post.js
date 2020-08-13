const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: String,
  body: String,
  comments: [
    {
      author: String,
      body: String,
      date: Date,
      votes: [{ upvotes: Number, downvotes: Number }],
    },
  ],
  date: Date,
  votes: [{ upvotes: Number, downvotes: Number }],
});

module.exports = mongoose.model("post", postSchema, "posts");
