const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(createHttpError(401, 'Access token is missing'));
  }

  try {
    const decoded = jwt.verify(token, 'accessSecret');
    req.user = decoded;
    next();
  } catch (error) {
    next(createHttpError(401, 'Access token expired'));
  }
};

module.exports = authenticate;
