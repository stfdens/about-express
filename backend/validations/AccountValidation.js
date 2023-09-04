const joi = require('joi');

const addAccount = joi.object({
  username: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

module.exports = addAccount;
