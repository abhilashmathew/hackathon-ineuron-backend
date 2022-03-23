import { Request, Response, NextFunction } from "express";
import HttpException from "../utils/exceptions/http_exception";
import { verfyAccessToken } from "../resources/tokens/token_helper";

/**
 *
 * Verifies accessToken is valid,
 * if accessToken failes then throws an error
 */
const authMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers.authorization;

      if (!bearerToken || !bearerToken.startsWith("Bearer "))
        throw new Error("No token Found");
      const accessToken = bearerToken.split("Bearer ")[1];

      /** Access Token verify */
      const { payload, jwtError } = verfyAccessToken(accessToken);
      if (jwtError)
        return next(new HttpException(401, "Authorization failed", jwtError));
      req.user = (payload as any).data;
      next();
    } catch (error) {
      return next(new HttpException(401, "Authorization failed", error));
    }
  };
};

export default authMiddleware;
