import Joi from "joi";
import { isValidObjectId } from "../../utils/validators/object_id_validator";

const createValidation = Joi.object({
  title: Joi.string().required().min(3).max(150),
  description: Joi.string().required().min(3),
  price: Joi.number().required(),
  image: Joi.string().required(),
});
const updateValidation = Joi.object({
  title: Joi.string().required().min(3).max(150),
  description: Joi.string().required().min(3),
  price: Joi.number().required(),
  image: Joi.string().required(),
});
const paramValidation = Joi.object({
  id: Joi.string().custom(isValidObjectId).message("Invalid Product Id"),
});

export { createValidation, updateValidation, paramValidation };
