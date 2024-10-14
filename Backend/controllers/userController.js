const User = require('../models/userModel');
const FriendRequest = require('../models/friendRequestModel');

const sendFriendRequest = async (req, res) => {
  const { recipientId } = req.body;
  const recipient = await User.findById(recipientId);

  // Check if the recipient exists and if they are already friends
  if (!recipient || req.user.friends.includes(recipientId)) {
    return res.status(400).json({ message: 'Invalid recipient or already friends' });
  }

  const existingRequest = await FriendRequest.findOne({ sender: req.user._id, recipient: recipientId });

  if (existingRequest) {
    return res.status(400).json({ message: 'Friend request already sent' });
  }

  const friendRequest = new FriendRequest({
    sender: req.user._id,
    recipient: recipientId,
  });

  await friendRequest.save();
  res.status(201).json({ message: 'Friend request sent' });
};


const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  const request = await FriendRequest.findById(requestId);

  if (!request) {
    return res.status(404).json({ message: 'Friend request not found' });
  }

  const sender = await User.findById(request.sender);
  const recipient = await User.findById(req.user._id);

  sender.friends.push(recipient._id);
  recipient.friends.push(sender._id);

  await sender.save();
  await recipient.save();
  await request.delete();

  res.status(200).json({ message: 'Friend request accepted' });
};

const rejectFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  const request = await FriendRequest.findById(requestId);

  if (!request) {
    return res.status(404).json({ message: 'Friend request not found' });
  }

  await request.delete();
  res.status(200).json({ message: 'Friend request rejected' });
};

const getFriendRequests = async (req, res) => { 
  const requests = await FriendRequest.find({ recipient: req.user._id }).populate('sender', 'username email');
  res.status(200).json(requests);
};

module.exports = { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getFriendRequests };
