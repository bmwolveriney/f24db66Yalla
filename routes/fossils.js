var express = require('express');
var router = express.Router();

/* GET fossils page. */
router.get('/', function(req, res, next) {
  res.render('fossils', { title: 'Search Results - Fossils' });
});

module.exports = router;
