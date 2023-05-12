/* global process */
const jwt = require('jsonwebtoken');

// creates jwt token for user object passed in as parameter and returns the token
const createJwtToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = { createJwtToken };
