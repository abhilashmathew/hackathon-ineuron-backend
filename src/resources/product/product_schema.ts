import { Schema, Types } from "mongoose";
import { ProductDocument, ProductUserI } from "./product_model";

const productUserSchema = new Schema<ProductUserI>({
  name: String,
  userId: { type: Types.ObjectId, ref: "User", required: true },
});

const productSchema = new Schema<ProductDocument>(
  {
    user: { type: productUserSchema, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export { productUserSchema, productSchema };
