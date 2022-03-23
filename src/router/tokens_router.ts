import { Router } from "express";
import { reqSchemaValidator } from "../middlewares/validation_middleware";
import {
  createAccessTokenFromRefreshToken,
  decodeDataFromToken,
} from "../resources/tokens/token_controller";
import {
  createTokenWithRefreshTokenValidator,
  decodeDataFromTokenValidator,
} from "../resources/tokens/token_schema_validator";
import BaseRouter from "./router";

export class TokensRouter implements BaseRouter {
  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  path= "/token";
  router: Router;
  private initRoutes(): void {
    // route for creating access token from refresh token
    this.router.post(
      `${this.path}/new`,
      reqSchemaValidator({ body: createTokenWithRefreshTokenValidator }),
      createAccessTokenFromRefreshToken
    );
    this.router.post(
      `${this.path}/decode`,
      reqSchemaValidator({ body: decodeDataFromTokenValidator }),
      decodeDataFromToken
    );
  }
}
