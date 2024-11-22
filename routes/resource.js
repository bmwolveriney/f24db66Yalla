const express = require('express');
const router = express.Router();

// Require controller modules
const api_controller = require('../controllers/api');
const fossilController = require('../controllers/fossil');  // Updated to reference 'fossil' controller

// Base API route
router.get('/', api_controller.api);

// API routes for Fossil
router.post('/fossils', fossilController.fossil_create_post); // Create a new fossil
router.get('/fossils', fossilController.fossil_list); // List all fossils
router.get('/fossils/all', fossilController.fossil_view_all_Page); // View all fossils page

/* GET create fossil page */
router.get('/fossils/create', fossilController.fossil_create_Page);

// GET detail page for a specific Fossil (using query parameter)
router.get('/fossils/detail', fossilController.fossil_view_one_Page);

/* GET update page for fossil */
router.get('/update', fossilController.fossil_update_Page);

// GET single fossil detail by ID
router.get('/fossils/:id', fossilController.fossil_detail); // Fetch specific fossil by ID

// PUT request to update a fossil by ID
router.put('/fossils/:id', fossilController.fossil_update_put);

// DELETE request to delete a fossil by ID
router.delete('/fossils/:id', fossilController.fossil_delete);

module.exports = router;
