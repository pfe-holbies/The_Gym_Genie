//const express = require('express');//
//server.applyMiddleware({ app });//
const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql/schema');
const { resolvers } = require('./graphql/resolvers');
require('dotenv').config();
const winston = require('winston');
/* const compression = require('compression');*/

/*const app = express();
app.use(compression());*/

const server = new ApolloServer({
  typeDefs,
  resolvers,
  /*context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },*/
});


server.listen(process.env.PORT, () => {
    console.log('🚀 Server ready at http://localhost:${process.env.PORT}');
  }).then(({ url }) => {
    logger.info('🚀 Server ready at ${url}');
  });

  /* to do : corse middlewere, helmet, compression */