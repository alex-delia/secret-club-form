const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const messageController = require('../controllers/messageController');

const asyncHandler = require('express-async-handler');

//check if the user is logged in
const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};


/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const messages = await messageController.fetchMessages();
  res.render('index', { title: 'Members Only Club', messages: messages });
}));

/* GET sign up. */
router.get('/signup', checkLoggedIn, userController.signup_form_get);
//POST request for signup
router.post('/signup', userController.signup_form_post);

/* GET login. */
router.get('/login', checkLoggedIn, userController.login_form_get);
/* POST login. */
router.post('/login', userController.login_form_post);

//GET logout
router.get('/logout', userController.logout_get);

module.exports = router;
