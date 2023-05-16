/* global process */
const GraphQLServer = require('./app');
const colors = require('colors'); // eslint-disable-line no-unused-vars
const dotenv = require('dotenv');


// Load environment variables
dotenv.config();

// Port
const port = process.env.PORT || 5000;

// Start the GraphQLServer
GraphQLServer.listen(port, () => {
  console.log(
    `🚀 GraphQLServer is running on port ${`${port}`.blue.bgGreen}`.magenta.bold
  );
  console.log(
    `🎉 Debug with GraphiQL GUI: ${
      `${`http://localhost:${port}/graphql`}`.black.bgYellow
    }`
  );
});
