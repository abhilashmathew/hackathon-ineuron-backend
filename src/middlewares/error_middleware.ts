import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/exceptions/http_exception';
import { ResFailedInterface } from '../utils/interfaces/res_failed_interface';

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  console.error(error.caughtError);
  const devErrorMsg: unknown = error.caughtError;
  const _error: ResFailedInterface = {
    status: 'ERROR',
    error: {
      code: statusCode,
      message: message,
      devMessage:
        devErrorMsg instanceof Error
          ? devErrorMsg?.message
          : 'Something went wrong',
      errorStack: devErrorMsg,
    },
  };
  res.status(statusCode).send(_error);
}

export default errorMiddleware;
