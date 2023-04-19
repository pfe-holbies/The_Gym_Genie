import inquirer from "inquirer";

// User CLI prompts
export const askQuestion = async () => {
  const questions = [
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please enter your name.";
        }
      },
    },
    {
      type: "input",
      name: "email",
      message: "What is your email?",
      validate: (value) => {
        const pass = value.match(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        );
        if (pass) {
          return true;
        } else {
          return "Please enter a valid email address.";
        }
      },
    },
    {
      type: "password",
      name: "password",
      message: "What is your password?",
      mask: "*",
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please enter your password.";
        }
      },
    },
    {
      type: "input",
      name: "age",
      message: "What is your age?",
      validate: (value) => {
        const valid = !isNaN(parseFloat(value));
        return valid || "Please enter a number";
      },
      filter: (input) => Number(input),
    },
    {
      type: "list",
      name: "gender",
      message: "What is your gender?",
      choices: ["Male", "Female", "Other"],
    },
    {
      type: "input",
      name: "height",
      message: "What is your height (in cm)?",
      validate: (value) => {
        const valid = !isNaN(parseFloat(value));
        return valid || "Please enter a number";
      },
      filter: (input) => Number(input),
    },
    {
      type: "input",
      name: "weight",
      message: "What is your weight (in kg)?",
      validate: (value) => {
        const valid = !isNaN(parseFloat(value));
        return valid || "Please enter a number";
      },
      filter: (input) => Number(input),
    },
  ];
  const answers = await inquirer.prompt(questions);
  return answers;
};
