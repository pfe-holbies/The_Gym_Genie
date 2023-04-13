const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (args) => {
  const { email, password } = args;

  // Find the user in the database by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid login credentials');
  }

  // Compare the input password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid login credentials');
  }

  // Generate a JWT token and return it
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  return { token };
};

module.exports = login;
