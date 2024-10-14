const Post = require('../models/postModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// Create a new post
const createPost = async (req, res) => {
  const { text } = req.body;

  const post = new Post({
    user: req.user._id,
    text,
  });

  await post.save();
  res.status(201).json(post);
};

// Add a comment to a post
const addComment = async (req, res) => {
  const { postId } = req.params; 
  const { text } = req.body; 

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found'});
  }

  const comment = {
    user: req.user._id,
    text,
  };

  post.comments.push(comment);
  await post.save();

  res.status(201).json(post);
};

const getUserPosts = asyncHandler(async (req, res) => { 
  try {
    const posts = await Post.find({}); 

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
  }
});

module.exports = { createPost, addComment , getUserPosts };
