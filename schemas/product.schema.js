const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(10).max(200);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,
  price_min: price_min,
  price_max: price_max.when('price_min', {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }).greater(Joi.ref('price_min')),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
