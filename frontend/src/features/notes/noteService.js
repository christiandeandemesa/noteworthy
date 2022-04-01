// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is the API call to the note CRUD API.

import axios from 'axios';

// This is the note CRUD API path in server.js.
const API_URL = 'http://localhost:5000/noteworthy/';

// The createNote function creates a new note.
const createNote = async (noteData, token) => {
    // config is an object with a headers key, whose value is also an object of Authorization: Bearer <token>.
    // Authorization: Bearer token mimics how it would be input in Postman manually.
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // res makes a POST request to the API_URL to create a note with the noteData that is authorized with the logged in user's token (config).
    const res = await axios.post(API_URL, noteData, config);
    return res.data;
}

// The getNotes function gets all the notes created by the logged in user.
const getNotes = async token => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // res makes a GET request to the API_URL to get all the notes that are authorized with the logged in user's token.
    const res = await axios.get(API_URL, config);
    return res.data;
}

// The deleteNote function deletes a specific note.
const deleteNote = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // res makes a DELETE request to the API_URL appended with the note's id (id) to delete the logged in user's note, confirmed with their token.
    const res = await axios.delete(API_URL + id, config);
    return res.data;
}

// noteService is an object holding the above functions.
const noteService = {
    createNote,
    getNotes,
    deleteNote
}

// Exports the noteService object.
export default noteService;