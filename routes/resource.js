const express = require('express');
const router = express.Router();
const fossilController = require('../controllers/fossils');  // Controller

// Route to list all fossils
router.get('/fossils', fossilController.fossil_list);

// Route to view details of a single fossil
router.get('/fossils/:id', fossilController.fossil_detail);

// Route to create a new fossil (POST)
router.post('/fossils', fossilController.fossil_create_post);

module.exports = router;
