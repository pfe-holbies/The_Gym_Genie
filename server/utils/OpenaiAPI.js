/* global process */
const dotenv = require('dotenv');
dotenv.config();
const openAIKey = process.env.OPENAI_API_KEY;

// import node-fetch dynamically to avoid error in browser
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// async function call to OpenAI API for completion request takes args prompt and apiEndpoint and returns data
async function fetchOpenAICompletion(prompt, apiEndpoint) {
  // OpenAI API POST request model: "text-davinci-003"
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openAIKey}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1024,
      temperature: 0,
    }),
  });

  // response to JSON
  const data = await response.json();

  // returns the first choice
  return data.choices[0].text;
}

module.exports = {
  fetchOpenAICompletion,
};
