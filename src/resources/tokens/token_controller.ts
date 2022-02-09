import { Request, Response, NextFunction } from "express";
import HttpException from "../../utils/exceptions/http_exception";
import _ from "lodash";
import {
  createAccessToken,
  createRefreshToken,
  verfyAccessToken,
  verfyRefreshToken,
} from "./token_helper";

export const createAccessTokenFromRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payload, jwtError } = verfyRefreshToken(req.body.refreshToken);
    if (jwtError)
      return next(new HttpException(401, "Invalid Token", jwtError));
    const accessToken = createAccessToken(_.pick(payload, ["data"]) as object);
    const refreshToken = createRefreshToken(
      _.pick(payload, ["data"]) as object
    );
    return res.send({ accessToken, refreshToken });
  } catch (error) {
    return next(new HttpException(401, "Token verification failed", error));
  }
};

export const decodeDataFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * First trys to decode data from refresh token if faies jumps to access token
     */
    const { payload: rePayload, jwtError: reTokenError } = verfyRefreshToken(
      req.body.token
    );
    if (rePayload) return res.send({ ...rePayload as object });
    if (reTokenError) {
      const { payload: accPayload, jwtError: accTokenError } = verfyAccessToken(
        req.body.token
      );
      if (accPayload) return res.send({ ...(accPayload as object) });
      if (accTokenError)
        return next(new HttpException(401, "Invalid Token", accTokenError));
      return next(new HttpException(401, "Invalid Token", reTokenError));
    }
  } catch (error) {
    return next(new HttpException(401, "Token verification failed", error));
  }
};
