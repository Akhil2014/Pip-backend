const express = require('express');
const { createPost, addComment , getUserPosts } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createPost);

router.post('/:postId/comments', protect, addComment);
router.get('/myposts', protect, getUserPosts);
module.exports = router;
