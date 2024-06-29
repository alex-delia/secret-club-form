const Message = require('../models/message');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.fetchMessages = asyncHandler(async () => {
    const messages = await Message.find().populate('user').exec();
    return messages;
});

//display signup form on GET
exports.newMessage_get = (req, res, next) => {
    res.render('new_message', { title: 'New Message' });
};

//display signup form on GET
exports.newMessage_post = [
    body('messageTitle')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Must be atleast 1 character.')
        .escape(),
    body('message')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Must be atleast 1 character.')
        .escape(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        const message = new Message({
            title: req.body.messageTitle,
            text: req.body.message,
            user: res.locals.currentUser._id
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('new_message', {
                title: 'New Message',
                message: message,
                errors: errors.array()
            });
            return;
        }

        // Data from form is valid.
        // Save user.
        await message.save();
        res.redirect('/');
    })
];