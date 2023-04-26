const { User } = require("../models/User");
const { GraphQLString, GraphQLInt } = require("graphql");
const bcrypt = require("bcryptjs");
const { createJwtToken } = require("../utils/auth");
const { fetchOpenAICompletion } = require("../utils/openAIapi");



// login mutation
const loginMutation = {
  type: GraphQLString,
  description: "Login user",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  // resolver function
  async resolve(parent, args) {
    // Check if the user already exists
    const user = await User.findOne({ email: args.email }).select("+password");

    // If the user does not exist or the password is wrong throw an error
    if (!user || !bcrypt.compare(args.password, user.password)) {
      throw new Error("Invalid credentials");
    }

    // generate jwt token
    const token = createJwtToken(user);
    console.log(`The user with email:${args.email} is logged in ${token}`);

    // return the token
    return token;
  },
};

// fetch workout plan from openai api mutation
const fetchWorkoutMutation = {
  type: GraphQLString,
  description: "fetch workout plan from openai api mutation",
  args: {},
  // resolver function
  async resolve(parent, args, { verifiedUser }) {
    // fetch user data from database
    const user = await User.findOne({
      username: verifiedUser.username,
      age: verifiedUser.age,
      gender: verifiedUser.gender,
      height: verifiedUser.height,
      weight: verifiedUser.weight,
      primaryGoal: verifiedUser.primaryGoal,
      activityLevel: verifiedUser.activityLevel,
      strengthLevel: verifiedUser.strengthLevel,
      workoutType: verifiedUser.workoutType,
      workoutsPerWeek: verifiedUser.workoutsPerWeek,
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
      height,
      weight,
      primaryGoal,
      activityLevel,
      strengthLevel,
      workoutType,
      workoutsPerWeek,
    } = user;

    // OpenAI API prompt argument
    const prompt = `
    Task: write a personalized workout plan for workout days equal ${workoutsPerWeek} for your master ${username} don't forget to mention  his/her ${age}-year-old, his/her ${gender}, his/her${height} his/her${weight}, with his/her${primaryGoal}and his/her${activityLevel} and his/her${strengthLevel} and his/her${workoutType}.
    Topic: Personalized Fitness and Workouts plan
    Style: Poetic Rythme Persuasive Creative Descriptive
    Tone: Witty Funny Encouraging  Cooperative Joyful
    Your Name: The Gym Genie 
    Personality: Act like the genie in the aladdin movie be silly funny witty say clever things that rythme
    Audience: Neutral audience 
    Length: 2 paragraphs
    Format: Text
    Start your response always With: ABRACADABRA! Master ${username} Let me be your Gym Genie and grant you the perfect workout plan to reach your goal ${primaryGoal}.`;

    // OpenAI API endpoint argument
    const apiEndpoint = "https://api.openai.com/v1/completions";

    // Call to OpenAI API
    const workoutPlan = await fetchOpenAICompletion(prompt, apiEndpoint);

    // save the workout plan completion to database
    await User.findOneAndUpdate({ username }, { workoutPlan });

    // Update workoutplan for user in database and return the updated workout plan
    return User.findOne({ username }).exec();
  },
};



// export mutations
module.exports = {
  loginMutation,
  fetchWorkoutMutation,
};
