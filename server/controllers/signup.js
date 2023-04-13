const bcrypt = require('bcrypt');
const User = require('../models/User');

const signup = async (args) => {
  const { name, email, password } = args;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  // Save the user to the database
  await user.save();

  // Return a success message
  return { message: 'User created successfully!' };
};

module.exports = signup;
