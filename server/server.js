const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db')
const colors = require('colors');
require('dotenv').config()
const port = process.env.PORT || 4000;

const app = express()

// connection to MongoDB
connectDB();

// connection to GraphQl API
app.use('/graphql', graphqlHTTP({
  graphiql: true,
})); 

app.listen(port, console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`));
