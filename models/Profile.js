//Modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  interests: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  movies: [
    {
      title: {
        type: String,
        required: true
      },
      genre: {
        type: String,
        required: true
      }
    }
  ],
  books: [
    {
      title: {
        type: String,
        required: true
      },
      author: {
        type: String,
        required: true
      }
    }
  ],
  pipelines: [
    {
      name: {
        type: [String],
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
