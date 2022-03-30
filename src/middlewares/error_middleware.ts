import { NextFunction, Request, Response } from 'express';
import HttpException from '../utils/exceptions/http_exception';
import { ResFailedInterface } from '../utils/interfaces/res_failed_interface';

export function errorMiddleware(
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
      routeInfo: error.routeInfo,
    },
  };
  res.status(statusCode).send(_error);
}

// On route Not found
export function routeNotFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const _error = new Error(`${req.path} Route Not found`);
  next(
    new HttpException(404, 'Route Not found', _error, {
      path: req.path,
      query: req.query,
      param: req.params,
    })
  );
}
