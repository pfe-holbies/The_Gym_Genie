const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require("graphql");

const User = require("../../models/User");

// User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    refreshToken: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    height: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    workoutType: { type: GraphQLString },
    goal: { type: GraphQLString },
  }),
});

module.exports = { UserType };
