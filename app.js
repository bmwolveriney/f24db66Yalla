
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;
mongoose.connect(connectionString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("Connection to DB succeeded");
});

// Initialize app first
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err);
      });
  })
);

// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
const Fossil = require('./models/fossil'); // Updated model
const resourceRouter = require('./routes/resource');
var fossilsRouter = require('./routes/fossils'); // Updated route

// The Account model
var Account = require('./models/account');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Use routers after app is initialized
app.use('/fossils', fossilsRouter); // Updated path
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grid', gridRouter);
app.use('/randomitem', pickRouter);
app.use('/resource', resourceRouter);

// Passport config
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Recreate DB with sample data
async function recreateDB() {
  await Fossil.deleteMany(); // Updated model

  const fossil1 = new Fossil({ name: "Tribolite", age: "500 million years", location: "Utah" });
  const fossil2 = new Fossil({ name: "Ammonite", age: "200 million years", location: "Morocco" });
  const fossil3 = new Fossil({ name: "Megalodon Tooth", age: "15 million years", location: "California" });


  fossil1.save().then(doc => console.log("First fossil saved:", doc)).catch(console.error);
  fossil2.save().then(doc => console.log("Second fossil saved:", doc)).catch(console.error);
  fossil3.save().then(doc => console.log("Third fossil saved:", doc)).catch(console.error);
}

const reseed = true;
if (reseed) { recreateDB(); }

module.exports = app;























  
  
