const Fossil = require('../models/fossil');

// List all fossils
exports.fossil_list = function(req, res) {
  Fossil.find({}, function(err, fossils) {
    if (err) {
      return next(err);
    }
    res.render('fossils', { title: 'Fossil List', results: fossils });
  });
};

// Create a new fossil
exports.fossil_create_post = function(req, res) {
  let fossil = new Fossil({
    name: req.body.name,
    age: req.body.age,
    location: req.body.location
  });

  fossil.save(function(err) {
    if (err) {
      return next(err);
    }
    res.json(fossil);
  });
};

// Detail page for a specific fossil
exports.fossil_detail = function(req, res) {
  Fossil.findById(req.params.id, function(err, fossil) {
    if (err) {
      return next(err);
    }
    res.render('fossil_detail', { title: 'Fossil Detail', toShow: fossil });
  });
};

// Update a fossil
exports.fossil_update_put = function(req, res) {
  Fossil.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: req.body.age,
    location: req.body.location
  }, { new: true }, function(err, updatedFossil) {
    if (err) {
      return next(err);
    }
    res.json(updatedFossil);
  });
};

// Delete a fossil
exports.fossil_delete = function(req, res) {
  Fossil.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'Fossil deleted successfully' });
  });
};
