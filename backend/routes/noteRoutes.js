// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is server side routing for the note CRUD API.

const express = require('express');
// Creates a router instance to handle routes.
const router = express.Router();
// Destructures and imports the functions.
const {getNotes, setNote, updateNote, deleteNote} = require('../controllers/noteController');
// Imports the protect function.
const protect = require('../middleware/authMiddleware');

// router.route() returns a route to a given path.
// The path from server.js runs the getNotes function on a GET request, or the setNote function on a POST request.
// protect is added to protect this route, so that only the logged in user can get all of their notes, or create a new note for themself.
router.route('/').get(protect, getNotes).post(protect, setNote);
// Appends the note's id to the path then runs the updateNote function on a PUT request, or the deleteNote function on a DELETE request.
// Protects this route so that only the logged in user can update one of their notes, or delete one of their notes.
router.route('/:id').put(protect, updateNote).delete(protect, deleteNote);

// Exports the router instance.
module.exports = router;