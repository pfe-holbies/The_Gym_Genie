const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
});

const diet = mongoose.model('diet', dietSchema);

module.exports = diet;