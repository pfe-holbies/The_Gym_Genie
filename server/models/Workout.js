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
    },
  );
  
  const Workout = mongoose.model('Workout', workoutSchema);
  
  module.exports = Workout; 