import mongoose from "mongoose";
import { CartManagerBD } from "../managers/CartManagerBD.js";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true},
    password: String,
    age: Number,
    cart: {
        cartlast: new CartManagerBD(),
        type: Number,
        ref: "carts",
        refPath: "id",
        default: null
        
    },
    role: { type: String, default: "usuario" }
});

export const userModel = mongoose.model(usersCollection, userSchema)