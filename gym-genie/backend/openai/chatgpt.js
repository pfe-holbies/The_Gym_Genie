// Import necessary dependencies
const openai = require('openai');
const { userResolver } = require('./resolvers');
const { prompt_map, prime_prompt } = require('./prompts');
const dotenv = require('dotenv');

dotenv.config();

// Initialize OpenAI API credentials
openai.apiKey = 'YOUR_API_KEY';

// Define function to query OpenAI API
async function getResponseFromOpenAI(prompt, user) {
  // Define the parameters for the API request
  const parameters = {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 100,
    presence_penalty: 0.6,
    frequency_penalty: 0.5,
    stop: '\n',
    user: user,
  };

  // Send the request to the OpenAI API and get the response
  const response = await openai.completions.create(parameters);

  // Return the text generated by the API
  return response.choices[0].text.trim();
}

async function handleMessage(user) {
    // Get the appropriate prompt for the user
    const prompt = `${prompt_map[prime_prompt]}${prompt_map[user.age]}${prompt_map[`${user.workout}${user.level}`]}${prompt_map[user.goal]}${prompt_map[user.budget]}`;
  
    // Get a response from the OpenAI API based on the prompt and user information
    const response = await getResponseFromOpenAI(prompt, user);
    let workout, diet, supplements = ';'
    workout, diet, supplements = response.split(',');
    user_args = {workout, diet, supplements}
  
    // Update the user's information based on the response
    await userResolver.Mutation.updateUser(null, { id: user.id, args: user_args });
    // make it save te workout and the diet and the suuplements in their own collections ???

    // Return the response generated by the API
    return response;
  }

  async function runChatbot(id) {
    // Get the luser from the db
    const user = await userResolver.Query.getUser(null, { id: id });
    //to render this in the front end
    return await handleMessage(user);
    }
  
  
  module.exports = runChatbot;