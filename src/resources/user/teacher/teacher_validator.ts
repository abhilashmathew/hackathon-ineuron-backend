import Joi from 'joi';
import { isValidObjectId } from '../../../utils/validators/object_id_validator';

const registerTeacherValidator = Joi.object({
  email: Joi.string().required().email(),
  name: Joi.string().required().max(30),
  password: Joi.string().required(),
});

const paramValidation = Joi.object({
  id: Joi.string().custom(isValidObjectId).message('Invalid Teacher Id'),
});
export { registerTeacherValidator, paramValidation };
