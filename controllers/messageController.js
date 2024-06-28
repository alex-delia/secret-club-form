const Message = require('../models/message');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.messages_list = asyncHandler(async (req, res, next) => {
    const messages = await Message.find().populate('user').exec();

    return messages;
});