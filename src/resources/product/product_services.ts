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
  updateData: ProductI
): Promise<ProductDocument | null> => {
  try {
    return ProductModel.findByIdAndUpdate(productId, updateData, {
      new: true,
    });
  } catch (error) {
    throw new Error("Unable to update Product");
  }
};
const deleteProduct = async (
  productId: string
): Promise<ProductDocument | null> => {
  try {
    return ProductModel.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error("Unable to get Product");
  }
};
const getProduct = async (
  productId: string
): Promise<ProductDocument | null> => {
  try {
    return ProductModel.findById(productId);
  } catch (error) {
    throw new Error("Unable to delete Product");
  }
};
export default { createProduct, updateProduct, deleteProduct, getProduct };
