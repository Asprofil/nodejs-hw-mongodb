const { validationResult } = require('express-validator');

const validateBody = (schema) => {
  return async (req, res, next) => {
    await schema(req, res, next);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};

module.exports = { validateBody };
