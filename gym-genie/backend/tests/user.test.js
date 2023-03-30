const mongoose = require('mongoose');
const User = require('../models/user');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { gql } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const ApolloServer = require('apollo-server-express').ApolloServer;
const typeDefs = require('../resolvers/typeDefs');
const userResolvers = require('../resolvers/userResolver');

let mongoServer;
const resolvers = { ...userResolvers };

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.ensureInstance();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
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

describe('User model tests', () => {
  let testUser;

  beforeEach(async () => {
    testUser = await User.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'password123',
      age: 25,
      gender: 'male',
      height: 180.5,
      weight: 75.0,
      workoutType: 'cardio',
      goal: 'weight loss',
    });
  });

  afterEach(async () => {
    await User.findByIdAndDelete(testUser._id);
  });

  it('should get a user by ID', async () => {
    const foundUser = await User.findById(testUser._id);
    expect(foundUser).toEqual(expect.objectContaining({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: 'password123',
      age: 25,
      gender: 'male',
      height: 180.5,
      weight: 75.0,
      workoutType: 'cardio',
      goal: 'weight loss',
    }));
  });

  it('should get all users', async () => {
    const allUsers = await User.find({});
    expect(allUsers.length).toBeGreaterThan(0);
  });

  it('should get all users by weight', async () => {
    const usersByWeight = await User.find({}).sort({ weight: 1 });
    expect(usersByWeight[0].weight).toBeLessThanOrEqual(usersByWeight[usersByWeight.length - 1].weight);
  });
});
