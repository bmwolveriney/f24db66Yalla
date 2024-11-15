const Fossil = require('../models/fossils');

// List all fossils
exports.fossil_list = async function(req, res) {
  try {
    const fossils = await Fossil.find();
    res.render('fossils', { fossils: fossils });  // Render fossils.pug with the list
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving fossils.");
  }
};

// View details of a single fossil
exports.fossil_detail = async function(req, res) {
  try {
    const fossil = await Fossil.findById(req.params.id);
    res.render('fossil_detail', { fossil: fossil });  // Render fossil_detail.pug with the fossil details
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving fossil details.");
  }
};

// Handle creation of a new fossil
exports.fossil_create_post = async function(req, res) {
    try {
      const newFossil = new Fossil(req.body);  // Body should contain name, age, location
      await newFossil.save();
      res.status(201).json(newFossil);  // Return the new fossil as JSON
    } catch (err) {
      console.error(err);
      res.status(400).send("Error creating fossil.");
    }
  };
    
