import mongoose from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  products: {
    type: Array,
    default: [],
  },
  email: { type: String },
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
