const { User } = require('../models/User');
const { UserType, RegisterInputType } = require('./typeDefs');
const { GraphQLString } = require('graphql');
const bcrypt = require('bcryptjs');
const { createJwtToken } = require('../utils/auth');
const { fetchOpenAICompletion } = require('../utils/OpenaiAPI');

// register mutation
const registerMutation = {
  type: UserType,
  description: 'Register new User',
  args: {
    signupInput: { type: RegisterInputType },
  },
  // resolver function
  async resolve(parent, { signupInput }) {
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
    } = signupInput;

    // global necessary checks for user registration errors
    // if username is empty
    if (!username) {
      throw new Error('Username cannot be empty');
    }

    // if email is empty
    if (!email) {
      throw new Error('Email cannot be empty');
    }

    // if email contains capital letter
    if (/[A-Z]/.test(email)) {
      throw new Error('Email should not contain capital letters');
    }

    // if password is empty
    if (!password) {
      throw new Error('Password cannot be empty');
    }

    // if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists');
    }

    // hash the password before saving it to the DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user object
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
      createdAt: new Date().toISOString(),
    });

    // save the user with concatenated token to DB
    newUser.token = createJwtToken(newUser);
    const result = await newUser.save();

    // retun the new user
    return {
      id: result.id,
      ...result._doc,
    };
  },
};

// login mutation
const loginMutation = {
  type: UserType,
  description: 'Login user',
  args: {
    username: { type: GraphQLString },
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
    user.refreshToken = createJwtToken(user);
    await user.save();

    // return the user with the token
    return {
      id: user.id,
      ...user._doc,
    };
  },
};

// fetch workout plan from openai api mutation
const fetchWorkoutMutation = {
  type: UserType,
  description: 'fetch workout plan from openai api mutation',
  args: {},
  // resolver function
  async resolve(parent, args, { verifiedUser }) {
    // fetch Auth/verified user data from database
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

    // destructure user data from database to send it to OpenAI API
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
    -Task: write a personalized workout plan for workout days equal ${workoutsPerWeek} for your master ${username} don't forget to mention  his/her age ${age}-year-old, his/her gender ${gender}, his/her height ${height} his/her weight ${weight}, with his/her primary goal ${primaryGoal}and his/her${activityLevel}activityLeveland his/her${strengthLevel} strenght Level  and his/her${workoutType} workoutType.
    -Topic: Personalized Fitness and Workouts plan
    -Layout: Greeting, Introduction, Body, Conclusion
    -Keywords: Day + Conclusion. Always start the workout with the word Day according to the number of ${workoutsPerWeek} that the user have asked for.
    Always end the workout with a conclusion for the user starting with the word Conclusion include the word conclusion only once. 
    -Style: Poem stanza Poetic Rythme Persuasive Creative Descriptive
    -Tone: Witty Funny Encouraging  Cooperative Joyful
    -Your Name: GymGenie 
    -Personality: Act like the genie in the aladdin movie be silly funny witty say clever things that rythme
    -Audience: Fitness audience 
    -Length: 150 words max
    -Format: Text 
    -Prompt: Start your response always With: ABRACADABRA! Master ${username}! You rubbed my lamp and I will grant you the perfect workout plan to reach your goal ${primaryGoal}.`;

    // OpenAI API endpoint argument
    const apiEndpoint = 'https://api.openai.com/v1/completions';

    // Call to OpenAI API
    const workoutPlan = await fetchOpenAICompletion(prompt, apiEndpoint);

    // save the workout plan completion to database
    await User.findOneAndUpdate({ username }, { workoutPlan });

    // Update workoutplan for user in database and return the user
    return {
      id: user.id,
      ...user._doc,
    };
  },
};

// fetch meal plan from openai api mutation
const fetchMealMutation = {
  type: UserType,
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
    -Task: write a personalized meal plan for one week for your master ${username} don't forget to mention to him/her by name ${username} his/her age ${age}-year-old his/her gender${gender} with his/her ${activityLevel} activity level with  his/her${dietType} diet and  his/her${foodAllergies} food Allergies.
    -Topic: Personalized Diet and Nutrition plan
    -Layout: Greeting, Introduction, Body, Conclusion
    -Keywords: Day + Breakfast + Lunch + Dinner + Snacks. Always start the daily meal with the Day +  number for example Day 1 : Day 2 : and the meal by either, Breakfast: Lunch: Dinner: Snacks:.
    Always end the meal plan with a conclusion for the user starting with the word Conclusion include the word conclusion only once. 
    -Style: Poetic Rythme Persuasive Creative Descriptive
    -Tone: Witty Funny Encouraging  Cooperative Joyful
    -Your Name: GymGenie 
    -Personality: Act like the genie in the aladdin movie be silly funny witty say clever things that rythme
    -Audience: Fitness audience 
    -Length: 150 words max
    -Format: Text
    -Prompt: Start your response always With: ABRACADABRA! Master ${username} Let me be your GymGenie and grant you the perfect meal plan to reach your nutrition goals.`;

    // OpenAI API endpoint argument
    const apiEndpoint = 'https://api.openai.com/v1/completions';

    // Call to OpenAI API
    const mealPlan = await fetchOpenAICompletion(prompt, apiEndpoint);

    // save the meal plan completion to database
    await User.findOneAndUpdate({ username }, { mealPlan });

    // Update mealplan for user in database and return the user
    return {
      id: user.id,
      ...user._doc,
    };
  },
};

// export mutations
module.exports = {
  registerMutation,
  loginMutation,
  fetchWorkoutMutation,
  fetchMealMutation,
};
