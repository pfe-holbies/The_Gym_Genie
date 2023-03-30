const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const workoutResolvers = require('../resolvers/workoutResolver');
const Workout = require('../models/workout');

let mongoServer;
  
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await Workout.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('workoutResolvers', () => {
  describe('Query', () => {
    test('getWorkout returns throws workout not found', async () => {
      const mockId = new mongoose.Types.ObjectId();
      const workout = expect(workoutResolvers.Query.getWorkout(null, { id: -1 })).rejects.toThrow();
    });
    test('getWorkout returns null when workout not found', async () => {
      const mockId = new mongoose.Types.ObjectId();
      await expect(workoutResolvers.Query.getWorkout(null, { id: mockId })).rejects.toThrow('Workout not found');
    });
    // other tests for getWorkout and getAllWorkouts queries
  });

  describe('Mutation', () => {
    test('createWorkout creates a new workout', async () => {
      const newWorkout = { name: 'Test Workout', description: 'Test workout description' };
      const workout = await workoutResolvers.Mutation.createWorkout(null, newWorkout);
      expect(workout).toMatchObject(newWorkout);
    });
    
    // other tests for createWorkout, updateWorkout, and deleteWorkout mutations
  });
});