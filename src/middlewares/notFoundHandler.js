const { NotFound } = require('http-errors');

const notFoundHandler = (req, res, next) => {
    next(new NotFound('Route not found'));
};

module.exports = notFoundHandler;
