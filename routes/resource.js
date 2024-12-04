const express = require('express');
const router = express.Router();
// Check if the user is authenticated
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
};

// Require controller modules
const api_controller = require('../controllers/api');
const fossilController = require('../controllers/fossil');

// Base API route
router.get('/', api_controller.api);

// API routes for Fossil
router.post('/fossils', fossilController.fossil_create_post);
router.get('/fossils', fossilController.fossil_list);
router.get('/fossils/all', fossilController.fossil_view_all_Page);
/* GET create fossil page */
router.get('/fossils/create', secured, fossilController.fossil_create_Page);
/* GET delete fossil page */
router.get('/fossils/delete', secured, fossilController.fossil_delete_Page);
// GET detail page for a specific Fossil (using query parameter)
router.get('/fossils/detail', fossilController.fossil_view_one_Page);
/* GET update page for fossil */
router.get('/fossils/:id', fossilController.fossil_detail);
router.put('/fossils/:id', fossilController.fossil_update_put);
router.delete('/fossils/:id', fossilController.fossil_delete);
router.get('/update', secured, fossilController.fossil_update_Page);

module.exports = router;
