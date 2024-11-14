const Fossil = require('../models/fossils');

// List of all Fossils
exports.fossil_list = async function(req, res) {
  try {
    const fossils = await Fossil.find();  // Find all fossils in the database
    res.json(fossils);  // Send the fossils as JSON
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get details of a specific Fossil
exports.fossil_detail = async function(req, res) {
  try {
    const fossil = await Fossil.findById(req.params.id);
    if (!fossil) {
      return res.status(404).send("Fossil not found");
    }
    res.json(fossil);  // Send the fossil details as JSON
  } catch (err) {
    res.status(500).send(err);
  }
};

// Handle Fossil creation on POST
exports.fossil_create_post = async function(req, res) {
  try {
    const fossil = new Fossil(req.body);  // Create a new fossil using the request body
    await fossil.save();
    res.status(201).json(fossil);  // Send the created fossil back
  } catch (err) {
    res.status(500).send(err);
  }
};

// Handle Fossil deletion on DELETE
exports.fossil_delete = async function(req, res) {
  try {
    const fossil = await Fossil.findByIdAndDelete(req.params.id);
    if (!fossil) {
      return res.status(404).send("Fossil not found");
    }
    res.status(200).send("Fossil deleted");
  } catch (err) {
    res.status(500).send(err);
  }
};

// Handle Fossil update on PUT
exports.fossil_update_put = async function(req, res) {
  try {
    const fossil = await Fossil.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fossil) {
      return res.status(404).send("Fossil not found");
    }
    res.json(fossil);  // Send the updated fossil as JSON
  } catch (err) {
    res.status(500).send(err);
  }
};
