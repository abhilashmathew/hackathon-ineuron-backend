import { Request, Response, NextFunction } from 'express';
import services from './user_services';
import HttpException from '../../utils/exceptions/http_exception';
import { omit } from 'lodash';

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken, refreshToken } = await services.loginUser(
      req.body.email,
      req.body.password
    );

    res.status(200).send({
      status: 'OK',
      accessToken,
      refreshToken,
      data: omit(user?.toJSON(), ['__v', 'password']),
    });
  } catch (error) {
    next(new HttpException(400, 'Invalid user', error));
  }
};

export { loginUser };
