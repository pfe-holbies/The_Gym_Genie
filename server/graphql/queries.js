const { GraphQLList, GraphQLID } = require('graphql');
const { UserType } = require('./typeDefs');
const { User } = require('../models/User.js');

// Get user by id
const getUser = {
  type: UserType,
  description: 'Retrieves one user',
  args: { id: { type: GraphQLID } },
  // resolver function
  resolve(parent, args) {
    console.log('Fetching user with id:', args.id);
    return User.findById(args.id);
  },
};

// Get all users
const getUsers = {
  type: new GraphQLList(UserType),
  description: 'Retrieves list of users',
  // resolver function
  resolve(parent, args) {
    // eslint-disable-line no-unused-vars
    return User.find();
  },
};

// Fetch workout plan from DB to render on Dashboard page
const userWorkoutPlan = {
  type: UserType,
  description: 'Retrieves one user',
  args: { id: { type: GraphQLID } },
  // resolver function
  resolve(parent, args) {
    console.log('Fetching Workout for User with id:', args.id);
    return User.findById(args.id).select('workoutPlan');
  },
};

// Fetch meal plan from DB to render on Dashboard page
const userMealPlan = {
  type: UserType,
  description: 'Retrieves one user',
  args: { id: { type: GraphQLID } },
  // resolver function
  resolve(parent, args) {
    console.log('Fetching user with id:', args.id);
    return User.findById(args.id).select('mealPlan');
  },
};

module.exports = { getUser, getUsers, userWorkoutPlan, userMealPlan };
