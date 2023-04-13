const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const { signUp, logIn, logOut } = require("../utils/auth");
const { UserType } = require("../schemas/TypeDefs/UserType");

// Define the Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //  signUp Mutation Tested
    signUp: {
      type: UserType,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        /*   goal: { type: GraphQLNonNull(GraphQLString) },
        workoutType: { type: GraphQLNonNull(GraphQLString) },
        weight: { type: GraphQLNonNull(GraphQLInt) },
        height: { type: GraphQLNonNull(GraphQLInt) },
        gender: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) }, */
      },
      resolve: signUp,
    },
    // Login Mutation
    logIn: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: logIn,
    },
    // LogOut Mutation
    logOut: {
      type: UserType,
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: logOut,
    },
  },
});

module.exports = { Mutation };
