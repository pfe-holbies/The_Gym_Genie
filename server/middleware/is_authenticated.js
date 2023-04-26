/* global process */
const jwt = require("jsonwebtoken");

// middleware to check if user is authenticated
const is_authenticated = async (req, res, next) => {
  // get the token from the header if present
  const token = req.headers.authorization?.split(" ")[1] || "";

  // if no token found, return response (without going to the next middelware)
  try {
    // verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // assign the user object from the verified token to the request object
    req.verifiedUser = verified.user;
    console.log("Verification success! User is authenticated", verified);
    // move to the next middleware
    next();
  } catch (err) {
    console.log("Verification failed!", err);
    next();
  }
};

module.exports = { is_authenticated };
