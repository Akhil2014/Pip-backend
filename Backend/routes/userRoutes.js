const express = require('express');
const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriendRequests } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/friends/request', protect, sendFriendRequest);

router.put('/friends/request/accept', protect, acceptFriendRequest);

router.put('/friends/request/reject', protect, rejectFriendRequest);

router.get('/friends/requests', protect, getFriendRequests);

module.exports = router;
