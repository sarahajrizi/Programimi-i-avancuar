const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    zipCode: Joi.string().required(),
    country: Joi.string().required()
  }).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

module.exports = { userSchema, loginSchema };
