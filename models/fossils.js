const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fossilSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('Fossil', fossilSchema);
