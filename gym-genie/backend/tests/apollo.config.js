module.exports = {
    client: {
      name: 'tests',
      service: {
        name: 'gym genie tests',
        url: 'http://localhost:4000/graphql', // Replace with your GraphQL server URL
        // optional headers
        headers: {
          authorization: 'Bearer your_token_here',
        },
        // optional disable SSL validation check
        skipSSLValidation: true,
      },
    },
    // Uncomment and configure the following lines if you have a separate Apollo Server
    // server: {
    //   url: 'http://localhost:4000/graphql',
    // },
  };
  