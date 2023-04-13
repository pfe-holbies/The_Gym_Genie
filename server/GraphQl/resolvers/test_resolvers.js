const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = process.env.SECRET_KEY;

const resolvers = {
  Query: {
    user: async (parent, args) => {
      try {
        const user = await User.findById(args.id);
        if (!user) throw new Error('User not found');
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    users: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (err) {
        throw new Error(err);
      }
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      try {
        // Check if the user already exists
        const userExists = await User.findOne({ email: args.email });
        if (userExists) {
          throw new Error('User already exists');
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(args.password, 10);

        // Create a new user object
        let user = new User({
          username: args.username,
          email: args.email,
          password: hashedPassword,
        });
        // Save the new user to the DB
        const savedUser = await user.save();

        // Create a JWT token
        const token = jwt.sign({ userId: savedUser.id }, SECRET_KEY);
        // Return the new user and token
        return { ...savedUser._doc, id: savedUser._id, token };
      } catch (err) {
        throw new Error(err);
      }
    },
    updateUser: async (parent, args) => {
      try {
        // Find the user with the specified ID and update their details
        const updatedUser = await User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              username: args.username,
              email: args.email,
              password: args.password,
            }
          },
          { new: true }
        );
        if (!updatedUser) throw new Error('User not found');
        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteUser: async (parent, args) => {
      try {
        // Find the user with the specified ID and delete them
        const deletedUser = await User.findByIdAndDelete(args.id);
        if (!deletedUser) throw new Error('User not found');
        return deletedUser;
      } catch (err) {
        throw new Error(err);
      }
    }
  }
};

module.exports = resolvers;
