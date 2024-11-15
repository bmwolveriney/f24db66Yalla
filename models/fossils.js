const mongoose = require('mongoose');

// Define the schema for fossils
const fossilSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true }
});

// Create a model from the schema
const Fossil = mongoose.model('Fossil', fossilSchema);

module.exports = Fossil;
