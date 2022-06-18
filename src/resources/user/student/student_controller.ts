import { Request, Response, NextFunction } from 'express';
import services from './student_services';
import HttpException from '../../../utils/exceptions/http_exception';
import { omit } from 'lodash';

const registerStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, accessToken, refreshToken } = await services.registerStudent(
      req.body
    );

    res.status(201).send({
      status: 'OK',
      accessToken,
      refreshToken,
      data: omit(user?.toJSON(), ['__v', 'password']),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message && error.message.includes('duplicate key')) {
        ///if multiple email address found
        return next(new HttpException(400, 'User Aldredy exits', error));
      }
    }
    next(new HttpException(400, 'Cannot create User', error));
  }
};

const getStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await services.getStudent(req.user.id);
    if (!user) throw new Error('User Not Found');
    res.send({ status: 'OK', data: user });
  } catch (error) {
    next(new HttpException(400, 'User Not found', error));
  }
};

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await services.getAllStudents();
    res.send({ status: 'OK', data: user });
  } catch (error) {
    next(new HttpException(400, 'error while geting all users', error));
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await services.deleteStudent(req.user.id);
    if (!user) throw new Error('User Not Found');
    res.send({ status: 'OK', data: user });
  } catch (error) {
    next(new HttpException(400, 'error while deleting user', error));
  }
};
export { registerStudent, getStudent, getAllStudents, deleteStudent };
