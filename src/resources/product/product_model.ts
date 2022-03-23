import { model, Document } from "mongoose";
import { UserDocument } from "../user/user_model";
import { productSchema } from "./product_schema";

interface ProductUserI {
  name: string;
  userId: UserDocument["_id"];
}
interface ProductI {
  user: ProductUserI;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductDocument extends ProductI, Document {
  //Any  methods
}

const ProductModel = model<ProductDocument>("Product", productSchema);
export { ProductModel, ProductI, ProductDocument, ProductUserI };

//!code for using instance metthods and static methords
// import { Model, model, Schema } from "mongoose";

// interface ProductI {
//   title: string;
//   description: string;
//   price: number;
//   image: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
// interface _InstanceMethods {
//   myInstanceMethord: () => string;
//   myInstanceMethord2: () => {};
// }
// interface ProductModel extends Model<ProductI, {}, _InstanceMethods> {
//   myStaticMethord2: () => string;
// }

// const ProductSchema = new Schema<ProductI, ProductModel, _InstanceMethods, {}>(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// ProductSchema.methods.myInstanceMethord = function (): string {
//   return "return value";
// };

// ProductSchema.static("myStaticMethord2", () => {
//   return "haiii returned";
// });

// const Product = model<ProductI, ProductModel>("Product", ProductSchema);
