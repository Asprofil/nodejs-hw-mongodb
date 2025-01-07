const Joi = require('joi');

const contactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  isFavourite: Joi.boolean(),
});

module.exports = { contactValidationSchema };
