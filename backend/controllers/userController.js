const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, data: users });
});

module.exports = { getUsers };
