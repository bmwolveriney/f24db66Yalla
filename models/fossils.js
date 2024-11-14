const mongoose = require('mongoose');

// Define the schema for Fossil
const fossilSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true }
});

// Create and export the model
const Fossil = mongoose.model('Fossil', fossilSchema);

module.exports = Fossil;
