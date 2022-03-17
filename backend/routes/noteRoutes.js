// This file is server side routing for the CRUD API.

const express = require('express');
// Creates a router instance to handle routes.
const router = express.Router();
// Destructures and imports the functions from the noteController file.
const {getNotes, setNote, updateNote, deleteNote} = require('../controllers/noteController');

// router.route() returns a route to a given path.
// The path from server.js runs the getNotes function on a GET request, or the setNote function on a POST request.
router.route('/').get(getNotes).post(setNote);
// Appends the note's id to the path then runs the updateNote function on a PUT request, or the deleteNote function on a DELETE request.
router.route('/:id').put(updateNote).delete(deleteNote);

// Exports the router instance.
module.exports = router;