const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema(
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
  
 module.exports = mongoose.model('Workout', WorkoutSchema);
