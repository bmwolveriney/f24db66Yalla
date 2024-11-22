const express = require('express');
const router = express.Router();

// Require controller modules
const fossilController = require('../controllers/fossil');

// List all fossils
router.get('/', fossilController.fossil_list);

// Create a new fossil
router.post('/', fossilController.fossil_create_post);

// Detail page for a specific fossil
router.get('/:id', fossilController.fossil_detail);

// Update a fossil
router.put('/:id', fossilController.fossil_update_put);

// Delete a fossil
router.delete('/:id', fossilController.fossil_delete);

module.exports = router;
