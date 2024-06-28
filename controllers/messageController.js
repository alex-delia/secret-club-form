const Message = require('../models/message');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.fetchMessages = asyncHandler(async () => {
    const messages = await Message.find().populate('user').exec();
    return messages;
});