const app = require("./app");
const colors = require("colors");
require("dotenv").config();

// Start the server
const port = process.env.PORT || 5000;
app.listen(
  port,
  () => console.log(`🚀 Server is up and running `.magenta.bold),
  console.log(`📭 Hit http://localhost:${port}/graphql to see the GraphiQL tool`.yellow.bold)
);
/* app.listen(port, () =>
  console.log(`🚀 Server is up and running `.magenta.bold),
  console.log(`📭 Hit http://localhost:${port}/graphql to see the GraphiQL tool`.magenta.bold)
); */