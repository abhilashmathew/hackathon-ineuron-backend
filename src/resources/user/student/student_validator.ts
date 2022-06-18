import Joi from 'joi';
import { isValidObjectId } from '../../../utils/validators/object_id_validator';

const registerStudentValidator = Joi.object({
  email: Joi.string().required().email(),
  name: Joi.string().required().max(30),
  password: Joi.string().required(),
  course: Joi.string().required().max(30),
  year: Joi.number().required().max(3),
});

const paramValidation = Joi.object({
  id: Joi.string().custom(isValidObjectId).message('Invalid Product Id'),
});
export { registerStudentValidator, paramValidation };
