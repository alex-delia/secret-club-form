const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Members Only Club' });
});

/* GET sign up. */
router.get('/signup', userController.signup_form_get);
//POST request for signup
router.post('/signup', userController.signup_form_post);

/* GET login. */
router.get('/login', userController.login_form_get);
/* POST login. */
router.post('/login', userController.login_form_post);

//GET logout
router.get('/logout', userController.logout_get);

module.exports = router;
