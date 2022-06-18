import Joi from 'joi';

const loginUserValidator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

export { loginUserValidator };
