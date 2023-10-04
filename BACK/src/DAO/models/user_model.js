import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  role: { type: String, default: "usuario" },
  products: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product" 
  }],
  documents: [{
    name: String,
    reference: String,
    doctype: String,
  }],
  last_connection: Date, 
});


userSchema.methods.updateLastConnection = async function() {
  this.last_connection = new Date();
  await this.save();
};

export const userModel = mongoose.model(usersCollection, userSchema);
