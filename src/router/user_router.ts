import { Router } from 'express';
import BaseRouter from './router';
import { reqSchemaValidator } from '../middlewares/validation_middleware';
import { loginUserValidator } from '../resources/user/user_validator';
import { loginUser } from '../resources/user/user_controller';
import { registerStudentValidator } from '../resources/user/student/student_validator';
import { registerStudent } from '../resources/user/student/student_controller';
import { registerTeacherValidator } from '../resources/user/teacher/teacher_validator';
import { registerTeacher } from '../resources/user/teacher/teacher_controller';
import authMiddleware from '../middlewares/auth_middleware';

class UserRouter implements BaseRouter {
  path = '/user';
  router: Router;
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post(
      `${this.path}/login`,
      reqSchemaValidator({ body: loginUserValidator }),
      loginUser
    );

    this.router.post(
      `${this.path}/student/register`,
      reqSchemaValidator({ body: registerStudentValidator }),
      registerStudent
    );

    this.router.post(
      `${this.path}/teacher/register`,
      reqSchemaValidator({ body: registerTeacherValidator }),
      registerTeacher
    );

    // this.router.get(`${this.path}`, authMiddleware(), getUser);

    // this.router.get(`${this.path}/all`, authMiddleware(), getAllUser);
    // this.router.delete(`${this.path}`, authMiddleware(), deleteUser);
  }
}

export = UserRouter;
