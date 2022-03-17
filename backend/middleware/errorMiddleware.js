// This file holds the middleware for the custom error handler.

// All middleware must take req (request), res (response), and next as arguments.
// err (error) is also included since this middleware handles errors.
const errorHandler = (err, req, res, next) => {
    // statusCode will either be response's status code, or 500.
    const statusCode = res.statusCode ? res.statusCode : 500;
    // Changes response's status code to be statusCode.
    res.status(statusCode);

    // res.json responds with a JSON object with the below information.
    res.json({
        // This is the error message.
        message: err.message,
        // This is the stack trace for additional information for errors.
        // This will only run if the value of NODE_ENV is production in the .env file.
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

// Exports the errorHandler function.
module.exports = errorHandler;