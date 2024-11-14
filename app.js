var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const mongoose = require('mongoose');
const Fossil = require('./models/fossils');  // Import the Fossil model

// Routers
var resourceRouter = require('./routes/resource');

var app = express();

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

// Seed the database with initial data
async function recreateDB() {
  await Fossil.deleteMany();

  let instance1 = new Fossil({ name: 'Trilobite', age: '500 million years', location: 'Utah' });
  let instance2 = new Fossil({ name: 'Ammonite', age: '200 million years', location: 'Morocco' });
  let instance3 = new Fossil({ name: 'Megalodon Tooth', age: '15 million years', location: 'California' });

  await instance1.save();
  console.log('First object saved');
  await instance2.save();
  console.log('Second object saved');
  await instance3.save();
  console.log('Third object saved');
}

let reseed = true;
if (reseed) { recreateDB(); }

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use resource router
app.use('/resource', resourceRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
