const { GraphQLList, GraphQLID } = require("graphql");
const { UserType } = require("./typeDefs");
const { User } = require("../models/User.js");

// Retrieves all users
const users = {
  type: new GraphQLList(UserType),
  description: "Retrieves list of users",
  // resolver function
  resolve(parent, args) {
    // eslint-disable-line no-unused-vars
    return User.find();
  },
};

// Retrieves one user query
const user = {
  type: UserType,
  description: "Retrieves one user",
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    console.log("Fetching user with id:", args.id);
    return User.findById(args.id);
  },
};

// Retrieves the workout plan for one user
const userWorkoutPlan = {
  type: UserType,
  description: "Retrieves one user",
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    console.log("Fetching user with id:", args.id);
    return User.findById(args.id).select("workoutPlan");
  },
};

// Retrieves the meal plan for one user
const userMealPlan = {
  type: UserType,
  description: "Retrieves one user",
  args: { id: { type: GraphQLID } },

  resolve(parent, args) {
    console.log("Fetching user with id:", args.id);
    return User.findById(args.id).select("mealPlan");
  },
};

module.exports = { users, user, userWorkoutPlan, userMealPlan };
