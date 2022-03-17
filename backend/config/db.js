// This file connects with MongoDB.

// Imports the mongoose package.
const mongoose = require('mongoose');

// Uses the async-await keywords because the app shouldn't stall anytime it needs to connect to the database.
const connectDB = async () => {

    // The try-catch code blocks try to run the code block within try, or, if there is an exception, runs the code block within catch instead.
    try {
        // mongoose.connect() sets up a connection to the database, and the database being used is the value of MONGO_URI from the .env file.
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // Displays the message in the terminal if the database connection succeeded.
        console.log(`MongoDB Connected: ${conn.connection.host}`.black.bgGreen.italic);
    }

    catch(err) {
        // Displays the error if the the database connection failed.
        console.log(err);
        // Ends the process with some failure in Node.js.
        process.exit(1);
    }
}

// Exports the connectDB function.
module.exports = connectDB;