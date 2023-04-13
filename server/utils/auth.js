require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// signUp Mutation tested
async function signUp(parent, args) {
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email: args.email });
    if (userExists) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(args.password, 10);

    // Create a new user object
    const newUser = new User({
      username: args.username,
      email: args.email,
      password: hashedPassword,
    });

    // Save the new user to the DB
    const savedUser = await newUser.save();

    // Create a JWT Access Token
    const accessToken = jwt.sign({ userId: savedUser.id }, SECRET_KEY);
    console.log(accessToken);
    console.log(`User signed up successfully!`);
    // Return the new user and token
    return { ...savedUser._doc, id: savedUser._id, accessToken };
  } catch (err) {
    throw new Error(err);
  }
}

// logIn Mutation
async function logIn(parent, args) {
  try {
    // Check if user with the provided email exists
    const user = await User.findOne({ email: args.email });
    if (!user) {
      throw new Error("User with the provided email does not exist");
    }

    // compare the provided password with the password in the DB
    const validPassword = await bcrypt.compare(args.password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // Create a JWT Refresh Token
    const refreshToken = jwt.sign(
      { userId: user.id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" } // 7 days
    );
    console.log(`User with email ${args.email} LOGGED IN successfully!`);
    // Return the user and token
    return { user, accessToken, refreshToken };
  } catch (err) {
    throw new Error(err);
  }
}

// logOut Mutation
async function logOut(parent, args) {
  try {
    // Find the user by ID and set their token to null
    const user = await User.findById(args.userId);
    user.token = null;
    await user.save();

    console.log(`User with ID ${args.userId} LOGGED OUT successfully!`);
    // Return the updated user
    return { ...user._doc, id: user._id };
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { signUp, logIn, logOut };
