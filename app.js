var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const Fossil = require('./models/fossils');

var resourceRouter = require('./routes/resource');  // Resource router

const app = express();
const fossilRoutes = require('./routes/fossils');

// MongoDB connection setup
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connection to DB succeeded");
});

// Function to recreate database (seeding)
async function recreateDB() {
  // Delete all documents in the Fossil collection
  await Fossil.deleteMany();

  // Create a few sample Fossil documents
  let instance1 = new Fossil({ name: 'Trilobite', age: '500 million years', location: 'Utah' });
  let instance2 = new Fossil({ name: 'Ammonite', age: '200 million years', location: 'Morocco' });
  let instance3 = new Fossil({ name: 'Megalodon Tooth', age: '15 million years', location: 'California' });

  // Save the instances
  await instance1.save();
  console.log('First object saved');
  await instance2.save();
  console.log('Second object saved');
  await instance3.save();
  console.log('Third object saved');
}

// Control reseeding
let reseed = true;
if (reseed) { recreateDB(); }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Use the resource router

// Set up logging and other middleware
app.use(logger('dev'));
app.use(express.json());
app.use('/resource/fossils', fossilRoutes);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/resource/fossils', require('./routes/fossils'));

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).send('Page not found');
});


// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
// Handle the creation of a new fossil and return as JSON
exports.fossil_create_post = async function(req, res) {
  console.log("Received Request Body:", req.body);  // Log the request body to see what is being sent

  const { name, age, location } = req.body || {};

  // Check if all required fields are provided
  if (!name || !age || !location) {
    return res.status(400).json({
      error: "All fields (name, age, location) are required.",
      receivedData: req.body  // Include what was actually received in the response
    });
  }

  try {
    const newFossil = new Fossil({ name, age, location });
    await newFossil.save();
    res.status(201).json(newFossil);
  } catch (err) {
    console.error("Error in fossil_create_post:", err);
    res.status(500).send("Error creating fossil: " + err.message);
  }
};
module.exports = app;
