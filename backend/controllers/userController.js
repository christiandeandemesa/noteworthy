// This file is all the request handling logic for routes (i.e. connects the router instance and models).

const jwt = require('jsonwebtoken');
// Imports the bcryptjs package.
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// This function registers a user document in the users collection.
const registerUser = asyncHandler(async (req, res) => {
    // Destructures firstName, lastName, email, and password from req.body.
    const {firstName, lastName, email, password} = req.body;
    // If firstName, lastName, email and/or password don't exist, throw an error.
    if(!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // userExists could be a user document found using the inputted email.
    const userExists = await User.findOne({email});
    // If userExists is a user document, throw an error because all user documents must have unique emails.
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // salt is a random string of characters added before a password is hashed.
    const salt = await bcrypt.genSalt(10);
    // hashedPassword takes the inputted password and salt, combines them, and scrambles the characters' orders.
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creates a user using the req.body information, but changes password to be hashedPassword.
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });
    
    // If creating a user succeeds, send back its data as a JSON object.
    if(user) {
        res.status(201).json({
            // Notice how the user's id is changed to _id.
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            // Generates an authorization token for the user using the below generateToken function, and user._id which comes from the above JSON object.
            token: generateToken(user._id)
        });
    }
    // If creating a user fails, throw an error.
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// This function logs in a user by matching it to an existing user document in the users collection.
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    // user should be a user document found using the inputted email.
    const user = await User.findOne({email});

    // If user exists and the inputted password matches the hashedPassword, send back its data as a JSON object.
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id)
        });
    }

    // If user does not exist, throw an error.
    else {
        res.status(400);
        throw new Error('Invalid login');
    }
});

const getCurrUser = asyncHandler(async (req, res) => {
    // req.user comes from authMiddleware.js.
    res.status(200).json(req.user);
});

// This function generates an authorization token for a user.
const generateToken = id => {
    // Signs the JSON web token with the user's id, takes the secret key, and states the token expires in 30 days.
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}

// Exports the above functions.
module.exports = {
    registerUser,
    loginUser,
    getCurrUser
}