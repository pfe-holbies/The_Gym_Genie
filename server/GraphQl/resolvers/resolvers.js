const signup = require('../controllers/signup');

const resolvers = {
  Mutation: {
    signup: async (_, args) => {
      const response = await signup(args);
      return response;
    }
  }
};

module.exports = resolvers;
