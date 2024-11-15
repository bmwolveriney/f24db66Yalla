const Fossil = require('../models/fossils');

// List of all Fossils
exports.fossil_list = async function(req, res) {
  try {
    const fossils = await Fossil.find();  // Find all fossils in the database
    res.json(fossils);  // Send the fossils as JSON
  } catch (err) {
    res.status(500).json({ error: "Error fetching fossils: " + err.message });
  }
};

// Get details of a specific Fossil
exports.fossil_detail = async function(req, res) {
  try {
    const fossil = await Fossil.findById(req.params.id);
    if (!fossil) {
      return res.status(404).json({ error: "Fossil not found" });
    }
    res.json(fossil);  // Send the fossil details as JSON
  } catch (err) {
    res.status(500).json({ error: "Error retrieving fossil: " + err.message });
  }
};

// Handle Fossil creation on POST
exports.fossil_create_post = async function(req, res) {
  try {
    const fossil = new Fossil({
      name: req.body.name,
      age: req.body.age,
      location: req.body.location
    });

    // Validate required fields
    if (!fossil.name || !fossil.age || !fossil.location) {
      return res.status(400).json({ error: "All fields (name, age, location) are required" });
    }

    await fossil.save();
    res.status(201).json(fossil);  // Send the created fossil back
  } catch (err) {
    res.status(500).json({ error: "Error creating fossil: " + err.message });
  }
};

// Handle Fossil deletion on DELETE
exports.fossil_delete = async function(req, res) {
  try {
    const fossil = await Fossil.findByIdAndDelete(req.params.id);
    if (!fossil) {
      return res.status(404).json({ error: "Fossil not found" });
    }
    res.status(200).json({ message: "Fossil deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting fossil: " + err.message });
  }
};

// Handle Fossil update on PUT
exports.fossil_update_put = async function(req, res) {
  try {
    const fossil = await Fossil.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fossil) {
      return res.status(404).json({ error: "Fossil not found" });
    }
    res.json(fossil);  // Send the updated fossil as JSON
  } catch (err) {
    res.status(500).json({ error: "Error updating fossil: " + err.message });
  }
};
