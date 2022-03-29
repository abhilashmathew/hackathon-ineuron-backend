import console from 'console';
import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';
import { ResFailedInterface } from '../utils/interfaces/res_failed_interface';

interface RequestValidator {
  body?: Joi.Schema;
  params?: Joi.Schema;
  query?: Joi.Schema;
}
const reqSchemaValidator =
  ({ body, params, query }: RequestValidator) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //validate `req.body`
      await body?.validateAsync(req.body);
      await params?.validateAsync(req.params);
      await query?.validateAsync(req.query);
      next();
    } catch (error: unknown) {
      console.error(error);
      let msg: unknown;
      let errorStack: unknown | null = error;
      if (error instanceof Error) msg = error.message ?? 'something went wrong';

      if (error instanceof ValidationError && error && error.details) {
        msg = error.details[0].message;
        errorStack = error.details;
      }
      const _error: ResFailedInterface = {
        status: 'ERROR',
        error: {
          message: msg as string,
          code: 400,
          errorStack: errorStack,
        },
      };
      res.status(400).send(_error);
    }
  };

export { reqSchemaValidator };
