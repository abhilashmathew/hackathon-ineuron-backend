import { ProductDocument, ProductI, ProductModel } from "./product_model";

//For creating a product
const createProduct = async (
  product: ProductI
): Promise<ProductDocument | null> => {
  try {
    const _product = ProductModel.create(product);
    return _product;
  } catch (error) {
    throw new Error("Unable to create Product");
  }
};

const updateProduct = async (
  productId: string,
  updateData: ProductI,
  userId: string
): Promise<ProductDocument | null> => {
  try {
    /**
     * updates perticular product that matches current user
     */
    return ProductModel.findOneAndUpdate(
      { _id: productId, "user.userId": userId },
      updateData,
      {
        new: true,
      }
    );
  } catch (error) {
    throw new Error("Unable to update Product");
  }
};
const deleteProduct = async (
  productId: string,
  userId: string
): Promise<ProductDocument | null> => {
  try {
    return ProductModel.findByIdAndDelete({
      _id: productId,
    })
      .where("user.userId")
      .equals(userId);
  } catch (error) {
    throw new Error("Unable to get Product");
  }
};
const getProduct = async (
  productId: string,
  userId: string
): Promise<ProductDocument | null> => {
  try {
    return ProductModel.findById({
      _id: productId,
    })
      .where("user.userId")
      .equals(userId);
  } catch (error) {
    throw new Error("Unable to delete Product");
  }
};
const getAllProduct = async (
  userId: string
): Promise<ProductDocument[] | null> => {
  try {
    return ProductModel.find({
      "user.userId": userId,
    });
  } catch (error) {
    throw new Error("Unable to delete Product");
  }
};
export default {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProduct,
};
