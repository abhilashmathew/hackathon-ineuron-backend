import { Request, Response, NextFunction } from "express";
import services from "./user_services";
import HttpException from "../../utils/exceptions/http_exception";
import _, { omit } from "lodash";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken, refreshToken } = await services.loginUser(
      req.body.email,
      req.body.password
    );

    res.status(200).send({
      status: "OK",
      accessToken,
      refreshToken,
      data: omit(user?.toJSON(), ["__v", "password"]),
    });
  } catch (error) {
    next(new HttpException(400, "Invalid user", error));
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, accessToken, refreshToken } = await services.registerUser(
      req.body
    );

    res.status(201).send({
      status: "OK",
      accessToken,
      refreshToken,
      data: omit(user?.toJSON(), ["__v", "password"]),
    });
  } catch (error: any) {
    if (error.message && error.message.includes("duplicate key")) {
      ///if multiple email address found
      return next(new HttpException(400, "User Aldredy exits", error));
    }
    next(new HttpException(400, "Cannot create User", error));
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await services.getUser(req.user.id);
    if (!user) throw new Error("User Not Found");
    res.send({ status: "OK", data: user });
  } catch (error) {
    next(new HttpException(400, "User Not found", error));
  }
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await services.getAllUsers();
    res.send({ status: "OK", data: user });
  } catch (error) {
    next(new HttpException(400, "error while geting all users", error));
  }
};

const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await services.deleteUser(req.user.id);
    if (!user) throw new Error("User Not Found");
    res.send({ status: "OK", data: user });
  } catch (error) {
    next(new HttpException(400, "error while deleting user", error));
  }
};
export { registerUser, loginUser, getUser, getAllUser, deleteUser };
