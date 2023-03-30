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
    test('getWorkout throws workout not found', async () => {
      const mockId = new mongoose.Types.ObjectId();
      const workout = expect(workoutResolvers.Query.getWorkout(null, { id: -1 })).rejects.toThrow();
    });
    test('getWorkout returns message when workout not found', async () => {
      const mockId = new mongoose.Types.ObjectId();
      await expect(workoutResolvers.Query.getWorkout(null, { id: mockId })).rejects.toThrow('Workout not found');
    });

    test('getWorkout returns the correct workout when workout is found', async () => {
      // Create a new workout
      const newWorkout = {
        name: 'Test Workout',
        description: 'Test workout description',
      };
      const createdWorkout = await Workout.create(newWorkout);
    
      // Query for the created workout
      const workout = await workoutResolvers.Query.getWorkout(null, { id: createdWorkout._id });
    
      // Check if the returned workout matches the created workout
      expect(workout.id).toEqual(createdWorkout._id.toString());
      expect(workout.name).toEqual(createdWorkout.name);
      expect(workout.description).toEqual(createdWorkout.description);
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
    describe('Mutation', () => {
      test('createWorkout creates a new workout', async () => {
        const newWorkout = { name: 'Test Workout', description: 'Test workout description' };
        const workout = await workoutResolvers.Mutation.createWorkout(null, newWorkout);
        expect(workout).toMatchObject(newWorkout);
      });
    
      test('updateWorkout updates a workout', async () => {
        const existingWorkout = new Workout({ name: 'Initial Workout', description: 'Initial workout description' });
        await existingWorkout.save();
    
        const updatedData = { name: 'Updated Workout', description: 'Updated workout description' };
        const updatedWorkout = await workoutResolvers.Mutation.updateWorkout(null, { id: existingWorkout._id, ...updatedData });
    
        expect(updatedWorkout).toMatchObject(updatedData);
      });
    
      test('updateWorkout returns null when workout not found', async () => {
        const mockId = new mongoose.Types.ObjectId();
        const updatedData = { name: 'Updated Workout', description: 'Updated workout description' };
        await expect(workoutResolvers.Mutation.updateWorkout(null, { id: mockId, ...updatedData })).rejects.toThrow('Workout not found');
      });
    
      test('deleteWorkout deletes a workout', async () => {
        const existingWorkout = new Workout({ name: 'Initial Workout', description: 'Initial workout description' });
        await existingWorkout.save();
    
        const deletedWorkout = await workoutResolvers.Mutation.deleteWorkout(null, { id: existingWorkout._id });
        const foundWorkout = await Workout.findById(existingWorkout._id);
    
        expect(foundWorkout).toBeNull();
        expect(deletedWorkout).toMatchObject(existingWorkout.toObject());
      });
    
      test('deleteWorkout returns null when workout not found', async () => {
        const mockId = new mongoose.Types.ObjectId();
        await expect(workoutResolvers.Mutation.deleteWorkout(null, { id: mockId })).rejects.toThrow('Workout not found');
      });
    });
    
  });
});