const { GraphQLList, GraphQLID } = require('graphql');
const { UserType } = require('./typeDefs');
const { User } = require('../models/User.js');

// Profile page tested
const getUser = {
  type: UserType,
  description: 'Retrieves one user',
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    console.log('Fetching user with id:', args.id);
    return User.findById(args.id);
  },
};

// For testing only - delete later
const getUsers = {
  type: new GraphQLList(UserType),
  description: 'Retrieves list of users',
  // resolver function
  resolve(parent, args) {
    // eslint-disable-line no-unused-vars
    return User.find();
  },
};

// Dashboard page
const userWorkoutPlan = {
  type: UserType,
  description: 'Retrieves one user',
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    console.log('Fetching Workout for User with id:', args.id);
    return User.findById(args.id).select('workoutPlan');
  },
};

// Dashboard page
const userMealPlan = {
  type: UserType,
  description: 'Retrieves one user',
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    console.log('Fetching user with id:', args.id);
    return User.findById(args.id).select('mealPlan');
  },
};

module.exports = { getUser, getUsers, userWorkoutPlan, userMealPlan };
