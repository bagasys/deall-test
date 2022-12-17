const Joi = require("joi");

const getUsers = {};

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};
