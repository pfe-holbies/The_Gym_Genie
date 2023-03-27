const mongoose = require('mongoose');

const supplementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Supplement = mongoose.model('Supplement', supplementSchema);

module.exports = Supplement;
