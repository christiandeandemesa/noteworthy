// This file is the API call to the users login and register API.

// Imports axios from the axios package.
import axios from 'axios';

// This is the users login and register API path in server.js.
const API_URL = 'http://localhost:5000/users/';

// The register function makes an asynchronous request POST request to the API path with the userData to register and create a new user.
const register = async userData => {
    const res = await axios.post(API_URL, userData);
    // If res.data (i.e. response object's data) exists...
    if(res.data) {
        // localStorage is a property that allows JavaScript sites to save key-value pairs in a web browser.
        // .setItem() saves an item to localStorag where user is the key, and the response object's data converted to a JSON string is the value.
        localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
}

// authService is an object holding the above function(s).
const authService = {
    register
}

// Exports the authService object.
export default authService;