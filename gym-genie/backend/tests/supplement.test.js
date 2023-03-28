const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { gql } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const ApolloServer = require('apollo-server-express').ApolloServer;
const Supplement = require('../models/supplement');
const typeDefs = require('../resolvers/typeDefs');
const supplementResolvers = require('../resolvers/supplementResolver');

let mongoServer;
const resolvers = { ...supplementResolvers };

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  global.testClient = createTestClient(server);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Supplement Tests', () => {
  afterEach(async () => {
    await Supplement.deleteMany({});
  });

  it('should create a supplement', async () => {
    const CREATE_SUPPLEMENT = gql`
      mutation CreateSupplement($name: String!, $description: String!) {
        createSupplement(name: $name, description: $description) {
          id
          name
          description
        }
      }
    `;

    const name = 'Test Supplement';
    const description = 'Test supplement description';

    const { mutate } = global.testClient;
    const { data } = await mutate({
      mutation: CREATE_SUPPLEMENT,
      variables: { name, description },
    });

    const supplement = data.createSupplement;

    expect(supplement.name).toEqual(name);
    expect(supplement.description).toEqual(description);
  });

  // Add more tests for other supplement-related functionalities here
});
