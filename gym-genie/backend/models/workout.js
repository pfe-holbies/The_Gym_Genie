const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      /*image: {
        type: String,
        required: true,
        trim: true,
      },
      category: {
        type: String,
        enum: ['Strength Training', 'Cardio', 'Yoga'],
        required: true,
      },
      equipment: {
        type: String,
        required: true,
        trim: true,
      },
      difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },*/
    },
    { timestamps: true }
  );
  
  const Workout = mongoose.model('Workout', workoutSchema);
  
  module.exports = Workout; 