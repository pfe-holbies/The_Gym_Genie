const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./schema/schema');
require('dotenv').config();


const app = express();

// connection to MongoDB
connectDB();

// connection to GraphQl API
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
})); 

module.exports = app;