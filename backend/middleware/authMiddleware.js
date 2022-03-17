// This file holds the middleware that protects routes.

// Imports the jsonwebtoken package.
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    // Initializes token here because it is used in both if statements below.
    let token;

    // req.headers accesses headers in express, and it has an authorization object with a value of 'Bearer <random token string>'.
    // If the authorization object exists and it starts with Bearer...
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // token is the authorization object's random token string.
            token = req.headers.authorization.split(' ')[1];
            // Verifies the token with the secret key (the value of JWT_SECRET in the .env file).
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // req.user is a specific user document depending on how JSON web token was signed (id in the userController file).
            // .select('-password') returns all of the user's data except their password.
            req.user = await User.findById(decoded.id).select('-password');
            // Calls the next piece of middleware.
            next();
        }

        // If the token does not match to the user, throw an error.
        catch(err) {
            console.log(err);
            res.status(401);
            throw new Error('Not authorized, wrong token');
        }
    }

    // If the token does not exist, throw an error.
    if(!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Exports the protect function.
module.exports = protect;