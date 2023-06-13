import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    require: true,
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

export const productsModel = mongoose.model(productsCollection, productsSchema);
