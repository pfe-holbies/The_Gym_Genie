const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./GraphQl/schemas/schemas');
require('dotenv').config();
//console.log(process.env.SECRET_KEY)
//console.log(process.env.MONGO_URI)
//console.log(process.env.PORT)

const app = express();

// connection to MongoDB
connectDB();


// connection to GraphQl API
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  // rootValue: root,
})); 

module.exports = app;