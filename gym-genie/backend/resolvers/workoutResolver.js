const Workout = require('../models/workout');

const workoutResolver = {
  Query: {
    getWorkout: async (_, { id }) => {
      try {
        const workout = await Workout.findById(id);
        if (!workout) {
          throw new Error('Workout not found');
        }
        return workout;
      } catch (error) {
        throw error;
      }
    },
    getAllWorkouts: async () => {
      try {
        const workouts = await Workout.find();
        return workouts;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createWorkout: async (_, args) => {
      try {
        const workout = await Workout.create(args);
        return workout;
      } catch (error) {
        throw error;
      }
    },
    updateWorkout: async (_, { id, ...args }) => {
      try {
        const workout = await Workout.findByIdAndUpdate(id, args, { new: true });
        if (!workout) {
          throw new Error('Workout not found');
        }
        return workout;
      } catch (error) {
        throw error;
      }
    },
    deleteWorkout: async (_, { id }) => {
      try {
        const workout = await Workout.findByIdAndDelete(id);
        if (!workout) {
          throw new Error('Workout not found');
        }
        return workout;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = workoutResolver;
