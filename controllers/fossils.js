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
    console.log("Request Body:", req.body);  // Log req.body to confirm it's being received
  
    try {
      const { name, age, location } = req.body || {}; // Fallback to empty object if req.body is undefined
  
      if (!name || !age || !location) {
        return res.status(400).send("All fields (name, age, location) are required.");
      }
  
      const newFossil = new Fossil({ name, age, location });
      await newFossil.save();
      res.status(201).json(newFossil);
    } catch (err) {
      console.error("Error in fossil_create_post:", err);
      res.status(500).send("Error creating fossil: " + err.message);
    }
  };
  