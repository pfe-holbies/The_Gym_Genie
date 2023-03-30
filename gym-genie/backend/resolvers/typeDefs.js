const { importSchema } = require('graphql-import');
const path = require('path');

const typeDefs = importSchema(path.join(__dirname, '../graphql/schema.graphql'));

module.exports = typeDefs;
