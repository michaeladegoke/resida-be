// Middleware to handle not found errors
const notFound = (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(409); // Typically, 404 is used for Not Found errors
    next(error);
};

// Middleware to handle general errors
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = "Internal Server Error";
    console.error({ error: err.message });

    res.status(statusCode).json({
        status: 'error',
        message: message
    });
};

// Middleware to handle asynchronous errors
const asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = {notFound, errorHandler, asyncHandler };
