const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
} = require("graphql");
const { UserType } = require("../schemas/TypeDefs/UserType");
const User = require("../models/User");

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getUserById: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
  },
});

module.exports = { RootQuery };
