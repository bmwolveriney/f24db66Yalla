const express = require('express');
const router = express.Router();
const fossilController = require('../controllers/fossil');
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
};

// Route to view all fossils in a web page
router.get('/', fossilController.fossil_view_all_Page);

router.get('/create', (req, res) => res.render('fossil_create_form'));

/* GET delete fossil page */
router.get('/fossils/delete', secured, fossilController.fossil_delete_Page);

// Export the router
module.exports = router;
