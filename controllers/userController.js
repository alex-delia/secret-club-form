const User = require('../models/user');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const passport = require('passport');

//display signup form on GET
exports.signup_form_get = (req, res, next) => {
    res.render('signup_form', { title: 'Sign Up' });
};

//handle signup form on POST
exports.signup_form_post = [
    //validate and sanitize fields
    body('firstName')
        .trim()
        .isLength({ min: 1 })
        .withMessage('First Name must be specified.')
        .escape(),
    body('lastName')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Last Name must be specified.')
        .escape(),
    body('email')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Email must be specified.')
        .isEmail()
        .withMessage('Email format is invalid.')
        .custom(async value => {
            const user = await User.findOne({ email: value });
            if (user) {
                throw new Error('E-mail already in use');
            }
        })
        .escape(),
    body('password')
        .trim()
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters and include: 1 Uppercase, 1 Lowercase, 1 Number, 1 Symbol')
        .escape(),
    body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password || value === '') {
                throw new Error('Password\'s must match');
            }
            return true;
        })
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            membership_status: 'user',
            admin: false
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('signup_form', {
                title: 'Sign Up',
                user: user,
                errors: errors.array()
            });
            return;
        }

        // Data from form is valid.
        // Save user.
        await user.save();
        res.redirect('/');
    })
];

//display login form on GET
exports.login_form_get = (req, res, next) => {
    res.render('login_form', {
        title: 'Log In',
        message: req.flash('error'),
        email: req.flash('email')
    });
};

//display login form on GET  
exports.login_form_post = function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error', 'Incorrect email or password.');
            req.flash('email', req.body.email);
            return res.redirect('/login');
        }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.logout_get = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
}

