import express from "express";
import { graphqlHTTP } from "express-graphql";
import connectDB from "./config/db.js";
import graphQLResolvers from "./graphql/resolvers/index.js";
import dotenv from "dotenv";
dotenv.config();
import typeDefs from "./graphql/schema/typeDefs.js";

const app = express();

// connection to MongoDB
connectDB();

app.use(express.json());

// Add a route for your /graphql endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: typeDefs,
    rootValue: graphQLResolvers,
    graphiql: true,
  })
);

export default app;
