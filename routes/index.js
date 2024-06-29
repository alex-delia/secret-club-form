const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

const asyncHandler = require('express-async-handler');

//if user is logged in, redirect back to page
const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

const isAuthorized = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};


/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const messages = await messageController.fetchMessages();
  res.render('index', { title: 'Members Only Club', messages: messages, secretCodeError: req.flash('secretCodeError'), secretCodeSuccess: req.flash('secretCodeSuccess') });
}));

/* GET sign up. */
router.get('/signup', checkLoggedIn, userController.signup_form_get);
//POST request for signup
router.post('/signup', checkLoggedIn, userController.signup_form_post);

/* GET login. */
router.get('/login', checkLoggedIn, userController.login_form_get);
/* POST login. */
router.post('/login', checkLoggedIn, userController.login_form_post);

//GET logout
router.get('/logout', isAuthorized, userController.logout_get);

//POST secret
router.post('/secret', isAuthorized, userController.secret_post);

//GET newMessage
router.get('/newMessage', isAuthorized, messageController.newMessage_get);
//POST newMessage
router.post('/newMessage', isAuthorized, messageController.newMessage_post);

module.exports = router;
