import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: String,
  description: String,
  code: String,
  price: Number,
  status: {
    type: Boolean,
    default: true,
  },
  stock: Number,
  category: String,
  thumbnail: [],
});
productsSchema.plugin(mongoosePaginate);
export const productsModel = mongoose.model(productsCollection, productsSchema);
