import console from 'console';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
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
    } catch (error: any) {
      console.error(error);
      let msg: string = error.message ?? 'something went wrong';
      if (error.details) msg = error.details[0].message;
      const _error: ResFailedInterface = {
        status: 'ERROR',
        error: {
          message: msg,
          code: 400,
          errorStack: error.details ?? error,
        },
      };
      res.status(400).send(_error);
    }
  };

export { reqSchemaValidator };
