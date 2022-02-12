import { Router } from "express";
import BaseRouter from "./router";
import { reqSchemaValidator } from "../middlewares/validation_middleware";
import {
  createValidation,
  paramValidation,
} from "../resources/product/product_validator";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../resources/product/product_controller";
import authMiddleware from "../middlewares/auth_middleware";

class ProductRouter implements BaseRouter {
  path: string = "/products";
  router: Router;
  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    // create product
    this.router.post(
      this.path,
      authMiddleware(),
      reqSchemaValidator({ body: createValidation }),
      createProduct
    );
    //get all product of user
    this.router.get(this.path, authMiddleware(), getAllProduct);

    /* get product */
    this.router.get(
      `${this.path}/:productId`,
      authMiddleware(),
      reqSchemaValidator({ params: paramValidation }),
      getProduct
    );

    /* update product */
    this.router.put(
      `${this.path}/:productId`,
      authMiddleware(),
      reqSchemaValidator({ params: paramValidation }),
      updateProduct
    );

    /* delete product */
    this.router.delete(
      `${this.path}/:productId`,
      authMiddleware(),
      reqSchemaValidator({ params: paramValidation }),
      deleteProduct
    );
  }
}

export = ProductRouter;
