/* global process */
const jwt = require('jsonwebtoken');

// middleware function to check for verified && logged-in users (authentication)
const is_authenticated = async (req, res, next) => {
  // extracts the token from the request header (if any) and remove the 'Bearer' string by splitting the string and taking the second element
  const token = req.headers.authorization?.split(' ')[1] || '';

  // if no token, move to the next middleware
  try {
    // verify the token wiht the JWT_SECRET and assign the decoded token to the verified variable
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // if verified, assign the verified user to the req.verifiedUser property
    req.verifiedUser = verified.user;
    console.log('Verification success! User is authenticated', verified);
    // move to the next middleware
    next();
  } catch (err) {
    // if verification fails, log the error and move to the next middleware
    console.log('Verification failed!', err);
    next();
  }
};

module.exports = { is_authenticated };
