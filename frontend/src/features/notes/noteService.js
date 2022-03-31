// ???

import axios from 'axios';

// ???
const API_URL = 'http://localhost:5000/noteworthy/';

// ???
const createNote = async (noteData, token) => {
    // config is an object with a headers key, whose value is also an object of Authorization: Bearer token.
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

// ???
const getNotes = async token => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    // res makes a GET request to the API_URL to get all the notes that are authorized with the logged in user's token (config).
    const res = await axios.get(API_URL, config);
    return res.data;
}

// ???
const noteService = {
    createNote,
    getNotes
}
// ???
export default noteService;