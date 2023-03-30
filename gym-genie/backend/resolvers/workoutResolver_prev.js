const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { gql } = require('apollo-server-express');
const { ApolloServer } = require('apollo-server-express');
const Workout = require('../models/workout');
const workoutResolver = require('./workoutResolver');
const workoutTypeDefs = require('../resolvers/typeDefs');

let mongoServer;
const server = new ApolloServer({
  typeDefs: gql`${workoutTypeDefs}`,
  resolvers: workoutResolver,
});

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.ensureInstance();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
describe('Workout Resolver', () => {
  // ... other test cases ...

  it('gets a workout by ID', async () => {
    const workout = new Workout({
      name: 'Test Workout',
      description: 'Test workout description',
    });
    await workout.save();

    const GET_WORKOUT = gql`
      query GetWorkout($id: ID!) {
        getWorkout(id: $id) {
          id
          name
          description
        }
      }
    `;

    const { query } = server.createTestClient();
    const { data, errors } = await query({
      query: GET_WORKOUT,
      variables: { id: workout._id },
    });

    if (errors) {
      console.error(errors);
    }

    const savedWorkout = data.getWorkout;

    expect(savedWorkout.id).toEqual(workout._id.toString());
    expect(savedWorkout.name).toEqual(workout.name);
    expect(savedWorkout.description).toEqual(workout.description);
  });
});
