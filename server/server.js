const app = require('./index');
const colors = require('colors');
require('dotenv').config();


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Server is up and running on port ${port}/graphql`.magenta.bold));

