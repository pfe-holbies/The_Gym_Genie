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
  getUserCalorieBurnOfPreviousWeek: async (parent, { id }) => {
    const user = await User.findById(id);

    const now = new Date();
    const startOfCurrentWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfPreviousWeek = new Date(startOfCurrentWeek);
    startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7);
    const endOfPreviousWeek = new Date(startOfCurrentWeek);

    const previousWeekCalorieBurn = user.calorieBurn.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfPreviousWeek && entryDate < endOfPreviousWeek;
    });

    return previousWeekCalorieBurn;
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
  addCalorieBurn: async (parent, { id, date, calories }) => {
    const user = await User.findById(id);
    user.calorieBurn.push({ date, calories });
    await user.save();
    return user.calorieBurn;
  },
  updateCalorieBurn: async (parent, { id, date, calories }) => {
    const user = await User.findById(id);
    const entryIndex = user.calorieBurn.findIndex((entry) => entry.date.toISOString() === date);
    if (entryIndex !== -1) {
      user.calorieBurn[entryIndex].calories = calories;
      await user.save();
    }
    return user.calorieBurn;
  },
};


module.exports = userResolvers;
