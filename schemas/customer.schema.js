const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().max(15);
const lastName = Joi.string().max(15);
const phone = Joi.string().max(15);
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  userId: userId,
  user: Joi.object({
    email: email.required(),
    password: password.required()
  }),
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
