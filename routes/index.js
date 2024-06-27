const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Members Only Club' });
});

/* GET sign up. */
router.get('/signup', userController.signup_form_get);
//POST request for signup
router.post('/signup', userController.signup_form_post);


module.exports = router;
