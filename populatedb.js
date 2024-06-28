#! /usr/bin/env node
require('dotenv').config();

console.log(
    'This script populates some messages to your database.'
);

// Get arguments passed on command line
const mongoDB = process.env.MONGODB_URI;

const Message = require("./models/message");

const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function messageCreate(index, title, text, user) {
    const message = new Message({ title: title, text: text, user: user, timestamp: new Date() });
    await message.save();
    messages[index] = message;
    console.log(`Added message: ${title}`);
}

async function createMessages() {
    console.log("Adding messages");
    await Promise.all([
        messageCreate(0, 'Test Title', 'This is a test message to populate', new mongoose.Types.ObjectId('667cc5ab5b737d1284814e08')),
        messageCreate(1, 'Suits is great', 'I\'ve been binging suits', new mongoose.Types.ObjectId('667ca0b73831fb46455ae814')),
        messageCreate(2, 'Blah Blah', 'Yap Yap Yapperson', new mongoose.Types.ObjectId('667ca0b73831fb46455ae814')),
    ]);
}