// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file creates the users collection's schema.

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        // The email value must be unique from every other user document.
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    }
}, {timestamps: true});

// Exports the model with the name of User using the userSchema.
module.exports = mongoose.model('User', userSchema);