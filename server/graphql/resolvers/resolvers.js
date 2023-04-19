//import { Configuration, OpenAIApi } from "openai";
//import axios from "axios";
import User from "../../models/User.js";
import dotenv from "dotenv";
dotenv.config();
//console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
import { askQuestion } from "../../prompts.js";



// create user resolver
export const createUserResolver = async (userInput) => {
  userInput = userInput || (await askQuestion());
  const { name, email, password, age, gender, height, weight } = userInput;

  // Create a new user document and save it to the database
  const newUser = new User({
    name,
    email,
    password,
    age,
    gender,
    height,
    weight
  });

  try {
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// get all users resolver
export const GETusersResolver = async () => {
  const users = await User.find();
  return users.map((user) => ({ ...user._doc, _id: user._id.toString() }));
};
