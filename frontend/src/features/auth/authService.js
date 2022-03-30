// This file is the API call to the user register and login API.

// Imports axios from the axios package.
import axios from 'axios';

// This is the user register and login API path in server.js appended to the proxy in package.json.
// Note that we can only access the API if we have server side cors installed.
const API_URL = 'http://localhost:5000/users/register/';

// The register function makes an asynchronous request POST request to the API path with the userData to register and create a new user.
const register = async userData => {
    const res = await axios.post(API_URL, userData);
    // If res.data (i.e. response object's data) exists...
    if(res.data) {
        console.log(API_URL);
        // localStorage is a property that allows JavaScript sites to save key-value pairs in a web browser.
        // .setItem() saves an item to localStorage where user is the key, and the response object's data converted to a JSON string is the value.
        localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data;
}

// The logout function removes the object with the key of user from localStorage.
const logout = () => {
    localStorage.removeItem('user');
}

// authService is an object holding the above function(s).
const authService = {
    register,
    logout
}

// Exports the authService object.
export default authService;