import Joi from "joi";
import { isValidObjectId } from "../../utils/validators/object_id_validator";

const registerUserValidator = Joi.object({
  email: Joi.string().required().email(),
  name: Joi.string().required().max(30),
  password: Joi.string().required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({ "any.only": "confirm password does not match" }),
});

const loginUserValidator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
const paramValidation = Joi.object({
  id: Joi.string().custom(isValidObjectId).message("Invalid Product Id"),
});
export { registerUserValidator, loginUserValidator ,paramValidation};
