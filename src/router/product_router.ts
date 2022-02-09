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
  getProduct,
  updateProduct,
} from "../resources/product/product_controller";

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
      reqSchemaValidator({ body: createValidation }),
      createProduct
    );
    
    /* get product */
    this.router.get(
      `${this.path}/:id`,
      reqSchemaValidator({ params: paramValidation }),
      getProduct
    );

    /* update product */
    this.router.put(
      `${this.path}/:id`,
      reqSchemaValidator({ params: paramValidation }),
      updateProduct
    );

    /* delete product */
    this.router.delete(
      `${this.path}/:id`,
      reqSchemaValidator({ params: paramValidation }),
      deleteProduct
    );
  }
}

export = ProductRouter;
