/* global process */
const app = require('./app');
const colors = require('colors'); // eslint-disable-line no-unused-vars
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Start the server
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () =>
	console.log(
		`🚀 Server is up and running
🎉 To see GraphiQL: Hit ${`http://localhost:${port}/graphql`.blue}`.magenta.bold
	)
);
