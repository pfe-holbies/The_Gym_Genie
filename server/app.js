const express = require('express');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { connectDB } = require('./config/db');
const { is_authenticated } = require('./middleware/is_authenticated');
const cors = require('cors');
const path = require('path');

// Initialize Express App for GraphQL API
const GraphQLServer = express();

// Load environment variables
dotenv.config();

// Connection to MongoDB
connectDB();

// Add CORS
GraphQLServer.use(cors());

// Authentication middleware layer for resource protection
GraphQLServer.use(is_authenticated);

// Routes
GraphQLServer.get('/', (req, res) => {
  res.json({ msg: 'Welcome! Go to /graphql' });
});


// GraphQL API
GraphQLServer.use(
  '/graphql',
  graphqlHTTP({
    schema,
    // Only for development - GraphiQL GUI
    graphiql: process.env.NODE_ENV === 'development',
  })
);

module.exports = GraphQLServer;
