const mongoose = require('mongoose');

const FossilSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Fossil name is required'],
        minlength: [3, 'Fossil name must be at least 3 characters long'],  // Minimum length for name
        maxlength: [100, 'Fossil name cannot exceed 100 characters'],  // Maximum length for name
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age must be a positive number'],  // Age should be positive
        max: [1000, 'Age seems too old, check for valid input'],  // Upper limit for age
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
});

module.exports = mongoose.model('Fossil', FossilSchema);
