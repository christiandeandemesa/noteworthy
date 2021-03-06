// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file creates the notes collection's schema.

const mongoose = require('mongoose');

// mongoose.Schema() creates a MongoDB schema.
const noteSchema = mongoose.Schema({
    text: {
        // The text value must be a string.
        type: String,
        // The text value is required, and will display the message if omitted.
        required: [true, 'Please include text']
    },
    user: {
        // The type value is the user's id.
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref is to refer to which model the ObjectId pertains to.
        ref: 'User'
    }
// Includes the createdAt and updatedAt fields.
}, {timestamps: true});

// Exports the model with the name of Note using the noteSchema.
module.exports = mongoose.model('Note', noteSchema);