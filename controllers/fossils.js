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
    console.log("Request Body:", req.body);  // Log req.body to confirm what data is being received
  
    const { name, age, location } = req.body || {};  // Destructure req.body and default to empty object if undefined
  
    // Check if all required fields are provided
    if (!name || !age || !location) {
      return res.status(400).json({
        error: "All fields (name, age, location) are required.",
        receivedData: req.body  // Send back what was received for troubleshooting
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
  
  