const express = require('express');
const router = express.Router();
const fossilController = require('../controllers/fossils');
const apiController = require('../controllers/api');

// API info endpoint
router.get('/', apiController.api);

// GET request for list of all fossils
router.get('/fossils', fossilController.fossil_list);

// GET request for a specific fossil by ID
router.get('/fossils/:id', fossilController.fossil_detail);

// POST request to create a new fossil
router.post('/fossils', fossilController.fossil_create_post);

// PUT request to update an existing fossil by ID
router.put('/fossils/:id', fossilController.fossil_update_put);

// DELETE request to delete a fossil by ID
router.delete('/fossils/:id', fossilController.fossil_delete);

module.exports = router;
