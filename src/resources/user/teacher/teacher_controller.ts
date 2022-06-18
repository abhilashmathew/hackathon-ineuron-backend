import { Request, Response, NextFunction } from 'express';
import services from './teacher_services';
import HttpException from '../../../utils/exceptions/http_exception';
import { omit } from 'lodash';

const registerTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, accessToken, refreshToken } = await services.registerTeacher(
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
        return next(new HttpException(400, 'Teacher Aldredy exits', error));
      }
    }
    next(new HttpException(400, 'Cannot create Teacher', error));
  }
};

const getTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await services.getTeacher(req.user.id);
    if (!user) throw new Error('Teacher Not Found');
    res.send({ status: 'OK', data: user });
  } catch (error) {
    next(new HttpException(400, 'Teacher Not found', error));
  }
};

const getAllTeachers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await services.getAllTeachers();
    res.send({ status: 'OK', data: user });
  } catch (error) {
    next(new HttpException(400, 'error while geting all teachers', error));
  }
};

const deleteTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await services.deleteTeacher(req.user.id);
    if (!user) throw new Error('Teacher Not Found');
    res.send({ status: 'OK', data: user });
  } catch (error) {
    next(new HttpException(400, 'error while deleting teacher', error));
  }
};
export { registerTeacher, getTeacher, getAllTeachers, deleteTeacher };
