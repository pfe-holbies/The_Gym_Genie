const mongoose = require("mongoose");

const TrackerSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["cardio", "resistance"],
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  

  exercise: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  sets: {
    type: Number,
    required: true,
    min: 1,
  },
  reps: {
    type: Number,
    required: true,
    min: 1,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
});

// Cardio Schema
const CardioSchema = new Schema(
  {
    type: {
      type: String,
      default: "cardio",
      required: true
    },
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);

// Resistance Schema
const ResistanceSchema = new Schema(
  {
    type: {
      type: String,
      default: "resistance",
      required: true
    },
    name: {
      type: String,
      required: true,
      maxlength: 30
    },
    weight: {
      type: Number,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  }
);


module.exports = mongoose.model("Tracker", TrackerSchema);
