const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
} = require("graphql");

const User = require("../../models/User");

// Adding Time and Date stamps
const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "A date and time, represented as an ISO-8601 string",
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

// User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    createdAt: { type: DateTime },
    updatedAt: { type: DateTime },
    token: { type: GraphQLString },
  }),
});

(module.exports = UserType), DateTime;
