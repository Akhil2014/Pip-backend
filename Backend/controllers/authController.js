const User = require('../models/userModel');
const generateToken = require('../generateToken');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
 
  const { username, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user
  const user = await User.create({ username, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Login user
const loginUser = async (req, res) => {
 
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude the password from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};





module.exports = { registerUser, loginUser ,getAllUsers };
