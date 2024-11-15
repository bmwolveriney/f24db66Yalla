var express = require('express');
var router = express.Router();

// Import the Fossil model to interact with MongoDB
const Fossil = require('../models/fossils');

/* GET fossils page. */
router.get('/', async function(req, res, next) {
  try {
    // Fetch all fossils from the database
    const fossils = await Fossil.find(); // Query the database to get all fossils

    // Render the 'fossils' view and pass the fossil data to it
    res.render('fossils', { title: 'Search Results - Fossils', fossils });
  } catch (err) {
    next(err); // Pass any errors to the error handler
  }
});

module.exports = router;