// THIS FILE HAS BEEN DOUBLE-CHECKED FOR BUGS
// This file is the API call to the user register and login API.

// Imports axios from the axios package.
import axios from 'axios';

// This is the user register and login API path in server.js.
// Note that we can only access the API if we have cors installed in server.js.
const API_URL = 'http://localhost:5000/users/';

// The register function makes an asynchronous POST request to the API path with the userData to register and create a new user.
const register = async userData => {
    // res is a POST request to the above API_URL concatenated with register.
    const res = await axios.post(API_URL + 'register', userData);
    /*
    If res.data (i.e. response object's data) exists, .setItem() saves an item to localStorage where user is the key and the response object's data converted to a JSON 
    string is the value.
    */
    // localStorage is a property that allows JavaScript sites to save key-value pairs in a web browser.
    if(res.data) localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
}

// The login function makes an asynchronous POST request to the API path with the userData to login an existing user in the MongoDB.
const login = async userData => {
    // res is a POST request to the above API_URL concatenated with login.
    const res = await axios.post(API_URL + 'login', userData);
    if(res.data) localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
}

// The logout function removes the object with the key of user from localStorage.
const logout = () => {
    localStorage.removeItem('user');
}

// authService is an object holding the above functions.
const authService = {
    register,
    login,
    logout
}

// Exports the authService object.
export default authService;