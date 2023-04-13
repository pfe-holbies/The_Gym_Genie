const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const schema = require("./schemas/schema.js");
require("dotenv").config();

const app = express();

// connection to MongoDB
connectDB();

// connection to GraphQl API
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    // rootValue: root,
  })
);

module.exports = app;
