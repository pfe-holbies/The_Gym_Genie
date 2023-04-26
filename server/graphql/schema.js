const { GraphQLSchema, GraphQLObjectType } = require("graphql");



// Import mutations
const {
  loginMutation,
  fetchWorkoutMutation,
} = require("./mutations");


// Define MutationType
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    loginMutation,
    fetchWorkoutMutation,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
