// This file is all the request handling logic for routes (i.e. connects the router instance and models).

// Imports middleware for handling exceptions inside async express routes, and passes exceptions to the express error handler.
const asyncHandler = require('express-async-handler');
// Imports the Note model from the noteModel file.
const Note = require('../models/noteModel');
// Imports the User model from the userModel file.
const User = require('../models/userModel');

// Uses the async-await keywords because the app shouldn't stall anytime it performs CRUD operations with the document.
// This function gets all the documents in the notes collection.
const getNotes = asyncHandler(async (req, res) => {
    // notes are all the documents.
    // All the functions are MongoDB methods (e.g. find(), create(), etc.).
    const notes = await Note.find();

    res.status(200).json(notes);
});

// This function creates a new document and adds it to the notes collection.
const setNote = asyncHandler(async (req, res) => {
    // If req.body.text (data parsed in server.js) does not exist, set response's status and throw the error message.
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add text');
    }

    // If req.body.text exists, note creates a document with text and the user who created it.
    const note = await Note.create({
        text: req.body.text,
        user: req.user.id
    });

    res.status(200).json(note);
});

// This function updates a specific document in the notes collection.
const updateNote = asyncHandler(async (req, res) => {
    // note is a specific document searched by its id.
    const note = await Note.findById(req.params.id);
    // If note does not find a specific document, throw an error.
    if(!note) {
        res.status(400);
        throw new Error('Note not found');
    }

    // Only allows the user who created the note to also update it.
    // Again req.user comes from authMiddleware.js.
    if(!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    if(note.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // If note does find a specific document, updatedNote takes note, changes its value(s) (req.body), and makes this a new document ({new: true}).
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedNote);
});

// This function deletes a specific document in the notes collection.
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(!note) {
        res.status(400);
        throw new Error('Note not found');
    }

    if(!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    if(note.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    // Deletes the document.
    await note.remove();

    // Since the document was deleted, we respond with a JSON object with its id.
    res.status(200).json({id: req.params.id});
});

// Exports the above functions.
module.exports = {
    getNotes,
    setNote,
    updateNote,
    deleteNote
}