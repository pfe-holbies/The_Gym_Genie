const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
} = require("graphql");

const { RootQuery } = require("../resolvers/rootQuery");
const { Mutation } = require("../resolvers/mutation");
const { UserType } = require("../schemas/TypeDefs/UserType");

// Define the schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
  types: [UserType],
});

module.exports = schema;
