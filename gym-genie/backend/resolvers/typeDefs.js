const { importSchema } = require('graphql-import');

const typeDefs = importSchema('./graphql/schema.graphql');

module.exports = typeDefs;
