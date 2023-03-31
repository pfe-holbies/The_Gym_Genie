const User = require('../models/user');

const userResolvers = {
  Query: {
    getUser: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw error;
      }
    },
    getAllUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const existingUser = await User.findOne({ email: args.email });
  
        if (existingUser) {
          return existingUser;
        }
  
        const user = await User.create(args);
        return user;
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (_, { id, ...args }) => {
      try {
        const user = await User.findByIdAndUpdate(id, args, { new: true });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw error;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = userResolvers;
