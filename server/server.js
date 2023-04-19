import app from "./app.js";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import { askQuestion } from "./prompts.js";
import { createUserResolver } from "./graphql/resolvers/resolvers.js";
import { graphqlHTTP } from "express-graphql";
import typeDefs from "./graphql/schema/typeDefs.js";
// Start the server
const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `🚀 Server is up and running
🎉 Hit http://localhost:${port}/graphql to see the GraphiQL tool`.magenta.bold
  )
);

// Prompt the user for input
const startPrompt = async (answers) => {
  if (!answers) {
    answers = await askQuestion();
  }
  console.log(colors.yellow("User Input: "), answers);

  try {
    const user = await createUserResolver(answers);
    console.log(colors.green(`${user.name} saved to database: `), user);
    // Save user to GraphQL API via schema
    const result = await graphqlHTTP({
      schema: typeDefs,
      rootValue: { user: user },
      graphiql: true,
    });
    console.log(colors.blue("User saved to GraphQL API: "), result);
  } catch (err) {
    console.error(colors.red("Failed to save user to database"), err);
  }
};

startPrompt();
/* startPrompt({
  name: "Miguelita",
  email: "mzarbe@blogtalkradio.com",
  password: "m5KsUNqLOOZQ",
  age: 70,
  gender: "Female",
  height: 158,
  weight: 105,
}); // This is a test to see if the user is saved to the database   */
 