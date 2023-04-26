const { User } = require("../models/User");
const { GraphQLString, GraphQLInt } = require("graphql");
const bcrypt = require("bcryptjs");
const { createJwtToken } = require("../utils/auth");
const { fetchOpenAICompletion } = require("../utils/openAIapi");

// register new user mutation
const registerMutation = {
  type: GraphQLString,
  description: "Register new user",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    height: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    primaryGoal: { type: GraphQLString },
    activityLevel: { type: GraphQLString },
    strengthLevel: { type: GraphQLString },
    workoutType: { type: GraphQLString },
    workoutsPerWeek: { type: GraphQLInt },
    dietType: { type: GraphQLString },
    foodAllergies: { type: GraphQLString },
  },
  // resolver function
  async resolve(parent, args) {
    const {
      username,
      email,
      password,
      age,
      gender,
      height,
      weight,
      primaryGoal,
      activityLevel,
      strengthLevel,
      workoutType,
      workoutsPerWeek,
      dietType,
      foodAllergies,
    } = args;

    // check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      age,
      gender,
      height,
      weight,
      primaryGoal,
      activityLevel,
      strengthLevel,
      workoutType,
      workoutsPerWeek,
      dietType,
      foodAllergies,
    });

    // save the new user into the database
    await user.save();

    // generate jwt token
    const token = createJwtToken(user);

    // return the token
    return token;
  },
};

// fetch meal plan from openai api mutation
const fetchMealMutation = {
  type: GraphQLString,
  description: "fetch meal plan from openai api mutation",
  args: {},
  // resolver function
  async resolve(parent, args, { verifiedUser }) {
    // fetch user data from database
    const user = await User.findOne({
      username: verifiedUser.username,
      age: verifiedUser.age,
      gender: verifiedUser.gender,
      activityLevel: verifiedUser.activityLevel,
      dietType: verifiedUser.dietType,
      foodAllergies: verifiedUser.foodAllergies,
    });

    // if user does not exist
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // destructure user data from database
    const { 
      username,
      age,
      gender,
      activityLevel,
      dietType,
      foodAllergies 
    } = user;

    // OpenAI API prompt argument
    const prompt = `
    Task: write a personalized meal plan for one week for your master ${username} don't forget to mention to him/her his/her ${age}-year-old his/her${gender} with his/her${activityLevel} activity level with  his/her${dietType} diet and  his/her${foodAllergies} food Allergies.
    Topic: Personalized Diet and Nutrition plan
    Style: Poetic Rythme Persuasive Creative Descriptive
    Tone: Witty Funny Encouraging  Cooperative Joyful
    Your Name: The Gym Genie 
    Personality: Act like the genie in the aladdin movie be silly funny witty say clever things that rythme
    Audience: Neutral audience 
    Length: 2 paragraphs 
    Format: Text
    Start your response always With: ABRACADABRA! Master ${username} Let me be your Gym Genie and grant you the perfect meal plan to reach your nutrition goals.`;

     // OpenAI API endpoint argument
    const apiEndpoint = "https://api.openai.com/v1/completions";

    // Call to OpenAI API
    const mealPlan = await fetchOpenAICompletion(prompt, apiEndpoint);

    
    // save the meal plan completion to database
    await User.findOneAndUpdate({ username }, { mealPlan });

    // Update mealplan for user in database and return the updated meal plan
    return User.findOne({ username }).exec();
  },
};

// export mutations
module.exports = {
  registerMutation,
  fetchMealMutation,
};

