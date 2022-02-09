import { Router } from "express";
import BaseRouter from "./router";
import { reqSchemaValidator } from "../middlewares/validation_middleware";
import {
  loginUserValidator,
  registerUserValidator,
} from "../resources/user/user_validator";
import {
  deleteUser,
  getAllUser,
  getUser,
  loginUser,
  registerUser,
} from "../resources/user/user_controller";
import authMiddleware from "../middlewares/auth_middleware";

class UserRouter implements BaseRouter {
  path: string = "/user";
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
      `${this.path}/register`,
      reqSchemaValidator({ body: registerUserValidator }),
      registerUser
    );

    this.router.get(`${this.path}`, authMiddleware(), getUser);

    this.router.get(`${this.path}/all`, authMiddleware(), getAllUser);
    this.router.delete(`${this.path}`, authMiddleware(), deleteUser);
  }
}

export = UserRouter;
