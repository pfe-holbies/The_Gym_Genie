//const express = require('express');//
//server.applyMiddleware({ app });//
//const { ApolloServer } = require('apollo-server-lambda');
const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');
require('dotenv').config();
const winston = require('winston');
const connectToDatabase = require('./db/mongo');
/* const compression = require('compression');*/

/*const app = express();
app.use(compression());*/

connectToDatabase();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  /*context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },*/
});

/*const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});*/


server.listen(process.env.PORT, () => {
    console.log('🚀 Server ready at http://localhost:${process.env.PORT}');
  }).then(({ url }) => {
    logger.info('🚀 Server ready at ${url}');
  });

  /* to do : corse middlewere, helmet, compression */