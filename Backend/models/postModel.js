
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: [true, 'Please add some text to your comment'],
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: [true, 'Please add some text to your post'],
      trim: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Post', postSchema);
