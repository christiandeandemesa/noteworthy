// This file compiles JavaScript code.

// Imports the express package.
const express = require('express');
// Imports the cors package.
const cors = require('cors');
// Imports the colors package.
const colors = require('colors');
// Imports and configures the dotenv package.
const dotenv = require('dotenv').config();
// Imports the errorHandler function from the errorMiddleware file.
const errorHandler = require('./middleware/errorMiddleware');
// Imports the connectDB function from the db file.
const connectDB = require('./config/db');
// Assigns the value of PORT from the .env file, or 5000 to port.
const port = process.env.PORT || 5000;

// Runs the connectDB function.
connectDB();

// Runs express in the app.
const app = express();

// app.use() adds middleware to the app.
// express.json() parses incoming JSON object requests and places the data in req.body.
app.use(express.json());
// express.urlencoded parses incoming urlencoded payload requests (e.g. strings or arrays).
// {extended: false} signifies the req.body object will only contain strings.
app.use(express.urlencoded({extended: false}));

// cors allows the express server to respond to preflight requests.
// A preflight request is sent before an actual request to see which actual requests the express server accepts.
// Setting the credentials to true allows all requests from the origins.
app.use(cors({credentials: true, origins: 'http://localhost:5000'}));

// '/noteworthy' appends to 'http://localhost:5000' as the path for the router instance in the noteRoutes file.
app.use('/noteworthy', require('./routes/noteRoutes'));
// '/users' appends to http://localhost:5000' as the path for the router instance in the userRoutes file.
app.use('/users', require('./routes/userRoutes'));

// Runs the errorHandler function if there is an error.
app.use(errorHandler);

// app.listen() binds and listens for the connection on the port.
// The callback function displays the message in the terminal if app.isten() succeeded.
// .black.bgCyan.italic comes from the colors package.
app.listen(port, () => console.log(`Server started on port ${port}`.black.bgCyan.italic));