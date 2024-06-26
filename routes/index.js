const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Members Only Club' });
});

/* GET sign up. */
router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});


module.exports = router;
