const Fossil = require('../models/fossils');

// List all fossils and render them in the 'fossils' view
exports.fossil_list = async function(req, res) {
  try {
    const fossils = await Fossil.find();
    res.render('fossils', { fossils: fossils });  // Render fossils.pug with the list
  } catch (err) {
    console.error("Error in fossil_list:", err);
    res.status(500).send("Error retrieving fossils.");
  }
};

// View details of a single fossil and render in the 'fossil_detail' view
exports.fossil_detail = async function(req, res) {
  try {
    const fossil = await Fossil.findById(req.params.id);
    if (!fossil) {
      return res.status(404).send("Fossil not found.");
    }
    res.render('fossil_detail', { fossil: fossil });  // Render fossil_detail.pug with fossil details
  } catch (err) {
    console.error("Error in fossil_detail:", err);
    res.status(500).send("Error retrieving fossil details.");
  }
};

// Handle the creation of a new fossil and return as JSON
exports.fossil_create_post = async function(req, res) {
  try {
    const { name, age, location } = req.body;
    if (!name || !age || !location) {
      return res.status(400).send("All fields (name, age, location) are required.");
    }
    
    const newFossil = new Fossil({ name, age, location });  // Create a new instance from the request body
    await newFossil.save();  // Save the fossil to the database
    res.status(201).json(newFossil);  // Respond with the newly created fossil as JSON
  } catch (err) {
    console.error("Error in fossil_create_post:", err);  // Log the error details
    res.status(500).send("Error creating fossil: " + err.message);  // Send a detailed error response
  }
};
