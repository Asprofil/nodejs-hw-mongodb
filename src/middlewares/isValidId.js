const mongoose = require('mongoose');
const { BadRequest } = require('http-errors');

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return next(new BadRequest('Invalid ID'));
    }
    next();
};

module.exports = isValidId;
