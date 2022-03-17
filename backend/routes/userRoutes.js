// This file is server side routing for the user register and login API.

const express = require('express');
const router = express.Router();
// Destructures and imports the functions from the userController file.
const {registerUser, loginUser, getCurrUser} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// Appends register to the path then runs the registerUser function on a POST request.
router.post('/register', registerUser);
// Appends login to the path then runs the loginUser function on a POST request.
router.post('/login', loginUser);
// Appends current to the path then runs the getCurrUser function on a GET request.
// Protects this route so that only the logged in user can get their own information.
router.get('/current', protect, getCurrUser);

module.exports = router;