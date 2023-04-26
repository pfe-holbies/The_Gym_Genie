const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const { connectDB } = require("./config/db");
const { is_authenticated } = require("./middleware/is_authenticated");

// Initilize Express App
const app = express();

// Load environment variables
dotenv.config();

// connection to MongoDB
connectDB();

// Authentication middleware
app.use(is_authenticated);

// Routes
app.get("/", (req, res) => {
  res.json({ msg: "Welcome! Go to /graphql" });
});

// GraphQL API
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    // only for development -- GUI
    graphiql: true,
  })
);

module.exports = app;
