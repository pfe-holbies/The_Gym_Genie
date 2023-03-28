const { MockedProvider } = require('@apollo/client/testing');
const { gql } = require('@apollo/client');
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server-express');

const Workout = require('../models/workout');
const workoutResolver = require('../resolvers/workoutResolver');
const workoutTypeDefs = gql`
  type Workout {
    id: ID!
    name: String!
    description: String!
  }

  type Query {
    getWorkout(id: ID!): Workout
    getAllWorkouts: [Workout]
  }

  type Mutation {
    createWorkout(name: String!, description: String!): Workout
    updateWorkout(id: ID!, name: String, description: String): Workout
    deleteWorkout(id: ID!): Workout
  }
`;

const server = new ApolloServer({
  typeDefs: workoutTypeDefs,
  resolvers: workoutResolver,
});

const { query, mutate } = createTestClient(server);

describe('Workout Resolver', () => {
  afterEach(async () => {
    await Workout.deleteMany();
  });

  it('creates a new workout', async () => {
    const CREATE_WORKOUT = gql`
      mutation CreateWorkout($name: String!, $description: String!) {
        createWorkout(name: $name, description: $description) {
          id
          name
          description
        }
      }
    `;

    const workoutData = {
      name: 'Test Workout',
      description: 'Test workout description',
    };

    const { data } = await mutate({
      mutation: CREATE_WORKOUT,
      variables: workoutData,
    });

    const savedWorkout = await Workout.findById(data.createWorkout.id);
    expect(savedWorkout.name).toEqual(workoutData.name);
    expect(savedWorkout.description).toEqual(workoutData.description);
  });

  // Add more test cases for getWorkout, getAllWorkouts, updateWorkout, and deleteWorkout
});
