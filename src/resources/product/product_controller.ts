import { Request, Response, NextFunction } from "express";
import HttpException from "../../utils/exceptions/http_exception";
import ResFailedInterface from "../../utils/interfaces/res_failed_interface";
import services from "./product_services";

const productNotFound: ResFailedInterface = {
  status: "ERROR",
  error: {
    message: "Product not found",
    code: 404,
  },
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await services.createProduct(req.body);
    res.status(201).send({ status: "OK", data: product });
  } catch (error) {
    next(new HttpException(400, "Cannot create Product", error));
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await services.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).send(productNotFound);
    res.status(200).send({ status: "OK", data: product });
  } catch (error) {
    next(new HttpException(400, "Cannot update Product", error));
  }
};

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await services.getProduct(req.params.id);
    if (!product) return res.status(404).send(productNotFound);
    res.status(200).send({ status: "OK", data: product });
  } catch (error) {
    next(new HttpException(400, "Cannot get Product", error));
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await services.deleteProduct(req.params.id);
    if (!product) return res.status(404).send(productNotFound);

    res.status(200).send({ status: "OK", data: product });
  } catch (error) {
    next(new HttpException(400, "Cannot delete Product", error));
  }
};
export { createProduct, updateProduct, deleteProduct, getProduct };
