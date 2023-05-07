const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const {
  getUser,
  getUsers,
  userWorkoutPlan,
  userMealPlan,
} = require('./queries');

// Import mutations
const {
  registerMutation,
  loginMutation,
  fetchWorkoutMutation,
  fetchMealMutation,
} = require('./mutations');

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Queries',
  fields: { getUser, getUsers, userWorkoutPlan, userMealPlan },
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutations',
  fields: {
    registerMutation,
    loginMutation,
    fetchWorkoutMutation,
    fetchMealMutation,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
