const { User } = require('../models/User');
const { GraphQLString, GraphQLInt } = require('graphql');
const bcrypt = require('bcryptjs');
const { createJwtToken } = require('../utils/auth');
const { fetchOpenAICompletion } = require('../utils/openAIapi');
const { UserType, RegisterInputType } = require('./typeDefs');

// register mutation
const registerMutation = {
  type: UserType,
  description: 'Register new User',
  args: {
    test: { type: RegisterInputType },
  },
  // resolver function
  async resolve(parent,   { test }) {
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
    } = test;

    // Check if email contains capital letter
    if (/[A-Z]/.test(email)) {
      throw new Error('Email should not contain capital letters');
    }

    // check if password is empty
    if (!password) {
      throw new Error('Password cannot be empty');
    }

    // check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      token: '',
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
      createdAt: new Date().toISOString()
    });

    // save the new user into the database
    newUser.token = createJwtToken(newUser);

    const res = await newUser.save();
    
    // return the new user
     return {
                id: res.id,
                ...res._doc
            };
  },
};


// login mutation
const loginMutation = {
  type: GraphQLString,
  description: 'Login user',
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  // resolver function
  async resolve(parent, args) {
    // Check if the user already exists
    const user = await User.findOne({ email: args.email }).select('+password');

    // If the user does not exist or the password is wrong throw an error
    if (!user || !bcrypt.compare(args.password, user.password)) {
      throw new Error('Invalid credentials');
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
  description: 'fetch workout plan from openai api mutation',
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
      throw new Error('Invalid credentials');
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
    Your Name: GymGenie 
    Personality: Act like the genie in the aladdin movie be silly funny witty say clever things that rythme
    Audience: Fitness audience 
    Length: 150 words max
    Format: Text
    Start your response always With: ABRACADABRA! Master ${username} Let me be your GymGenie and grant you the perfect workout plan to reach your goal ${primaryGoal}.`;

    // OpenAI API endpoint argument
    const apiEndpoint = 'https://api.openai.com/v1/completions';

    // Call to OpenAI API
    const workoutPlan = await fetchOpenAICompletion(prompt, apiEndpoint);

    // save the workout plan completion to database
    await User.findOneAndUpdate({ username }, { workoutPlan });

    // Update workoutplan for user in database and return the updated workout plan
    return User.findOne({ username }).exec();
  },
};

// fetch meal plan from openai api mutation
const fetchMealMutation = {
  type: GraphQLString,
  description: 'fetch meal plan from openai api mutation',
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
      throw new Error('Invalid credentials');
    }

    // destructure user data from database
    const { username, age, gender, activityLevel, dietType, foodAllergies } =
      user;

    // OpenAI API prompt argument
    const prompt = `
    Task: write a personalized meal plan for one week for your master ${username} don't forget to mention to him/her his/her ${age}-year-old his/her${gender} with his/her${activityLevel} activity level with  his/her${dietType} diet and  his/her${foodAllergies} food Allergies.
    Topic: Personalized Diet and Nutrition plan
    Style: Poetic Rythme Persuasive Creative Descriptive
    Tone: Witty Funny Encouraging  Cooperative Joyful
    Your Name: GymGenie 
    Personality: Act like the genie in the aladdin movie be silly funny witty say clever things that rythme
    Audience: Fitness audience 
    Length: 150 words max
    Format: Text
    Start your response always With: ABRACADABRA! Master ${username} Let me be your GymGenie and grant you the perfect meal plan to reach your nutrition goals.`;

    // OpenAI API endpoint argument
    const apiEndpoint = 'https://api.openai.com/v1/completions';

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
  loginMutation,
  fetchWorkoutMutation,
  fetchMealMutation,
};
